import uvicorn
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil
import tempfile
import sys
import static_ffmpeg

static_ffmpeg.add_paths()


# Try to import transformers, handling errors
try:
    from transformers import pipeline
    print("Transformers library imported successfully.")
except ImportError as e:
    print(f"CRITICAL ERROR: Transformers not installed: {e}")
    sys.exit(1)

# Initialize FastAPI app
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables
classifier = None
MODEL_NAME = "dima806/music_genres_classification"

def get_classifier():
    global classifier
    if classifier is None:
        print(f"Initializing model {MODEL_NAME}...")
        try:
            # Load with cpu specifically if no cuda, and print progress
            classifier = pipeline("audio-classification", model=MODEL_NAME)
            print("Model initialized successfully!")
        except Exception as e:
            print(f"Error initializing model: {e}")
            raise e
    return classifier

@app.on_event("startup")
async def startup_event():
    print("Server starting up. Pre-loading model...")
    # Attempt preload, but don't crash startup if it fails (let request handle it)
    try:
        get_classifier()
    except Exception as e:
        print(f"Startup preload failed (will retry on request): {e}")

@app.post("/predict")
async def predict(audio: UploadFile = File(...)):
    print(f"Received prediction request for: {audio.filename}")
    
    if not audio.filename.lower().endswith(('.wav', '.mp3', '.mp4', '.m4a')):
        raise HTTPException(status_code=400, detail="Use .wav, .mp3, or .mp4 files.")
    
    # Create temp file
    suffix = os.path.splitext(audio.filename)[1]
    # Default to .wav if weird suffix
    if not suffix: suffix = ".wav"
        
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp_audio:
        shutil.copyfileobj(audio.file, temp_audio)
        temp_path = temp_audio.name
    
    try:
        print(f"Saved temp file to {temp_path}. Loading model...")
        
        # Get model (lazy load)
        model = get_classifier()
        
        print("Model ready. Running inference...")
        # Run inference
        results = model(temp_path, top_k=None)
        
        print("Inference complete. Processing results...")
        
        # Cleanup
        os.unlink(temp_path)
        
        genre_probs = {}
        for item in results:
            label = item['label'].lower().replace(" ", "_").split("_")[-1]
            genre_probs[label] = float(item['score'])
            
        sorted_res = sorted(results, key=lambda x: x['score'], reverse=True)
        top_genre = sorted_res[0]['label'].lower()
        
        print(f"Success! Top genre: {top_genre}")
        
        return {
            "genre": top_genre,
            "probabilities": genre_probs
        }

    except Exception as e:
        print(f"Prediction logic failed: {e}")
        if os.path.exists(temp_path):
            os.unlink(temp_path)
        raise HTTPException(status_code=500, detail=f"Server Error: {str(e)}")

if __name__ == "__main__":
    # Ensure color logs
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
