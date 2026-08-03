/* ==========================================================================
   LEARNING PATH DASHBOARD - FULL-STACK CLIENT JS
   Connects to Spring Boot REST APIs (/api/...) & H2/MySQL Database
   ========================================================================== */

const API_BASE = '/api';

// Current App State
let appState = {
  user: JSON.parse(localStorage.getItem('lpd_user')) || null,
  activeQuiz: null,
  webcamStream: null,
  currentCourseState: {
    skillId: 'webdev',
    courseTitle: 'Web Development Mastery',
    lessons: [],
    currentLessonIdx: 0,
    completedLessonIds: []
  }
};

// Auto-save User to LocalStorage
function saveUser(user) {
  appState.user = user;
  localStorage.setItem('lpd_user', JSON.stringify(user));
}

// Global UI Updater
function updateHeaderAndUserUI() {
  const user = appState.user || {
    fullName: 'Guest Learner',
    email: 'guest@skillpath.edu',
    targetRole: 'Student Learner',
    streakDays: 1,
    activeSkill: 'webdev'
  };

  const initials = user.fullName ? user.fullName.split(' ').map(n => n[0]).join('').toUpperCase() : 'GL';
  
  const avatarElem = document.getElementById('user-avatar-initials');
  if (avatarElem) avatarElem.textContent = initials;

  const nameElem = document.getElementById('user-display-name');
  if (nameElem) nameElem.textContent = user.fullName;

  const roleElem = document.getElementById('user-display-role');
  if (roleElem) roleElem.textContent = user.targetRole || 'Student Learner';

  const streakElem = document.getElementById('header-streak-days');
  if (streakElem) streakElem.textContent = `${user.streakDays || 1} Day Streak`;
}

document.addEventListener('DOMContentLoaded', () => {
  updateHeaderAndUserUI();
});

/* ==========================================================================
   1. AUTHENTICATION & FLOW ROUTING (register.html & login.html)
   ========================================================================== */

function togglePasswordVisibility(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  if (input && icon) {
    if (input.type === 'password') {
      input.type = 'text';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    } else {
      input.type = 'password';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }
  }
}

async function handleRegister(e) {
  e.preventDefault();
  
  const alertBox = document.getElementById('reg-alert');
  const successBox = document.getElementById('reg-success');
  const submitBtn = document.getElementById('reg-btn');
  
  if (alertBox) { alertBox.style.display = 'none'; alertBox.textContent = ''; }
  if (successBox) { successBox.style.display = 'none'; successBox.textContent = ''; }

  const fullNameElem = document.getElementById('reg-fullname');
  const emailElem = document.getElementById('reg-email');
  const passwordElem = document.getElementById('reg-password');
  const confirmPasswordElem = document.getElementById('reg-confirm-password');

  const fullName = fullNameElem ? fullNameElem.value.trim() : '';
  const email = emailElem ? emailElem.value.trim() : '';
  const password = passwordElem ? passwordElem.value.trim() : '';
  const confirmPassword = confirmPasswordElem ? confirmPasswordElem.value.trim() : '';

  if (!fullName || fullName.length < 2) { showRegError('Full name must be at least 2 characters long.'); return; }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) { showRegError('Please enter a valid email address.'); return; }
  if (!password || password.length < 6) { showRegError('Password must be at least 6 characters long.'); return; }
  if (password !== confirmPassword) { showRegError('Passwords do not match. Please verify your password.'); return; }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Registering Account...';
  }

  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, name: fullName, email, password, role: 'Student Learner' })
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok) {
      if (successBox) {
        successBox.style.display = 'flex';
        successBox.innerHTML = '<i class="fa-solid fa-circle-check"></i> Account created successfully! Redirecting to login...';
      }
      setTimeout(() => { window.location.href = 'login.html'; }, 1500);
    } else {
      showRegError(data.message || 'Registration failed. Please check your inputs.');
      if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = '<i class="fa-solid fa-user-plus"></i> Create Account'; }
    }
  } catch (err) {
    const offlineUser = {
      id: Date.now(),
      fullName: fullName,
      email: email,
      password: password,
      targetRole: 'Student Learner',
      streakDays: 1,
      activeSkill: 'webdev',
      hasCompletedAssessment: false
    };
    saveUser(offlineUser);
    if (successBox) {
      successBox.style.display = 'flex';
      successBox.innerHTML = '<i class="fa-solid fa-circle-check"></i> Registration successful! Redirecting to login...';
    }
    setTimeout(() => { window.location.href = 'login.html'; }, 1500);
  }
}

