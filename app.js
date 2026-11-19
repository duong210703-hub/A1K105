// app.js - Main Application Logic, Floating Effects, Auth & Interactivity for STEMLab VN

let currentLang = 'vi';
let activeSubject = 'all';
let activeGrade = 'all';
let currentSearchTerm = '';
let currentOpenSimId = null;

const AUTH_STORAGE_KEY = 'stemlab_vn_user';

const I18N = {
  vi: {
    'nav.tagline': 'Thí nghiệm Khoa học Ảo',
    'nav.simulations': 'Mô phỏng',
    'nav.subjects': 'Môn học',
    'nav.liveDemo': 'Lab mẫu',
    'nav.teachers': 'Giáo viên',
    'nav.about': 'Giới thiệu',
    'auth.login': 'Đăng nhập',
    'auth.register': 'Đăng ký',
    'search.placeholder': 'Tìm thí nghiệm...',
    'hero.badge': 'Chuẩn GDPT 2018 — Trực quan & Sáng tạo',
    'hero.title1': 'Phòng thí nghiệm khoa học ảo tương tác',
    'hero.title2': '— Học qua trải nghiệm trực quan',
    'hero.desc': 'Kho mô phỏng miễn phí cho Vật lý, Hóa học, Sinh học, Vật lý địa cầu và Toán học dành cho phổ thông và giáo dục STEM.',
    'hero.ctaExplore': 'Khám phá mô phỏng',
    'hero.ctaSignup': 'Tạo tài khoản miễn phí',
    'hero.ctaTryNow': 'Thử thí nghiệm Ohm',
    'stats.sims': 'Mô phỏng thí nghiệm',
    'stats.users': 'Học sinh & GV sử dụng',
    'stats.free': 'Miễn phí giáo dục',
    'filter.subjectTitle': 'Môn học STEM',
    'filter.all': 'Tất cả môn',
    'filter.physics': 'Vật lý',
    'filter.chemistry': 'Hóa học',
    'filter.biology': 'Sinh học',
    'filter.earth': 'Vật lý địa cầu',
    'filter.math': 'Toán học',
    'filter.gradeTitle': 'Cấp học:',
    'grade.all': 'Tất cả cấp',
    'grade.primary': 'Tiểu học (Lớp 1-5)',
    'grade.middle': 'THCS (Lớp 6-9)',
    'grade.high': 'THPT (Lớp 10-12)',
    'grade.uni': 'Đại học',
    'grid.sectionBadge': 'Kho học liệu số tương tác',
    'grid.title': 'Thư Viện Thí Nghiệm Khoa Học',
    'grid.subtitle': 'Chọn một thí nghiệm để bắt đầu khám phá, điều chỉnh các biến số và quan sát hiện tượng khoa học.',
    'search.emptyTitle': 'Không tìm thấy mô phỏng phù hợp',
    'search.emptyDesc': 'Vui lòng thử đổi từ khóa tìm kiếm hoặc bấm nút "Tất cả môn" và "Tất cả cấp học" để hiển thị danh sách đầy đủ.',
    'search.reset': 'Khôi phục bộ lọc',
    'card.runSim': 'Chạy mô phỏng',
    'card.viewDirect': 'Mở trực tiếp',
    'about.title': 'Về Dự Án Thí Nghiệm Khoa Học STEMLab VN',
    'about.desc': 'Lấy cảm hứng từ sáng kiến mô phỏng khoa học tương tác PhET (Đại học Colorado Boulder), STEMLab VN ra đời với sứ mệnh mang lại trải nghiệm giáo dục khoa học mở, trực quan, miễn phí và thuần Việt cho hàng triệu học sinh, giáo viên trên khắp mọi miền đất nước.',
    'footer.subjects': 'Môn học',
    'footer.resources': 'Tài nguyên STEM',
    'footer.legal': 'Bản quyền & Pháp lý'
  },
  en: {
    'nav.tagline': 'Virtual Science Lab',
    'nav.simulations': 'Simulations',
    'nav.subjects': 'Subjects',
    'nav.liveDemo': 'Live Lab',
    'nav.teachers': 'Teachers',
    'nav.about': 'About Us',
    'auth.login': 'Log In',
    'auth.register': 'Sign Up',
    'search.placeholder': 'Search simulations...',
    'hero.badge': 'STEM Aligned — Intuitive & Engaging',
    'hero.title1': 'Interactive Virtual Science Laboratory',
    'hero.title2': '— Learning Through Discovery',
    'hero.desc': 'Free interactive simulations for Physics, Chemistry, Biology, Earth Science, and Mathematics designed for K-12 and STEM education.',
    'hero.ctaExplore': 'Explore Simulations',
    'hero.ctaSignup': 'Create Free Account',
    'hero.ctaTryNow': "Try Ohm's Lab",
    'stats.sims': 'Active Simulations',
    'stats.users': 'Teachers & Students',
    'stats.free': 'Free & Open Source',
    'filter.subjectTitle': 'STEM Disciplines',
    'filter.all': 'All Subjects',
    'filter.physics': 'Physics',
    'filter.chemistry': 'Chemistry',
    'filter.biology': 'Biology',
    'filter.earth': 'Earth Science',
    'filter.math': 'Mathematics',
    'filter.gradeTitle': 'Grade Level:',
    'grade.all': 'All Grades',
    'grade.primary': 'Elementary (1-5)',
    'grade.middle': 'Middle School (6-9)',
    'grade.high': 'High School (10-12)',
    'grade.uni': 'University / College',
    'grid.sectionBadge': 'Digital Interactive Learning Suite',
    'grid.title': 'Simulation Library',
    'grid.subtitle': 'Select a simulation to explore variables, run trials, and witness scientific phenomena unfold.',
    'search.emptyTitle': 'No matching simulations found',
    'search.emptyDesc': 'Try adjusting your search query or reset the filters to browse the full catalog.',
    'search.reset': 'Reset all filters',
    'card.runSim': 'Run Simulation',
    'card.viewDirect': 'Open Lab',
    'about.title': 'About STEMLab VN Platform',
    'about.desc': 'Inspired by PhET Interactive Simulations (University of Colorado Boulder), STEMLab VN empowers Vietnamese STEM educators and learners with accessible, intuitive, and high-impact digital experiment environments.',
    'footer.subjects': 'Disciplines',
    'footer.resources': 'Teacher Resources',
    'footer.legal': 'Copyright & Licensing'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  renderSimulationCards();
  setupFilterEventListeners();
  setupSearchEventListeners();
  setupMobileMenu();
  setupFloatingParallax();
  renderAuthState();
  initOhmSimulation();
  initHeroCanvas();
});

