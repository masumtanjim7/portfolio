/* Typing effect */
const text = "Flutter Developer | IoT Enthusiast | ML Learner";
let index = 0;
const typing = document.querySelector(".typing");

function type() {
    if (index < text.length) {
        typing.innerHTML += text.charAt(index);
        index++;
        setTimeout(type, 80);
    }
}
type();

/* Scroll animation */
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            el.classList.add("active");
        }
    });
});