function showRegError(msg) {
  const alertBox = document.getElementById('reg-alert');
  if (alertBox) {
    alertBox.style.display = 'flex';
    alertBox.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${msg}`;
  } else {
    alert(msg);
  }
}

async function handleLogin(e) {
  e.preventDefault();

  const alertBox = document.getElementById('login-alert');
  const submitBtn = document.getElementById('login-btn');
  if (alertBox) { alertBox.style.display = 'none'; alertBox.textContent = ''; }

  const emailElem = document.getElementById('login-email');
  const passwordElem = document.getElementById('login-password');

  const email = emailElem ? emailElem.value.trim() : '';
  const password = passwordElem ? passwordElem.value.trim() : '';

  if (!email || !password) {
    if (alertBox) {
      alertBox.style.display = 'flex';
      alertBox.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Please enter both email and password.';
    }
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Signing In...';
  }

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data.id) {
      saveUser(data);
      if (data.hasCompletedAssessment || data.hasCompletedAssessment === true) {
        window.location.href = 'dashboard.html';
      } else {
        window.location.href = 'skills.html';
      }
    } else {
      if (alertBox) {
        alertBox.style.display = 'flex';
        alertBox.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${data.message || 'Invalid email or password.'}`;
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-arrow-right-to-bracket"></i> Sign In to Dashboard';
      }
    }
  } catch (err) {
    const existing = appState.user;
    if (existing && existing.email && existing.email.toLowerCase() === email.toLowerCase()) {
      if (existing.hasCompletedAssessment) {
        window.location.href = 'dashboard.html';
      } else {
        window.location.href = 'skills.html';
      }
    } else {
      const demoUser = {
        id: 1,
        fullName: 'Alex Johnson',
        email: email,
        targetRole: 'Student Learner',
        streakDays: 5,
        activeSkill: 'webdev',
        hasCompletedAssessment: false
      };
      saveUser(demoUser);
      window.location.href = 'skills.html';
    }
  }
}

function handleLogout() {
  localStorage.removeItem('lpd_user');
  localStorage.removeItem('lpd_last_result');
  appState.user = null;
  window.location.href = 'login.html';
}

/* ==========================================================================
   2. DASHBOARD OVERVIEW (dashboard.html)
   ========================================================================== */
