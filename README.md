# 🏥 Navjevan - Instant Doorstep Healthcare & Caregiving Platform
> **Certified Nurses, Experienced Caretakers & Licensed Physiotherapists — Delivered to Your Doorstep within 30-45 Minutes.**

---

## 📌 Problem Statement & Solution

### The Core Problem
When patients are frail, elderly, bedridden, recovering from major surgery, or recovering from a stroke, traveling to a crowded hospital or clinic poses severe physical strain, expense, and infection risks:
* Navigating city traffic, ambulance availability, long queues, and stressful hospital OPD environments.
* Traveling to clinics for minor procedures like IV drips, wound dressings, injections, and catheterization.
* Managing daily hygiene, mobility, and dignity for bedridden elderly family members at home.
* Ensuring consistent physiotherapy sessions without the exhausting commute for patients with mobility impairments.

### The Navjevan Solution
**Navjevan** bridges this healthcare access gap by providing **on-demand, instant doorstep delivery of certified clinical and caregiving professionals**:
1. **Professional Nurses**: For sterile clinical procedures (injections, IV saline infusions, post-op dressings, catheter care, 12h/24h ICU at home).
2. **Compassionate Caretakers & Attendants**: For daily hygiene assistance (sponge baths, diaper changes, wheelchair mobility, feeding, dementia care).
3. **Licensed Physiotherapists**: For home-based stroke rehabilitation, orthopedic therapy (knee & back pain), and mobility restoration using portable electrotherapy equipment (TENS/IFT).

---

## ✨ Key Features of the Prototype

1. **⚡ Instant 30-45 Minute Dispatch & Booking Wizard**:
   - An intuitive 4-step booking flow:
     - **Step 1**: Service Category & Specific Procedure selection.
     - **Step 2**: Patient Information, Health Condition, Address & Landmark.
     - **Step 3**: Smart Caregiver Matching (view available nearby specialists with badges, hospital background, ratings, and rates).
     - **Step 4**: Schedule & Payment Confirmation (instant dispatch under 45 mins, Cash on Visit, and UPI/Online options).

2. **🗺️ Live GPS Dispatch & Tracking Simulator**:
   - Immediately activates upon booking confirmation.
   - Real-time animated status stepper (`Booked` ➔ `Assigned` ➔ `On The Way` ➔ `Doorstep Care`).
   - Dynamic ETA countdown timer (e.g. *14 mins away*).
   - Animated route map visualization tracking the specialist towards the patient's home.
   - **4-Digit Doorstep Security OTP** for patient safety upon arrival.
   - One-click **Direct Call** and **WhatsApp Chat** buttons to contact the assigned specialist.

3. **💉 3 Core Healthcare Service Pillars**:
   - **Home Nursing**: IV drip infusion (₹399), post-surgery sterile wound dressing (₹499), urinary catheter care (₹699), 12h day/night shift nurses (₹1,499), 24h critical ICU nurses (₹2,899).
   - **Elderly Care & Attendant**: 12-hour day/night attendant (₹1,100), 24-hour live-in attendant (₹1,900), bedridden hygiene & sponge bath (₹450), dementia/Alzheimer's companion (₹1,300).
   - **Physiotherapy at Home**: Orthopedic & joint pain therapy (₹799), stroke & neuro rehabilitation (₹1,199), post-fracture mobility (₹899), elderly gait balance conditioning (₹749).

4. **💰 Interactive Cost Calculator**:
   - Dynamic calculator with service type, shift duration (per visit, 12-hour, 24-hour), and duration slider (1 to 30 days).
   - Automatically computes bundled package discounts:
     - **7-day package**: 8% savings
     - **15-day package**: 12% savings
     - **30-day monthly plan**: 20% savings
   - "Book With This Estimate" button seamlessly transfers calculated rates into the booking modal.

5. **🛡️ Verified Specialists Directory**:
   - Caregivers with backgrounds from premier healthcare institutions (Apollo, Fortis, Max, Medanta, AIIMS).
   - Identity verified, police background checked, and medical council registered.
   - Filterable by: All, Nurses, Caretakers, and Physiotherapists.

6. **📊 Digital Patient Health Chart & Vitals Tracker**:
   - Provides family members with transparency, even if they are at work or in another city.
   - Live displays for **Blood Pressure (BP)**, **Pulse Rate**, **Oxygen Saturation (SpO2)**, **Blood Sugar**, and **Body Temperature**.
   - Interactive `➕ Log New Vitals` modal allowing visiting nurses to record new vitals directly into the patient's record.

7. **🚨 Emergency 1-Click SOS Dispatch**:
   - Rapid-response modal designed for urgent clinical needs, triggering a priority dispatch alert with estimated 15-20 minute arrival.

8. **🌐 Dual-Language Support (English & Hindi)**:
   - Header toggle allows instant switching between English and हिंदी across all core UI sections for family accessibility.

---

## 🚀 How to Run the Project

### Option 1: Direct in Browser (Zero Setup - 1 Second)
1. Open the project folder `Home HealthCare Service` on your computer.
2. Double-click **`index.html`**.
3. The platform opens immediately in Google Chrome, Microsoft Edge, or any modern web browser.

### Option 2: Local Development Server (Node.js)
If you prefer running it through a local HTTP web server:
```bash
# Navigate to project directory
cd "c:\Users\priyanshu kumar\OneDrive\Desktop\Home HealthCare Service"

# Start server
node server.js
# Or
npm start
```
Then visit: **`http://localhost:3000`** in your browser.

---

## ☁️ Deployment on Vercel

The project is pre-configured with [`vercel.json`](vercel.json) and ready for one-click Vercel deployment:

1. Visit **[vercel.com/new](https://vercel.com/new)**.
2. Sign in with your GitHub account.
3. Import the repository: **`priyanshukr96088-bit/Home-Healthcare-service`**.
4. Click **Deploy**. Vercel will build and assign a permanent live production domain (e.g. `https://home-healthcare-service.vercel.app`) with automatic CI/CD updates on every future `git push`.

---

## 📁 Project Architecture & File Structure

```
Home HealthCare Service/
├── index.html       # Single-Page Application (HTML5, Tailwind CSS, Lucide SVGs, Modals, Responsive Layout)
├── styles.css       # Custom styles, glassmorphism, radar pulse animations, and typography
├── app.js           # Core client-side JavaScript engine (State, Booking Flow, Tracking Simulator, Vitals Logger)
├── server.js        # Zero-dependency Node.js HTTP server for local serving
├── package.json     # Project metadata and run scripts
├── vercel.json      # Production deployment configuration for Vercel
├── .vercelignore    # Files excluded from Vercel production build
├── .gitignore       # Git exclusion rules
└── README.md        # Comprehensive English project documentation
```

---

## 💡 Demo Walkthrough Guide (For Clients & Evaluators)

1. **Test the Instant Booking Wizard**: Click **"Book Instant Care"** in the navigation header or hero section. Complete the 4 steps and click "Confirm Booking".
2. **Watch the Live Tracking Simulator**: Upon booking, observe the animated dispatch progress, live countdown timer, interactive route map, security OTP, and caregiver call/WhatsApp action buttons.
3. **Experiment with the Cost Calculator**: Scroll to the Calculator section, toggle between 12-hour and 24-hour shifts, slide the days slider from 1 to 30 days, and observe dynamic discount calculations.
4. **Log Real-Time Patient Vitals**: Scroll to the Patient Portal section, click **"➕ Log New Vitals"**, enter new BP or oxygen values, and observe the vitals history table update immediately.
5. **Switch Language to Hindi**: Click the **"हिंदी"** button in the header to demonstrate localized accessibility for Indian households.
