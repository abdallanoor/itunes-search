# iTunes Podcast Explorer

This project is a fullstack application that allows users to search for podcasts through the **iTunes Search API**, view podcast details, and play episodes.

It consists of two main parts:

- **Frontend**: Next.js, Tailwind CSS, shadcn/ui, TypeScript
- **Backend**: Nest.js, DynamoDB, AWS

## Project Structure

- **backend/**: Nest.js API → Endpoints for podcast and episode search
- **frontend/**: Next.js UI → User interface to display results and play episodes

## Features

- Search podcasts using the **iTunes Search API**.
- Store results in DynamoDB with caching for faster performance.
- View podcast details and episodes.
- Play episodes directly from the frontend.
- Light and dark theme support.

## Quick Start

### Step 1: Clone the Repository

To get started, first clone the project from GitHub and navigate into the directory:

```bash
git clone https://github.com/abdallanoor/itunes-search.git
cd itunes-search
```

### Step 2: Environment Variables

Before running the project, make sure to create a `.env` file in both **backend/** and **frontend/**.
You can copy from the provided examples:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

**Backend (`.env`):**

- AWS credentials (for DynamoDB)

**Frontend (`.env`):**

- API base URL (e.g., `NEXT_PUBLIC_API_URL=http://localhost:3001`)

### Step 3: Backend Setup

```bash
cd backend
npm install
npm run start:dev
```

### Step 4: Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Step 5: Open App

Once both the backend and frontend are running, open your browser and go to:

```bash
http://localhost:3000
```

- Search for podcasts using a keyword.
- Browse episodes and play any episode directly.

## Endpoints

- **GET /api/podcasts?term={keyword}**  
  Fetches podcast search results from the iTunes Search API (with caching in DynamoDB).

- **GET /api/episodes?podcastId=${id}**  
  Returns a list of episodes for the given podcast ID.
