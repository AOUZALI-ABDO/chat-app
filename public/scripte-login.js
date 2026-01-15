document.getElementById("btn").addEventListener("click", login);

function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("الرجاء إدخال جميع الحقول");
        return;
    }

    fetch("/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, password })
    })
    .then(res => res.text()) // لاحظ هنا text() وليس json() إذا السيرفر يرجع "error" أو نص
    .then(data => {
        if (data === "error") {
            alert("اسم المستخدم أو كلمة المرور غير صحيحة!");
        } else {
            const user = JSON.parse(data); // إذا السيرفر رجع JSON
            localStorage.setItem("user", JSON.stringify(user));
            if (user.role === "admin") {
                window.location.href = "admin.html";
            } else {
                window.location.href = "chat.html";
            }
        }
    })
    .catch(err => {
        console.log(err);
        alert("حدث خطأ في الاتصال بالسيرفر");
    });
}
