document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.cursor');
    setInterval(() => {
        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
    }, 800);

    const bootTextLines = [
        "ROBCO INDUSTRIES (TM) UNIFIED OPERATING SYSTEM", "COPYRIGHT 2075-2077 ROBCO INDUSTRIES", " ", "-SERVER 1-",
        "Initializing system",
        "Loading terminal protocols",
        "System loaded successfully"
    ];
    
    const bootTextElement = document.getElementById('boot-text');
    const loadingScreen = document.getElementById('loading-screen');
    const mainUI = document.getElementById('main-ui');

    let lineIndex = 0;
    let charIndex = 0;

    function typeBoot() {
        if (lineIndex < bootTextLines.length) {
            const currentLine = bootTextLines[lineIndex];
            if (charIndex < currentLine.length) {
                bootTextElement.innerHTML += currentLine.charAt(charIndex);
                charIndex++;
                setTimeout(typeBoot, 30);
            } else {
                bootTextElement.innerHTML += '<br>';
                lineIndex++;
                charIndex = 0;
                setTimeout(typeBoot, 300);
            }
        } else {
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                mainUI.style.display = 'flex';
            }, 500);
        }
    }
    typeBoot();

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            navLinks.forEach(nav => nav.classList.remove('active'));
            sections.forEach(sec => sec.classList.remove('active'));
            this.classList.add('active');
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).classList.add('active');
        });
    });

    function playTerminalSound() {
        const audio = new Audio('Assets/PipBoy_Select.mp3');
        audio.volume = 0.8;
        audio.play();
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            playTerminalSound();
            navLinks.forEach(nav => nav.classList.remove('active'));
            sections.forEach(sec => sec.classList.remove('active'));
            this.classList.add('active');
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).classList.add('active');
        });
    });

    document.querySelector('.resume-button').addEventListener('click', playTerminalSound);

    document.querySelectorAll('.social-icons a').forEach(icon => {
        icon.addEventListener('click', playTerminalSound);
    });
});