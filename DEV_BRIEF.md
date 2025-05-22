# Developer Brief: Meta Ad Fatigue Calculator

## Overview

**Project Name:** Meta Ad Fatigue Calculator
**Type:** Internal Tool / Web App
**Stack:** React + Vite + Tailwind CSS

---

## Objective

Build a responsive, single-page web app that allows users to:

1. Input Meta ad performance metrics.
2. Calculate an "Ad Fatigue Index" based on those metrics.
3. Receive a clear fatigue level classification and recommendation.
4. Optionally submit an email address to receive a copy of the results.

---

## Page Structure

### 1. Header (Top Nav)

* **Left:** App logo or name
* **Right:** User/Org dropdown and profile circle
* **Tabs:** `Dashboard`, `Projects`, `Albums`, `Brand`, `Admin` (inactive sections for visual continuity)

### 2. Main Module

Panel title: **"Ad Fatigue Calculator"**

Form layout styled as a panel card with the following fields:

#### Inputs:

* `Frequency` (number)
* `CTR` – Click-Through Rate (percentage)
* `CPR` – Cost Per Result (currency)
* `Conversion Rate` (percentage)
* `Campaign Duration` (days)
* `Audience Size` (number)
* `Email` (optional string, validated)

#### Action:

* **Button:** `Calculate Fatigue` (Tailwind green-500, full-width, hover: brightness/scale)

---

## Fatigue Index Logic

Use client-side JS logic to calculate the **Fatigue Index (0–11+)**.

### Fatigue Scoring Table

| Metric              | Rule                                    | Points |
| ------------------- | --------------------------------------- | ------ |
| Frequency           | >4 = 3, 3–4 = 2, 2–3 = 1, ≤2 = 0        | 0–3    |
| CTR                 | <1.5% = 2, ≥1.5% = 0                    | 0–2    |
| CPR                 | >20% increase = 2, 10–20% = 1, ≤10% = 0 | 0–2    |
| Conversion Rate     | >15% drop = 2, 5–15% = 1, ≤5% = 0       | 0–2    |
| Campaign Duration   | >14 days = 2, 8–14 = 1, ≤7 = 0          | 0–2    |
| Audience Saturation | Small + high frequency = 2, else = 0    | 0–2    |

### Total Score → Fatigue Level

* 0–3 → **Low**
* 4–6 → **Moderate**
* 7–10 → **High**
* 11+ → **Critical**

---

## Output Section

After calculation, display results in a styled result box:

* **Fatigue Index:** Numerical score (bold)
* **Fatigue Level:** Label (Low/Moderate/High/Critical) with color indication
* **Recommendation:** Dynamic text based on level

  * Low: Maintain strategy
  * Moderate: Refresh creatives or tweak targeting
  * High: Replace creatives, broaden audience
  * Critical: Pause campaign and overhaul approach

Optionally allow:

* **Download as PDF (future enhancement)**
* **Send results to email (via backend API or stub)**

---

## Email Submission

* **Validation:** Basic email regex
* **UX:** Disable button on empty email, show confirmation after submission

---

## Technical Details

### Frontend

* **Framework:** React + Vite
* **Styling:** Tailwind CSS
* **Form State:** React state or useForm (lightweight)
* **Dark Mode:** Always on (as in reference)
* **Responsive:** Tailwind's mobile-first utilities

### Backend (Optional if email delivery is enabled)

* **Stack:** Node.js/Express or Python/FastAPI
* **Service:** SendGrid or Mailgun API
* **Payload:** Send user input and generated result

---

## Security & Compliance

* Do not store or share emails unless explicitly opted-in
* Secure all input handling (HTML sanitization, basic validation)

---

## Future Enhancements

* Meta Ads API integration for real-time metric fetching
* Save reports to user account or dashboard
* Editable benchmarks and custom metric thresholds

---
