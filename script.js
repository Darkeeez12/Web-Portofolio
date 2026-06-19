document.addEventListener('DOMContentLoaded', function() {

    const bootTextLines = [
        "ROBCO INDUSTRIES (TM) UNIFIED OPERATING SYSTEM", "COPYRIGHT 2075-2077 ROBCO INDUSTRIES", " ", "-SERVER 1-",
        "Initializing system",
        "Loading terminal protocols",
        "System loaded successfully"
    ];
    
    const bootTextElement = document.getElementById('boot-text');
    const loadingScreen = document.getElementById('loading-screen');
    const mainUI = document.getElementById('main-ui');
    const skipButton = document.getElementById('skip-button');

    let lineIndex = 0;
    let charIndex = 0;
    let isTyping = true;

    function completeLoading() {
        loadingScreen.style.display = 'none';
        mainUI.style.display = 'flex';
    }

    skipButton.addEventListener('click', () => {
        isTyping = false;
        bootTextElement.innerHTML = bootTextLines.join('<br>');
        setTimeout(completeLoading, 100);
    });

    function typeBoot() {
        if (!isTyping) return;
        
        if (lineIndex < bootTextLines.length) {
            const currentLine = bootTextLines[lineIndex];
            if (charIndex < currentLine.length) {
                bootTextElement.innerHTML += currentLine.charAt(charIndex);
                charIndex++;
                setTimeout(typeBoot, 35);
            } else {
                bootTextElement.innerHTML += '<br>';
                lineIndex++;
                charIndex = 0;
                setTimeout(typeBoot, 200);
            }
        } else {
            setTimeout(completeLoading, 300);
        }
    }
    typeBoot();

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    const soundToggle = document.getElementById('sound-toggle');
    const cliInput = document.getElementById('cli-input');
    const cliOutput = document.getElementById('cli-output');

    let soundEnabled = true;

    soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        soundToggle.textContent = soundEnabled ? '[ SND: ON ]' : '[ SND: OFF ]';
        playTerminalSound();
    });

    function playTerminalSound() {
        if (!soundEnabled) return;
        const audio = new Audio('Assets/PipBoy_Select.mp3');
        audio.volume = 0.8;
        audio.play().catch(() => {});
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

    cliInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const command = this.value.trim();
            if (command === '') return;

            printToCli(`guest@robco:~$ ${command}`);

            const args = command.split(' ');
            const cmd = args[0].toLowerCase();

            let shouldPlaySound = true;

            switch (cmd) {
                case 'help':
                    printToCli(
                        "Commands:\n" +
                        " help\n" +
                        " about\n" +
                        " skills\n" +
                        " projects\n" +
                        " certs\n" +
                        " clear\n" +
                        " sound [on/off]\n" +
                        " secret"
                    );
                    break;
                case 'about':
                    shouldPlaySound = false;
                    triggerNav('#about-me');
                    printToCli("Navigating to About Me...");
                    break;
                case 'skills':
                    shouldPlaySound = false;
                    triggerNav('#my-skills');
                    printToCli("Navigating to My Skills...");
                    break;
                case 'projects':
                    shouldPlaySound = false;
                    triggerNav('#my-projects');
                    printToCli("Navigating to My Projects...");
                    break;
                case 'certs':
                    shouldPlaySound = false;
                    triggerNav('#my-certifications');
                    printToCli("Navigating to My Certifications & Certificates...");
                    break;
                case 'clear':
                    cliOutput.innerHTML = '';
                    printToCli("Terminal cleared.\nType 'help' for commands.");
                    break;
                case 'sound':
                    shouldPlaySound = false;
                    if (args[1] === 'on') {
                        soundEnabled = true;
                        soundToggle.textContent = '[ SND: ON ]';
                        printToCli("Sound effects enabled.");
                        playTerminalSound();
                    } else if (args[1] === 'off') {
                        soundEnabled = false;
                        soundToggle.textContent = '[ SND: OFF ]';
                        printToCli("Sound effects disabled.");
                    } else {
                        printToCli(`Usage: sound [on/off]. Current status: ${soundEnabled ? 'ON' : 'OFF'}`);
                        playTerminalSound();
                    }
                    break;
                case 'secret':
                    printToCli(
                        "[VAULT-TEC DATA ACCESS GRANTED]\n" +
                        "===================================\n" +
                        "Vault 111 Status: Frozen\n" +
                        "Security Protocols: Active\n" +
                        "Remember: Preparedness is the key to survival!\n" +
                        "\"Better Life Underground\"\n" +
                        "==================================="
                    );
                    break;
                default:
                    printToCli(`Command not recognized: '${cmd}'. Type 'help' for instructions.`);
            }

            this.value = '';
            if (shouldPlaySound) playTerminalSound();
        }
    });

    function printToCli(text) {
        cliOutput.innerHTML += '\n' + text;
        cliOutput.scrollTop = cliOutput.scrollHeight;
    }

    function triggerNav(selector) {
        const link = document.querySelector(`nav a[href="${selector}"]`);
        if (link) {
            link.click();
        }
    }
});