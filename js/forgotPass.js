const submitMessage = document.querySelector(".additional-links");

document
  .getElementById("forgotPasswordForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;

    // Data to be sent to the API
    const formData = {
      email: email,
    };
    const apiUrl =
      "https://noteapi-production-a0e1.up.railway.app/api/users/forgotPassword";

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        submitMessage.textContent = "check your email to edit your password";
      })
      .catch((error) => {
        submitMessage.textContent = "something looks wrong";
      });
  });