async function loadDashboardData() {
  if (!appState.user) {
    window.location.href = 'login.html';
    return;
  }

  updateHeaderAndUserUI();
  const user = appState.user;

  const titleElem = document.getElementById('welcome-title');
  if (titleElem && user.fullName) {
    titleElem.textContent = `Welcome Back, ${user.fullName.split(' ')[0]}! 👋`;
  }

  const skillNames = {
    webdev: 'Web Development',
    java: 'Java Fundamentals',
    python: 'Python Programming',
    datascience: 'Data Science & Analytics',
    ai: 'AI & Machine Learning'
  };

  const skillNameElem = document.getElementById('dash-active-skill-name');
  if (skillNameElem) {
    skillNameElem.textContent = skillNames[user.activeSkill] || user.activeSkill || 'Web Development';
  }

  const scoreElem = document.getElementById('dash-test-score');
  const scoreFill = document.getElementById('dash-test-score-fill');
  const scoreVal = user.testScore != null ? user.testScore : 70;
  if (scoreElem) scoreElem.textContent = `${scoreVal}%`;
  if (scoreFill) scoreFill.style.width = `${scoreVal}%`;

  // Calculate Overall Course Completion Percentage
  const completedLessons = JSON.parse(localStorage.getItem(`lpd_course_progress_${user.id}_${user.activeSkill}`)) || [];
  const coursePct = Math.min(100, Math.round((completedLessons.length / 4) * 100));

  const courseValElem = document.getElementById('dash-course-progress-val');
  const courseFillElem = document.getElementById('dash-course-progress-fill');
  if (courseValElem) courseValElem.textContent = `${coursePct}%`;
  if (courseFillElem) courseFillElem.style.width = `${coursePct}%`;

  // Weak Areas Display
  const weakContainer = document.getElementById('dash-weak-areas-list');
  const weakCountElem = document.getElementById('dash-weak-count');

  let weakList = [];
  if (user.weakAreas && user.weakAreas.trim()) {
    weakList = user.weakAreas.split(',').map(s => s.trim()).filter(Boolean);
  } else {
    const cachedResult = JSON.parse(localStorage.getItem('lpd_last_result')) || {};
    if (cachedResult.weakTopics && cachedResult.weakTopics.length > 0) {
      weakList = cachedResult.weakTopics;
    }
  }

  if (weakCountElem) weakCountElem.textContent = `${weakList.length} Detected`;

  if (weakContainer) {
    if (weakList.length > 0) {
      weakContainer.innerHTML = weakList.map(w => `
        <div style="display:flex; align-items:center; gap:10px; padding:10px 14px; background:#fef2f2; border:1px solid #fecaca; border-radius:8px; margin-bottom:8px; color:#991b1b; font-weight:500; font-size:0.88rem;">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <span>${w}</span>
        </div>
      `).join('');
    } else {
      weakContainer.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px; padding:12px 14px; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; color:#166534; font-weight:600; font-size:0.88rem;">
          <i class="fa-solid fa-circle-check"></i>
          <span>Great work! No critical weak areas detected in your assessment.</span>
        </div>
      `;
    }
  }

  // Recommended Courses Display with proper "Start Course" navigation to course.html
  const recContainer = document.getElementById('dash-recommended-courses-list');
  let recList = [];
  if (user.recommendedCourses && user.recommendedCourses.trim()) {
    recList = user.recommendedCourses.split('|').map(s => s.trim()).filter(Boolean);
  } else {
    const cachedResult = JSON.parse(localStorage.getItem('lpd_last_result')) || {};
    if (cachedResult.recommendedCourses && cachedResult.recommendedCourses.length > 0) {
      recList = cachedResult.recommendedCourses;
    }
  }

  if (recList.length === 0) {
    recList = [
      `Mastering ${skillNames[user.activeSkill] || 'Software Engineering'} - Deep Dive`,
      `Advanced Project Architecture & Best Practices`
    ];
  }

  if (recContainer) {
    recContainer.innerHTML = recList.map(r => `
      <div style="display:flex; align-items:center; justify-content:space-between; padding:12px 14px; background:var(--primary-subtle); border:1px solid var(--primary-light); border-radius:8px; margin-bottom:8px; color:var(--primary); font-size:0.88rem;">
        <div style="display:flex; align-items:center; gap:10px; font-weight:600;">
          <i class="fa-solid fa-graduation-cap"></i>
          <span>${r}</span>
        </div>
        <a href="course.html?skill=${user.activeSkill || 'webdev'}&title=${encodeURIComponent(r)}" class="btn btn-sm btn-primary" style="padding:4px 10px; font-size:0.78rem;">Start Course</a>
      </div>
    `).join('');
  }

  loadActiveSkillsList();
}

async function loadActiveSkillsList() {
  const container = document.getElementById('dash-active-skills-list');
  if (!container) return;

  const topics = [
    { id: 't1', title: 'Diagnostic Assessment Completed', status: 'Completed', icon: 'fa-circle-check', badge: 'badge-beginner' },
    { id: 't2', title: 'Targeted Weak Area Deep-Dive Modules', status: 'In Progress', icon: 'fa-spinner', badge: 'badge-intermediate' },
    { id: 't3', title: 'Final AI-Proctored Certification Exam', status: 'Upcoming', icon: 'fa-shield-halved', badge: 'badge-advanced' }
  ];

  container.innerHTML = topics.map(t => `
    <div class="topic-card">
      <div style="display:flex; align-items:center; gap:14px;">
        <div class="skill-icon-box" style="width:40px; height:40px; font-size:1.1rem; margin-bottom:0;">
          <i class="fa-solid ${t.icon}"></i>
        </div>
        <div>
          <h4 style="font-size:0.95rem;">${t.title}</h4>
          <span class="difficulty-badge ${t.badge}">${t.status}</span>
        </div>
      </div>
      <a href="course.html?skill=${appState.user ? appState.user.activeSkill : 'webdev'}" class="btn btn-sm btn-outline">Start Lessons</a>
    </div>
  `).join('');
}

/* ==========================================================================
   3. SKILLS CATALOG & SELECTION (skills.html)
   ========================================================================== */
async function loadSkillsCatalogPage() {
  updateHeaderAndUserUI();
  const grid = document.getElementById('skills-catalog-grid');
  if (!grid) return;

  let skills = [];
  try {
    const res = await fetch(`${API_BASE}/skills`);
    if (res.ok) skills = await res.json();
  } catch (e) {
    skills = [
      { id: 'webdev', name: 'Web Development', icon: 'fa-code', difficultyLevel: 'Intermediate', badgeClass: 'badge-intermediate', description: 'Master HTML5, CSS3 Glassmorphic UI, JavaScript ES6+, DOM manipulation, and Async programming.', totalTopics: 12, estimatedHours: '24 hrs' },
      { id: 'python', name: 'Python Programming', icon: 'fa-brands fa-python', difficultyLevel: 'Beginner', badgeClass: 'badge-beginner', description: 'Learn core syntax, data structures, OOP, list comprehensions, decorators, and generators.', totalTopics: 10, estimatedHours: '18 hrs' },
      { id: 'java', name: 'Java Fundamentals', icon: 'fa-brands fa-java', difficultyLevel: 'Intermediate', badgeClass: 'badge-intermediate', description: 'Understand OOP principles, JVM memory architecture, Collections framework, and multithreading.', totalTopics: 14, estimatedHours: '30 hrs' },
      { id: 'datascience', name: 'Data Science & Analytics', icon: 'fa-chart-column', difficultyLevel: 'Intermediate', badgeClass: 'badge-intermediate', description: 'Master Pandas, NumPy array calculations, data cleaning, visualization, and exploratory analysis.', totalTopics: 12, estimatedHours: '28 hrs' },
      { id: 'ai', name: 'AI & Machine Learning', icon: 'fa-brain', difficultyLevel: 'Advanced', badgeClass: 'badge-advanced', description: 'Explore neural networks, loss functions, activation functions, transformers, and model metrics.', totalTopics: 15, estimatedHours: '36 hrs' }
    ];
  }

  grid.innerHTML = skills.map(s => `
    <div class="glass-card skill-card">
      <div>
        <div class="skill-icon-box"><i class="fa-solid ${s.icon}"></i></div>
        <span class="difficulty-badge ${s.badgeClass || 'badge-intermediate'}">${s.difficultyLevel || s.level}</span>
        <h3 style="font-family:var(--font-heading); margin:12px 0 6px;">${s.name}</h3>
        <p style="font-size:0.88rem; color:var(--text-muted); margin-bottom:16px;">${s.description}</p>
      </div>
      <div>
        <div style="display:flex; justify-content:space-between; font-size:0.8rem; color:var(--text-muted); margin-bottom:12px;">
          <span><i class="fa-solid fa-book-open"></i> ${s.totalTopics || 10} Modules</span>
          <span><i class="fa-solid fa-clock"></i> ${s.estimatedHours || '20 hrs'}</span>
        </div>
        <button class="btn btn-primary btn-block" onclick="startSkillQuiz('${s.id}')">
          <i class="fa-solid fa-vial"></i> Select Skill & Take Test
        </button>
      </div>
    </div>
  `).join('');
}

async function startSkillQuiz(skillId) {
  if (appState.user) {
    appState.user.activeSkill = skillId;
    saveUser(appState.user);

    try {
      await fetch(`${API_BASE}/auth/select-skill/${appState.user.id}?skillId=${skillId}`, { method: 'POST' });
    } catch (e) {
      console.log('Skill updated locally');
    }
  }

  window.location.href = `quiz.html?skill=${skillId}`;
}

/* ==========================================================================
   4. QUIZ ENGINE & PROCTORING (quiz.html)
   ========================================================================== */
async function initQuizPage() {
  updateHeaderAndUserUI();
  const urlParams = new URLSearchParams(window.location.search);
  const skillId = urlParams.get('skill') || (appState.user ? appState.user.activeSkill : 'webdev') || 'webdev';
  const isExam = urlParams.get('type') === 'exam';

  const user = appState.user || { id: 1 };

  // CHECK SUBTOPICS / COURSE LESSONS COMPLETION BEFORE UNLOCKING FINAL EXAM
  if (isExam) {
    const completedLessons = JSON.parse(localStorage.getItem(`lpd_course_progress_${user.id}_${skillId}`)) || [];
    const totalLessons = (typeof APP_DATA !== 'undefined' && APP_DATA.courseLessons && APP_DATA.courseLessons.default) ? APP_DATA.courseLessons.default.length : 4;
    const isCourseCompleted = completedLessons.length >= totalLessons;

    const examLockBox = document.getElementById('exam-course-locked-box');
    const camGate = document.getElementById('cam-gate-box');
    const quizBox = document.getElementById('quiz-questions-box');

    if (!isCourseCompleted) {
      if (examLockBox) {
        examLockBox.style.display = 'block';
        const lockText = document.getElementById('exam-lock-progress-text');
        if (lockText) lockText.textContent = `Lessons Completed: ${completedLessons.length} of ${totalLessons} (${Math.round((completedLessons.length / totalLessons) * 100)}%)`;
        const btnGo = document.getElementById('btn-go-to-course');
        if (btnGo) btnGo.href = `course.html?skill=${skillId}`;
      }
      if (camGate) camGate.style.display = 'none';
      if (quizBox) quizBox.style.display = 'none';
      return; // Stop execution - Exam is locked until all subtopics finished!
    } else {
      if (examLockBox) examLockBox.style.display = 'none';
    }
  }

  let questions = [];
  try {
    const endpoint = isExam ? `${API_BASE}/quizzes/final-exam` : `${API_BASE}/quizzes/${skillId}`;
    const res = await fetch(endpoint);
    if (res.ok) {
      const dbQuestions = await res.json();
      questions = dbQuestions.map(q => ({
        id: q.id,
        question: q.questionText,
        options: [q.optionA, q.optionB, q.optionC, q.optionD],
        correct: q.correctOption,
        topic: q.topicCategory
      }));
    }
  } catch (e) {
    console.log('Quiz offline questions loaded');
  }

  // Guarantee 20 Questions for Final Exam
  if (isExam && (questions.length < 20)) {
    if (typeof APP_DATA !== 'undefined' && APP_DATA.finalExam && APP_DATA.finalExam.length >= 20) {
      questions = APP_DATA.finalExam;
    }
  }

  if (questions.length === 0) {
    questions = (typeof APP_DATA !== 'undefined' && APP_DATA.finalExam) ? APP_DATA.finalExam : [
      { id: 1, question: "Which CSS property achieves background blur in Glassmorphism?", options: ["filter: blur()", "backdrop-filter: blur()", "background-blur", "box-shadow"], correct: 1, topic: "CSS Layouts" }
    ];
  }

  appState.activeQuiz = {
    skillId: skillId,
    questions: questions,
    currentIdx: 0,
    userAnswers: new Array(questions.length).fill(null),
    secondsLeft: isExam ? 1200 : 450, // Exactly 20 minutes for Final Exam
    isFinalExam: isExam,
    timerInterval: null
  };

  const titleElem = document.getElementById('quiz-title');
  if (titleElem) {
    titleElem.textContent = isExam ? 'AI-Proctored Final Certification Exam (20 MCQs)' : `${skillId.toUpperCase()} Skill Diagnostic Assessment (${questions.length} Questions)`;
  }
  
  const camGate = document.getElementById('cam-gate-box');
  const quizBox = document.getElementById('quiz-questions-box');

  if (isExam) {
    if (camGate) camGate.style.display = 'block';
    if (quizBox) quizBox.style.display = 'none';
  } else {
    if (camGate) camGate.style.display = 'none';
    if (quizBox) quizBox.style.display = 'block';
    startQuizTimer();
    renderQuizQuestion();
  }
}

function initiateCameraProctoring() {
  const camErr = document.getElementById('cam-error-box');
  const camGate = document.getElementById('cam-gate-box');
  const quizBox = document.getElementById('quiz-questions-box');

  if (camErr) camErr.style.display = 'none';

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        appState.webcamStream = stream;
        const videoElem = document.getElementById('proctor-webcam');
        if (videoElem) videoElem.srcObject = stream;
        const winElem = document.getElementById('proctor-cam-window');
        if (winElem) winElem.classList.add('active');
        if (camGate) camGate.style.display = 'none';
        if (quizBox) quizBox.style.display = 'block';
        startQuizTimer();
        renderQuizQuestion();
      })
      .catch(err => {
        if (camErr) {
          camErr.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Camera permission is required to take the final assessment. Permission was denied or unavailable.';
          camErr.style.display = 'block';
        }
        if (quizBox) quizBox.style.display = 'none';
      });
  } else {
    if (camErr) {
      camErr.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Browser does not support media device camera access.';
      camErr.style.display = 'block';
    }
    if (quizBox) quizBox.style.display = 'none';
  }
}

function startQuizTimer() {
  const display = document.getElementById('quiz-clock');
  if (appState.activeQuiz.timerInterval) clearInterval(appState.activeQuiz.timerInterval);

  appState.activeQuiz.timerInterval = setInterval(() => {
    appState.activeQuiz.secondsLeft--;
    const mins = Math.floor(appState.activeQuiz.secondsLeft / 60);
    const secs = appState.activeQuiz.secondsLeft % 60;
    if (display) display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    if (appState.activeQuiz.secondsLeft <= 0) {
      clearInterval(appState.activeQuiz.timerInterval);
      alert('Time expired! Auto-submitting assessment exam...');
      submitQuiz();
    }
  }, 1000);
}

function renderQuizQuestion() {
  const quiz = appState.activeQuiz;
  if (!quiz || quiz.questions.length === 0) return;

  const q = quiz.questions[quiz.currentIdx];

  const counterElem = document.getElementById('question-counter');
  if (counterElem) counterElem.textContent = `Question ${quiz.currentIdx + 1} of ${quiz.questions.length}`;

  const textElem = document.getElementById('question-text');
  if (textElem) textElem.textContent = `${quiz.currentIdx + 1}. ${q.question}`;

  const container = document.getElementById('options-container');
  if (container) {
    container.innerHTML = q.options.map((opt, idx) => `
      <div class="option-item ${quiz.userAnswers[quiz.currentIdx] === idx ? 'selected' : ''}" onclick="selectOption(${idx})">
        <div class="option-letter">${String.fromCharCode(65 + idx)}</div>
        <div style="font-weight:500;">${opt}</div>
      </div>
    `).join('');
  }

  const prevBtn = document.getElementById('btn-prev');
  if (prevBtn) prevBtn.disabled = quiz.currentIdx === 0;

  const isLast = quiz.currentIdx === quiz.questions.length - 1;
  const nextBtn = document.getElementById('btn-next');
  const submitBtn = document.getElementById('btn-submit');

  if (nextBtn) nextBtn.style.display = isLast ? 'none' : 'inline-flex';
  if (submitBtn) submitBtn.style.display = isLast ? 'inline-flex' : 'none';
}

function selectOption(idx) {
  appState.activeQuiz.userAnswers[appState.activeQuiz.currentIdx] = idx;
  renderQuizQuestion();
}

function navigateQuestion(dir) {
  appState.activeQuiz.currentIdx += dir;
  renderQuizQuestion();
}

async function submitQuiz() {
  if (appState.activeQuiz.timerInterval) clearInterval(appState.activeQuiz.timerInterval);
  if (appState.webcamStream) {
    appState.webcamStream.getTracks().forEach(t => t.stop());
  }

  const quiz = appState.activeQuiz;
  const userId = appState.user ? appState.user.id : 1;

  let evaluationResult = null;

  try {
    const res = await fetch(`${API_BASE}/quizzes/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userId,
        skillId: quiz.skillId,
        userAnswers: quiz.userAnswers,
        isFinalExam: quiz.isFinalExam
      })
    });

    if (res.ok) {
      evaluationResult = await res.json();
    }
  } catch (e) {
    console.log('Backend unreachable, calculating evaluation locally');
  }

  if (!evaluationResult) {
    let correctCount = 0;
    let weakTopics = [];
    quiz.questions.forEach((q, idx) => {
      if (quiz.userAnswers[idx] === q.correct) {
        correctCount++;
      } else {
        if (!weakTopics.includes(q.topic)) weakTopics.push(q.topic);
      }
    });
    const scorePct = Math.round((correctCount / quiz.questions.length) * 100);
    evaluationResult = {
      scorePercentage: scorePct,
      correctCount: correctCount,
      totalQuestions: quiz.questions.length,
      weakTopics: weakTopics,
      recommendedCourses: weakTopics.map(w => `Mastering ${w} - Deep Dive`),
      passed: scorePct >= 70,
      certificateCode: `CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`
    };
  }

  localStorage.setItem('lpd_last_result', JSON.stringify(evaluationResult));

  if (appState.user) {
    appState.user.hasCompletedAssessment = true;
    appState.user.testScore = evaluationResult.scorePercentage;
    appState.user.weakAreas = (evaluationResult.weakTopics || []).join(', ');
    appState.user.recommendedCourses = (evaluationResult.recommendedCourses || []).join(' | ');

    if (quiz.isFinalExam && evaluationResult.passed) {
      appState.user.completedExams = appState.user.completedExams || {};
      appState.user.completedExams[quiz.skillId] = {
        passed: true,
        score: evaluationResult.scorePercentage,
        date: new Date().toISOString().split('T')[0],
        code: evaluationResult.certificateCode || `CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`
      };
    }
    saveUser(appState.user);
  }

  if (quiz.isFinalExam) {
    window.location.href = `certificate.html?skill=${quiz.skillId}`;
  } else {
    window.location.href = 'dashboard.html';
  }
}

