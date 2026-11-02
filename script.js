
document.addEventListener("DOMContentLoaded", function () {

    // HAMBURGER MENU
    const hamburger = document.getElementById("hamburger");
    const nav = document.querySelector("nav");

    if (hamburger && nav) {
        hamburger.addEventListener("click", function () {

            const isOpen = nav.classList.toggle("menu-open");

            hamburger.setAttribute("aria-expanded", String(isOpen));

            console.log("Hamburger clicked. Menu open:", isOpen);
        });
    }

});

/* ENQUIRY FORM VALIDATION AND CONFIRMATION */
document.addEventListener("DOMContentLoaded", function () {
    const enquiryForm = document.getElementById("enquiryForm");

    if (!enquiryForm) {
        return;
    }

    const feedback = document.getElementById("formFeedback");
    const phoneInput = document.getElementById("phoneNumber");
    const dateInput = document.getElementById("preferredDate");
    const preferredTime = document.getElementById("preferredTime");
    const timeSlots = document.getElementById("timeSlots");

    // Set today's date as the earliest appointment date
    if (dateInput) {
        const today = new Date();
        const localDate = new Date(
            today.getTime() - today.getTimezoneOffset() * 60000
        ).toISOString().split("T")[0];

        dateInput.min = localDate;
    }
// APPOINTMENT TIME SELECTION
if (timeSlots && preferredTime) {
    const buttons = timeSlots.querySelectorAll(".time-slot");

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {

            // Remove selection from all time buttons
            buttons.forEach(function (slot) {
                slot.classList.remove("selected");
                slot.setAttribute("aria-pressed", "false");
            });

            // Select the clicked time
            button.classList.add("selected");
            button.setAttribute("aria-pressed", "true");

            // Save the selected time
            preferredTime.value = button.dataset.time;
        });
    });
}
    enquiryForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (feedback) {
            feedback.textContent = "";
            feedback.style.display = "none";
        }

        // Check required fields
        if (!enquiryForm.checkValidity()) {
            enquiryForm.reportValidity();
            return;
        }

        // Check appointment time
        if (preferredTime && !preferredTime.value) {
            alert("Please select your preferred appointment time.");

            if (timeSlots) {
                timeSlots.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
            return;
        }

        // Validate South African phone number
        if (phoneInput) {
            const phone = phoneInput.value.replace(/[\s-]/g, "");
            const phonePattern = /^(?:\+27|0)\d{9}$/;

            if (!phonePattern.test(phone)) {
                if (feedback) {
                    feedback.textContent =
                        "Please enter a valid South African phone number, e.g. 071 234 5678.";
                    feedback.style.display = "block";
                }

                phoneInput.focus();
                return;
            }
        }

        // Show confirmation message
        if (feedback) {
            feedback.textContent =
                "Thank you for your enquiry! This is a demo form, so your details have not been sent. Please contact Glow Beauty Studio to confirm your appointment.";

            feedback.style.display = "block";
            feedback.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }
    });
});

/* IMAGE LIGHTBOX */
document.addEventListener("DOMContentLoaded", function () {

    const lightbox = document.getElementById("imageLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeLightbox = document.getElementById("closeLightbox");

    if (!lightbox || !lightboxImage || !closeLightbox) {
        return;
    }

    // Open enlarged image when a service image is clicked
   const serviceImages = document.querySelectorAll(
    ".service-card img, .about-image img, main img"
);

    serviceImages.forEach(function (image) {
        image.addEventListener("click", function () {

            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;

            lightbox.classList.add("active");
            lightbox.setAttribute("aria-hidden", "false");
        });
    });

    // Close lightbox
    function closeImageLightbox() {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
        lightboxImage.src = "";
    }

    closeLightbox.addEventListener("click", closeImageLightbox);

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeImageLightbox();
        }
    });

    // Close using Escape key
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeImageLightbox();
        }
    });

});
/* BACK TO TOP BUTTON */
document.addEventListener("DOMContentLoaded", function () {
    const backToTop = document.getElementById("backToTop");

    if (!backToTop) {
        return;
    }

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    });

    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
