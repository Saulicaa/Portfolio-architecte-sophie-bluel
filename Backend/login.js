const users = [
    { email: "user1@example.com", password: "1", token: "123456" },
];

function validerConnexion(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email === "" || password === "") {
        alert("Veuillez remplir tous les champs.");
        return false;
    }

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem("token", user.token); // Stockage du token dans localStorage
        localStorage.setItem("editionMode", "true"); // Activation du mode d'édition
        window.location.href = "index.html"; // Redirection vers la page principale
        return true; // Connexion réussie, sortie de la fonction
    }

    alert("Email ou mot de passe incorrect.");
    return false; // Connexion échouée
}

function updateLoginLink() {
    const loginLink = document.querySelector('.login-link');
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
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateLoginLink();
    document.getElementById('login-form').addEventListener('submit', validerConnexion);
});