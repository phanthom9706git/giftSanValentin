// Config
const POMODORO_SECONDS = 25 * 60; // 25min
const SNOOZE_SECONDS = 5 * 60; // 5min
const INIT_SECONDS = 5 * 60; // 5min

// Elements
const face = document.getElementById('face');
const title = document.getElementById('title');
const subtitle = document.getElementById('subtitle');
const startBtn = document.getElementById('startBtn');
const snoozeBtn = document.getElementById('snoozeBtn');
const countdownEl = document.getElementById('countdown');
const note = document.getElementById('note');
const confetti = document.getElementById('confetti');

let timer = null;
let remaining = POMODORO_SECONDS;

// Sequence: make it funny then transform to "Ponte a trabajar"
function showTransformation() {
    clearInterval(timer);
    face.classList.add('wiggle');
    title.textContent = "Ok, se terminó el descanso";
    subtitle.style.display = "none";
    snoozeBtn.style.display = "none";
    startBtn.style.display = "none";
    setTimeout(() => {
        face.classList.remove('wiggle');
        face.textContent = "🚀";
        face.classList.add('pulse');
        createConfetti(); // tiny celebratory pop
        countdownEl.style.display = 'block';
        note.style.display = 'block';
        countdownEl.style.display = "none";
        subtitle.textContent = "Pero ahora: ¡PONTE A TRABAJAR! 💪";
        subtitle.style.display = "block";
        startBtn.textContent = "Terminé por hoy";
        snoozeBtn.style.display = "block";
        startBtn.style.display = "block";
    }, 700);
}

// create simple confetti dots (CSS-only pieces)
function createConfetti() {
    confetti.innerHTML = '';
    const colors = ['#ffd166', '#06d6a0', '#118ab2', '#ef476f'];
    for (let i = 0; i < 8; i++) {
        const s = document.createElement('span');
        s.style.left = `${10 + Math.random() * 80}%`;
        s.style.top = `${10 + Math.random() * 60}%`;
        s.style.background = colors[i % colors.length];
        s.style.animationDelay = `${Math.random() * 300}ms`;
        s.style.transform = `translateY(-10px) rotate(${Math.random() * 360}deg)`;
        confetti.appendChild(s);
        // remove after animation
        setTimeout(() => s.remove(), 1200);
    }
}

// Countdown display
function formatTime(sec) {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
}

function startCountdown(seconds) {
    clearInterval(timer);
    remaining = seconds;
    countdownEl.textContent = formatTime(remaining);
    countdownEl.style.display = "block";
    timer = setInterval(() => {
        remaining--;
        countdownEl.textContent = formatTime(remaining);
        if (remaining <= 0) {
            showTransformation();
        }
    }, 1000);
}
function timeOver() {
    clearInterval(timer);
    face.textContent = "❤️";
    title.textContent = "¡Lo lograste mi amor!";
    subtitle.textContent = "Cierra todo y veamos una peli juntas a modo de premio ¿Quieres?";
    note.textContent = "Te amo 💕";
    snoozeBtn.style.display = "none";
    startBtn.style.display = "none";
    countdownEl.style.display = "none";
    // small confetti again
    createConfetti();
}

// Buttons
startBtn.addEventListener('click', () => {
    // Quick immediate transformation if not already transformed
    let cd = document.getElementById('countdown');
    console.log(cd.style.display)
    if (cd.style.display == 'block') {
        showTransformation();
        console.log("entre 1")
    } else {
        timeOver();
        console.log("entre 2")
    }
});

snoozeBtn.addEventListener('click', () => {
    // gentle snooze: give 5 minutes, then transform
    face.textContent = '😌';
    title.textContent = 'Ok, snooze activado... 5 minutos más';
    subtitle.textContent = 'Pero luego te voy a empujar otra vez. 😉';
    countdownEl.style.display = 'block';
    note.style.display = 'none';
    startBtn.textContent = "Volver al trabajo";
    clearInterval(timer);
    startCountdown(SNOOZE_SECONDS);
    // after snooze ends, auto-trigger transformation to full focus
    // handled by countdown reaching 0 (see startCountdown)
});

// Auto-transform after 2.5s so it's playful even if no click
setTimeout(() => {
    if (!timer) showTransformation();
}, 2500);

// Accessibility: keyboard enter starts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') startBtn.click();
    if (e.key === 's' || e.key === 'S') snoozeBtn.click();
});
// Accessibility: keyboard enter starts
document.addEventListener('DOMContentLoaded', (e) => {
    clearInterval(timer);
    snoozeBtn.style.display = "none";
    startCountdown(INIT_SECONDS);
});