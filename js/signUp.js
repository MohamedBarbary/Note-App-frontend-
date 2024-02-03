document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Data to be sent to the API
    const formData = {
      userName: fullName,
      email: email,
      password: password,
      passwordConfirm: confirmPassword,
    };

    // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
    const apiUrl =
      "https://noteapi-production-a0e1.up.railway.app/api/users/signUp";

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
        // Handle the response from the API if needed
        console.log("Signup successful:", data);

        // Redirect or perform any other actions after successful signup
        window.location.href = "./verify.html";
      })
      .catch((error) => {
        console.error("There was an error with the signup:", error);
        // Handle errors or display error messages to the user
      });
  });
