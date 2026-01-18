/* Cursor */
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});

/* =========================
   Magnetic Skill Buttons
========================= */

const skillButtons = document.querySelectorAll(".skill-btn");

skillButtons.forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
        if (window.innerWidth < 768) return;

        const rect = btn.getBoundingClientRect();
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
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: Math.random() * 0.5,
    dy: Math.random() * 0.5
}));

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x > canvas.width) p.x = 0;
        if (p.y > canvas.height) p.y = 0;
        ctx.fillStyle = "#38bdf8";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(animate);
}
animate();

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

document.addEventListener("DOMContentLoaded", () => {
    const textElement = document.getElementById("typewriter");
    // This matches the text you want from your previous request
    const textToType = "Building the future with Flutter, IoT, and Machine Learning.";
    let index = 0;

    function typeOnly() {
        if (textElement && index < textToType.length) {
            textElement.textContent += textToType.charAt(index);
            index++;
            setTimeout(typeOnly, 100);
        }
    }

    // Start the animation
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