/* ==========================================================================
   5. COURSE CONTENT LEARNING PAGE (course.html)
   ========================================================================== */
function initCoursePage() {
  updateHeaderAndUserUI();
  const user = appState.user;
  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const skillId = urlParams.get('skill') || user.activeSkill || 'webdev';
  const customTitle = urlParams.get('title');

  const skillTitles = {
    webdev: 'Web Development',
    java: 'Java Fundamentals',
    python: 'Python Programming',
    datascience: 'Data Science & Analytics',
    ai: 'AI & Machine Learning'
  };

  const courseTitle = customTitle ? decodeURIComponent(customTitle) : `Mastering ${skillTitles[skillId] || 'Software Engineering'} - Deep Dive`;

  const lessons = (typeof APP_DATA !== 'undefined' && APP_DATA.courseLessons && APP_DATA.courseLessons.default) ? APP_DATA.courseLessons.default : [
    { id: 'les_1', title: 'Lesson 1: Foundations & Core Concepts', duration: '15 mins', videoUrl: 'https://www.youtube-nocookie.com/embed/WxsD08gWTVg', videoTitle: 'Core Architecture & Fundamental Mechanics', notes: '<p>Welcome! Study core concepts and basic setup.</p>', resources: [{ name: 'Docs', url: 'https://developer.mozilla.org/' }] }
  ];

  const savedCompleted = JSON.parse(localStorage.getItem(`lpd_course_progress_${user.id}_${skillId}`)) || [];

  appState.currentCourseState = {
    skillId: skillId,
    courseTitle: courseTitle,
    lessons: lessons,
    currentLessonIdx: 0,
    completedLessonIds: savedCompleted
  };

  const mainTitleElem = document.getElementById('course-main-title');
  if (mainTitleElem) mainTitleElem.textContent = courseTitle;

  const breadcrumbElem = document.getElementById('course-skill-breadcrumb');
  if (breadcrumbElem) breadcrumbElem.textContent = `${skillTitles[skillId] || skillId} Track • Interactive Learning Center`;

  renderLessonsSidebar();
  loadCourseLesson(0);
  updateCourseProgressUI();
}

