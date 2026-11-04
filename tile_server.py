
import sqlite3
from pathlib import Path
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "public" / "data"

MBTILES_FILES = {
    "roads": DATA_DIR / "roads.mbtiles",
    "drainage": DATA_DIR / "drainage.mbtiles",
}

HOST = "0.0.0.0"
PORT = 8000


class TileHandler(BaseHTTPRequestHandler):

    def send_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")

    def do_GET(self):
        path = urlparse(self.path).path

        # Health check
        if path == "/health":
            missing = [
                name for name, file_path in MBTILES_FILES.items()
                if not file_path.exists()
            ]

            self.send_response(200 if not missing else 500)
            self.send_header("Content-Type", "application/json")
            self.send_cors_headers()
            self.end_headers()

            if missing:
                self.wfile.write(
                    ('{"status":"error","missing":' +
                     str(missing).replace("'", '"') + '}').encode()
                )
            else:
                self.wfile.write(
                    b'{"status":"ok","tiles":["roads","drainage"]}'
                )
            return

        # Expected:
        # /tiles/roads/{z}/{x}/{y}.pbf
        # /tiles/drainage/{z}/{x}/{y}.pbf

        parts = path.strip("/").split("/")

        if (
            len(parts) != 5
            or parts[0] != "tiles"
            or not parts[4].endswith(".pbf")
        ):
            self.send_error(404, "Tile endpoint not found")
            return

        layer_name = parts[1]

        if layer_name not in MBTILES_FILES:
            self.send_error(404, "Unknown tile layer")
            return

        mbtiles_path = MBTILES_FILES[layer_name]

        if not mbtiles_path.exists():
            self.send_error(404, "MBTiles file not found")
            return

        try:
            z = int(parts[2])
            x = int(parts[3])
            y = int(parts[4][:-4])

            if not (0 <= z <= 22):
                raise ValueError()

            tile_limit = 1 << z

            if not (
                0 <= x < tile_limit
                and 0 <= y < tile_limit
            ):
                raise ValueError()

        except ValueError:
            self.send_error(400, "Invalid tile coordinates")
            return

        # MBTiles uses TMS row numbering.
        # Leaflet requests XYZ row numbering.
        tms_y = (1 << z) - 1 - y

        connection = None

        try:
            connection = sqlite3.connect(
                f"file:{mbtiles_path}?mode=ro",
                uri=True,
                timeout=30
            )

            row = connection.execute(
                """
                SELECT tile_data
                FROM tiles
                WHERE zoom_level = ?
                  AND tile_column = ?
                  AND tile_row = ?
                """,
                (z, x, tms_y)
            ).fetchone()

            connection.close()
            connection = None

            if row is None:
                self.send_error(404, "Tile not found")
                return

            tile_data = row[0]

            self.send_response(200)
            self.send_header(
                "Content-Type",
                "application/x-protobuf"
            )
            self.send_cors_headers()
            self.send_header("Cache-Control", "public, max-age=86400")

            # Tippecanoe commonly stores gzip-compressed PBF tiles.
            if tile_data[:2] == b"\x1f\x8b":
                self.send_header("Content-Encoding", "gzip")

            self.send_header("Content-Length", str(len(tile_data)))
            self.end_headers()
            self.wfile.write(tile_data)

        except Exception as error:
            if connection:
                connection.close()

            print("[Tile Server Error]", error)

            self.send_error(500, "Unable to read tile")

    def log_message(self, format, *args):
        print("[Tile Server]", format % args)


if __name__ == "__main__":

    for name, file_path in MBTILES_FILES.items():
        if not file_path.exists():
            raise FileNotFoundError(
                f"{name} MBTiles file not found: {file_path}"
            )

    print("GIS Vector Tile Server")
    print("----------------------")

    for name in MBTILES_FILES:
        print(
            f"{name}: "
            f"http://localhost:{PORT}/tiles/{name}/{{z}}/{{x}}/{{y}}.pbf"
        )

    print(f"Health: http://localhost:{PORT}/health")
    print("Server running...")

    server = ThreadingHTTPServer((HOST, PORT), TileHandler)
    server.serve_forever()
