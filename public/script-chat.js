

const socket = io();
let currentUser = JSON.parse(localStorage.getItem("user"));

// Fonction send() globale pour onclick
window.send = function() {
    const text = document.getElementById("msg").value;
    if (!text) return;
    socket.emit("sendMessage", {
        sender: currentUser.username,
        role: currentUser.role,
        text
    });
    document.getElementById("msg").value = "";
};

// Fonction pour créer un élément de message
function createMessageElement(data) {
    const box = document.createElement("div");
    box.classList.add("message");
    box.classList.add(data.role); // "student" ou "admin"
    
    const time = new Date(data.time).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
    });
    
    // Format simple: nom de l'expéditeur, texte du message et heure
    box.innerHTML = `<b>${data.sender}</b> ${data.text} <span style="font-size: 11px; opacity: 0.8; margin-left: 8px;">${time}</span>`;
    return box;
}

// Fonction pour faire défiler vers le bas
function scrollToBottom() {
    const messagesContainer = document.getElementById("messages");
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Réception des nouveaux messages
socket.on("receiveMessage", data => {
    const box = createMessageElement(data);
    document.getElementById("messages").appendChild(box);
    scrollToBottom();
});

// Chargement des anciens messages lors de la connexion de l'utilisateur
socket.on("loadMessages", messages => {
    const container = document.getElementById("messages");
    container.innerHTML = "";
    messages.forEach(data => {
        const box = createMessageElement(data);
        container.appendChild(box);
    });
    scrollToBottom();
});

window.logout = function(){
    localStorage.removeItem("user");
    window.location.href = "/login";
}

// Support de la touche Enter pour envoyer le message
document.addEventListener('DOMContentLoaded', function() {
    const msgInput = document.getElementById("msg");
    if (msgInput) {
        msgInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                send();
            }
        });
    }
});
