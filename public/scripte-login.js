// Fonction de connexion
function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorEl = document.getElementById("error");

    
    errorEl.textContent = "";

    if (!username || !password) {
        errorEl.textContent = "Veuillez remplir tous les champs";
        return;
    }

    const loginBtn = document.querySelector(".login-btn");
    const originalText = loginBtn.innerHTML;
    
   
    loginBtn.disabled = true;
    loginBtn.innerHTML = '<span>Vérification en cours...</span>';
    loginBtn.style.opacity = '0.7';

    fetch("/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, password })
    })
    .then(res => res.text())
    .then(data => {
        if (data === "error") {
            errorEl.textContent = "Nom d'utilisateur ou mot de passe incorrect!";
            loginBtn.disabled = false;
            loginBtn.innerHTML = originalText;
            loginBtn.style.opacity = '1';
        } else {
            const user = JSON.parse(data);
            localStorage.setItem("user", JSON.stringify(user));
            
            // Masquer le message d'erreur en cas de succès
            errorEl.textContent = "";
            
            // Afficher le message de succès
            loginBtn.innerHTML = '<span>Connexion réussie!</span>';
            
            // Rediriger vers la page appropriée
            setTimeout(() => {
                if (user.role === "admin") {
                    window.location.href = "admin.html";
                } else {
                    window.location.href = "chat.html";
                }
            }, 500);
        }
    })
    .catch(err => {
        console.log(err);
        errorEl.textContent = "Une erreur s'est produite lors de la connexion au serveur";
        loginBtn.disabled = false;
        loginBtn.innerHTML = originalText;
        loginBtn.style.opacity = '1';
    });
}

// Support de la touche Enter pour envoyer le formulaire
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.login-container input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                login();
            }
        });
    });
});
