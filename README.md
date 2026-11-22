# American Legion Post 20 Web App

A mobile-friendly web app for American Legion Post 20, built with Vue 3, Vuetify, and FastAPI. The current prototype includes a home page, navigation, and a veteran resources page with ZIP code search.

## Run locally

Install Node.js, npm, and Python. Clone the repository, then open two terminals at the repository root.

**Terminal 1 — FastAPI backend**

```sh
cd backend
python -m venv .venv
```

Activate the environment with `.\.venv\Scripts\Activate.ps1` in Windows PowerShell or `source .venv/bin/activate` on macOS/Linux. Then run:

```sh
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload
```

**Terminal 2 — Vue frontend**

```sh
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite. Keep both terminals running while testing.

## Test the prototype

- Open `http://127.0.0.1:8000/docs` and confirm the FastAPI documentation loads.
- From the home page, open Resources and search for a ZIP code covered by the prototype. Confirm the expected resources appear.
- Switch to a phone-sized browser window and use the navigation to return home.
