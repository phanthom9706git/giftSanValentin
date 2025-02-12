document.getElementById('btnEntrar').addEventListener('click', function() {
    const passwordInput = document.getElementById('password');
    const errorMsg = document.getElementById('error-msg');
    const correctPassword = "1402"; // Cambia esto por la contraseña correcta

    if (passwordInput.value === correctPassword) {
        // Si la contraseña es correcta, redirigir a otra página
        window.location.href = "/boardInicio/index.html"; // Cambia por la URL deseada
    } else {
        // Mostrar mensaje de error con Bootstrap
        passwordInput.classList.add('is-invalid');
    }
});

// Opcional: Remover el mensaje de error cuando el usuario escriba
document.getElementById('password').addEventListener('input', function() {
    this.classList.remove('is-invalid');
});