// ================= FLOATING ICONS PARALLAX =================
function setupFloatingParallax() {
  const icons = document.querySelectorAll('.floating-icon');
  if (!icons.length) return;

  window.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;

    icons.forEach((el) => {
      const speed = parseFloat(el.getAttribute('data-speed') || '0.02');
      const tx = (dx * speed).toFixed(1);
      const ty = (dy * speed).toFixed(1);
      el.style.marginLeft = `${tx}px`;
      el.style.marginTop = `${ty}px`;
    });
  }, { passive: true });
}

// ================= AUTH MODAL & USER SESSION =================
function openAuthModal(tab = 'login') {
  const modal = document.getElementById('authModal');
  if (!modal) return;
  switchAuthTab(tab);
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
  const modal = document.getElementById('authModal');
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

function switchAuthTab(tab) {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const tabLoginBtn = document.getElementById('tabLoginBtn');
  const tabRegisterBtn = document.getElementById('tabRegisterBtn');
  const titleEl = document.getElementById('authModalTitle');
  const subtitleEl = document.getElementById('authModalSubtitle');

  const isLogin = tab === 'login';

  if (loginForm) loginForm.classList.toggle('hidden', !isLogin);
  if (registerForm) registerForm.classList.toggle('hidden', isLogin);

  if (tabLoginBtn) {
    tabLoginBtn.className = isLogin
      ? 'py-2 rounded-lg text-xs font-extrabold transition-all bg-white text-brand-blue shadow-sm'
      : 'py-2 rounded-lg text-xs font-extrabold transition-all text-white/85 hover:text-white';
  }
  if (tabRegisterBtn) {
    tabRegisterBtn.className = !isLogin
      ? 'py-2 rounded-lg text-xs font-extrabold transition-all bg-white text-brand-blue shadow-sm'
      : 'py-2 rounded-lg text-xs font-extrabold transition-all text-white/85 hover:text-white';
  }

  if (titleEl) {
    titleEl.textContent = isLogin ? 'Đăng nhập STEMLab VN' : 'Đăng ký tài khoản mới';
  }
  if (subtitleEl) {
    subtitleEl.textContent = isLogin
      ? 'Lưu tiến độ thí nghiệm & phiếu bài tập của bạn'
      : 'Tham gia cộng đồng học tập và thực hành STEM miễn phí';
  }
}

function togglePasswordVisibility(inputId, btnEl) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const isPass = input.type === 'password';
  input.type = isPass ? 'text' : 'password';
  if (btnEl) {
    btnEl.innerHTML = isPass
      ? '<i class="fa-solid fa-eye-slash text-xs"></i>'
      : '<i class="fa-solid fa-eye text-xs"></i>';
  }
}

