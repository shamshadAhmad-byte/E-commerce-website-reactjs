from flask import Flask, request, send_file, jsonify
import io


app = Flask(__name__)


@app.route("/tryon", methods=["POST"])
def tryon():
    person_img = request.files.get("person")
    cloth_img = request.files.get("cloth")

    if not person_img or not cloth_img:
        return {"error": "Both person and cloth images are required"}, 400

    # TODO: run VITON-HD inference here and return the generated image
    # For now, return the person image back so the Node server can validate end-to-end.

    # Read uploaded bytes and forward as file-like object
    img_bytes = person_img.read()
    img_io = io.BytesIO(img_bytes)
    img_io.seek(0)
    mimetype = person_img.mimetype or "image/jpeg"
    return send_file(img_io, mimetype=mimetype)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)