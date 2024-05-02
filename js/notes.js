const notesContainer = document.getElementById("notesContainer");

let apiUrl;
apiUrl =
  "https://noteapi-x6uf.onrender.com/api/v1/notes/getAllNotes";

function fetchNotes() {
  const cookies = document.cookie; // Read cookies from the browser
  const headers = new Headers({
    "Content-Type": "application/json",
    // Add any other headers if needed
    // "Authorization": "Bearer your_token",
  });

  // Check if there are cookies, and add them to the headers
  if (cookies) {
    headers.append("jwt", cookies);
  }

  fetch(apiUrl, {
    method: "GET",
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        const notes = data.notes; // Access the 'notes' array from the response

        console.log(notes);

        notesContainer.innerHTML = "";

        // Display fetched notes
        notes.forEach((note) => {
          if (note) {
            const noteId = `${note._id}`;
            const noteHtml = `
            <div class="note" id="${noteId}">
              <span class="title" contenteditable="true">${note.title}</span>
              <p class="description" contenteditable="true">${note.content}</p>
              <button class="delete-btn" onclick="deleteNote('${noteId}')">Delete</button>
              <button class="update-btn" onclick="updateNote('${noteId}')">Update</button>
            </div>
          `;

            notesContainer.innerHTML += noteHtml;
          }
        });
      } else {
        console.error("Error fetching notes:", data.error);
      }
    })
    .catch((error) => console.error("Error fetching notes:", error));
}

// Call fetchNotes when the page loads
window.addEventListener("load", fetchNotes);

function addNote() {
  const newNoteTitleElement = document.getElementById("newNoteTitle");
  const newNoteDescriptionElement =
    document.getElementById("newNoteDescription");

  const titleElement = document.createElement("span");
  titleElement.className = "title";
  titleElement.contentEditable = true;
  titleElement.textContent = newNoteTitleElement.value;

  const descriptionElement = document.createElement("p");
  descriptionElement.className = "description";
  descriptionElement.contentEditable = true;
  descriptionElement.textContent = newNoteDescriptionElement.value;

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-btn";
  deleteButton.textContent = "Delete";
  deleteButton.onclick = () => deleteNote(noteId);

  const updateButton = document.createElement("button");
  updateButton.className = "update-btn";
  updateButton.textContent = "Update";
  updateButton.onclick = () => updateNote(noteId);

  const noteId = `note${Date.now()}`;
  const noteElement = document.createElement("div");
  noteElement.className = "note";
  noteElement.id = noteId;

  noteElement.appendChild(titleElement);
  noteElement.appendChild(descriptionElement);
  noteElement.appendChild(deleteButton);
  noteElement.appendChild(updateButton);

  notesContainer.appendChild(noteElement);
  closeModal();

  // Clear input fields in the modal
  newNoteTitleElement.value = "";
  newNoteDescriptionElement.value = "";

  // Get the title and content
  const title = titleElement.textContent;
  const content = descriptionElement.textContent;

  // Check if both title and content are not empty before making the API call
  if (title.trim() !== "" && content.trim() !== "") {
    // Simulate API call for addition
    sendNoteToAPI({ title, content });
  }
}

// Function to send the note to the API
function sendNoteToAPI({ title, content }) {
  const apiUrl = "https://noteapi-x6uf.onrender.com/api/v1/notes"; // Replace with your API endpoint

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Failed to add note to the API.");
    })
    .then((data) => {
      console.log("Note added to API:", data);
    })
    .catch((error) => {
      console.error("Error adding note to API:", error);
    });
}
function deleteNote(noteId) {
  const noteElement = document.getElementById(noteId);
  const noteApiUrl =
    "https://noteapi-x6uf.onrender.com/api/v1/notes";

  // Check if data-id attribute exists
  const noteDataId = noteElement.getAttribute("id");
  if (!noteDataId) {
    console.error("ID attribute not found for the note element.");
    return;
  }

  // Send a request to the API to delete the note
  fetch(`${noteApiUrl}/${noteDataId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      // Add any other headers if needed
      // "Authorization": "Bearer your_token",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Failed to delete note from the API.");
    })
    .then((data) => {
      console.log("Note deleted from API:", data);
    })
    .catch((error) => {
      console.error("Error deleting note from API:", error);
    });

  // Remove the note from the DOM
  noteElement.remove();
}
function updateNote(noteId) {
  const noteElement = document.getElementById(noteId);
  const titleElement = noteElement.querySelector(".title");
  const descriptionElement = noteElement.querySelector(".description");
  const noteApiUrl =
    "https://noteapi-x6uf.onrender.com/api/v1/notes";

  // Check if data-id attribute exists
  const noteDataId = noteElement.getAttribute("id");
  if (!noteDataId) {
    console.error("ID attribute not found for the note element.");
    return;
  }

  const updatedTitle = titleElement.textContent;
  const updatedDescription = descriptionElement.textContent;

  // Send a request to the API to update the note
  fetch(`${noteApiUrl}/${noteDataId}`, {
    method: "PATCH", // or "PUT" depending on your server API
    headers: {
      "Content-Type": "application/json",
      // Add any other headers if needed
      // "Authorization": "Bearer your_token",
    },
    body: JSON.stringify({ title: updatedTitle, content: updatedDescription }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Failed to update note in the API.");
    })
    .then((data) => {
      console.log("Note updated in API:", data);
    })
    .catch((error) => {
      console.error("Error updating note in API:", error);
    });
}

function openModal() {
  const modal = document.getElementById("noteModal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("noteModal");
  modal.style.display = "none";
}
function logout() {
  // Delete the 'jwt' cookie
  document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // Use setTimeout to introduce a delay before redirecting
  setTimeout(() => {
    // Redirect to the login page
    window.location.href = "./index.html";

    // Use history.pushState to replace the current URL with the login URL
    history.pushState({}, "", "./index.html");
  }, 1000); // 1000 milliseconds (1 second) delay
}
