// Toggle Mobile Menu
function toggleMenu() {
    document.getElementById('navMenu').classList.toggle('show');
}

// Copy Link to Clipboard
function copyLink(url, nama) {
    navigator.clipboard.writeText(url).then(() => {
        showNotification(`✅ Link ${nama} berhasil disalin!`);
    }).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = url;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showNotification(`✅ Link ${nama} berhasil disalin!`);
    });
}

// Notification
function showNotification(message) {
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.textContent = message;
    notif.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #11998e;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 9999;
        animation: slideIn 0.3s;
    `;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

// Mark Complete (untuk tracking upload)
function markComplete(komponenNum) {
    const card = document.getElementById(`komponen-${komponenNum}`);
    const badge = document.getElementById(`status-${komponenNum}`);
    
    if (card && badge) {
        card.classList.add('uploaded');
        badge.classList.remove('pending');
        badge.classList.add('complete');
        badge.textContent = '✔️ Selesai';
        updateProgress();
        localStorage.setItem(`komponen-${komponenNum}`, 'complete');
    }
}

// Update Progress Bar
function updateProgress() {
    const total = 24;
    let completed = 0;
    for (let i = 1; i <= total; i++) {
        if (localStorage.getItem(`komponen-${String(i).padStart(2, '0')}`) === 'complete') {
            completed++;
        }
    }
    const progressEl = document.querySelector('.progress-bar strong');
    if (progressEl) {
        progressEl.textContent = `${completed}/${total}`;
    }
}

// Load saved progress on page load
document.addEventListener('DOMContentLoaded', () => {
    updateProgress();
    
    // Restore status badges
    for (let i = 1; i <= 24; i++) {
        const num = String(i).padStart(2, '0');
        if (localStorage.getItem(`komponen-${num}`) === 'complete') {
            const badge = document.getElementById(`status-${num}`);
            const card = document.getElementById(`komponen-${num}`);
            if (badge && card) {
                badge.classList.remove('pending');
                badge.classList.add('complete');
                badge.textContent = '✔️ Selesai';
                card.classList.add('uploaded');
            }
        }
    }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.querySelector('.menu-toggle');
    if (navMenu && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('show');
    }
});
