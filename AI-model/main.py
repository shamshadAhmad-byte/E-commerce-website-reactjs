from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import StreamingResponse, JSONResponse
import io, os

app = FastAPI()


@app.post("/tryon")
async def tryon(person: UploadFile = File(None), cloth: UploadFile = File(None)):
    if not person or not cloth:
        raise HTTPException(status_code=400, detail="Both person and cloth images are required")

    img_bytes = await person.read()
    img_io = io.BytesIO(img_bytes)
    img_io.seek(0)

    return StreamingResponse(img_io, media_type=person.content_type or "image/jpeg")


@app.get("/")
def root():
    return {"message": "FastAPI Virtual Try-On API is running"}
