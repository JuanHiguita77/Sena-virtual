// Login
function login() {
    const user = document.getElementById("user").value.trim();
    const pass = document.getElementById("pass").value.trim();
 
    if (!user || !pass) {
        alert("Por favor ingresa usuario y contraseña");
        return;
    }
 
    if (user === "admin" && pass === "1234") {
        window.location.href = "index.html";
    } else {
        alert("Usuario o contraseña incorrectos");
    }
}