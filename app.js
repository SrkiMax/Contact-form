const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const genEnquiryDiv = document.querySelector(".general-enquiry-div");
const supportRequestDiv = document.querySelector(".support-request-div");
const genEnquiryRadio = document.getElementById("gen-enquiry");
const supportRequestRadio = document.getElementById("support-req");


const textarea = document.getElementById("textarea");
const consent = document.getElementById("consent");


const errorFirstName = document.querySelector(".error-first-name");
const errorLastName = document.querySelector(".error-last-name");
const errorEmail = document.querySelector(".error-email");
const errorQuery = document.querySelector(".error-query");
const errorTextarea = document.querySelector(".error-textarea");
const errorConsent = document.querySelector(".error-consent");


const submitBtn = document.querySelector(".btn");

const messageDiv = document.querySelector(".message-div");

const inputFields = [
    { input: firstName, error: errorFirstName },
    { input: lastName, error: errorLastName },
    { input: email, error: errorEmail },
    { input: textarea, error: errorTextarea }
];


const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};


const validateInputs = () => {
    inputFields.forEach(({ input, error }) => {
        if (input.value.trim() === "") {
            input.classList.add("input-required");
            error.style.display = "block";
            // Show on screenreader that the input is invalid
            input.setAttribute("aria-invalid", "true");
        } else {
            // Additional check for email
            if (input === email && !isValidEmail(input.value.trim())) {
                input.classList.add("input-required");
                error.style.display = "block";
                error.textContent = "Please enter a valid email address";
                // Show on screenreader that the input is invalid
                input.setAttribute("aria-invalid", "true");

                // Set placeholder to guide user
                input.placeholder = "email#example.com";
            } else {
                input.classList.remove("input-required");
                error.style.display = "none";

                input.removeAttribute("aria-invalid");

                // Reset placeholder if it was changed
                if (input === email) {
                    input.placeholder = "";
                }
            }
        }
    });
};

const validateRadios = () => {
    if (!genEnquiryRadio.checked && !supportRequestRadio.checked) {
        errorQuery.style.display = "block";
    } else {
        errorQuery.style.display = "none";
    }
};

const validateCheckbox = () => {
    if (!consent.checked) {
        errorConsent.style.display = "block"
    } else {
        errorConsent.style.display = "none"
    }
};

const resetForm = () => {
    inputFields.forEach(({ input, error }) => {
        input.value = "";
        genEnquiryRadio.checked = false;
        supportRequestRadio.checked = false;
        consent.checked = false;
    });
};


const form = document.querySelector("form");

submitBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent actual form submission

    validateInputs();
    validateRadios();
    validateCheckbox();

    /*Check if inputs are filled out, and a valid email is entered, and checkbox checked */

    const isFormValid = inputFields.every(({ input }) => input.value.trim() !== "") && isValidEmail(email.value.trim()) && (genEnquiryRadio.checked || supportRequestRadio.checked) && consent.checked;

    if (isFormValid) {
        /*Scroll the page to top, so the user can see the message*/
        window.scrollTo({ top: 0, behavior: 'smooth' });
        messageDiv.style.display = "flex";

        setTimeout(() => {
            messageDiv.style.display = "none";
        }, 3000)

        resetForm();

    } else {
        messageDiv.style.display = "none";
    }


});



genEnquiryRadio.addEventListener("change", () => {
    if (genEnquiryRadio.checked) {
        genEnquiryDiv.style.backgroundColor = "var(--Green-200)";
        supportRequestDiv.style.backgroundColor = "transparent";
    }
});

supportRequestRadio.addEventListener("change", () => {
    if (supportRequestRadio.checked) {
        supportRequestDiv.style.backgroundColor = "var(--Green-200)";
        genEnquiryDiv.style.backgroundColor = "transparent";
    }
});



/*Trap focus so keyboard user can not tab out of the form */

const trapFocus = (container) => {
    const focusableSelectors = 'input, button, textarea';
    const focusableEls = container.querySelectorAll(focusableSelectors);
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    container.addEventListener('keydown', (e) => {
        const isTab = e.key === 'Tab' || e.keyCode === 9;
        if (!isTab) return;

        if (e.shiftKey) { // Shift + Tab
            if (document.activeElement === firstEl) {
                e.preventDefault();
                lastEl.focus();
            }
        } else { // Tab
            if (document.activeElement === lastEl) {
                e.preventDefault();
                firstEl.focus();
            }
        }
    });
};

// Trap focus on the form
trapFocus(form);