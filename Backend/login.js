function validerConnexion() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("Veuillez remplir tous les champs.");
        return false;
    }

    fetch('http://localhost:5678/api/users/login', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Email ou mot de passe incorrect.');
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem("token", data.token); // Stockage du token dans localStorage
        localStorage.setItem("editionMode", "true"); // Activation du mode d'édition
        window.location.href = "index.html"; // Redirection vers la page principale
    })
    .catch(error => {
        alert(error.message);
    });

    return false; // Empêche la soumission du formulaire par défaut
}

function updateLoginLink() {
    const loginLink = document.getElementById('login-link');
    if (!loginLink) {
        console.error('Element with ID "login-link" not found.');
        return;
    }

    const editionMode = localStorage.getItem("editionMode");

    if (editionMode === "true") {
        loginLink.textContent = 'Logout';
        loginLink.href = '#'; // Remplacez le lien pour empêcher la navigation
        loginLink.addEventListener('click', (event) => {
            event.preventDefault(); // Empêche le comportement par défaut du lien
            localStorage.removeItem('token');
            localStorage.setItem('editionMode', 'false');
            loginLink.textContent = 'Login';
            loginLink.href = 'page_connexion.html'; // Restaurez le lien de connexion
            window.location.href = "page_connexion.html"; // Redirection vers la page de login
        });
    } else {
        loginLink.textContent = 'Login';
        loginLink.href = 'page_connexion.html';
        loginLink.removeEventListener('click', handleLogoutClick);
    }
}

function handleLogoutClick(event) {
    event.preventDefault();
    localStorage.removeItem('token');
    localStorage.setItem('editionMode', 'false');
    const loginLink = document.getElementById('login-link');
    loginLink.textContent = 'Login';
    loginLink.href = 'page_connexion.html';
    window.location.href = "page_connexion.html";
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            validerConnexion();
        });
    }
    updateLoginLink();
});