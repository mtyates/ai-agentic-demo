import re
import subprocess

from flask import Blueprint, jsonify, request

admin_bp = Blueprint("admin", __name__)


# FIXED: command injection via user-controlled host parameter (VULN-002)
# Now using safe subprocess call without shell=True and input validation
@admin_bp.route("/ping", methods=["GET"])
def ping():
    host = request.args.get("host", "localhost")

    # Validate hostname/IP format to prevent injection
    if not re.match(r'^[a-zA-Z0-9.-]+$', host):
        return jsonify({"error": "Invalid host format"}), 400

    # Safe: using list syntax without shell=True
    try:
        stdout = subprocess.check_output(
            ["echo", f"Pinging: {host}"],
            text=True
        )
    except subprocess.CalledProcessError:
        return jsonify({"error": "Ping failed"}), 500
    return jsonify({"result": stdout.strip(), "host": host})


@admin_bp.route("/status", methods=["GET"])
def status():
    return jsonify(
        {
            "status": "admin panel active",
            "warning": "DEMO ONLY — not a real admin panel",
        }
    )
