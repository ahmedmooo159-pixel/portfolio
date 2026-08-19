/* ==========================================================================
   AHMED MOURAD PORTFOLIO INTERACTION LOGIC (script.js)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // Initialize Lucide Icons
    lucide.createIcons();

    /* ==========================================
       1. Custom Cursor Trail
       ========================================== */
    const cursor = document.getElementById("custom-cursor");
    const cursorDot = document.getElementById("custom-cursor-dot");
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Dot tracks mouse instantly
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });
    
    // Lerp loop for trailing outer circle
    function animateCursor() {
        // Linear interpolation (speed modifier 0.15 for smooth drag)
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Add hover states for interactive elements
    const interactives = document.querySelectorAll("a, button, .interactive-card, .project-card, input, textarea, .btn-copy");
    interactives.forEach(elem => {
        elem.addEventListener("mouseenter", () => {
            cursor.classList.add("hover");
        });
        elem.addEventListener("mouseleave", () => {
            cursor.classList.remove("hover");
        });
    });

    /* ==========================================
       2. Developer Terminal Preloader
       ========================================== */
    const preloader = document.getElementById("preloader");
    const consoleBody = document.getElementById("console-body");
    
    // Commands to simulate developer environment setup
    const loadingLines = [
        { text: "visitor@guest:~$ curl -s https://api.mourad.dev/profile", type: "cmd" },
        { text: "Fetching portfolio source code and credentials...", type: "log" },
        { text: "Connecting to delta-tech-university-network... [CONNECTED]", type: "success" },
        { text: "Resolving candidate academic year... Year 4 Software Track detected.", type: "log" },
        { text: "Loading C# & ASP.NET Core framework binaries...", type: "log" },
        { text: "Resolving Entity Framework & MSSQL modules... [SUCCESS]", type: "success" },
        { text: "Mounting portfolio projects:", type: "log" },
        { text: "  -> [0] sadat-playgrounds.exe", type: "log" },
        { text: "  -> [1] al-andalus-sports.config", type: "log" },
        { text: "  -> [2] flower-art-gallery.json", type: "log" },
        { text: "  -> [3] cms-administration-panel.dll", type: "log" },
        { text: "Building design assets and loading interactive particles...", type: "log" },
        { text: "Compiling code and stylesheets... [0 errors, 0 warnings]", type: "success" },
        { text: "visitor@guest:~$ dotnet run ahmed_mourad_portfolio", type: "cmd" },
        { text: "Hosting application at http://localhost:2026", type: "success" },
        { text: "Welcome to Ahmed Mourad's Portfolio. System is ready.", type: "success" }
    ];

    let lineIndex = 0;
    
    // Lock scrolling on page during preloader
    document.body.style.overflow = "hidden";

    function typeConsoleLine() {
        if (lineIndex < loadingLines.length) {
            const lineData = loadingLines[lineIndex];
            const lineElem = document.createElement("span");
            lineElem.className = "console-line";
            
            if (lineData.type === "cmd") {
                lineElem.innerHTML = `<span style="color: #ff007f;">➜</span> ${lineData.text}`;
            } else if (lineData.type === "success") {
                lineElem.innerHTML = `<span class="console-success">[ OK ]</span> ${lineData.text}`;
            } else {
                lineElem.innerHTML = `<span style="color: #64748b;">[ LOG ]</span> ${lineData.text}`;
            }
            
            consoleBody.appendChild(lineElem);
            consoleBody.scrollTop = consoleBody.scrollHeight;
            
            lineIndex++;
            // Dynamic typing delay based on context
            const delay = lineData.type === "cmd" ? 600 : 150;
            setTimeout(typeConsoleLine, delay);
        } else {
            // Setup finished, slide up and reveal page
            setTimeout(() => {
                preloader.style.opacity = "0";
                preloader.style.visibility = "hidden";
                document.body.style.overflow = ""; // restore scrolling
                
                // Trigger scroll animations immediately for visible elements
                reveal();
            }, 800);
        }
    }

    // Start loading simulator
    setTimeout(typeConsoleLine, 500);

    /* ==========================================
       3. Interactive Particles Canvas
       ========================================== */
    const canvas = document.getElementById("particles-canvas");
    const ctx = canvas.getContext("2d");
    
    let particlesArray = [];
    let particleCount = 80;
    
    // Resize Canvas to fit screen
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Adjust density on smaller viewports
        if (canvas.width < 768) {
            particleCount = 35;
        } else {
            particleCount = 80;
        }
        initParticles();
    }
    
    window.addEventListener("resize", resizeCanvas);
    
    // Mouse properties for particle interaction
    let mouse = {
        x: null,
        y: null,
        radius: 120
    };
    
    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    window.addEventListener("mouseleave", () => {
        mouse.x = null;
        mouse.y = null;
    });
    
    // Particle Blueprints
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        
        update() {
            // Check canvas boundaries
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }
            
            // Move particle
            this.x += this.directionX;
            this.y += this.directionY;
            
            // Mouse push interaction
            if (mouse.x != null && mouse.y != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx*dx + dy*dy);
                if (distance < mouse.radius + this.size) {
                    if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                        this.x += 3;
                    }
                    if (mouse.x > this.x && this.x > this.size * 10) {
                        this.x -= 3;
                    }
                    if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                        this.y += 3;
                    }
                    if (mouse.y > this.y && this.y > this.size * 10) {
                        this.y -= 3;
                    }
                }
            }
            
            this.draw();
        }
    }
    
    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < particleCount; i++) {
            let size = (Math.random() * 2) + 1.5;
            let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 0.4) - 0.2;
            let directionY = (Math.random() * 0.4) - 0.2;
            // Theme matching colors: Blue/Purple/Pink
            let colors = ["#00f2fe", "#9d4edd", "#ff007f"];
            let color = colors[Math.floor(Math.random() * colors.length)];
            
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }
    
    // Connect particles with network lines
    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x;
                let dy = particlesArray[a].y - particlesArray[b].y;
                let distance = Math.sqrt(dx*dx + dy*dy);
                
                if (distance < 110) {
                    opacityValue = 1 - (distance/110);
                    ctx.strokeStyle = `rgba(0, 242, 254, ${opacityValue * 0.15})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
        requestAnimationFrame(animateParticles);
    }
    
    resizeCanvas();
    animateParticles();

    /* ==========================================
       4. Rotating Roles Typewriter
       ========================================== */
    const roleText = document.getElementById("role-text");
    const roles = ["Full-Stack .NET Developer", "IT Software Student @ Delta Tech", "Modern Web Engine Creator"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeRoles() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            roleText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            roleText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typingSpeed = isDeleting ? 40 : 100;
        
        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing next word
        }
        
        setTimeout(typeRoles, typingSpeed);
    }
    
    setTimeout(typeRoles, 1500);

    /* ==========================================
       5. Scroll Reveal Effect & Active Nav Scroll
       ========================================== */
    const reveals = document.querySelectorAll(".reveal");
    
    function reveal() {
        const windowHeight = window.innerHeight;
        reveals.forEach(elem => {
            const elementTop = elem.getBoundingClientRect().top;
            const elementVisible = 100; // threshold
            
            if (elementTop < windowHeight - elementVisible) {
                elem.classList.add("active");
            }
        });
    }
    
    window.addEventListener("scroll", reveal);
    
    // Navbar visual style modifier on scroll
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
        
        // Update active nav links during scroll
        updateActiveNav();
    });
    
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");
    
    function updateActiveNav() {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute("id");
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").slice(1) === current) {
                link.classList.add("active");
            }
        });
    }

    /* ==========================================
       6. Mobile Navigation Drawer
       ========================================== */
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        menuToggle.classList.toggle("active");
    });
    
    // Close menu when clicking link
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
            menuToggle.classList.remove("active");
        });
    });

    /* ==========================================
       7. Clipboard Copy Actions
       ========================================== */
    const copyPhoneBtn = document.getElementById("btn-copy-phone");
    
    copyPhoneBtn.addEventListener("click", () => {
        const phoneNumber = "01091728680";
        
        // Copy using Clipboard API
        navigator.clipboard.writeText(phoneNumber).then(() => {
            copyPhoneBtn.classList.add("success");
            // Change icon temporarily to checkmark
            copyPhoneBtn.innerHTML = `<i data-lucide="check" style="width:16px;height:16px;"></i>`;
            lucide.createIcons();
            
            setTimeout(() => {
                copyPhoneBtn.classList.remove("success");
                copyPhoneBtn.innerHTML = `<i data-lucide="copy" style="width:16px;height:16px;"></i>`;
                lucide.createIcons();
            }, 2000);
        }).catch(err => {
            console.error("Could not copy number: ", err);
        });
    });

    /* ==========================================
       8. Simulated Form Submission
       ========================================== */
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");
    
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = document.getElementById("form-name").value;
        const email = document.getElementById("form-email").value;
        const msg = document.getElementById("form-msg").value;
        
        formStatus.textContent = "$ sending_packet_request --to server...";
        formStatus.className = "form-status font-mono";
        
        setTimeout(() => {
            formStatus.className = "form-status font-mono success";
            formStatus.innerHTML = `[ SUCCESS ] تم إرسال رسالتك يا ${name}. سأقوم بالرد على البريد الإلكتروني ${email} في أقرب وقت.`;
            contactForm.reset();
        }, 1500);
    });
});
