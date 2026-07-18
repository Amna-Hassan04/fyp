# Heritage AI — Taxila Museum Intelligent Artifact System
> Final Year Project | Department of Computer Science

---

## Overview

Heritage AI is a full-stack web and augmented reality system built for the **Taxila Museum, Pakistan**. It allows visitors to photograph museum artifacts using their phone camera and receive instant AI-powered identification, historical context, and immersive AR overlays — in both English and Urdu.

The system combines a **CLIP-based visual retrieval engine**, a **Gemini vision gatekeeper**, and an **agentic tour planner** into a single unified platform.

---

## Features

| Feature | Description |
|---|---|
| 🔍 AR Artifact Matcher | Point camera at any exhibit → instant identification |
| 🧠 AI Curator | Upload a photo → get 3 AI-generated historical interpretations |
| 🗺️ Agentic Tour Planner | Describe your trip → get a day-by-day heritage itinerary |
| 🎨 Artifact Visualizer | See how the artifact looked when it was newly made |
| 🏚️ Restoration View | AI-reconstructed view of damaged or eroded artifacts |
| 🗣️ Text-to-Speech | Every interpretation read aloud in natural English |
| 📊 Depth Estimation | MiDaS-powered 3D depth map per artifact |

---

## Dataset — How We Collected the Data

All artifact data was collected **in person** at the Taxila Museum, Pakistan.

### Photography
- Every artifact in the museum was photographed by our team using mobile phone cameras
- Multiple angles captured per artifact: front, side, back, closeup
- Images taken under real museum lighting conditions (no studio setup)
- Total: **391 unique artifacts**, **399 images** across three gallery sections

### Gallery Sections
| Code | Gallery |
|---|---|
| `TAX_L_*` | Large Sculpture Gallery (126 artifacts) |
| `TAX_M_*` | Main Exhibition Hall (35 artifacts) |
| `TAX_R_*` | Relief & Miscellaneous Gallery (109+ artifacts) |

### Metadata
For each artifact we manually recorded:
- Title (English + Urdu)
- Material (stone type, metal, clay, etc.)
- Period / Date
- Religious context (Buddhist, Hindu, secular)
- Section and display location
- Descriptive story / historical significance

### Data Augmentation
Since each artifact had only 2–5 original photos, we used `augment.py` to expand the dataset:
- ±15° rotation
- Perspective warp (simulates off-angle viewing)
- Brightness and contrast variation (museum lighting conditions)
- Motion blur (handheld camera simulation)
- Random crop and zoom

This expanded each artifact's images from ~3 originals to ~30 augmented variants for robust index building.

---

## CLIP Index

We used **OpenCLIP ViT-L/14** (LAION-2B weights) to embed every image:

| Property | Value |
|---|---|
| Model | ViT-L-14 |
| Pretrained on | LAION-2B (laion2b_s32b_b82k) |
| Embedding dimension | 768 |
| Total embeddings | 399 |
| Total artifacts | 391 |
| Matching strategy | Region-selective + MAX cosine similarity |

At query time, the uploaded photo is embedded using the same model and compared against all 399 stored vectors via cosine similarity. The top-3 closest artifacts are returned as candidates.

---

## Two-Stage Detection Pipeline

```
User uploads photo
        ↓
Stage 1 — Gemini Gatekeeper
  Is this an artifact? YES / NO
        ↓ (YES)
Stage 2 — CLIP Matcher
  Compare against 399 embeddings
  Return top-3 candidates with confidence scores
        ↓
Display artifact info, story, material, era
```

If the Gemini gatekeeper is unavailable, the system falls back directly to CLIP and flags the result as unverified.

---

## User Feedback Loop

Every AR match generates a feedback entry logged to `dataset/feedback.jsonl`:

```json
{
  "timestamp": "2026-06-08T16:15:31",
  "predicted_id": "TAX_L_008",
  "correct_id": null,
  "confidence": 79.0,
  "confirmed": true
}
```

- `confirmed: true` — user agreed the match was correct
- `confirmed: false` + `correct_id` — user provided the real artifact ID
- This data can be used to identify weak matches and improve the confidence threshold in future iterations

---

## Tech Stack

**Frontend**
- React + Vite
- Tailwind CSS
- Supabase (auth)

**Backend**
- FastAPI (Python)
- Gemini 2.5 Flash (gatekeeper + curator + tour planner)
- OpenCLIP ViT-L/14 (artifact matching)
- MiDaS Small (depth estimation)
- Pollinations AI (artifact visualization)

**AR Demo**
- HTML5 + WebRTC (live camera)
- FastAPI (same backend, `/ar/*` routes)

---

## Project Structure

```
fyp/
├── frontend/          React app (Vite)
├── backend/           FastAPI server
│   ├── curator/       Gemini-based interpretation
│   ├── detector/      Gatekeeper + CLIP client
│   └── main.py        All API routes
└── AR/
    ├── api/           AR server routes
    ├── scripts/       verify, augment, build_index, evaluate
    ├── dataset/
    │   ├── images_flat/     original photos
    │   ├── augmented/       augmented training images
    │   ├── artifacts.json   metadata for all 391 artifacts
    │   ├── feedback.jsonl   user feedback log
    │   └── visualize_cache/ cached AI illustrations
    └── index/
        ├── embeddings.npy   (399 × 768) float32
        ├── labels.json      artifact ID per embedding
        └── meta.json        index summary
```

---

## Setup

```powershell
# 1. Clone and enter project
cd fyp/AR

# 2. Create and activate venv
python -m venv venv
venv\Scripts\Activate.ps1

# 3. Install dependencies
install.bat

# 4. Verify dataset
python scripts/verify_dataset.py

# 5. Build index (first time only)
python scripts/augment.py --clean
python scripts/build_index.py

# 6. Start server
uvicorn backend.main:app --host 0.0.0.0 --port 8000
```

---

## Evaluation

```powershell
python scripts/evaluate.py
```

Reports Top-1 and Top-3 accuracy across all 391 artifacts.

- **Top-1** — correct artifact was the #1 result
- **Top-3** — correct artifact appeared in the top 3 candidates (effective user-facing accuracy since we show 3 cards)

---

## Important Notes

- We did **not** train or fine-tune the CLIP model. We used pretrained weights from OpenAI/LAION and built a domain-specific retrieval index on top.
- All artifact photographs and metadata were collected by our team with permission from Taxila Museum.
- The feedback system is a proof of concept for a future active learning pipeline.

---

*Built with ❤️ for the preservation of Pakistan's cultural heritage.*
