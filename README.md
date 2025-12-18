# Music Genre AI

A full-stack web application that predicts music genres from audio files using a deep learning model.

## Features
-   **Audio Classification**: Upload `.wav`, `.mp3`, or `.mp4` files to classify their genre.
-   **Spotify Integration**: Get acurated Spotify playlist recommendation based on the predicted genre.
-   **Responsive UI**: Modern, dark-themed interface built with React and Tailwind CSS.
-   **Guest Access**: Try the classifier instantly without creating an account.
-   **History & Analytics**: (Authenticated) Track your prediction history and view usage stats.

## Tech Stack
-   **Frontend**: React, Vite, Tailwind CSS
-   **Backend**: Python (FastAPI), Convex (Database & Auth)
-   **AI Model**: [dima806/music_genres_classification](https://huggingface.co/dima806/music_genres_classification) (Hugging Face)
-   **Audio Processing**: Librosa, FFmpeg (via static-ffmpeg)

## Setup & Installation

### Prerequisites
-   Node.js (v18+)
-   Python (v3.8+)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd music_genre_classification_app
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
pip install -r backend/requirements.txt
```

### 4. Run the Application
Start both the frontend and backend servers with a single command:
```bash
npm run dev
```

-   **Frontend**: [http://localhost:5174](http://localhost:5174)
-   **Backend**: [http://localhost:8000](http://localhost:8000)

## Project Structure
-   `/src`: Frontend React application
-   `/backend`: Python FastAPI server for audio analysis
-   `/convex`: Database schema and server-side functions

## License
MIT
