/**
 * CareAtHome - Interactive Prototype Application Logic
 * Instant Home HealthCare Service (Nurses, Caretakers, Physiotherapists)
 */

// Application State
const state = {
  currentLang: 'en',
  currentCity: 'Delhi NCR',
  activeTab: 'all',
  caregiversFilter: 'all',
  activeBookings: [],
  currentBookingStep: 1,
  selectedService: 'nursing',
  selectedProcedure: 'iv-injection',
  selectedCaregiverId: null,
  activeTrackingBooking: null,
  trackingInterval: null,
  patientVitals: [
    { date: 'Today, 10:30 AM', bp: '122/80', pulse: '74 bpm', spo2: '98%', sugar: '114 mg/dL', temp: '98.4°F', nurse: 'Sister Sunita M.' },
    { date: 'Yesterday, 06:30 PM', bp: '126/84', pulse: '78 bpm', spo2: '97%', sugar: '138 mg/dL', temp: '98.6°F', nurse: 'Sister Sunita M.' },
    { date: 'Yesterday, 10:00 AM', bp: '130/88', pulse: '82 bpm', spo2: '96%', sugar: '145 mg/dL', temp: '99.1°F', nurse: 'Sister Sunita M.' }
  ]
};

// Available Caregivers Mock Database
const caregiversData = [
  {
    id: 'cg-1',
    name: 'Sister Sunita Sharma',
    category: 'nursing',
    roleEn: 'Critical Care & Senior Home Nurse (GNM)',
    roleHi: 'क्रिटिकल केयर एवं सीनियर होम नर्स',
    experience: '7+ Years Experience',
    hospitalExp: 'Ex-Apollo & Fortis Hospital',
    rating: 4.95,
    reviews: 142,
    badge: 'Verified Specialist',
    photo: 'https://images.unsplash.com/photo-1594824813583-3631f4a9ce8e?auto=format&fit=crop&q=80&w=350',
    distance: '1.4 km away (15 min ETA)',
    ratePerHour: 499,
    ratePerShift12h: 1500,
    specialties: ['IV & Injections', 'Wound Dressing', 'Post-Op Care', 'Catheterization', 'ICU Protocol'],
    languages: 'Hindi, English',
    isAvailable: true
  },
  {
    id: 'cg-2',
    name: 'Dr. Rahul Mishra (PT)',
    category: 'physio',
    roleEn: 'Consultant Neuro & Ortho Physiotherapist (BPT, MPT)',
    roleHi: 'कंसल्टेंट न्यूरो एवं ऑर्थो फिजियोथेरेपिस्ट',
    experience: '8+ Years Experience',
    hospitalExp: 'Ex-Max Super Speciality Hospital',
    rating: 4.98,
    reviews: 198,
    badge: 'Top Rated Physio',
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=350',
    distance: '2.1 km away (22 min ETA)',
    ratePerHour: 799,
    ratePerShift12h: 2200,
    specialties: ['Stroke Rehab', 'Knee & Back Pain', 'Post-Fracture Mobility', 'TENS/IFT Therapy'],
    languages: 'Hindi, English',
    isAvailable: true
  },
  {
    id: 'cg-3',
    name: 'Rameshwar Yadav',
    category: 'caretaker',
    roleEn: 'Certified Male Geriatric Caretaker & Attendant',
    roleHi: 'सर्टिफाइड मेल केयरटेकर एवं बुजुर्ग देखभाल अटेंडेंट',
    experience: '5+ Years Experience',
    hospitalExp: 'Certified by National Skill Healthcare Council',
    rating: 4.88,
    reviews: 86,
    badge: 'Police Verified',
    photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=350',
    distance: '1.8 km away (18 min ETA)',
    ratePerHour: 299,
    ratePerShift12h: 1100,
    specialties: ['Bedridden Patient Care', 'Sponge Bath & Hygiene', 'Feeding & Mobility', 'Medication Help'],
    languages: 'Hindi',
    isAvailable: true
  },
  {
    id: 'cg-4',
    name: 'Sister Anita Verma',
    category: 'nursing',
    roleEn: 'Registered General Nurse (B.Sc Nursing)',
    roleHi: 'रजिस्टर्ड जनरल होम नर्स',
    experience: '6+ Years Experience',
    hospitalExp: 'Ex-Medanta Hospital',
    rating: 4.92,
    reviews: 116,
    badge: 'Verified Specialist',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=350',
    distance: '2.8 km away (25 min ETA)',
    ratePerHour: 450,
    ratePerShift12h: 1400,
    specialties: ['Bed Sore Management', 'Ryle Tube Feeding', 'Chemo Port Dressing', 'Oxygen Management'],
    languages: 'Hindi, English, Punjabi',
    isAvailable: true
  },
  {
    id: 'cg-5',
    name: 'Geeta Devi',
    category: 'caretaker',
    roleEn: 'Compassionate Female Attendant & Mother/Elder Care',
    roleHi: 'अनुभवी महिला अटेंडेंट एवं मातृत्व/वृद्ध देखभाल',
    experience: '6+ Years Experience',
    hospitalExp: 'Home Healthcare Certified',
    rating: 4.91,
    reviews: 129,
    badge: 'Police Verified',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=350',
    distance: '3.2 km away (30 min ETA)',
    ratePerHour: 320,
    ratePerShift12h: 1150,
    specialties: ['Dementia Care', 'Post-Op Assistance', 'Daily Hygiene & Bath', 'Emotional Companionship'],
    languages: 'Hindi',
    isAvailable: true
  },
  {
    id: 'cg-6',
    name: 'Dr. Priya Nair (PT)',
    category: 'physio',
    roleEn: 'Specialist Musculoskeletal & Geriatric Physio (BPT)',
    roleHi: 'सीनियर फिजियोथेरेपिस्ट (स्पाइन व जॉइंट स्पेशलिस्ट)',
    experience: '5+ Years Experience',
    hospitalExp: 'Ex-Manipal Hospital',
    rating: 4.94,
    reviews: 94,
    badge: 'Top Rated Physio',
    photo: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=350',
    distance: '3.5 km away (30 min ETA)',
    ratePerHour: 750,
    ratePerShift12h: 2100,
    specialties: ['Paralysis Recovery', 'Cervical Spondylosis', 'Knee Replacement Rehab', 'Pelvic Care'],
    languages: 'Hindi, English, Malayalam',
    isAvailable: true
  }
];

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
  loadSavedBookings();
  renderCaregivers();
  renderActiveBookingsList();
  setupEventListeners();
  updateCalculator();

  // If no bookings exist, insert a realistic default demo booking
  if (state.activeBookings.length === 0) {
    const demoBooking = {
      id: 'CAH-92841',
      serviceType: 'nursing',
      procedureName: 'IV Drip & Post-Op Dressing',
      patientName: 'Ramesh Chandra (Age 68)',
      phone: '+91 98765 43210',
      address: 'Flat 402, Lotus Tower, Sector 62',
      landmark: 'Near Fortis Hospital',
      city: 'Delhi NCR',
      caregiver: caregiversData[0], // Sister Sunita
      status: 'on_the_way', // 'confirmed', 'assigned', 'on_the_way', 'arrived', 'completed'
      etaMinutes: 14,
      otp: '7492',
      bookingTime: new Date(Date.now() - 1000 * 60 * 16).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      amount: 499,
      paymentMethod: 'Cash on Visit'
    };
    state.activeBookings.push(demoBooking);
    saveBookings();
    renderActiveBookingsList();
  }
});