function renderLessonsSidebar() {
  const container = document.getElementById('course-lessons-list');
  if (!container) return;

  const state = appState.currentCourseState;

  container.innerHTML = state.lessons.map((les, idx) => {
    const isDone = state.completedLessonIds.includes(les.id);
    const isActive = idx === state.currentLessonIdx;
    return `
      <div onclick="loadCourseLesson(${idx})" style="padding:12px 14px; border-radius:10px; cursor:pointer; transition:var(--transition); display:flex; align-items:center; justify-content:space-between; ${isActive ? 'background:var(--primary-subtle); border:1.5px solid var(--primary); font-weight:700;' : 'background:var(--bg-card-solid); border:1px solid var(--border-color);'}">
        <div style="display:flex; align-items:center; gap:10px; overflow:hidden;">
          <i class="${isDone ? 'fa-solid fa-circle-check text-green-500' : (isActive ? 'fa-solid fa-circle-play text-blue-600' : 'fa-regular fa-circle')}"></i>
          <span style="font-size:0.88rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${les.title}</span>
        </div>
        <span style="font-size:0.75rem; color:var(--text-muted);"><i class="fa-solid fa-clock"></i> ${les.duration}</span>
      </div>
    `;
  }).join('');
}

function loadCourseLesson(idx) {
  const state = appState.currentCourseState;
  if (idx < 0 || idx >= state.lessons.length) return;

  state.currentLessonIdx = idx;
  const les = state.lessons[idx];

  const tagElem = document.getElementById('lesson-number-tag');
  if (tagElem) tagElem.textContent = `Lesson ${idx + 1} of ${state.lessons.length}`;

  const titleElem = document.getElementById('lesson-title');
  if (titleElem) titleElem.textContent = les.title;

  const iframe = document.getElementById('lesson-video-iframe');
  if (iframe && les.videoUrl) iframe.src = les.videoUrl;

  const vOpenBtn = document.getElementById('btn-open-video-tab');
  if (vOpenBtn && les.videoUrl) vOpenBtn.href = les.videoUrl;

  const vTitle = document.getElementById('video-title');
  if (vTitle) vTitle.textContent = les.videoTitle || les.title;

  const vDuration = document.getElementById('video-duration');
  if (vDuration) vDuration.innerHTML = `<i class="fa-solid fa-clock"></i> ${les.duration}`;

  const notesElem = document.getElementById('lesson-notes-content');
  if (notesElem) notesElem.innerHTML = les.notes;

  const resElem = document.getElementById('lesson-resources-list');
  if (resElem && les.resources) {
    resElem.innerHTML = les.resources.map(r => `
      <a href="${r.url}" target="_blank" style="display:flex; align-items:center; gap:8px; text-decoration:none; color:var(--primary); font-weight:600; font-size:0.88rem; padding:6px 10px; background:#fff; border-radius:6px; border:1px solid var(--primary-light);">
        <i class="fa-solid fa-external-link"></i> ${r.name}
      </a>
    `).join('');
  }

  const isDone = state.completedLessonIds.includes(les.id);
  const btnMark = document.getElementById('btn-mark-completed');
  if (btnMark) {
    if (isDone) {
      btnMark.className = 'btn btn-sm btn-success';
      btnMark.innerHTML = '<i class="fa-solid fa-circle-check"></i> Completed ✓';
    } else {
      btnMark.className = 'btn btn-sm btn-outline';
      btnMark.innerHTML = '<i class="fa-regular fa-circle-check"></i> Mark as Completed';
    }
  }

  const prevBtn = document.getElementById('btn-prev-lesson');
  if (prevBtn) prevBtn.disabled = idx === 0;

  const nextBtn = document.getElementById('btn-next-lesson');
  if (nextBtn) {
    if (idx === state.lessons.length - 1) {
      nextBtn.innerHTML = 'Unlock Final Exam <i class="fa-solid fa-shield-halved"></i>';
    } else {
      nextBtn.innerHTML = 'Next Lesson <i class="fa-solid fa-arrow-right"></i>';
    }
  }

  renderLessonsSidebar();
}

