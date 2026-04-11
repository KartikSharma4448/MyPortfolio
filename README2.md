# Sploink Assessment - Interview Prep (Hinglish + English)

Yeh file interview prep ke liye specially banayi gayi hai.
This file is specially created for interview preparation.

Agar interviewer kuch bhi pooche ya live change karne bole, tum yahan se confidently answer de sakte ho.
If the interviewer asks anything or requests live changes, you can answer confidently from this guide.

## 1) High-Level Summary

Yeh system AI agent activity events ingest karta hai.
This system ingests AI agent activity events.

Yeh noisy stream handle karta hai: duplicates, out-of-order, missing fields, burst traffic.
It handles noisy streams: duplicates, out-of-order events, missing fields, and burst traffic.

Yeh session-wise metrics nikalta hai aur loop, drift, failure detect karta hai.
It computes session-wise metrics and detects loops, drift, and failures.

UI me session list aur detailed timeline dikhayi jati hai.
The UI shows a session list and a detailed timeline.

## 2) 1-Line Interview Intro

Maine FastAPI + SQLite based observability system banaya jo unreliable agent behavior ko detect karke actionable dashboard insights deta hai.
I built a FastAPI + SQLite observability system that detects unreliable agent behavior and shows actionable dashboard insights.

## 3) Architecture - Kya aur Kyu

Backend FastAPI me hai kyunki setup fast hai aur ingestion API clean banti hai.
The backend is in FastAPI because setup is fast and ingestion APIs stay clean.

Storage SQLite + SQLAlchemy hai kyunki 3-4 hour MVP me zero-config persistence chahiye thi.
Storage is SQLite + SQLAlchemy because a 3-4 hour MVP needs zero-config persistence.

Frontend Next.js me minimal monitoring UI ke liye banaya gaya hai.
The frontend is built in Next.js for a minimal monitoring UI.

Simulator Python CLI me hai jo realistic scenarios generate karta hai.
The simulator is a Python CLI that generates realistic scenarios.

## 4) Data Flow (Step by Step)

Step 1: Client ya simulator `POST /events` pe event bhejta hai.
Step 1: The client or simulator sends an event to `POST /events`.

Step 2: Backend payload normalize karta hai (missing fields ko safe defaults milte hain).
Step 2: The backend normalizes the payload (missing fields get safe defaults).

Step 3: Dedup hash banta hai aur duplicate event skip ho jata hai.
Step 3: A dedup hash is computed and duplicate events are skipped.

Step 4: Event SQLite me store hota hai.
Step 4: The event is stored in SQLite.

Step 5: Session read karte waqt events ordered timeline me nikle jate hain.
Step 5: While reading a session, events are returned in ordered timeline form.

Step 6: Metrics aur detectors run hote hain.
Step 6: Metrics and detectors are executed.

Step 7: UI session summary aur details render karti hai.
Step 7: The UI renders session summaries and details.

## 5) Edge Cases - Exact Handling

Duplicate event ke liye unique dedup hash use hua hai.
A unique dedup hash is used for duplicate events.

Out-of-order events reject nahi hote, read-time ordering hoti hai.
Out-of-order events are not rejected; ordering is done at read time.

Missing fields ko `unknown` ya default values milti hain.
Missing fields are assigned `unknown` or other default values.

Duplicate step numbers allowed hain, step ko unique key treat nahi kiya.
Duplicate step numbers are allowed, and step is not treated as a unique key.

Mixed session streams session_id ke basis par isolate hote hain.
Mixed session streams are isolated by session_id.

## 6) Detection Logic - Interview Ready

### Loop Detection

Naive exact string match nahi use kiya gaya.
Naive exact string matching is not used.

Recent window me same-action events ka semantic similarity compare hota hai.
Semantic similarity is compared for same-action events in a recent window.

`difflib.SequenceMatcher` se input/output similarity nikalti hai.
Input/output similarity is measured using `difflib.SequenceMatcher`.

Similar retries accumulate hone par loop confidence badhta hai.
Loop confidence increases when similar retries accumulate.

### Drift Detection

Drift ka matlab behavior direction change, sirf text change nahi.
Drift means behavior direction change, not just text change.

Previous window aur recent window ka action distribution compare hota hai.
Action distribution is compared between previous and recent windows.

Entropy drop + action dominance se drift detect hota hai.
Drift is detected using entropy drop plus action dominance.

### Failure Detection

Consecutive failures, recent failure velocity, aur overall failure rate teenon check hote hain.
Consecutive failures, recent failure velocity, and overall failure rate are all checked.

Isse transient one-off error aur actual unstable behavior me difference milta hai.
This separates transient one-off errors from actually unstable behavior.

## 7) UI Explanation

