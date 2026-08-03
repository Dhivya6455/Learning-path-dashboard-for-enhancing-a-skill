/* ==========================================================================
   LEARNING PATH DASHBOARD - FULL-STACK CLIENT JS
   Connects to Spring Boot REST APIs (/api/...) & H2/MySQL Database
   ========================================================================== */

const API_BASE = '/api';

// Retrieve User from LocalStorage safely (supporting structured & legacy keys)
function getUserFromStorage() {
  const userStr = localStorage.getItem('skillpathUser') || localStorage.getItem('lpd_user');
  try {
    return userStr ? JSON.parse(userStr) : null;
  } catch (e) {
    return null;
  }
}

// Current App State
let appState = {
  user: getUserFromStorage(),
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

// Save User to LocalStorage (Populating structured keys)
function saveUser(user) {
  if (!user) return;
  appState.user = user;
  localStorage.setItem('skillpathUser', JSON.stringify(user));
  localStorage.setItem('lpd_user', JSON.stringify(user));
  localStorage.setItem('isLoggedIn', 'true');
}

// Check Session Authentication Status
function isUserLoggedIn() {
  const loggedInFlag = localStorage.getItem('isLoggedIn');
  const user = getUserFromStorage();
  return loggedInFlag === 'true' && user !== null;
}

// Page Guard - Redirect based on Auth State
function checkAuthSession() {
  const path = window.location.pathname.toLowerCase();
  const pageName = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  const loggedIn = isUserLoggedIn();

  const protectedPages = [
    'dashboard.html', 'learningpath.html', 'course.html',
    'progress.html', 'quiz.html', 'certificate.html', 'skills.html'
  ];
  const authPages = ['login.html', 'register.html'];

  if (protectedPages.includes(pageName)) {
    if (!loggedIn) {
      window.location.href = 'login.html';
      return false;
    }
  } else if (authPages.includes(pageName)) {
    if (loggedIn) {
      window.location.href = 'dashboard.html';
      return false;
    }
  }
  return true;
}

// Global UI Updater for Header, Avatar, and Logout Events
function updateHeaderAndUserUI() {
  const user = appState.user || getUserFromStorage() || {
    fullName: 'Learner User',
    email: 'learner@skillpath.edu',
    targetRole: 'Student Learner',
    streakDays: 1,
    activeSkill: 'webdev'
  };

  const initials = user.fullName 
    ? user.fullName.split(' ').map(n => n[0]).join('').toUpperCase() 
    : 'LU';
  
  const avatarElem = document.getElementById('user-avatar-initials');
  if (avatarElem) avatarElem.textContent = initials;

  const sidebarAvatar = document.getElementById('sidebar-user-avatar');
  if (sidebarAvatar) sidebarAvatar.textContent = initials;

  const nameElem = document.getElementById('user-display-name');
  if (nameElem) nameElem.textContent = user.fullName;

  const sidebarName = document.getElementById('sidebar-user-name');
  if (sidebarName) sidebarName.textContent = user.fullName;

  const roleElem = document.getElementById('user-display-role');
  if (roleElem) roleElem.textContent = user.targetRole || 'Student Learner';

  const sidebarRole = document.getElementById('sidebar-user-role');
  if (sidebarRole) sidebarRole.textContent = user.targetRole || 'Student Learner';

  const streakElem = document.getElementById('header-streak-days');
  if (streakElem) streakElem.textContent = `${user.streakDays || 1} Day Streak`;

  // Attach logout handler to any nav logout buttons if present
  const navLogoutBtn = document.getElementById('btn-nav-logout');
  if (navLogoutBtn) {
    navLogoutBtn.onclick = (e) => {
      e.preventDefault();
      handleLogout();
    };
  }
}

document.addEventListener('DOMContentLoaded', () => {
  checkAuthSession();
  updateHeaderAndUserUI();
});

/* ==========================================================================
   PROGRESS TRACKING HELPERS (LESSONS & SUBTOPICS)
   ========================================================================== */

function getCompletedLessonIds(skillId) {
  const user = appState.user || getUserFromStorage() || { id: 1 };
  const targetSkill = skillId || (user ? user.activeSkill : 'webdev') || 'webdev';
  
  let list = JSON.parse(localStorage.getItem('completedLessonList')) ||
             JSON.parse(localStorage.getItem('completedLessons')) ||
             JSON.parse(localStorage.getItem(`lpd_course_progress_${user.id}_${targetSkill}`)) || [];
  return Array.isArray(list) ? list : [];
}

function saveCompletedLessonIds(skillId, list) {
  const user = appState.user || getUserFromStorage() || { id: 1 };
  const targetSkill = skillId || (user ? user.activeSkill : 'webdev') || 'webdev';
  const uniqueList = Array.from(new Set(list));
  
  localStorage.setItem('completedLessonList', JSON.stringify(uniqueList));
  localStorage.setItem('completedLessons', JSON.stringify(uniqueList));
  localStorage.setItem(`lpd_course_progress_${user.id}_${targetSkill}`, JSON.stringify(uniqueList));
}

function getSubtopicProgressForSkill(skillId) {
  const user = appState.user || getUserFromStorage() || { id: 1 };
  const targetSkill = skillId || (user ? user.activeSkill : 'webdev') || 'webdev';
  
  const lessons = (typeof APP_DATA !== 'undefined' && APP_DATA.courseLessons && APP_DATA.courseLessons[targetSkill]) 
    ? APP_DATA.courseLessons[targetSkill] 
    : ((typeof APP_DATA !== 'undefined' && APP_DATA.courseLessons && APP_DATA.courseLessons.webdev) ? APP_DATA.courseLessons.webdev : []);
    
  let allSubtopicIds = [];
  lessons.forEach(les => {
    if (les.subtopics) {
      les.subtopics.forEach(sub => {
        allSubtopicIds.push(typeof sub === 'object' ? sub.id : sub);
      });
    }
  });

  const savedCompletedSubtopics = JSON.parse(localStorage.getItem(`lpd_subtopics_progress_${user.id}_${targetSkill}`)) || [];
  
  const completedCount = allSubtopicIds.filter(id => savedCompletedSubtopics.includes(id)).length;
  const totalCount = allSubtopicIds.length || 1;
  const isComplete = (allSubtopicIds.length > 0) && (completedCount >= allSubtopicIds.length);
  const percentage = Math.min(100, Math.round((completedCount / totalCount) * 100));

  return {
    totalSubtopics: allSubtopicIds.length,
    completedSubtopics: completedCount,
    percentage: percentage,
    isComplete: isComplete,
    completedList: savedCompletedSubtopics
  };
}

function getCourseProgressForSkill(skillId) {
  const user = appState.user || getUserFromStorage() || { id: 1 };
  const targetSkill = skillId || (user ? user.activeSkill : 'webdev') || 'webdev';
  
  const lessons = (typeof APP_DATA !== 'undefined' && APP_DATA.courseLessons && APP_DATA.courseLessons[targetSkill]) 
    ? APP_DATA.courseLessons[targetSkill] 
    : ((typeof APP_DATA !== 'undefined' && APP_DATA.courseLessons && APP_DATA.courseLessons.webdev) ? APP_DATA.courseLessons.webdev : []);
    
  const totalLessons = lessons.length || 4;
  const savedLessonIds = getCompletedLessonIds(targetSkill);
  
  // Unique count of completed lessons
  const completedCount = lessons.filter(les => savedLessonIds.includes(les.id)).length;
  const lessonPercentage = totalLessons > 0 ? Math.min(100, Math.round((completedCount / totalLessons) * 100)) : 0;

  const subProg = getSubtopicProgressForSkill(targetSkill);

  // Overall percentage combining lessons and subtopics
  const finalPercentage = (completedCount >= totalLessons || subProg.isComplete) 
    ? 100 
    : Math.max(lessonPercentage, subProg.percentage);
    
  const isComplete = finalPercentage === 100;

  if (isComplete) {
    localStorage.setItem(`isExamUnlocked_${targetSkill}`, 'true');
    localStorage.setItem('isExamUnlocked', 'true');
  }

  return {
    totalLessons: totalLessons,
    completedLessons: completedCount,
    percentage: finalPercentage,
    isComplete: isComplete,
    completedList: savedLessonIds,
    subtopicsProgress: subProg
  };
}

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
  if (e) e.preventDefault();
  
  const alertBox = document.getElementById('reg-alert');
  const successBox = document.getElementById('reg-success');
  const submitBtn = document.getElementById('reg-btn');
  
  if (alertBox) { alertBox.style.display = 'none'; alertBox.textContent = ''; }
  if (successBox) { successBox.style.display = 'none'; successBox.textContent = ''; }

  const fullNameElem = document.getElementById('reg-fullname') || document.getElementById('reg-name');
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
  if (confirmPasswordElem && password !== confirmPassword) { showRegError('Passwords do not match. Please verify your password.'); return; }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Registering Account...';
  }

  let registeredUser = null;

  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, name: fullName, email, password, role: 'Student Learner' })
    });

    const data = await res.json().catch(() => ({}));
    if (res.ok && data.id) {
      registeredUser = data;
    }
  } catch (err) {
    console.log('Backend registration offline mode, logging in locally');
  }

  if (!registeredUser) {
    registeredUser = {
      id: Date.now(),
      fullName: fullName,
      email: email,
      targetRole: 'Student Learner',
      streakDays: 1,
      activeSkill: 'webdev',
      hasCompletedAssessment: false
    };
  }

  // AUTOMATICALLY LOG USER IN AFTER REGISTRATION
  saveUser(registeredUser);

  if (successBox) {
    successBox.style.display = 'flex';
    successBox.innerHTML = '<i class="fa-solid fa-circle-check"></i> Account created successfully! Logging you in...';
  }

  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 1000);
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
  if (e) e.preventDefault();

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

  let loggedInUser = null;

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json().catch(() => ({}));
    if (res.ok && data.id) {
      loggedInUser = data;
    }
  } catch (err) {
    console.log('Backend login offline mode');
  }

  if (!loggedInUser) {
    const existing = getUserFromStorage();
    if (existing && existing.email && existing.email.toLowerCase() === email.toLowerCase()) {
      loggedInUser = existing;
    } else {
      loggedInUser = {
        id: 1,
        fullName: 'Alex Johnson',
        email: email,
        targetRole: 'Student Learner',
        streakDays: 5,
        activeSkill: 'webdev',
        hasCompletedAssessment: false
      };
    }
  }

  saveUser(loggedInUser);
  window.location.href = 'dashboard.html';
}

