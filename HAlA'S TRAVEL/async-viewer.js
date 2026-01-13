const loadBtn = document.getElementById("loadUsersBtn");
const usersList = document.getElementById("usersList");
const loadingMessage = document.getElementById("loadingMessage");
const errorMessage = document.getElementById("errorMessage");

loadBtn.addEventListener("click", fetchUsers);

async function fetchUsers() {
    usersList.innerHTML = "";
    errorMessage.textContent = "";
    loadingMessage.textContent = "Loading users...";

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const users = await response.json();

        loadingMessage.textContent = "";

        users.slice(0, 5).forEach(user => {
            const li = document.createElement("li");
            li.textContent = `${user.name} | ${user.email} | ${user.address.city}`;
            usersList.appendChild(li);
        });

    } catch (error) {
        loadingMessage.textContent = "";
        errorMessage.textContent = "Error loading data. Please try again.";
        errorMessage.style.color = "red";
    }
}
