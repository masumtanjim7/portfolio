/* Cursor */
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const cursor = document.querySelector(".cursor");
if (cursor && canHover) {
    document.addEventListener("mousemove", e => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    });
} else if (cursor) {
    cursor.style.display = "none";
}

/* =========================
   Magnetic Skill Buttons
========================= */

const skillButtons = document.querySelectorAll(".skill-btn");


if (canHover) {
skillButtons.forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
        if (window.innerWidth < 768) return;

        const rect = btn.getBoundingClientRect();
        }
const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });

    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0,0)";
    });
});


/* Modal */
const modal = document.getElementById("projectModal");
const closeBtn = document.getElementById("modalClose");
const title = document.getElementById("modalTitle");
const desc = document.getElementById("modalDesc");
const link = document.getElementById("modalLink");

document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
        title.innerText = card.dataset.title;
        desc.innerText = card.dataset.desc;
        link.href = card.dataset.link;

        modal.classList.add("active");
    });


});

function closeModal() {
    modal.classList.remove("active");

}

closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
});

document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
});


/* Particles */
const canvas = document.getElementById("particles");

if (canvas) {
    const ctx = canvas.getContext("2d");

    function sizeCanvas() {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
    }
    sizeCanvas();

    // Keep the neon background on mobile, but make it lighter
    const isSmallScreen = window.innerWidth < 768;
    const particleCount = isSmallScreen ? 35 : 60;

    let particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        dx: Math.random() * 0.5,
        dy: Math.random() * 0.5
    }));

    // Cap FPS on small screens for smoother performance
    const fps = isSmallScreen ? 30 : 60;
    const frameMs = 1000 / fps;
    let last = 0;

    function animate(now = 0) {
        if (now - last < frameMs) {
            requestAnimationFrame(animate);
            return;
        }
        last = now;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#38bdf8";

        particles.forEach(p => {
            p.x += p.dx;
            p.y += p.dy;

            if (p.x > canvas.width) p.x = 0;
            if (p.y > canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener("resize", () => {
        sizeCanvas();
    }, { passive: true });
}


/* Section Reveal on Scroll */

const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll(".section").forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "all 0.6s ease-out";
    observer.observe(section);
});

// Existing code around line 115…
document.addEventListener("DOMContentLoaded", () => {
    const textElement = document.getElementById("typewriter");

    // Add or update this block starting at line 125:
    let textToType;
    if (window.innerWidth < 768) {
        // Mobile view: break the tagline into multiple lines
        textToType = "Full-Stack Flutter & Web Developer\nIoT • Machine Learning\nDeep Learning.";
    } else {
        // Desktop view: keep it on one line
        textToType = "Full-Stack Flutter & Web Developer • IoT • Machine Learning • Deep Learning.";
    }

    let index = 0;
    function typeOnly() {
        if (textElement && index < textToType.length) {
            textElement.textContent += textToType.charAt(index);
            index++;
            setTimeout(typeOnly, 100);
        }
    }
    typeOnly();
});

// Ensure this matches the new text from the reference image

// ... rest of your typing logic ...

const contactButtons = document.querySelectorAll(".contact-btn");

contactButtons.forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
        if (window.innerWidth < 768) return;

        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0,0)";
    });
});


document.querySelectorAll(".copy-icon").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const email = btn.dataset.email;
        const parentBtn = btn.closest(".contact-btn");
        const img = btn.querySelector("img");

        const copyIcon = "images/copy.png";
        const successIcon = "images/check.png";

        navigator.clipboard.writeText(email).then(() => {

            // Tooltip text
            parentBtn.classList.add("copied");

            // Change icon
            img.src = successIcon;
            btn.classList.add("success");

            setTimeout(() => {
                parentBtn.classList.remove("copied");
                btn.classList.remove("success");
                img.src = copyIcon;
            }, 1500);
        });
    });
});
/* =========================
   PROJECT FILTER LOGIC
========================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-card");

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;

        projects.forEach(project => {
            const category = project.dataset.category;

            if (filter === "all" || category === filter) {
                project.style.display = "flex";
                project.style.opacity = "1";
            } else {
                project.style.display = "none";
            }
        });
    });
});
/* =========================
   EMAILJS CONTACT FORM
========================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const btn = contactForm.querySelector("button");
        const originalText = btn.innerText;

        btn.innerText = "Sending...";
        btn.disabled = true;

        emailjs.sendForm(
            "service_3p9juhd",   // 🔁 Replace with your Service ID
            "template_aq3iakl",  // 🔁 Replace with your Template ID
            this
        )
            .then(() => {
                alert("Message sent successfully!");
                contactForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            })
            .catch((error) => {
                alert("Failed to send message. Please try again.");
                console.error("EmailJS Error:", error);
                btn.innerText = originalText;
                btn.disabled = false;
            });
    });
}

