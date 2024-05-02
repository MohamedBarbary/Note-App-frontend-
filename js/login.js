// login.js

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const loginError = document.getElementById("loginError");
    // Data to be sent to the API
    const formData = {
      email: email,
      password: password,
    };

    const apiUrl =
      "https://noteapi-x6uf.onrender.com/api/users/login";

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // withCredentials: true,
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        const token = data.token;

        // Set the token as a cookie
        document.cookie = `jwt=${token};`;
        window.location.href = "./notes.html";
      })
      .catch((error) => {
        console.error("There was an error with the login:", error);
        loginError.style.display = "block";
      });
  });