function fillDemoCredentials(type = 'student') {
  const emailIn = document.getElementById('loginEmail');
  const passIn = document.getElementById('loginPassword');
  if (emailIn) emailIn.value = type === 'teacher' ? 'giaovien@stemlab.edu.vn' : 'hocsinh@stemlab.edu.vn';
  if (passIn) passIn.value = '123456';
  showToast('Đã điền thông tin tài khoản mẫu.');
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const email = (document.getElementById('loginEmail')?.value || '').trim();
  const nameFromEmail = email.split('@')[0] || 'Học viên';
  const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

  saveSessionUser({
    name: formattedName,
    email,
    role: email.includes('giaovien') || email.includes('teacher') ? 'Giáo viên STEM' : 'Học sinh / Sinh viên'
  });

  closeAuthModal();
  showToast(`Chào mừng trở lại, ${formattedName}!`);
}

function handleRegisterSubmit(e) {
  e.preventDefault();
  const name = (document.getElementById('regName')?.value || '').trim() || 'Thành viên STEM';
  const email = (document.getElementById('regEmail')?.value || '').trim();
  const role = document.getElementById('regRole')?.value || 'Học sinh / Sinh viên';
  const grade = document.getElementById('regGrade')?.value || '';

  saveSessionUser({
    name,
    email,
    role: grade ? `${role} • ${grade}` : role
  });

  closeAuthModal();
  showToast(`Đăng ký thành công! Xin chào ${name}.`);
}

function saveSessionUser(userObj) {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userObj));
  } catch (_) {}
  renderAuthState();
}

function getSessionUser() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

function logoutUser() {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (_) {}
  closeUserMenu();
  renderAuthState();
  showToast('Đã đăng xuất tài khoản.');
}

