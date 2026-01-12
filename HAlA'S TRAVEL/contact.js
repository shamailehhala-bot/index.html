const contactForm = document.querySelector(".contact-form");
const userNameInput = document.querySelector(".user-name");
const formMessage = document.querySelector(".form-message");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const userName = userNameInput.value.trim();

    formMessage.classList.remove("error", "success");

    if (userName === "") {
        formMessage.textContent = "Please enter your name";
        formMessage.classList.add("error");
    } else {
        formMessage.textContent = "Message sent successfully!";
        formMessage.classList.add("success");
        userNameInput.value = "";
    }
});