async function toggleCurrentLessonCompletion() {
  const state = appState.currentCourseState;
  const user = appState.user;
  if (!user || !state.lessons[state.currentLessonIdx]) return;

  const lesId = state.lessons[state.currentLessonIdx].id;
  const idx = state.completedLessonIds.indexOf(lesId);

  if (idx > -1) {
    state.completedLessonIds.splice(idx, 1);
  } else {
    state.completedLessonIds.push(lesId);
  }

  localStorage.setItem(`lpd_course_progress_${user.id}_${state.skillId}`, JSON.stringify(state.completedLessonIds));

  try {
    await fetch(`${API_BASE}/path/toggle?userId=${user.id}&topicId=${lesId}&skillId=${state.skillId}`, { method: 'POST' });
  } catch (e) {
    console.log('Progress toggled locally');
  }

  loadCourseLesson(state.currentLessonIdx);
  updateCourseProgressUI();
}

function navigateLesson(dir) {
  const state = appState.currentCourseState;
  const newIdx = state.currentLessonIdx + dir;
  if (newIdx >= 0 && newIdx < state.lessons.length) {
    loadCourseLesson(newIdx);
  } else if (newIdx >= state.lessons.length) {
    window.location.href = `quiz.html?skill=${state.skillId}&type=exam`;
  }
}

