document.getElementById("btn").addEventListener("click", registerUser);

function registerUser() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    const errorEl = document.getElementById("error");
    const successEl = document.getElementById("success");
    errorEl.textContent = "";
    successEl.textContent = "";

    if (!username || !password) {
        errorEl.textContent = "جميع الحقول مطلوبة!";
        return;
    }

    fetch("/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password, role})
    })
    .then(res => res.text())
    .then(data => {
        if (data === "ok") {
            successEl.textContent = "تم التسجيل بنجاح! يمكنك الآن تسجيل الدخول.";
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
        } else {
            errorEl.textContent = "حدث خطأ أثناء التسجيل.";
        }
    })
    .catch(err => {
        console.log(err);
        errorEl.textContent = "حدث خطأ في الاتصال بالسيرفر.";
    });
}
