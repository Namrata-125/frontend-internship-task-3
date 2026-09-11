/* =================================
   MOBILE NAVIGATION
================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
});


/* Close mobile menu when a link is clicked */

const navigationLinks = document.querySelectorAll(".nav-links a");

navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});


/* =================================
   DARK / LIGHT MODE
================================= */

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    const darkModeEnabled =
        document.body.classList.contains("dark-mode");

    if (darkModeEnabled) {
        themeToggle.textContent = "☀️";
        localStorage.setItem("theme", "dark");
    } else {
        themeToggle.textContent = "🌙";
        localStorage.setItem("theme", "light");
    }
});


/* =================================
   PROJECT FILTER
================================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const selectedFilter = button.dataset.filter;

        /* Update active button */

        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");


        /* Filter projects */

        projectCards.forEach((card) => {

            const category = card.dataset.category;

            if (
                selectedFilter === "all" ||
                category === selectedFilter
            ) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

});


/* =================================
   CONTACT FORM VALIDATION
================================= */

const contactForm = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

const formSuccess = document.getElementById("formSuccess");


contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    /* Clear previous messages */

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    formSuccess.textContent = "";

    let isValid = true;


    /* Name validation */

    if (nameInput.value.trim() === "") {

        nameError.textContent = "Please enter your name.";
        isValid = false;

    } else if (nameInput.value.trim().length < 2) {

        nameError.textContent =
            "Name must contain at least 2 characters.";

        isValid = false;
    }


    /* Email validation */

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailInput.value.trim() === "") {

        emailError.textContent =
            "Please enter your email.";

        isValid = false;

    } else if (!emailPattern.test(emailInput.value.trim())) {

        emailError.textContent =
            "Please enter a valid email address.";

        isValid = false;
    }


    /* Message validation */

    if (messageInput.value.trim() === "") {

        messageError.textContent =
            "Please enter your message.";

        isValid = false;

    } else if (messageInput.value.trim().length < 10) {

        messageError.textContent =
            "Message must contain at least 10 characters.";

        isValid = false;
    }


    /* Success */

    if (isValid) {

        formSuccess.textContent =
            "Message validated successfully! Thank you for contacting me.";

        contactForm.reset();

    }

});


/* =================================
   BACK TO TOP BUTTON
================================= */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =================================
   SCROLL REVEAL ANIMATION
================================= */

/*
   Add the reveal class automatically
   to sections and cards.
*/

const revealElements = document.querySelectorAll(
    ".section, .skill-card, .project-card, .contact-form"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});


const observer = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach((element) => {
    observer.observe(element);
});