function updateCourseProgressUI() {
  const state = appState.currentCourseState;
  const pct = Math.round((state.completedLessonIds.length / state.lessons.length) * 100);

  const textElem = document.getElementById('course-progress-text');
  if (textElem) textElem.textContent = `${pct}%`;

  const barElem = document.getElementById('course-progress-bar');
  if (barElem) barElem.style.width = `${pct}%`;
}

/* ==========================================================================
   6. LEARNING PATH & ROADMAP (learningpath.html)
   ========================================================================== */
async function loadLearningPathPage() {
  updateHeaderAndUserUI();
  const urlParams = new URLSearchParams(window.location.search);
  const skillId = urlParams.get('skill') || (appState.user ? appState.user.activeSkill : 'webdev') || 'webdev';

  let result = JSON.parse(localStorage.getItem('lpd_last_result')) || {
    scorePercentage: appState.user && appState.user.testScore ? appState.user.testScore : 75,
    weakTopics: appState.user && appState.user.weakAreas ? appState.user.weakAreas.split(', ') : ['Asynchronous Promises', 'CSS Grid Alignment'],
    strongTopics: ['HTML5 Syntax', 'DOM Manipulation']
  };

  const scoreElem = document.getElementById('analysis-score-pct');
  if (scoreElem) scoreElem.textContent = `${result.scorePercentage}%`;

  const weakList = document.getElementById('weak-topics-list');
  if (weakList && result.weakTopics) {
    weakList.innerHTML = result.weakTopics.map(t => `<li style="color:var(--danger); padding:6px 0;"><i class="fa-solid fa-triangle-exclamation"></i> ${t}</li>`).join('');
  }

  const strongList = document.getElementById('strong-topics-list');
  if (strongList && result.strongTopics) {
    strongList.innerHTML = result.strongTopics.map(t => `<li style="color:var(--success); padding:6px 0;"><i class="fa-solid fa-circle-check"></i> ${t}</li>`).join('');
  }

  renderRoadmapTopics(skillId);
}

function renderRoadmapTopics(skillId) {
  const container = document.getElementById('roadmap-cards-container');
  if (!container) return;

  const topics = [
    { id: 'wd_1', title: 'Phase 1: Fundamental Syntax & Core Concepts', duration: '2 hours', sub: 'Core syntax, variables, basic structures' },
    { id: 'wd_2', title: 'Phase 2: Target Weak Topic Remediation', duration: '4 hours', sub: 'Focused exercises on identified weak areas' },
    { id: 'wd_3', title: 'Phase 3: Advanced Optimization & Persistence', duration: '5 hours', sub: 'Memory architecture, API integration, State storage' }
  ];

  container.innerHTML = topics.map(t => `
    <div class="topic-card">
      <div>
        <h4>${t.title}</h4>
        <span style="font-size:0.8rem; color:var(--text-muted);"><i class="fa-solid fa-clock"></i> ${t.duration} • ${t.sub}</span>
      </div>
      <a href="course.html?skill=${skillId}&title=${encodeURIComponent(t.title)}" class="btn btn-sm btn-primary">Start Course</a>
    </div>
  `).join('');
}

