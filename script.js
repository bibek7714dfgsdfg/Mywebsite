// Asian Leaderboard - Full Manual v25 (0 LOGS)
const CONFIG = {
    indiaRoles: [
        "1493553907983585391", "1493553909434945536", "1493553910533591070", "1493555870344548352", "1493555870725050409",
        "1493555874457976912", "1493555875267219487", "1493555875778920581", "1493555876622106644", "1493555877276287098"
    ],
    nepalRoles: [
        "1493553877289533450", "1493553884512256000", "1493553889511739493", "1493553892875702322", "1493553896704966666",
        "1493553899024683048", "1493553899809013870", "1493553901604044922", "1493553902367412314", "1493553903239823390"
    ],
    // --- PUT NAMES AND PFP LINKS HERE ---
    manualData: {
        // INDIA
        "1493553907983585391": { name: "ExpectedDead", pfp: "" },
        "1493553909434945536": { name: "India Player 2", pfp: "" },
        "1493553910533591070": { name: "India Player 3", pfp: "" },
        "1493555870344548352": { name: "India Player 4", pfp: "" },
        "1493555870725050409": { name: "India Player 5", pfp: "" },
        "1493555874457976912": { name: "India Player 6", pfp: "" },
        "1493555875267219487": { name: "India Player 7", pfp: "" },
        "1493555875778920581": { name: "India Player 8", pfp: "" },
        "1493555876622106644": { name: "India Player 9", pfp: "" },
        "1493555877276287098": { name: "India Player 10", pfp: "" },

        // NEPAL
        "1493553877289533450": { name: "Nepal Player 1", pfp: "" },
        "1493553884512256000": { name: "Nepal Player 2", pfp: "" },
        "1493553889511739493": { name: "Nepal Player 3", pfp: "" },
        "1493553892875702322": { name: "Nepal Player 4", pfp: "" },
        "1493553896704966666": { name: "Nepal Player 5", pfp: "" },
        "1493553899024683048": { name: "Nepal Player 6", pfp: "" },
        "1493553899809013870": { name: "Nepal Player 7", pfp: "" },
        "1493553901604044922": { name: "Nepal Player 8", pfp: "" },
        "1493553902367412314": { name: "Nepal Player 9", pfp: "" },
        "1493553903239823390": { name: "Nepal Player 10" }
    },
    defaultPfp: "https://cdn.discordapp.com/embed/avatars/0.png"
};

function getPlayerData(userId) {
    const data = CONFIG.manualData[userId] || {};
    return {
        username: data.name || `ID: ${userId}`,
        avatar: data.pfp || CONFIG.defaultPfp,
        id: userId
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const indiaList = document.getElementById('india-list');
    const nepalList = document.getElementById('nepal-list');
    const profileOverlay = document.getElementById('profile-card');
    const closeBtn = document.querySelector('.close-btn');
    
    const tabs = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.ranking-section');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            sections.forEach(s => {
                s.classList.remove('active');
                if (s.id === `${target}-section`) s.classList.add('active');
            });
        });
    });

    const showProfile = (rank, country, userData) => {
        const nameEl = document.getElementById('player-name');
        nameEl.textContent = userData.username;
        
        if (rank === 1) {
            nameEl.classList.add('rainbow-text');
        } else {
            nameEl.classList.remove('rainbow-text');
        }

        document.getElementById('player-rank').textContent = `Top ${rank}`;
        document.getElementById('player-id-display').textContent = `ID: ${userData.id}`;
        document.getElementById('discord-pfp').src = userData.avatar;
        
        const banner = document.querySelector('.profile-banner');
        banner.style.backgroundImage = 'linear-gradient(135deg, #5865F2, #9333ea)';

        const rolesContainer = document.getElementById('player-roles');
        rolesContainer.innerHTML = `
            <div class="role-tag">
                <span class="role-dot" style="background: ${country === 'India' ? '#ff9933' : '#dc143c'}"></span>
                ${rank}. ${country}
            </div>
            <div class="role-tag">
                <span class="role-dot" style="background: #5865F2"></span>
                Member
            </div>
        `;
        profileOverlay.classList.add('active');
    };

    closeBtn.addEventListener('click', () => profileOverlay.classList.remove('active'));
    profileOverlay.addEventListener('click', (e) => {
        if (e.target === profileOverlay) profileOverlay.classList.remove('active');
    });

    function renderList(listElement, roles, country) {
        if (!listElement) return;
        listElement.innerHTML = '';

        roles.forEach((id, index) => {
            const rank = index + 1;
            const userData = getPlayerData(id);
            
            const item = document.createElement('div');
            item.className = 'list-item';
            const rainbowClass = rank === 1 ? 'rainbow-text' : '';
            
            item.innerHTML = `
                <span class="rank">Top ${rank}.</span>
                <span class="content ${rainbowClass}">${userData.username}</span>
            `;
            
            item.onclick = () => showProfile(rank, country, userData);
            listElement.appendChild(item);
        });
    }

    renderList(indiaList, CONFIG.indiaRoles, 'India');
    renderList(nepalList, CONFIG.nepalRoles, 'Nepal');
});