// Save & Load Bookings in LocalStorage
function saveBookings() {
  try {
    localStorage.setItem('cah_bookings', JSON.stringify(state.activeBookings));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
}

function loadSavedBookings() {
  try {
    const data = localStorage.getItem('cah_bookings');
    if (data) {
      state.activeBookings = JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to read from localStorage', e);
  }
}

// Render Caregivers Cards
function renderCaregivers(filter = 'all') {
  const container = document.getElementById('caregivers-grid');
  if (!container) return;

  const filtered = filter === 'all' 
    ? caregiversData 
    : caregiversData.filter(cg => cg.category === filter);

  container.innerHTML = filtered.map(cg => {
    const role = state.currentLang === 'hi' ? cg.roleHi : cg.roleEn;
    const categoryBadge = cg.category === 'nursing' 
      ? '<span class="bg-teal-100 text-teal-800 text-xs px-2.5 py-0.5 rounded-full font-semibold">Nurse</span>'
      : cg.category === 'physio'
      ? '<span class="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full font-semibold">Physiotherapist</span>'
      : '<span class="bg-amber-100 text-amber-800 text-xs px-2.5 py-0.5 rounded-full font-semibold">Caretaker</span>';

    return `
      <div class="glass-card rounded-2xl p-5 border border-slate-100 glass-card-hover flex flex-col justify-between">
        <div>
          <div class="flex items-start gap-4 mb-4">
            <div class="relative flex-shrink-0">
              <img src="${cg.photo}" alt="${cg.name}" class="w-16 h-16 rounded-2xl object-cover border-2 border-teal-500/20 shadow-sm">
              <span class="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" title="Active & Available"></span>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-1">
                <h4 class="font-bold text-slate-900 text-base truncate">${cg.name}</h4>
                ${categoryBadge}
              </div>
              <p class="text-xs text-slate-500 font-medium line-clamp-1 mt-0.5">${role}</p>
              <div class="flex items-center gap-2 mt-1.5 text-xs text-slate-600">
                <span class="flex items-center text-amber-500 font-bold">
                  ★ ${cg.rating} <span class="text-slate-400 font-normal ml-0.5">(${cg.reviews})</span>
                </span>
                <span class="text-slate-300">•</span>
                <span class="text-emerald-600 font-medium">${cg.experience}</span>
              </div>
            </div>
          </div>

          <div class="bg-slate-50 rounded-xl p-2.5 mb-3 text-xs text-slate-600 flex items-center justify-between">
            <span class="flex items-center gap-1.5">
              <span class="text-teal-600 font-semibold">📍 ${cg.distance}</span>
            </span>
            <span class="bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-700 font-medium text-[11px]">
              🛡️ ${cg.badge}
            </span>
          </div>

          <div class="mb-4">
            <div class="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1.5">Expertise</div>
            <div class="flex flex-wrap gap-1.5">
              ${cg.specialties.map(spec => `
                <span class="bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 text-[11px] px-2 py-0.5 rounded-md transition-colors">
                  ${spec}
                </span>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span class="text-xs text-slate-400 block">From</span>
            <span class="text-lg font-bold text-slate-900">₹${cg.ratePerHour}</span>
            <span class="text-xs text-slate-500">/visit</span>
          </div>
          <button 
            onclick="openBookingWithCaregiver('${cg.id}')"
            class="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1.5">
            <span>Book Now</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Interactive Cost Calculator
function updateCalculator() {
  const service = document.querySelector('input[name="calc_service"]:checked')?.value || 'nursing';
  const durationDays = parseInt(document.getElementById('calc-duration-slider')?.value || '7', 10);
  const shiftType = document.querySelector('input[name="calc_shift"]:checked')?.value || 'visit';

  document.getElementById('calc-days-display').innerText = `${durationDays} ${durationDays === 1 ? 'Day' : 'Days'}`;

  // Base pricing matrix
  let baseDailyRate = 0;
  if (service === 'nursing') {
    if (shiftType === 'visit') baseDailyRate = 499; // 1-2 hour visit for injection/dressing
    else if (shiftType === '12hr') baseDailyRate = 1500; // 12-hour day/night nurse
    else if (shiftType === '24hr') baseDailyRate = 2800; // 24-hour round-the-clock nurse
  } else if (service === 'physio') {
    if (shiftType === 'visit') baseDailyRate = 799; // 1 hour therapy session
    else if (shiftType === '12hr') baseDailyRate = 1800; // intensive daily rehab
    else if (shiftType === '24hr') baseDailyRate = 2999;
  } else if (service === 'caretaker') {
    if (shiftType === 'visit') baseDailyRate = 399; // quick assistance
    else if (shiftType === '12hr') baseDailyRate = 1100; // 12-hour day attendant
    else if (shiftType === '24hr') baseDailyRate = 1900; // 24-hour full stay attendant
  }

  // Calculate discounts for longer commitments
  let discountPercent = 0;
  if (durationDays >= 30) discountPercent = 20; // 20% off monthly plans
  else if (durationDays >= 15) discountPercent = 12; // 12% off fortnight plans
  else if (durationDays >= 7) discountPercent = 8; // 8% off weekly plans

  const rawTotal = baseDailyRate * durationDays;
  const discountAmount = Math.round((rawTotal * discountPercent) / 100);
  const finalTotal = rawTotal - discountAmount;

  // Update DOM displays
  const rateDisplay = document.getElementById('calc-daily-rate');
  const discountBadge = document.getElementById('calc-discount-badge');
  const totalDisplay = document.getElementById('calc-total-amount');
  const savingsDisplay = document.getElementById('calc-savings-note');

  if (rateDisplay) rateDisplay.innerText = `₹${baseDailyRate.toLocaleString('en-IN')}`;
  if (totalDisplay) totalDisplay.innerText = `₹${finalTotal.toLocaleString('en-IN')}`;

  if (discountBadge && savingsDisplay) {
    if (discountPercent > 0) {
      discountBadge.classList.remove('hidden');
      discountBadge.innerText = `${discountPercent}% Plan Discount Applied`;
      savingsDisplay.innerText = `You save ₹${discountAmount.toLocaleString('en-IN')} on this multi-day package!`;
      savingsDisplay.classList.remove('hidden');
    } else {
      discountBadge.classList.add('hidden');
      savingsDisplay.classList.add('hidden');
    }
  }
}

// Booking Wizard Logic
function openBookingModal(defaultService = 'nursing', defaultProcedure = null) {
  state.currentBookingStep = 1;
  state.selectedService = defaultService;
  
  const modal = document.getElementById('booking-modal');
  if (!modal) return;

  // Pre-select service tab
  const serviceRadio = document.querySelector(`input[name="book_service"][value="${defaultService}"]`);
  if (serviceRadio) serviceRadio.checked = true;

  updateBookingProceduresList(defaultService);
  if (defaultProcedure) {
    const procSelect = document.getElementById('booking-procedure-select');
    if (procSelect) procSelect.value = defaultProcedure;
  }

  showBookingStep(1);
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function openBookingWithCaregiver(caregiverId) {
  const caregiver = caregiversData.find(c => c.id === caregiverId);
  if (!caregiver) return;

  state.selectedCaregiverId = caregiverId;
  openBookingModal(caregiver.category);

  // Pre-select caregiver in step 3
  setTimeout(() => {
    state.currentBookingStep = 3;
    showBookingStep(3);
  }, 100);
}

function closeBookingModal() {
  const modal = document.getElementById('booking-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

function updateBookingProceduresList(serviceType) {
  const select = document.getElementById('booking-procedure-select');
  if (!select) return;

  const procedures = {
    nursing: [
      { id: 'iv-injection', name: 'IV Drip Infusion & Injections (₹399)', price: 399 },
      { id: 'wound-dressing', name: 'Wound Dressing & Bed Sore Care (₹499)', price: 499 },
      { id: 'catheter-care', name: 'Urinary Catheter Insertion / Removal (₹699)', price: 699 },
      { id: 'vital-check', name: 'Comprehensive Vitals & Health Checkup (₹299)', price: 299 },
      { id: 'post-op-12hr', name: '12-Hour Dedicated Post-Surgery Nurse (₹1,499)', price: 1499 },
      { id: 'icu-24hr', name: '24-Hour Critical Care ICU Nurse at Home (₹2,899)', price: 2899 }
    ],
    caretaker: [
      { id: 'elderly-12hr', name: '12-Hour Elderly Care & Hygiene Attendant (₹1,100)', price: 1100 },
      { id: 'elderly-24hr', name: '24-Hour Live-in Patient Attendant (₹1,900)', price: 1900 },
      { id: 'bedridden-care', name: 'Bedridden Patient Sponge Bath & Turning (₹450)', price: 450 },
      { id: 'dementia-care', name: 'Dementia / Alzheimer Specialist Attendant (₹1,300)', price: 1300 },
      { id: 'hospital-discharge', name: 'Post-Hospital Discharge Home Caretaker (₹1,200)', price: 1200 }
    ],
    physio: [
      { id: 'ortho-physio', name: 'Knee, Joint & Back Pain Therapy (₹799)', price: 799 },
      { id: 'stroke-rehab', name: 'Stroke & Paralysis Rehabilitation Session (₹1,199)', price: 1199 },
      { id: 'post-fracture', name: 'Post-Fracture / Knee Surgery Mobilization (₹899)', price: 899 },
      { id: 'geriatric-balance', name: 'Elderly Fall Prevention & Gait Training (₹749)', price: 749 },
      { id: 'chest-physio', name: 'Chest Physiotherapy & Sputum Clearance (₹849)', price: 849 }
    ]
  };

  const list = procedures[serviceType] || procedures.nursing;
  select.innerHTML = list.map(item => `
    <option value="${item.id}" data-price="${item.price}">${item.name}</option>
  `).join('');
}

function showBookingStep(step) {
  state.currentBookingStep = step;

  // Update step indicators
  for (let i = 1; i <= 4; i++) {
    const indicator = document.getElementById(`step-indicator-${i}`);
    const line = document.getElementById(`step-line-${i}`);
    if (indicator) {
      if (i < step) {
        indicator.className = 'w-8 h-8 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-xs';
        indicator.innerHTML = '✓';
      } else if (i === step) {
        indicator.className = 'w-8 h-8 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-xs shadow-md shadow-teal-500/30 ring-4 ring-teal-100';
        indicator.innerHTML = `${i}`;
      } else {
        indicator.className = 'w-8 h-8 rounded-full bg-slate-200 text-slate-500 font-medium flex items-center justify-center text-xs';
        indicator.innerHTML = `${i}`;
      }
    }
    if (line) {
      line.className = i < step ? 'flex-1 h-1 bg-emerald-500 rounded' : 'flex-1 h-1 bg-slate-200 rounded';
    }

    const stepSection = document.getElementById(`booking-step-content-${i}`);
    if (stepSection) {
      if (i === step) {
        stepSection.classList.remove('hidden');
      } else {
        stepSection.classList.add('hidden');
      }
    }
  }

  // Hook for Step 3: Populate caregivers matching the selected service
  if (step === 3) {
    populateStep3Caregivers();
  }

  // Hook for Step 4: Populate review & cost breakdown
  if (step === 4) {
    populateStep4Summary();
  }
}

function nextBookingStep() {
  const current = state.currentBookingStep;

  // Validation
  if (current === 1) {
    const service = document.querySelector('input[name="book_service"]:checked')?.value;
    state.selectedService = service || 'nursing';
    showBookingStep(2);
  } else if (current === 2) {
    const name = document.getElementById('patient-name-input')?.value.trim();
    const phone = document.getElementById('patient-phone-input')?.value.trim();
    const address = document.getElementById('patient-address-input')?.value.trim();

    if (!name || !phone || !address) {
      showToast('⚠️ Please fill in Patient Name, Mobile Number, and Address.', 'warning');
      return;
    }
    showBookingStep(3);
  } else if (current === 3) {
    // Caregiver chosen or auto-match
    showBookingStep(4);
  } else if (current === 4) {
    confirmBooking();
  }
}

function prevBookingStep() {
  if (state.currentBookingStep > 1) {
    showBookingStep(state.currentBookingStep - 1);
  }
}

function populateStep3Caregivers() {
  const container = document.getElementById('step3-caregivers-list');
  if (!container) return;

  const relevant = caregiversData.filter(cg => cg.category === state.selectedService);

  container.innerHTML = `
    <div class="mb-3 p-3 bg-teal-50 border border-teal-200 rounded-xl flex items-center gap-3">
      <div class="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-sm">⚡</div>
      <div class="text-xs text-teal-900">
        <span class="font-bold">Smart Auto-Match Enabled:</span> We have pre-selected the nearest certified specialist with the highest rating for your address.
      </div>
    </div>
    <div class="space-y-2.5 max-h-64 overflow-y-auto pr-1">
      ${relevant.map((cg, idx) => `
        <label class="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-teal-400 bg-white cursor-pointer transition-all has-[:checked]:border-teal-600 has-[:checked]:bg-teal-50/40">
          <input type="radio" name="selected_caregiver" value="${cg.id}" ${idx === 0 ? 'checked' : ''} class="w-4 h-4 text-teal-600 focus:ring-teal-500">
          <img src="${cg.photo}" alt="${cg.name}" class="w-12 h-12 rounded-xl object-cover border border-slate-200">
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <h5 class="text-sm font-bold text-slate-900 truncate">${cg.name}</h5>
              <span class="text-xs font-semibold text-teal-700 bg-teal-100 px-2 py-0.5 rounded">₹${cg.ratePerHour}/visit</span>
            </div>
            <p class="text-[11px] text-slate-500 line-clamp-1">${cg.experience} • ${cg.hospitalExp}</p>
            <div class="flex items-center gap-2 mt-0.5 text-[11px]">
              <span class="text-amber-500 font-bold">★ ${cg.rating}</span>
              <span class="text-slate-400">•</span>
              <span class="text-emerald-600 font-semibold">📍 ${cg.distance}</span>
            </div>
          </div>
        </label>
      `).join('')}
    </div>
  `;
}

function populateStep4Summary() {
  const patientName = document.getElementById('patient-name-input')?.value.trim() || 'Patient';
  const address = document.getElementById('patient-address-input')?.value.trim() || 'Home Address';
  const procSelect = document.getElementById('booking-procedure-select');
  const procName = procSelect ? procSelect.options[procSelect.selectedIndex].text : 'Home Visit Service';
  
  const selectedCgId = document.querySelector('input[name="selected_caregiver"]:checked')?.value;
  const caregiver = caregiversData.find(c => c.id === selectedCgId) || caregiversData[0];

  const basePrice = caregiver.ratePerHour;
  const travelFee = 0; // Free instant dispatch promotional benefit
  const discount = 50; // Welcome discount
  const finalPay = basePrice - discount;

  const summaryContainer = document.getElementById('step4-summary-card');
  if (summaryContainer) {
    summaryContainer.innerHTML = `
      <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2.5">
        <div class="flex justify-between pb-2 border-b border-slate-200">
          <span class="text-slate-500">Service Required:</span>
          <span class="font-bold text-slate-900 text-right">${procName}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-500">Patient:</span>
          <span class="font-semibold text-slate-800">${patientName}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-500">Visit Address:</span>
          <span class="font-semibold text-slate-800 max-w-[200px] truncate">${address}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-500">Assigned Specialist:</span>
          <span class="font-semibold text-teal-700">${caregiver.name} (${caregiver.distance})</span>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-500">Dispatch Time:</span>
          <span class="font-bold text-emerald-600 flex items-center gap-1">
            ⚡ Instant Dispatch (Under 30-45 Mins)
          </span>
        </div>
        <div class="pt-2 border-t border-slate-200 space-y-1">
          <div class="flex justify-between text-slate-600">
            <span>Service Base Fee:</span>
            <span>₹${basePrice}</span>
          </div>
          <div class="flex justify-between text-emerald-600">
            <span>Instant Dispatch Travel Fee:</span>
            <span class="font-semibold"><s class="text-slate-400">₹99</s> FREE</span>
          </div>
          <div class="flex justify-between text-emerald-600">
            <span>New Patient Welcome Promo:</span>
            <span>- ₹${discount}</span>
          </div>
          <div class="flex justify-between pt-2 border-t border-slate-200 text-sm font-bold text-slate-900">
            <span>Total Payable Amount:</span>
            <span class="text-teal-700 text-base">₹${finalPay}</span>
          </div>
        </div>
      </div>
    `;
  }
}

// Confirm and Create Booking
function confirmBooking() {
  const patientName = document.getElementById('patient-name-input')?.value.trim() || 'Patient';
  const patientPhone = document.getElementById('patient-phone-input')?.value.trim() || '+91 98765 43210';
  const patientAddress = document.getElementById('patient-address-input')?.value.trim() || 'Resident Address';
  const landmark = document.getElementById('patient-landmark-input')?.value.trim() || 'Nearby';
  const procSelect = document.getElementById('booking-procedure-select');
  const procedureName = procSelect ? procSelect.options[procSelect.selectedIndex].text : 'Home Healthcare Visit';

  const selectedCgId = document.querySelector('input[name="selected_caregiver"]:checked')?.value;
  const caregiver = caregiversData.find(c => c.id === selectedCgId) || caregiversData[0];
  const paymentMethod = document.querySelector('input[name="pay_method"]:checked')?.value || 'Cash on Visit';

  const randomBookingId = `CAH-${Math.floor(10000 + Math.random() * 90000)}`;
  const randomOtp = `${Math.floor(1000 + Math.random() * 9000)}`;

  const newBooking = {
    id: randomBookingId,
    serviceType: state.selectedService,
    procedureName: procedureName,
    patientName: patientName,
    phone: patientPhone,
    address: patientAddress,
    landmark: landmark,
    city: state.currentCity,
    caregiver: caregiver,
    status: 'assigned', // Initial state
    etaMinutes: 28,
    otp: randomOtp,
    bookingTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    amount: caregiver.ratePerHour - 50,
    paymentMethod: paymentMethod
  };

  // Add to active bookings (latest first)
  state.activeBookings.unshift(newBooking);
  saveBookings();
  renderActiveBookingsList();

  closeBookingModal();
  showToast(`🎉 Booking ${randomBookingId} Confirmed! Caregiver assigned.`, 'success');

  // Immediately open live tracking view for this booking
  setTimeout(() => {
    openTrackingModal(newBooking.id);
  }, 400);
}

// Live Dispatch Tracking Modal & Simulation
function openTrackingModal(bookingId) {
  const booking = state.activeBookings.find(b => b.id === bookingId);
  if (!booking) return;

  state.activeTrackingBooking = booking;
  const modal = document.getElementById('tracking-modal');
  if (!modal) return;

  renderTrackingModalContent(booking);
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  // Start live simulation countdown
  startTrackingSimulation(booking);
}

function closeTrackingModal() {
  const modal = document.getElementById('tracking-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
  if (state.trackingInterval) {
    clearInterval(state.trackingInterval);
    state.trackingInterval = null;
  }
}

function renderTrackingModalContent(b) {
  const container = document.getElementById('tracking-modal-body');
  if (!container) return;

  const cg = b.caregiver;

  container.innerHTML = `
    <!-- Header with Live ETA & Status -->
    <div class="bg-gradient-to-r from-teal-700 to-teal-900 text-white p-5 rounded-2xl shadow-inner relative overflow-hidden mb-5">
      <div class="absolute -right-6 -bottom-6 w-32 h-32 bg-teal-500/20 rounded-full blur-xl pointer-events-none"></div>
      
      <div class="flex items-center justify-between relative z-10 mb-3">
        <div class="flex items-center gap-2">
          <span class="inline-flex w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
          <span class="text-xs font-semibold uppercase tracking-wider text-teal-200">Live Service Dispatch</span>
        </div>
        <span class="bg-teal-800/80 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold">ID: ${b.id}</span>
      </div>

      <div class="flex items-baseline justify-between relative z-10">
        <div>
          <h3 class="text-2xl font-black text-white" id="live-eta-display">${b.etaMinutes} mins</h3>
          <p class="text-xs text-teal-100 mt-0.5" id="live-status-text">Specialist is navigating to your address</p>
        </div>
        <div class="text-right">
          <div class="text-[10px] uppercase tracking-wider text-teal-200 font-semibold">Doorstep Security OTP</div>
          <div class="text-xl font-mono font-black text-amber-300 tracking-widest">${b.otp}</div>
          <span class="text-[10px] text-teal-200/80">Share with nurse upon arrival</span>
        </div>
      </div>

      <!-- Live Stepper Progress Bar -->
      <div class="mt-5 pt-3 border-t border-teal-600/50">
        <div class="grid grid-cols-4 gap-2 text-center text-[10px] font-semibold text-teal-200 mb-1.5">
          <div class="text-emerald-300">✓ Booked</div>
          <div class="text-emerald-300 font-bold">✓ Assigned</div>
          <div class="text-white font-bold animate-pulse">🚗 On The Way</div>
          <div class="opacity-60">🏥 Doorstep Care</div>
        </div>
        <div class="w-full bg-teal-950/60 h-2 rounded-full overflow-hidden p-0.5">
          <div id="live-progress-fill" class="bg-gradient-to-r from-emerald-400 to-teal-300 h-full rounded-full transition-all duration-1000" style="width: 65%;"></div>
        </div>
      </div>
    </div>

    <!-- Interactive Simulated Route Map Box -->
    <div class="relative bg-slate-900 rounded-2xl h-56 overflow-hidden border border-slate-800 shadow-md mb-5 flex flex-col justify-between p-4">
      <!-- Background map grid pattern -->
      <div class="absolute inset-0 opacity-25" style="background-image: radial-gradient(#38bdf8 1px, transparent 1px), radial-gradient(#38bdf8 1px, #0f172a 1px); background-size: 20px 20px; background-position: 0 0, 10px 10px;"></div>
      
      <!-- Simulated Roads SVG lines -->
      <svg class="absolute inset-0 w-full h-full pointer-events-none stroke-teal-500/40 stroke-2" fill="none">
        <path d="M 40 180 Q 150 120 220 140 T 360 60" stroke-dasharray="6,6" class="animate-pulse" stroke-width="3" stroke="#2dd4bf" />
      </svg>

      <!-- Patient Destination Marker -->
      <div class="absolute right-10 top-10 flex flex-col items-center">
        <div class="relative">
          <div class="w-9 h-9 bg-rose-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg shadow-rose-600/40 ring-4 ring-rose-400/30">
            🏠
          </div>
        </div>
        <span class="mt-1 bg-slate-900/90 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold border border-slate-700">Patient Home</span>
      </div>

      <!-- Moving Caregiver Marker -->
      <div id="simulated-caregiver-marker" class="absolute left-16 bottom-10 flex flex-col items-center transition-all duration-1000">
        <div class="relative">
          <span class="absolute -top-1 -right-1 w-3 h-3 bg-teal-400 rounded-full animate-map-ping"></span>
          <div class="w-10 h-10 bg-teal-500 text-white rounded-full flex items-center justify-center text-base shadow-lg shadow-teal-500/50 ring-4 ring-teal-300/30">
            👩‍⚕️
          </div>
        </div>
        <span class="mt-1 bg-teal-900 text-teal-200 text-[10px] px-2 py-0.5 rounded-full font-bold border border-teal-700">
          ${cg.name.split(' ')[0]} (Live)
        </span>
      </div>

      <!-- Map Overlay Live Distance Badge -->
      <div class="relative z-10 flex items-center justify-between w-full">
        <div class="bg-slate-900/90 backdrop-blur px-3 py-1.5 rounded-xl border border-slate-700 text-white text-xs flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span class="font-medium text-slate-300">Live GPS Tracking: <b class="text-white">Active</b></span>
        </div>
        <div class="bg-slate-900/90 backdrop-blur px-3 py-1.5 rounded-xl border border-slate-700 text-white text-xs font-mono">
          Speed: 28 km/h
        </div>
      </div>

      <div class="relative z-10">
        <span class="text-[11px] text-slate-400 bg-slate-950/80 px-2 py-1 rounded">
          📍 Destination: ${b.address} (${b.landmark})
        </span>
      </div>
    </div>

    <!-- Assigned Caregiver Profile Card -->
    <div class="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm mb-4">
      <div class="flex items-center gap-3.5 mb-3">
        <img src="${cg.photo}" alt="${cg.name}" class="w-14 h-14 rounded-2xl object-cover border-2 border-teal-500/30">
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between">
            <h4 class="font-bold text-slate-900 text-sm truncate">${cg.name}</h4>
            <span class="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">Verified</span>
          </div>
          <p class="text-xs text-slate-500 font-medium">${cg.roleEn}</p>
          <div class="flex items-center gap-2 mt-1 text-xs">
            <span class="text-amber-500 font-bold">★ ${cg.rating}</span>
            <span class="text-slate-300">•</span>
            <span class="text-slate-600">${cg.hospitalExp}</span>
          </div>
        </div>
      </div>

      <!-- Action Buttons: Call & WhatsApp -->
      <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
        <a href="tel:+919876543210" class="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2 px-3 rounded-xl text-xs transition-colors">
          <svg class="w-3.5 h-3.5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
          Call Specialist
        </a>
        <a href="https://wa.me/919876543210?text=Hello%20CareAtHome,%20inquiring%20about%20booking%20${b.id}" target="_blank" class="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-3 rounded-xl text-xs transition-colors shadow-sm">
          <span>💬 WhatsApp Chat</span>
        </a>
      </div>
    </div>

    <!-- Care Checklist & Equipment -->
    <div class="bg-teal-50/60 border border-teal-100 rounded-2xl p-3.5 text-xs text-slate-700">
      <div class="font-bold text-teal-900 mb-1 flex items-center gap-1.5">
        <span>🧰 Sanitized Medical Kit On-Board</span>
      </div>
      <p class="text-slate-600 text-[11px] leading-relaxed">
        Specialist is arriving equipped with sterilized disposable needles/syringes, digital BP monitor, pulse oximeter, glucometer, surgical dressing kits, and N95 PPE.
      </p>
    </div>
  `;
}

function startTrackingSimulation(booking) {
  if (state.trackingInterval) clearInterval(state.trackingInterval);

  let currentMinutes = booking.etaMinutes;

  state.trackingInterval = setInterval(() => {
    if (currentMinutes > 1) {
      currentMinutes -= 1;
      booking.etaMinutes = currentMinutes;
      
      const etaDisplay = document.getElementById('live-eta-display');
      if (etaDisplay) etaDisplay.innerText = `${currentMinutes} mins`;

      // Animate progress bar slightly
      const progressFill = document.getElementById('live-progress-fill');
      if (progressFill) {
        const percent = Math.min(95, 65 + (30 - currentMinutes) * 1.5);
        progressFill.style.width = `${percent}%`;
      }
    } else {
      // Arrived state
      booking.status = 'arrived';
      const etaDisplay = document.getElementById('live-eta-display');
      const statusText = document.getElementById('live-status-text');
      if (etaDisplay) etaDisplay.innerText = 'Arrived!';
      if (statusText) statusText.innerText = 'Caregiver has reached your doorstep. Please share OTP.';
      clearInterval(state.trackingInterval);
      showToast('🔔 Your Caregiver has arrived at your doorstep!', 'success');
    }
  }, 3500); // simulated ticks
}

// Render active bookings in the top pill & dropdown
function renderActiveBookingsList() {
  const badge = document.getElementById('active-bookings-badge');
  const dropdown = document.getElementById('active-bookings-dropdown');

  if (badge) {
    badge.innerText = state.activeBookings.length;
    if (state.activeBookings.length > 0) {
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }

  if (dropdown) {
    if (state.activeBookings.length === 0) {
      dropdown.innerHTML = `
        <div class="p-4 text-center text-xs text-slate-500">
          No active home visits. Book instant care now!
        </div>
      `;
    } else {
      dropdown.innerHTML = state.activeBookings.map(b => `
        <div class="p-3 border-b border-slate-100 hover:bg-slate-50 transition-colors flex items-center justify-between gap-3">
          <div class="min-w-0">
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span class="font-bold text-xs text-slate-900">${b.id}</span>
              <span class="text-[10px] bg-teal-100 text-teal-800 px-1.5 py-0.2 rounded font-semibold">${b.serviceType}</span>
            </div>
            <p class="text-[11px] text-slate-600 truncate mt-0.5">${b.procedureName}</p>
            <p class="text-[10px] text-slate-400">Assigned: ${b.caregiver.name}</p>
          </div>
          <button 
            onclick="openTrackingModal('${b.id}')"
            class="bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-lg shadow-sm whitespace-nowrap">
            Live Track
          </button>
        </div>
      `).join('');
    }
  }
}

// Interactive Patient Portal: Add New Vitals Record
function openAddVitalsModal() {
  const modal = document.getElementById('vitals-modal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeAddVitalsModal() {
  const modal = document.getElementById('vitals-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

function saveNewVitals(e) {
  if (e) e.preventDefault();

  const bp = document.getElementById('vitals-bp-input')?.value || '120/80';
  const pulse = document.getElementById('vitals-pulse-input')?.value || '72 bpm';
  const spo2 = document.getElementById('vitals-spo2-input')?.value || '98%';
  const sugar = document.getElementById('vitals-sugar-input')?.value || '110 mg/dL';
  const temp = document.getElementById('vitals-temp-input')?.value || '98.6°F';

  const newEntry = {
    date: 'Just Now (Logged)',
    bp: bp,
    pulse: pulse.includes('bpm') ? pulse : `${pulse} bpm`,
    spo2: spo2.includes('%') ? spo2 : `${spo2}%`,
    sugar: sugar.includes('mg/dL') ? sugar : `${sugar} mg/dL`,
    temp: temp.includes('°F') ? temp : `${temp}°F`,
    nurse: 'Sister Sunita M. (Verified Nurse)'
  };

  state.patientVitals.unshift(newEntry);
  renderVitalsTable();
  closeAddVitalsModal();
  showToast('✅ New patient vitals recorded into the digital health chart!', 'success');
}

function renderVitalsTable() {
  const container = document.getElementById('vitals-table-body');
  if (!container) return;

  container.innerHTML = state.patientVitals.map(v => `
    <tr class="border-b border-slate-100 hover:bg-slate-50/70 transition-colors">
      <td class="py-3 px-3 text-xs font-medium text-slate-800">${v.date}</td>
      <td class="py-3 px-3 text-xs font-bold text-slate-900">${v.bp} <span class="text-[10px] text-slate-400 font-normal">mmHg</span></td>
      <td class="py-3 px-3 text-xs font-semibold text-slate-800">${v.pulse}</td>
      <td class="py-3 px-3 text-xs font-bold text-teal-700">${v.spo2}</td>
      <td class="py-3 px-3 text-xs font-semibold text-amber-700">${v.sugar}</td>
      <td class="py-3 px-3 text-xs text-slate-700">${v.temp}</td>
      <td class="py-3 px-3 text-xs text-slate-500">${v.nurse}</td>
    </tr>
  `).join('');
}

// Emergency Quick SOS Modal
function openEmergencySosModal() {
  const modal = document.getElementById('sos-modal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeEmergencySosModal() {
  const modal = document.getElementById('sos-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

function submitEmergencySos(e) {
  if (e) e.preventDefault();

  const name = document.getElementById('sos-patient-name')?.value || 'Emergency Patient';
  const phone = document.getElementById('sos-patient-phone')?.value || '+91 99999 88888';
  const address = document.getElementById('sos-patient-address')?.value || 'Current Location';
  const condition = document.getElementById('sos-patient-condition')?.value || 'Urgent Home Care Needed';

  // Create immediate priority booking
  const randomBookingId = `SOS-${Math.floor(1000 + Math.random() * 9000)}`;
  const sosBooking = {
    id: randomBookingId,
    serviceType: 'nursing',
    procedureName: `🚨 EMERGENCY: ${condition}`,
    patientName: name,
    phone: phone,
    address: address,
    landmark: 'Urgent Dispatch',
    city: state.currentCity,
    caregiver: caregiversData[0], // First available critical care nurse
    status: 'on_the_way',
    etaMinutes: 18,
    otp: `${Math.floor(1000 + Math.random() * 9000)}`,
    bookingTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    amount: 599,
    paymentMethod: 'Pay After Treatment'
  };

  state.activeBookings.unshift(sosBooking);
  saveBookings();
  renderActiveBookingsList();

  closeEmergencySosModal();
  showToast(`🚨 Priority Dispatch Alert! Nearest nurse Sister Sunita dispatched to your address (18 mins ETA).`, 'success');

  setTimeout(() => {
    openTrackingModal(sosBooking.id);
  }, 400);
}

// Toast Notification Utility
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const bgColors = {
    success: 'bg-emerald-900 border-emerald-500 text-white',
    warning: 'bg-amber-900 border-amber-500 text-white',
    info: 'bg-slate-900 border-slate-700 text-white'
  };

  toast.className = `transform transition-all duration-300 translate-y-2 opacity-0 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl text-xs font-medium max-w-md ${bgColors[type] || bgColors.info}`;
  toast.innerHTML = `
    <div class="flex-1">${message}</div>
    <button onclick="this.parentElement.remove()" class="text-white/60 hover:text-white text-base leading-none">&times;</button>
  `;

  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  }, 10);

  // Auto remove
  setTimeout(() => {
    toast.classList.add('translate-y-2', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}

// Language Switcher (English <-> Hindi)
function toggleLanguage() {
  state.currentLang = state.currentLang === 'en' ? 'hi' : 'en';
  applyLanguage(state.currentLang);
}

function applyLanguage(lang) {
  document.documentElement.lang = lang;
  
  const langToggleBtn = document.getElementById('lang-toggle-btn');
  if (langToggleBtn) {
    langToggleBtn.innerText = lang === 'en' ? 'हिंदी' : 'English';
  }

  // Update all translatable elements
  const elements = document.querySelectorAll('[data-en]');
  elements.forEach(el => {
    const text = lang === 'hi' ? (el.getAttribute('data-hi') || el.getAttribute('data-en')) : el.getAttribute('data-en');
    if (el.tagName === 'INPUT' && el.getAttribute('placeholder')) {
      el.setAttribute('placeholder', text);
    } else {
      el.innerText = text;
    }
  });

  renderCaregivers(state.caregiversFilter);
}

// Event Listeners Setup
function setupEventListeners() {
  // Service category selector in booking wizard
  const serviceRadios = document.querySelectorAll('input[name="book_service"]');
  serviceRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      state.selectedService = e.target.value;
      updateBookingProceduresList(e.target.value);
    });
  });

  // Cost calculator triggers
  const calcInputs = document.querySelectorAll('input[name="calc_service"], input[name="calc_shift"], #calc-duration-slider');
  calcInputs.forEach(input => {
    input.addEventListener('input', updateCalculator);
    input.addEventListener('change', updateCalculator);
  });

  // Caregivers tab filter
  const filterBtns = document.querySelectorAll('[data-filter-tab]');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => {
        b.className = 'px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors';
      });
      btn.className = 'px-4 py-2 rounded-xl text-xs font-semibold bg-teal-600 text-white shadow-sm transition-colors';
      
      const filter = btn.getAttribute('data-filter-tab');
      state.caregiversFilter = filter;
      renderCaregivers(filter);
    });
  });

  // City change selector
  const citySelect = document.getElementById('city-selector');
  if (citySelect) {
    citySelect.addEventListener('change', (e) => {
      state.currentCity = e.target.value;
      showToast(`📍 Location updated to ${state.currentCity}. Displaying nearby active caregivers.`, 'info');
    });
  }

  // Initial render of vitals table
  renderVitalsTable();
}

// Export functions to window for direct HTML onclick triggers
window.openBookingModal = openBookingModal;
window.openBookingWithCaregiver = openBookingWithCaregiver;
window.closeBookingModal = closeBookingModal;
window.nextBookingStep = nextBookingStep;
window.prevBookingStep = prevBookingStep;
window.openTrackingModal = openTrackingModal;
window.closeTrackingModal = closeTrackingModal;
window.openEmergencySosModal = openEmergencySosModal;
window.closeEmergencySosModal = closeEmergencySosModal;
window.submitEmergencySos = submitEmergencySos;
window.openAddVitalsModal = openAddVitalsModal;
window.closeAddVitalsModal = closeAddVitalsModal;
window.saveNewVitals = saveNewVitals;
window.toggleLanguage = toggleLanguage;
window.updateCalculator = updateCalculator;