/* ==========================================================================
   7. PROGRESS TRACKING (progress.html)
   ========================================================================== */
async function loadProgressPage() {
  updateHeaderAndUserUI();
  try {
    const res = await fetch(`${API_BASE}/progress/${appState.user ? appState.user.id : 1}`);
    if (res.ok) {
      const data = await res.json();
      document.getElementById('prog-overall-pct').textContent = `${data.overallPercentage}%`;
      document.getElementById('prog-topics-val').textContent = `${data.completedTopicsCount} Completed`;
      document.getElementById('prog-streak-val').textContent = `${data.streakDays} Days`;
      document.getElementById('prog-certs-val').textContent = `${data.certificatesEarned} Earned`;
    }
  } catch (e) {
    console.log('Progress stats offline fallback');
  }
}

/* ==========================================================================
   8. CERTIFICATE MODULE & LOCKED/UNLOCKED CHECK (certificate.html)
   ========================================================================== */
async function loadCertificatePage() {
  updateHeaderAndUserUI();
  const user = appState.user;
  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const paramSkill = urlParams.get('skill');

  const selector = document.getElementById('cert-skill-selector');
  let selectedSkill = paramSkill || (user ? user.activeSkill : 'webdev') || 'webdev';

  if (selector) {
    selector.value = selectedSkill;
  }

  await updateCertificateViewForSkill(selectedSkill);
}

async function onCertSkillChanged(skillId) {
  await updateCertificateViewForSkill(skillId);
}

async function updateCertificateViewForSkill(skillId) {
  const user = appState.user || { id: 1, fullName: 'Student Learner' };
  
  const skillTitles = {
    webdev: 'Web Development',
    java: 'Java Fundamentals',
    python: 'Python Programming',
    datascience: 'Data Science & Analytics',
    ai: 'AI & Machine Learning'
  };

  const skillTitle = skillTitles[skillId] || skillId;

  let certData = null;
  let isPassed = false;

  // 1. Check local storage completed exam attempts for this user and skill
  if (user.completedExams && user.completedExams[skillId] && user.completedExams[skillId].passed) {
    const ex = user.completedExams[skillId];
    isPassed = true;
    certData = {
      userName: user.fullName || 'Student Learner',
      skillName: skillTitle,
      finalScore: ex.score || 85,
      issueDate: ex.date || new Date().toISOString().split('T')[0],
      certificateCode: ex.code || `CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`
    };
  }

  // 2. Query backend API for verified certificate record
  if (!certData) {
    try {
      const res = await fetch(`${API_BASE}/certificate/user/${user.id}/skill/${skillId}`);
      if (res.ok) {
        const cert = await res.json();
        if (cert && cert.id) {
          isPassed = true;
          certData = {
            userName: cert.userName || user.fullName,
            skillName: cert.skillName || skillTitle,
            finalScore: cert.finalScore,
            issueDate: cert.issueDate,
            certificateCode: cert.certificateCode
          };
        }
      }
    } catch (e) {
      console.log('Certificate backend fetch offline fallback');
    }
  }

  // 3. Fallback check for last result if skill matches
  if (!certData) {
    const lastRes = JSON.parse(localStorage.getItem('lpd_last_result'));
    if (lastRes && lastRes.passed && (user.activeSkill === skillId || !skillId)) {
      isPassed = true;
      certData = {
        userName: user.fullName || 'Student Learner',
        skillName: skillTitle,
        finalScore: lastRes.scorePercentage || 90,
        issueDate: new Date().toISOString().split('T')[0],
        certificateCode: lastRes.certificateCode || `CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`
      };
    }
  }

  const lockedBox = document.getElementById('cert-locked-box');
  const unlockedBox = document.getElementById('cert-unlocked-box');

  if (!isPassed || !certData) {
    if (lockedBox) lockedBox.style.display = 'block';
    if (unlockedBox) unlockedBox.style.display = 'none';
  } else {
    if (lockedBox) lockedBox.style.display = 'none';
    if (unlockedBox) unlockedBox.style.display = 'block';

    const nameElem = document.getElementById('cert-user-name');
    if (nameElem) nameElem.textContent = certData.userName;

    const skillElem = document.getElementById('cert-skill-name');
    if (skillElem) skillElem.textContent = certData.skillName;

    const scoreElem = document.getElementById('cert-score');
    if (scoreElem) scoreElem.textContent = `${certData.finalScore}%`;

    const dateElem = document.getElementById('cert-date');
    if (dateElem) dateElem.textContent = certData.issueDate;

    const codeElem = document.getElementById('cert-code');
    if (codeElem) codeElem.textContent = certData.certificateCode;
  }
}

function downloadPDF() {
  const certNode = document.getElementById('printable-certificate');
  if (!certNode) return;
  html2canvas(certNode, { scale: 2 }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('landscape', 'pt', 'a4');
    pdf.addImage(imgData, 'PNG', 0, 0, 842, (canvas.height * 842) / canvas.width);
    pdf.save(`SkillPath_Certificate_${(appState.user ? appState.user.fullName : 'Student').replace(/\s+/g, '_')}.pdf`);
  });
}
