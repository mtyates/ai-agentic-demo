from flask import Blueprint, jsonify, request

admin_bp = Blueprint("admin", __name__)

_ALLOWED_HOSTS = {"localhost", "127.0.0.1"}


@admin_bp.route("/ping", methods=["GET"])
def ping():
    host = request.args.get("host", "localhost")
    if host not in _ALLOWED_HOSTS:
        return jsonify({"error": "Invalid host"}), 400
    return jsonify({"result": f"Pinging: {host}", "host": host})


@admin_bp.route("/status", methods=["GET"])
def status():
    return jsonify(
        {
            "status": "admin panel active",
            "warning": "DEMO ONLY — not a real admin panel",
        }
    )