// Logout function that clears ONLY auth session, NOT learning progress
function handleLogout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('skillpathUser');
  localStorage.removeItem('lpd_user');
  appState.user = null;
  window.location.href = 'login.html';
}

/* ==========================================================================
   2. DASHBOARD OVERVIEW (dashboard.html)
   ========================================================================== */
async function loadDashboardData() {
  if (!isUserLoggedIn()) {
    window.location.href = 'login.html';
    return;
  }

  updateHeaderAndUserUI();
  const user = appState.user || getUserFromStorage();
  if (!user) return;

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

  // Quiz / Diagnostic score sync
  const lastQuizResult = JSON.parse(localStorage.getItem('quizResults')) || JSON.parse(localStorage.getItem('lpd_last_result')) || {};
  const scoreVal = lastQuizResult.scorePercentage != null 
    ? lastQuizResult.scorePercentage 
    : (user.testScore != null ? user.testScore : 75);

  const scoreElem = document.getElementById('dash-test-score');
  const scoreFill = document.getElementById('dash-test-score-fill');
  if (scoreElem) scoreElem.textContent = `${scoreVal}%`;
  if (scoreFill) scoreFill.style.width = `${scoreVal}%`;

  // Calculate Course Progress Percentage
  const courseProg = getCourseProgressForSkill(user.activeSkill);
  const coursePct = courseProg.percentage;

  const courseValElem = document.getElementById('dash-course-progress-val');
  const courseFillElem = document.getElementById('dash-course-progress-fill');
  if (courseValElem) courseValElem.textContent = `${coursePct}%`;
  if (courseFillElem) courseFillElem.style.width = `${coursePct}%`;

  // Weak Areas Sync
  const weakContainer = document.getElementById('dash-weak-areas-list');
  const weakCountElem = document.getElementById('dash-weak-count');

  let weakList = [];
  if (lastQuizResult.weakTopics && Array.isArray(lastQuizResult.weakTopics)) {
    weakList = lastQuizResult.weakTopics;
  } else if (user.weakAreas && user.weakAreas.trim()) {
    weakList = user.weakAreas.split(',').map(s => s.trim()).filter(Boolean);
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

  // Recommended Courses Sync
  const recContainer = document.getElementById('dash-recommended-courses-list');
  let recList = [];
  if (lastQuizResult.recommendedCourses && Array.isArray(lastQuizResult.recommendedCourses) && lastQuizResult.recommendedCourses.length > 0) {
    recList = lastQuizResult.recommendedCourses;
  } else if (user.recommendedCourses && user.recommendedCourses.trim()) {
    recList = user.recommendedCourses.split('|').map(s => s.trim()).filter(Boolean);
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

  const user = appState.user || getUserFromStorage() || { activeSkill: 'webdev' };
  const courseProg = getCourseProgressForSkill(user.activeSkill);

  const topics = [
    { id: 't1', title: 'Diagnostic Assessment Completed', status: 'Completed', icon: 'fa-circle-check', badge: 'badge-beginner' },
    { id: 't2', title: `Course Module Progress (${courseProg.percentage}%)`, status: courseProg.percentage > 0 ? 'In Progress' : 'Not Started', icon: 'fa-spinner', badge: 'badge-intermediate' },
    { id: 't3', title: 'Final AI-Proctored Certification Exam', status: courseProg.isComplete ? 'Unlocked' : 'Locked', icon: 'fa-shield-halved', badge: 'badge-advanced' }
  ];

  container.innerHTML = topics.map(t => `
    <div class="topic-card" style="display:flex; align-items:center; justify-content:space-between; padding:14px 16px; background:var(--bg-card-solid); border:1px solid var(--border-color); border-radius:10px; margin-bottom:10px;">
      <div style="display:flex; align-items:center; gap:14px;">
        <div class="skill-icon-box" style="width:40px; height:40px; font-size:1.1rem; margin-bottom:0;">
          <i class="fa-solid ${t.icon}"></i>
        </div>
        <div>
          <h4 style="font-size:0.95rem; margin:0;">${t.title}</h4>
          <span class="difficulty-badge ${t.badge}" style="margin-top:4px; display:inline-block;">${t.status}</span>
        </div>
      </div>
      <a href="course.html?skill=${user.activeSkill || 'webdev'}" class="btn btn-sm btn-outline">Start Lessons</a>
    </div>
  `).join('');
}

/* ==========================================================================
   3. SKILLS CATALOG & SELECTION (skills.html)
   ========================================================================== */
async function loadSkillsCatalogPage() {
  if (!isUserLoggedIn()) {
    window.location.href = 'login.html';
    return;
  }
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
          <i class="fa-solid fa-vial"></i> Select Skill & Take Test (20 MCQs)
        </button>
      </div>
    </div>
  `).join('');
}

async function startSkillQuiz(skillId) {
  const user = appState.user || getUserFromStorage();
  if (user) {
    user.activeSkill = skillId;
    saveUser(user);

    try {
      await fetch(`${API_BASE}/auth/select-skill/${user.id}?skillId=${skillId}`, { method: 'POST' });
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
  if (!isUserLoggedIn()) {
    window.location.href = 'login.html';
    return;
  }

  updateHeaderAndUserUI();
  const urlParams = new URLSearchParams(window.location.search);
  const user = appState.user || getUserFromStorage() || { id: 1, activeSkill: 'webdev' };
  const skillId = urlParams.get('skill') || user.activeSkill || 'webdev';
  const isExam = urlParams.get('type') === 'exam';

  // STRICT FINAL EXAM UNLOCK GUARD
  if (isExam) {
    const courseProg = getCourseProgressForSkill(skillId);

    const examLockBox = document.getElementById('exam-course-locked-box');
    const camGate = document.getElementById('cam-gate-box');
    const quizBox = document.getElementById('quiz-questions-box');

    if (!courseProg.isComplete && localStorage.getItem(`isExamUnlocked_${skillId}`) !== 'true') {
      if (examLockBox) {
        examLockBox.style.display = 'block';
        const lockText = document.getElementById('exam-lock-progress-text');
        if (lockText) {
          lockText.textContent = `Course Lessons & Subtopics Completed: ${courseProg.completedLessons} of ${courseProg.totalLessons} (${courseProg.percentage}%)`;
        }
        const btnGo = document.getElementById('btn-go-to-course');
        if (btnGo) btnGo.href = `course.html?skill=${skillId}`;
      }
      if (camGate) camGate.style.display = 'none';
      if (quizBox) quizBox.style.display = 'none';
      return; // Stop execution if course is not 100% finished
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
      if (dbQuestions && dbQuestions.length >= 20) {
        questions = dbQuestions.map(q => ({
          id: q.id,
          question: q.questionText,
          options: [q.optionA, q.optionB, q.optionC, q.optionD],
          correct: q.correctOption,
          topic: q.topicCategory
        }));
      }
    }
  } catch (e) {
    console.log('Quiz offline questions loaded');
  }

  if (questions.length < 20) {
    if (typeof APP_DATA !== 'undefined') {
      if (isExam && APP_DATA.finalExam && APP_DATA.finalExam.length >= 20) {
        questions = APP_DATA.finalExam;
      } else if (APP_DATA.quizzes && APP_DATA.quizzes[skillId] && APP_DATA.quizzes[skillId].length >= 20) {
        questions = APP_DATA.quizzes[skillId];
      } else if (APP_DATA.quizzes && APP_DATA.quizzes.webdev) {
        questions = APP_DATA.quizzes.webdev;
      }
    }
  }

  appState.activeQuiz = {
    skillId: skillId,
    questions: questions,
    currentIdx: 0,
    userAnswers: new Array(questions.length).fill(null),
    secondsLeft: 1200,
    isFinalExam: isExam,
    timerInterval: null
  };

  const titleElem = document.getElementById('quiz-title');
  if (titleElem) {
    titleElem.textContent = isExam 
      ? `AI-Proctored Final Certification Exam (${questions.length} MCQs)` 
      : `${skillId.toUpperCase()} Skill Assessment (${questions.length} Questions)`;
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
    if (!appState.activeQuiz) return;
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
  if (!appState.activeQuiz) return;
  appState.activeQuiz.userAnswers[appState.activeQuiz.currentIdx] = idx;
  renderQuizQuestion();
}

function navigateQuestion(dir) {
  if (!appState.activeQuiz) return;
  appState.activeQuiz.currentIdx += dir;
  renderQuizQuestion();
}

async function submitQuiz() {
  if (!appState.activeQuiz) return;
  if (appState.activeQuiz.timerInterval) clearInterval(appState.activeQuiz.timerInterval);
  if (appState.webcamStream) {
    appState.webcamStream.getTracks().forEach(t => t.stop());
  }

  const quiz = appState.activeQuiz;
  const user = appState.user || getUserFromStorage() || { id: 1 };
  const userId = user.id;

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
    console.log('Backend unreachable, evaluating locally');
  }

  // ACCURATE LOCAL EVALUATION LOGIC FIX
  if (!evaluationResult) {
    let correctCount = 0;
    let weakTopics = [];

    quiz.questions.forEach((q, idx) => {
      const userChoice = quiz.userAnswers[idx];
      if (userChoice !== null && userChoice !== undefined && Number(userChoice) === Number(q.correct)) {
        correctCount++;
      } else {
        if (q.topic && !weakTopics.includes(q.topic)) {
          weakTopics.push(q.topic);
        }
      }
    });

    const scorePct = Math.round((correctCount / quiz.questions.length) * 100);

    // If 100% correct, clear false weak areas
    if (correctCount === quiz.questions.length || scorePct === 100) {
      weakTopics = [];
    }

    const recCourses = weakTopics.length > 0 
      ? weakTopics.map(w => `Mastering ${w} - Deep Dive`) 
      : [];

    evaluationResult = {
      scorePercentage: scorePct,
      correctCount: correctCount,
      totalQuestions: quiz.questions.length,
      weakTopics: weakTopics,
      recommendedCourses: recCourses,
      passed: scorePct >= 75,
      certificateCode: `CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`
    };
  }

  // PERSIST TO STRUCTURED KEYS
  localStorage.setItem('quizResults', JSON.stringify(evaluationResult));
  localStorage.setItem('lpd_last_result', JSON.stringify(evaluationResult));

  if (quiz.isFinalExam) {
    localStorage.setItem('finalExamScore', evaluationResult.scorePercentage.toString());
    if (evaluationResult.passed) {
      localStorage.setItem('certificateEarned', 'true');
    }
  }

  if (user) {
    user.hasCompletedAssessment = true;
    user.testScore = evaluationResult.scorePercentage;
    user.weakAreas = (evaluationResult.weakTopics || []).join(', ');
    user.recommendedCourses = (evaluationResult.recommendedCourses || []).join(' | ');

    if (quiz.isFinalExam && evaluationResult.passed) {
      user.completedExams = user.completedExams || {};
      user.completedExams[quiz.skillId] = {
        passed: true,
        score: evaluationResult.scorePercentage,
        date: new Date().toISOString().split('T')[0],
        code: evaluationResult.certificateCode || `CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`
      };
    }
    saveUser(user);
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
  if (!isUserLoggedIn()) {
    window.location.href = 'login.html';
    return;
  }

  updateHeaderAndUserUI();
  const user = appState.user || getUserFromStorage();
  if (!user) return;

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

  const lessons = (typeof APP_DATA !== 'undefined' && APP_DATA.courseLessons && APP_DATA.courseLessons[skillId]) 
    ? APP_DATA.courseLessons[skillId] 
    : ((typeof APP_DATA !== 'undefined' && APP_DATA.courseLessons && APP_DATA.courseLessons.webdev) ? APP_DATA.courseLessons.webdev : []);

  const savedCompletedLessons = getCompletedLessonIds(skillId);

  appState.currentCourseState = {
    skillId: skillId,
    courseTitle: courseTitle,
    lessons: lessons,
    currentLessonIdx: 0,
    completedLessonIds: savedCompletedLessons
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
  if (!state || !state.lessons) return;

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
  if (!state || !state.lessons || idx < 0 || idx >= state.lessons.length) return;

  state.currentLessonIdx = idx;
  const les = state.lessons[idx];

  // Update dynamic lesson counter text (e.g. Lesson 1 of 4)
  const tagElem = document.getElementById('lesson-number-tag');
  if (tagElem) tagElem.textContent = `Lesson ${idx + 1} of ${state.lessons.length}`;

  const titleElem = document.getElementById('lesson-title');
  if (titleElem) titleElem.textContent = les.title;

  // HTML5 Video Setup
  const html5Player = document.getElementById('lesson-video-player');
  const mp4Src = document.getElementById('lesson-video-mp4-src');
  if (html5Player && mp4Src && les.mp4Url) {
    mp4Src.src = les.mp4Url;
    html5Player.load();
  }

  // YouTube Iframe Setup
  const iframe = document.getElementById('lesson-video-iframe');
  if (iframe && les.videoUrl) {
    iframe.src = les.videoUrl;
  }

  const vOpenBtn = document.getElementById('btn-open-video-tab');
  if (vOpenBtn) vOpenBtn.href = les.videoWatchUrl || les.videoUrl || '#';

  const vTitle = document.getElementById('video-title');
  if (vTitle) vTitle.textContent = les.videoTitle || les.title;

  const vDuration = document.getElementById('video-duration');
  if (vDuration) vDuration.innerHTML = `<i class="fa-solid fa-clock"></i> ${les.duration}`;

  // Render Subtopics Checklist
  renderSubtopicsChecklist(les);

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
      btnMark.innerHTML = '<i class="fa-solid fa-circle-check"></i> Lesson Completed ✓';
    } else {
      btnMark.className = 'btn btn-sm btn-outline';
      btnMark.innerHTML = '<i class="fa-regular fa-circle-check"></i> Mark Lesson Completed';
    }
  }

  const prevBtn = document.getElementById('btn-prev-lesson');
  if (prevBtn) prevBtn.disabled = idx === 0;

  const nextBtn = document.getElementById('btn-next-lesson');
  if (nextBtn) {
    if (idx === state.lessons.length - 1) {
      nextBtn.innerHTML = 'Finish Track & Unlock Exam <i class="fa-solid fa-shield-halved"></i>';
    } else {
      nextBtn.innerHTML = 'Next Lesson <i class="fa-solid fa-arrow-right"></i>';
    }
  }

  renderLessonsSidebar();
}

function switchVideoPlayerMode(mode) {
  const html5Box = document.getElementById('video-html5-container');
  const ytBox = document.getElementById('video-youtube-container');
  const btnHtml5 = document.getElementById('btn-tab-html5');
  const btnYt = document.getElementById('btn-tab-youtube');

  if (mode === 'youtube') {
    if (html5Box) html5Box.style.display = 'none';
    if (ytBox) ytBox.style.display = 'block';
    if (btnHtml5) { btnHtml5.className = 'btn btn-sm btn-outline'; btnHtml5.style.color = '#cbd5e1'; btnHtml5.style.borderColor = '#475569'; }
    if (btnYt) { btnYt.className = 'btn btn-sm btn-primary'; btnYt.style.color = '#fff'; btnYt.style.borderColor = 'var(--primary)'; }
  } else {
    if (html5Box) html5Box.style.display = 'block';
    if (ytBox) ytBox.style.display = 'none';
    if (btnHtml5) { btnHtml5.className = 'btn btn-sm btn-primary'; btnHtml5.style.color = '#fff'; btnHtml5.style.borderColor = 'var(--primary)'; }
    if (btnYt) { btnYt.className = 'btn btn-sm btn-outline'; btnYt.style.color = '#cbd5e1'; btnYt.style.borderColor = '#475569'; }
  }
}

function renderSubtopicsChecklist(les) {
  const container = document.getElementById('lesson-subtopics-list');
  const countElem = document.getElementById('lesson-subtopics-progress');
  if (!container || !les || !les.subtopics) return;

  const user = appState.user || getUserFromStorage() || { id: 1 };
  const skillId = appState.currentCourseState ? appState.currentCourseState.skillId : 'webdev';
  const savedCompletedSubtopics = JSON.parse(localStorage.getItem(`lpd_subtopics_progress_${user.id}_${skillId}`)) || [];

  let completedInLesson = 0;

  container.innerHTML = les.subtopics.map(sub => {
    const subId = typeof sub === 'object' ? sub.id : sub;
    const subTitle = typeof sub === 'object' ? sub.title : sub;
    const isChecked = savedCompletedSubtopics.includes(subId);
    if (isChecked) completedInLesson++;

    return `
      <label style="display:flex; align-items:center; gap:12px; padding:10px 14px; background:${isChecked ? '#f0fdf4' : '#fff'}; border:1px solid ${isChecked ? '#bbf7d0' : 'var(--border-color)'}; border-radius:8px; cursor:pointer; transition:var(--transition);">
        <input type="checkbox" ${isChecked ? 'checked' : ''} onchange="toggleSubtopicCompletion('${subId}')" style="width:18px; height:18px; accent-color:var(--primary); cursor:pointer;">
        <span style="font-size:0.92rem; font-weight:${isChecked ? '600' : '500'}; color:${isChecked ? '#166534' : 'var(--text-dark)'};">
          ${subTitle}
        </span>
        ${isChecked ? '<span style="margin-left:auto; font-size:0.75rem; color:#166534; font-weight:700;"><i class="fa-solid fa-check"></i> Finished</span>' : ''}
      </label>
    `;
  }).join('');

  if (countElem) {
    countElem.textContent = `${completedInLesson} of ${les.subtopics.length} Finished`;
  }
}

function toggleSubtopicCompletion(subId) {
  const user = appState.user || getUserFromStorage() || { id: 1 };
  const skillId = appState.currentCourseState ? appState.currentCourseState.skillId : 'webdev';
  let savedCompletedSubtopics = JSON.parse(localStorage.getItem(`lpd_subtopics_progress_${user.id}_${skillId}`)) || [];

  const idx = savedCompletedSubtopics.indexOf(subId);
  if (idx > -1) {
    savedCompletedSubtopics.splice(idx, 1);
  } else {
    savedCompletedSubtopics.push(subId);
  }

  localStorage.setItem(`lpd_subtopics_progress_${user.id}_${skillId}`, JSON.stringify(savedCompletedSubtopics));

  if (appState.currentCourseState && appState.currentCourseState.lessons) {
    loadCourseLesson(appState.currentCourseState.currentLessonIdx);
  }
  updateCourseProgressUI();
}

function openVideoModal() {
  const state = appState.currentCourseState;
  if (!state || !state.lessons || !state.lessons[state.currentLessonIdx]) return;
  const les = state.lessons[state.currentLessonIdx];

  const backdrop = document.getElementById('video-modal-backdrop');
  const modalPlayer = document.getElementById('modal-html5-player');
  const modalSrc = document.getElementById('modal-mp4-src');
  const modalTitle = document.getElementById('modal-video-title');
  const modalDirectBtn = document.getElementById('modal-direct-youtube-btn');

  if (modalPlayer && modalSrc && les.mp4Url) {
    modalSrc.src = les.mp4Url;
    modalPlayer.load();
    modalPlayer.play().catch(() => {});
  }
  if (modalTitle) modalTitle.textContent = les.videoTitle || les.title;
  if (modalDirectBtn) modalDirectBtn.href = les.videoWatchUrl || les.videoUrl || '#';
  if (backdrop) backdrop.style.display = 'flex';
}

function closeVideoModal() {
  const backdrop = document.getElementById('video-modal-backdrop');
  const modalPlayer = document.getElementById('modal-html5-player');
  if (modalPlayer) modalPlayer.pause();
  if (backdrop) backdrop.style.display = 'none';
}

async function toggleCurrentLessonCompletion() {
  const state = appState.currentCourseState;
  const user = appState.user || getUserFromStorage();
  if (!user || !state || !state.lessons[state.currentLessonIdx]) return;

  const les = state.lessons[state.currentLessonIdx];
  const lesId = les.id;
  const idx = state.completedLessonIds.indexOf(lesId);

  if (idx > -1) {
    state.completedLessonIds.splice(idx, 1);
  } else {
    state.completedLessonIds.push(lesId);
    // Automatically mark subtopics as checked when lesson is completed
    if (les.subtopics) {
      let savedSubtopics = JSON.parse(localStorage.getItem(`lpd_subtopics_progress_${user.id}_${state.skillId}`)) || [];
      les.subtopics.forEach(sub => {
        const subId = typeof sub === 'object' ? sub.id : sub;
        if (!savedSubtopics.includes(subId)) savedSubtopics.push(subId);
      });
      localStorage.setItem(`lpd_subtopics_progress_${user.id}_${state.skillId}`, JSON.stringify(savedSubtopics));
    }
  }

  saveCompletedLessonIds(state.skillId, state.completedLessonIds);

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
  if (!state || !state.lessons) return;
  const newIdx = state.currentLessonIdx + dir;

  if (newIdx >= 0 && newIdx < state.lessons.length) {
    loadCourseLesson(newIdx);
  } else if (newIdx >= state.lessons.length) {
    // Automatically check unlock status and open exam
    const courseProg = getCourseProgressForSkill(state.skillId);
    if (courseProg.isComplete) {
      window.location.href = `quiz.html?skill=${state.skillId}&type=exam`;
    } else {
      alert(`Please complete all lessons and subtopics (currently at ${courseProg.percentage}%) to unlock the final exam.`);
    }
  }
}

function updateCourseProgressUI() {
  const state = appState.currentCourseState;
  if (!state) return;
  const courseProg = getCourseProgressForSkill(state.skillId);
  const pct = courseProg.percentage;

  const textElem = document.getElementById('course-progress-text');
  if (textElem) textElem.textContent = `${pct}%`;

  const barElem = document.getElementById('course-progress-bar');
  if (barElem) barElem.style.width = `${pct}%`;
}

/* ==========================================================================
   6. LEARNING PATH & ROADMAP (learningpath.html)
   ========================================================================== */
async function loadLearningPathPage() {
  if (!isUserLoggedIn()) {
    window.location.href = 'login.html';
    return;
  }
  updateHeaderAndUserUI();
  const urlParams = new URLSearchParams(window.location.search);
  const user = appState.user || getUserFromStorage();
  const skillId = urlParams.get('skill') || (user ? user.activeSkill : 'webdev') || 'webdev';

  const lastQuizResult = JSON.parse(localStorage.getItem('quizResults')) || JSON.parse(localStorage.getItem('lpd_last_result')) || {};

  let score = lastQuizResult.scorePercentage != null 
    ? lastQuizResult.scorePercentage 
    : (user && user.testScore ? user.testScore : 75);

  let weakList = lastQuizResult.weakTopics && Array.isArray(lastQuizResult.weakTopics)
    ? lastQuizResult.weakTopics
    : (user && user.weakAreas ? user.weakAreas.split(', ') : ['CSS Grid Alignment', 'Asynchronous Promises']);

  const scoreElem = document.getElementById('analysis-score-pct');
  if (scoreElem) scoreElem.textContent = `${score}%`;

  const weakContainer = document.getElementById('weak-topics-list');
  if (weakContainer) {
    if (weakList.length > 0) {
      weakContainer.innerHTML = weakList.map(t => `<li style="color:var(--danger); padding:6px 0;"><i class="fa-solid fa-triangle-exclamation"></i> ${t}</li>`).join('');
    } else {
      weakContainer.innerHTML = `<li style="color:var(--success); padding:6px 0;"><i class="fa-solid fa-circle-check"></i> No weak topics detected!</li>`;
    }
  }

  const strongContainer = document.getElementById('strong-topics-list');
  if (strongContainer) {
    strongContainer.innerHTML = `
      <li style="color:var(--success); padding:6px 0;"><i class="fa-solid fa-circle-check"></i> Core Syntax & Semantics</li>
      <li style="color:var(--success); padding:6px 0;"><i class="fa-solid fa-circle-check"></i> DOM Manipulation Architecture</li>
    `;
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
    <div class="topic-card" style="display:flex; justify-content:space-between; align-items:center; padding:16px; background:var(--bg-card-solid); border:1px solid var(--border-color); border-radius:10px; margin-bottom:12px;">
      <div>
        <h4 style="margin:0 0 4px; font-size:1rem;">${t.title}</h4>
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
  if (!isUserLoggedIn()) {
    window.location.href = 'login.html';
    return;
  }
  updateHeaderAndUserUI();
  const user = appState.user || getUserFromStorage();
  const skillId = user ? user.activeSkill : 'webdev';

  const courseProg = getCourseProgressForSkill(skillId);

  const overallElem = document.getElementById('prog-overall-pct');
  if (overallElem) overallElem.textContent = `${courseProg.percentage}%`;

  const topicsElem = document.getElementById('prog-topics-val');
  if (topicsElem) topicsElem.textContent = `${courseProg.completedLessons} of ${courseProg.totalLessons} Completed`;

  const streakElem = document.getElementById('prog-streak-val');
  if (streakElem) streakElem.textContent = `${user ? (user.streakDays || 5) : 5} Days`;

  const certsElem = document.getElementById('prog-certs-val');
  if (certsElem) {
    const certEarned = localStorage.getItem('certificateEarned') === 'true';
    certsElem.textContent = certEarned ? '1 Earned' : '0 Earned';
  }
}

/* ==========================================================================
   8. CERTIFICATE MODULE & LOCKED/UNLOCKED CHECK (certificate.html)
   ========================================================================== */
async function loadCertificatePage() {
  if (!isUserLoggedIn()) {
    window.location.href = 'login.html';
    return;
  }
  updateHeaderAndUserUI();
  const user = appState.user || getUserFromStorage();
  if (!user) return;

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
  const user = appState.user || getUserFromStorage() || { id: 1, fullName: 'Student Learner' };
  
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

  const courseProg = getCourseProgressForSkill(skillId);

  // 1. Check User Object completedExams
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

  // 2. Check structured keys finalExamScore & certificateEarned
  if (!certData) {
    const examScoreStr = localStorage.getItem('finalExamScore');
    const isCertEarned = localStorage.getItem('certificateEarned') === 'true';
    if (isCertEarned || (examScoreStr && Number(examScoreStr) >= 75)) {
      const scoreNum = examScoreStr ? Number(examScoreStr) : 85;
      isPassed = true;
      certData = {
        userName: user.fullName || 'Student Learner',
        skillName: skillTitle,
        finalScore: scoreNum,
        issueDate: new Date().toISOString().split('T')[0],
        certificateCode: `CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`
      };
    }
  }

  // 3. Fallback check for last result
  if (!certData) {
    const lastRes = JSON.parse(localStorage.getItem('quizResults')) || JSON.parse(localStorage.getItem('lpd_last_result'));
    if (lastRes && lastRes.passed && (lastRes.scorePercentage >= 75)) {
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
    if (lockedBox) {
      lockedBox.style.display = 'block';
      const statusElem = document.getElementById('cert-lock-subtopics-status');
      if (statusElem) {
        statusElem.textContent = `Lessons & Subtopics Completed: ${courseProg.completedLessons} of ${courseProg.totalLessons} (${courseProg.percentage}%)`;
      }
      const courseBtn = document.getElementById('cert-lock-course-btn');
      if (courseBtn) courseBtn.href = `course.html?skill=${skillId}`;
      const examBtn = document.getElementById('cert-lock-exam-btn');
      if (examBtn) examBtn.href = `quiz.html?skill=${skillId}&type=exam`;
    }
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
  if (typeof html2canvas === 'undefined') {
    window.print();
    return;
  }
  html2canvas(certNode, { scale: 2 }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    if (window.jspdf && window.jspdf.jsPDF) {
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('landscape', 'pt', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, 842, (canvas.height * 842) / canvas.width);
      const user = appState.user || getUserFromStorage() || { fullName: 'Student' };
      pdf.save(`SkillPath_Certificate_${user.fullName.replace(/\s+/g, '_')}.pdf`);
    } else {
      window.print();
    }
  });
}