function renderAuthState() {
  const user = getSessionUser();
  const guestCtrl = document.getElementById('authGuestControls');
  const userCtrl = document.getElementById('authUserControls');
  const mobGuest = document.getElementById('mobileAuthGuest');
  const mobUser = document.getElementById('mobileAuthUser');

  if (user) {
    if (guestCtrl) guestCtrl.classList.add('hidden');
    if (userCtrl) {
      userCtrl.classList.remove('hidden');
      userCtrl.classList.add('sm:flex');
    }

    const initials = (user.name || 'SV').trim().slice(0, 2).toUpperCase();
    const avatarEl = document.getElementById('userAvatarBadge');
    const nameEl = document.getElementById('userDisplayName');
    const roleEl = document.getElementById('userDisplayRole');
    const emailEl = document.getElementById('userDropdownEmail');

    if (avatarEl) avatarEl.textContent = initials;
    if (nameEl) nameEl.textContent = user.name;
    if (roleEl) roleEl.textContent = user.role;
    if (emailEl) emailEl.textContent = user.email;

    if (mobGuest) mobGuest.classList.add('hidden');
    if (mobUser) {
      mobUser.classList.remove('hidden');
      mobUser.classList.add('flex');
      const mAv = document.getElementById('mobileUserAvatar');
      const mNm = document.getElementById('mobileUserName');
      const mRl = document.getElementById('mobileUserRole');
      if (mAv) mAv.textContent = initials;
      if (mNm) mNm.textContent = user.name;
      if (mRl) mRl.textContent = user.role;
    }
  } else {
    if (guestCtrl) guestCtrl.classList.remove('hidden');
    if (userCtrl) {
      userCtrl.classList.add('hidden');
      userCtrl.classList.remove('sm:flex');
    }
    if (mobGuest) mobGuest.classList.remove('hidden');
    if (mobUser) {
      mobUser.classList.add('hidden');
      mobUser.classList.remove('flex');
    }
  }
}

function toggleUserMenu() {
  const menu = document.getElementById('userDropdownMenu');
  if (menu) menu.classList.toggle('hidden');
}

function closeUserMenu() {
  const menu = document.getElementById('userDropdownMenu');
  if (menu) menu.classList.add('hidden');
}

document.addEventListener('click', (e) => {
  const userCtrl = document.getElementById('authUserControls');
  const menu = document.getElementById('userDropdownMenu');
  if (userCtrl && menu && !userCtrl.contains(e.target)) {
    menu.classList.add('hidden');
  }
});

// ================= LANGUAGE & FILTERS =================
function toggleLanguage() {
  currentLang = currentLang === 'vi' ? 'en' : 'vi';

  const flag = document.getElementById('langFlag');
  const text = document.getElementById('langText');
  if (flag) flag.textContent = currentLang === 'vi' ? '🇻🇳' : '🇬🇧';
  if (text) text.textContent = currentLang === 'vi' ? 'VI' : 'EN';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (I18N[currentLang][key]) {
      el.textContent = I18N[currentLang][key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (I18N[currentLang][key]) {
      el.setAttribute('placeholder', I18N[currentLang][key]);
    }
  });

  renderSimulationCards();
  showToast(currentLang === 'vi' ? 'Đã chuyển sang Tiếng Việt' : 'Switched to English');
}

function setupFilterEventListeners() {
  const subjectBtns = document.querySelectorAll('.filter-subject-btn');
  subjectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      subjectBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeSubject = btn.getAttribute('data-subject');
      renderSimulationCards();
    });
  });

  const gradeBtns = document.querySelectorAll('.filter-grade-btn');
  gradeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      gradeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeGrade = btn.getAttribute('data-grade');
      renderSimulationCards();
    });
  });
}

function filterBySubject(subj) {
  const btn = document.querySelector(`.filter-subject-btn[data-subject="${subj}"]`);
  if (btn) btn.click();
}

function setupSearchEventListeners() {
  const globalInput = document.getElementById('globalSearchInput');
  const mobileInput = document.getElementById('mobileSearchInput');
  const clearBtn = document.getElementById('clearSearchBtn');

  function handleSearch(val) {
    currentSearchTerm = val.trim().toLowerCase();
    if (clearBtn) {
      if (currentSearchTerm.length > 0) clearBtn.classList.remove('hidden');
      else clearBtn.classList.add('hidden');
    }
    renderSimulationCards();
  }

  if (globalInput) globalInput.addEventListener('input', (e) => handleSearch(e.target.value));
  if (mobileInput) mobileInput.addEventListener('input', (e) => handleSearch(e.target.value));
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (globalInput) globalInput.value = '';
      if (mobileInput) mobileInput.value = '';
      handleSearch('');
      if (globalInput) globalInput.focus();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== globalInput && document.activeElement !== mobileInput) {
      e.preventDefault();
      if (globalInput) {
        globalInput.focus();
        globalInput.select();
      }
    }
  });
}