Session List me session_id, status, total events, failure rate, issue count dikhte hain.
Session List shows session_id, status, total events, failure rate, and issue count.

Session Detail me ordered timeline, metadata, detected issues, confidence dikhte hain.
Session Detail shows ordered timeline, metadata, detected issues, and confidence.

Timestamp ab local timezone me correctly render hota hai.
Timestamps now render correctly in local timezone.

## 8) Time Bug - Kaise Fix Kiya

Problem yeh thi ki backend seconds bhej raha tha aur UI milliseconds assume kar rahi thi.
The problem was that backend sent seconds while the UI assumed milliseconds.

Fix me condition lagayi: agar timestamp `< 1e12` ho to `* 1000`.
The fix adds a condition: if timestamp is `< 1e12`, multiply by `1000`.

Ab date-time display sahi aa raha hai.
Now the date-time display is correct.

## 9) Trade-offs (Honest Interview Answer)

SQLite speed aur simplicity ke liye choose kiya, production scale pe Postgres better hota.
SQLite was chosen for speed and simplicity; Postgres would be better at production scale.

Polling use hua, websocket nahi, kyunki time-boxed MVP tha.
Polling is used instead of websockets because this was a time-boxed MVP.

Worker queue full-scale setup nahi kiya, but architecture extendable hai.
A full worker queue setup is not included, but the architecture is extendable.

Backend tests add kiye gaye, full browser E2E suite nahi banayi gayi.
Backend tests were added, but a full browser E2E suite was not built.

## 10) Live Coding me Agar Change Bolen

Loop sensitivity change: `backend/processor.py` me loop confidence threshold tune karo.
To change loop sensitivity: tune loop confidence threshold in `backend/processor.py`.

Drift sensitivity change: drift me entropy/dominance threshold adjust karo.
To change drift sensitivity: adjust entropy/dominance thresholds in drift logic.

Failure alert jaldi chahiye: consecutive count ya velocity window lower karo.
For earlier failure alerts: reduce consecutive count or velocity window.

Naya action add karna ho: simulator + detector + UI distribution mapping update karo.
To add a new action: update simulator + detector + UI distribution mapping.

## 11) Command Cheat Sheet

Backend chalane ke commands:
Commands to run backend:

```powershell
python -m venv .venv
.\.venv\Scripts\activate
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

Frontend chalane ke commands:
Commands to run frontend:

```powershell
npm install
$env:NEXT_PUBLIC_API_BASE="http://127.0.0.1:8000"
npm run dev
```

Backend tests run karne ka command:
Command to run backend tests:

```powershell
pytest backend/tests
```

Simulator chalane ke commands:
Commands to run simulator:

```powershell
python simulator/agent.py --scenario normal
python simulator/agent.py --scenario loop
python simulator/agent.py --scenario drift --sessions 4 --steps 20
python simulator/agent.py --scenario failure --burst-ms 2
```

## 12) Rapid Q&A (Direct Answer Style)

Q: Loop me exact string matching kyu nahi?
Q: Why not exact string matching for loop detection?

A: Prompt variations ke bawajood same behavior capture karna tha, isliye semantic similarity use ki.
A: We needed to capture repeated behavior despite prompt variations, so semantic similarity was used.

Q: Out-of-order events kaise handle hue?
Q: How are out-of-order events handled?

A: Ingestion reject nahi karta; timeline query level pe ordered reconstruct hoti hai.
A: Ingestion does not reject them; timeline is reconstructed in order at query time.

Q: Duplicate steps kaise handle hue?
Q: How are duplicate steps handled?

A: Step unique key nahi hai; dedup full payload hash par based hai.
A: Step is not a unique key; dedup is based on full payload hash.

Q: Production upgrade path kya hoga?
Q: What is the production upgrade path?

A: Postgres, queue worker, websocket updates, auth/rate-limits, tracing.
A: Postgres, queue workers, websocket updates, auth/rate-limits, and tracing.

## 13) 60-Second Pitch

Maine ek practical observability MVP build kiya jo noisy agent event streams ko ingest, normalize, deduplicate, aur session timeline me reconstruct karta hai.
I built a practical observability MVP that ingests, normalizes, deduplicates, and reconstructs noisy agent event streams into session timelines.

System session metrics nikalta hai aur loop, drift, failure heuristics run karke clear status deta hai.
The system computes session metrics and runs loop, drift, and failure heuristics to provide clear status.

Simulator realistic noisy scenarios generate karta hai aur UI debugging ke liye fast visibility deta hai.
The simulator generates realistic noisy scenarios and the UI provides fast visibility for debugging.

Design intentionally reliability + explainability pe focus karta hai within a tight 3-4 hour build window.
The design intentionally focuses on reliability and explainability within a tight 3-4 hour build window.
