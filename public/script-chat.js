

const socket = io();
let currentUser = JSON.parse(localStorage.getItem("user"));

// دالة send() global باش onclick يشوفها
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

// استقبال الرسائل الجديدة
socket.on("receiveMessage", data => {
    const box = document.createElement("div");
    const time = new Date(data.time).toLocaleTimeString();
    box.innerHTML = `<b>${data.sender} (${time}):</b> ${data.text}`;
    document.getElementById("messages").appendChild(box);
});

// تحميل الرسائل القديمة عند دخول المستخدم
socket.on("loadMessages", messages => {
    const container = document.getElementById("messages");
    container.innerHTML = "";
    messages.forEach(data => {
        const box = document.createElement("div");
        const time = new Date(data.time).toLocaleTimeString();
        box.innerHTML = `<b>${data.sender} (${time}):</b> ${data.text}`;
        container.appendChild(box);
    });
});

window.logout = function(){
    localStorage.removeItem("user");
    window.location.href = "/login";
}

socket.on("receiveMessage", data => {
    const box = document.createElement("div");
    box.classList.add("message");
    box.classList.add(data.role); // "student" أو "admin"
    const time = new Date(data.time).toLocaleTimeString();
    box.innerHTML = `<b>${data.sender} (${time}):</b> ${data.text}`;
    document.getElementById("messages").appendChild(box);
});