function resetAllFilters() {
  activeSubject = 'all';
  activeGrade = 'all';
  currentSearchTerm = '';

  const gIn = document.getElementById('globalSearchInput');
  const mIn = document.getElementById('mobileSearchInput');
  if (gIn) gIn.value = '';
  if (mIn) mIn.value = '';

  const clearBtn = document.getElementById('clearSearchBtn');
  if (clearBtn) clearBtn.classList.add('hidden');

  document.querySelectorAll('.filter-subject-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-subject') === 'all');
  });

  document.querySelectorAll('.filter-grade-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-grade') === 'all');
  });

  renderSimulationCards();
  showToast(currentLang === 'vi' ? 'Đã khôi phục bộ lọc' : 'Filters reset');
}

function renderSimulationCards() {
  const grid = document.getElementById('simulationGrid');
  const emptyAlert = document.getElementById('noResultsAlert');
  const countBadge = document.getElementById('currentCount');
  if (!grid) return;

  const filtered = SIMULATIONS_DATA.filter(item => {
    const matchSubject = activeSubject === 'all' || item.subject === activeSubject;

    let matchGrade = true;
    if (activeGrade !== 'all') {
      if (activeGrade === 'primary') matchGrade = item.grade === 'primary';
      else if (activeGrade === 'middle') matchGrade = item.grade === 'middle';
      else if (activeGrade === 'high') matchGrade = item.grade === 'high' || item.grade === 'middle';
      else if (activeGrade === 'uni') matchGrade = item.grade === 'high' || item.grade === 'uni';
    }

    let matchSearch = true;
    if (currentSearchTerm) {
      const title = (currentLang === 'vi' ? item.title_vi : item.title_en).toLowerCase();
      const desc = (currentLang === 'vi' ? item.desc_vi : item.desc_en).toLowerCase();
      const subj = (currentLang === 'vi' ? item.subject_vi : item.subject_en).toLowerCase();
      matchSearch = title.includes(currentSearchTerm) || desc.includes(currentSearchTerm) || subj.includes(currentSearchTerm);
    }

    return matchSubject && matchGrade && matchSearch;
  });

  if (countBadge) countBadge.textContent = filtered.length;

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (emptyAlert) emptyAlert.classList.remove('hidden');
    return;
  }

  if (emptyAlert) emptyAlert.classList.add('hidden');
  const runLabel = currentLang === 'vi' ? 'Chạy mô phỏng' : 'Run Simulation';

  grid.innerHTML = filtered.map(item => {
    const title = currentLang === 'vi' ? item.title_vi : item.title_en;
    const desc = currentLang === 'vi' ? item.desc_vi : item.desc_en;
    const subject = currentLang === 'vi' ? item.subject_vi : item.subject_en;
    const grade = currentLang === 'vi' ? item.grade_label_vi : item.grade_label_en;

    let subjectBadgeStyle = 'bg-blue-100 text-blue-800 border-blue-200';
    if (item.subject === 'chemistry') subjectBadgeStyle = 'bg-teal-100 text-teal-800 border-teal-200';
    else if (item.subject === 'biology') subjectBadgeStyle = 'bg-emerald-100 text-emerald-800 border-emerald-200';
    else if (item.subject === 'earth') subjectBadgeStyle = 'bg-amber-100 text-amber-800 border-amber-200';
    else if (item.subject === 'math') subjectBadgeStyle = 'bg-purple-100 text-purple-800 border-purple-200';

    return `
      <div class="sim-card bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-card-hover flex flex-col justify-between group transition-all duration-300">
        <div class="relative w-full h-48 bg-slate-900 overflow-hidden cursor-pointer" onclick="handleCardClick('${item.id}')">
          ${item.svgVisual}
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
          <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/30 backdrop-blur-[2px]">
            <span class="w-14 h-14 rounded-2xl bg-brand-blue text-white flex items-center justify-center text-xl shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <i class="fa-solid fa-play ml-1"></i>
            </span>
          </div>
          <div class="absolute top-3 right-3">
            <span class="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold border border-slate-700 shadow-sm flex items-center gap-1.5">
              <i class="fa-solid fa-graduation-cap text-amber-400 text-xs"></i>
              ${grade}
            </span>
          </div>
          ${item.hasLiveDemo ? `
            <div class="absolute top-3 left-3">
              <span class="px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-[11px] font-bold shadow-sm flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                Interactive Lab
              </span>
            </div>
          ` : ''}
        </div>

        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between gap-2 mb-2.5">
              <span class="px-2.5 py-1 rounded-lg text-xs font-bold border ${subjectBadgeStyle} flex items-center gap-1.5">
                <i class="${item.subjectIcon}"></i>
                ${subject}
              </span>
              <div class="flex items-center gap-1 text-xs text-slate-500 font-semibold">
                <i class="fa-solid fa-star text-amber-400"></i>
                <span class="text-slate-800 font-bold">${item.rating}</span>
                <span>(${item.reviews})</span>
              </div>
            </div>

            <h3 class="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-brand-blue transition-colors line-clamp-1 mb-1.5">
              ${title}
            </h3>

            <p class="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed font-normal">
              ${desc}
            </p>
          </div>

          <div class="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
            <button 
              onclick="handleCardClick('${item.id}')"
              class="flex-1 py-2.5 px-4 rounded-xl bg-brand-blue hover:bg-brand-blueHover text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 group-hover:shadow-lg"
            >
              <i class="fa-solid fa-play text-[10px]"></i>
              <span>${runLabel}</span>
            </button>

            <button 
              onclick="copyEmbedCode('${item.id}')"
              title="Nhúng thí nghiệm vào LMS"
              class="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <i class="fa-solid fa-code text-xs"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function handleCardClick(simId) {
  if (simId === 'ohm-law') {
    const demoSection = document.getElementById('interactive-demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
      showToast(currentLang === 'vi' ? 'Đã mở phòng thí nghiệm Định luật Ohm' : "Ohm's Law Lab opened");
    }
  } else if (simId === 'pendulum-energy') {
    openSimModal(simId);
    openPendulumSimModal();
  } else {
    openSimModal(simId);
  }
}

function openSimModal(simId) {
  const item = SIMULATIONS_DATA.find(s => s.id === simId);
  if (!item) return;

  currentOpenSimId = simId;
  const modal = document.getElementById('simModal');
  const titleEl = document.getElementById('modalSimTitle');
  const subjEl = document.getElementById('modalSimSubject');
  const gradeEl = document.getElementById('modalSimGrade');
  const container = document.getElementById('modalSimContainer');

  if (titleEl) titleEl.textContent = currentLang === 'vi' ? item.title_vi : item.title_en;
  if (subjEl) subjEl.textContent = currentLang === 'vi' ? item.subject_vi : item.subject_en;
  if (gradeEl) gradeEl.textContent = currentLang === 'vi' ? item.grade_label_vi : item.grade_label_en;

  if (simId !== 'pendulum-energy') {
    container.innerHTML = `
      <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm max-w-3xl mx-auto space-y-6">
        <div class="w-full h-64 rounded-2xl overflow-hidden shadow-inner border border-slate-200 bg-slate-900">
          ${item.svgVisual}
        </div>
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-brand-blue">
              ${currentLang === 'vi' ? item.subject_vi : item.subject_en}
            </span>
            <span class="text-xs text-slate-500 font-semibold">• Đánh giá ${item.rating}/5.0 (${item.reviews} lượt học)</span>
          </div>
          <h3 class="text-2xl font-black text-slate-900">
            ${currentLang === 'vi' ? item.title_vi : item.title_en}
          </h3>
          <p class="text-sm text-slate-600 leading-relaxed">
            ${currentLang === 'vi' ? item.desc_vi : item.desc_en}
          </p>
          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-500">Mục tiêu học tập STEM:</h4>
            <ul class="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
              <li>Xác định các đại lượng vật lý/hóa học độc lập và phụ thuộc.</li>
              <li>Kiểm chứng quy luật thực nghiệm bằng số liệu đo lường khách quan.</li>
              <li>Phát triển kỹ năng suy luận nguyên nhân - kết quả và phân tích đồ thị.</li>
            </ul>
          </div>
          <div class="flex flex-wrap gap-3 pt-2">
            <button onclick="downloadWorksheet('${item.id}')" class="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-colors flex items-center gap-2">
              <i class="fa-solid fa-file-pdf"></i>
              <span>Tải phiếu học tập</span>
            </button>
            <button onclick="openTeacherModal()" class="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors flex items-center gap-2">
              <i class="fa-solid fa-chalkboard-user"></i>
              <span>Xem giáo án gợi ý 5E</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeSimModal() {
  const modal = document.getElementById('simModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
  if (pendulumSim.animId) {
    cancelAnimationFrame(pendulumSim.animId);
  }
}

function toggleModalFullscreen() {
  const modal = document.getElementById('simModal');
  if (!modal) return;
  if (!document.fullscreenElement) {
    modal.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen();
  }
}

function openTeacherModal() {
  const modal = document.getElementById('teacherModal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeTeacherModal() {
  const modal = document.getElementById('teacherModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

function downloadWorksheet(type) {
  showToast(currentLang === 'vi'
    ? `Đang tạo phiếu học tập [${type.toUpperCase()}]...`
    : `Generating worksheet for [${type.toUpperCase()}]...`);

  setTimeout(() => {
    const content = `
PHIẾU HỌC TẬP KHÁM PHÁ KHOA HỌC STEM (STEMLab VN)
Tên bài thí nghiệm: ${type.toUpperCase()}
Mục tiêu: Rèn luyện năng lực tìm tòi, thực nghiệm và xử lý số liệu.
---
Câu 1: Dự đoán hiện tượng xảy ra khi bạn thay đổi biến số chính.
Câu 2: Bảng ghi nhận số liệu sau 5 lần đo thử nghiệm.
Câu 3: Rút ra định luật và công thức liên hệ toán học.
    `;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Phieu-Hoc-Tap-${type}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Tải phiếu học tập thành công!');
  }, 500);
}

function copyEmbedCode(simId) {
  const code = `<iframe src="https://stemlab.edu.vn/embed/${simId}" width="800" height="500" frameborder="0" allowfullscreen></iframe>`;
  navigator.clipboard.writeText(code).then(() => {
    showToast('Đã sao chép mã nhúng Iframe vào bộ nhớ tạm.');
  }).catch(() => {
    showToast('Mã nhúng: ' + code);
  });
}

function copyEmbedCodeCurrentSim() {
  if (currentOpenSimId) copyEmbedCode(currentOpenSimId);
  else copyEmbedCode('ohm-law');
}

function copyCode(elementId) {
  const el = document.getElementById(elementId);
  if (el) {
    navigator.clipboard.writeText(el.innerText || el.textContent).then(() => {
      showToast('Đã sao chép mã!');
    });
  }
}

let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const msg = document.getElementById('toastMessage');
  if (!toast || !msg) return;

  msg.textContent = message;
  toast.classList.remove('hidden');
  toast.classList.remove('translate-y-4');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add('translate-y-4');
    setTimeout(() => toast.classList.add('hidden'), 200);
  }, 3200);
}

function setupMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');
  if (btn && menu) {
    btn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
  }
}

function closeMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.add('hidden');
}

function openContactModal() {
  showToast('Cảm ơn bạn! Ban biên tập STEMLab VN sẽ liên hệ qua email giáo dục.');
}

function openEmbedGuide() {
  openTeacherModal();
}
