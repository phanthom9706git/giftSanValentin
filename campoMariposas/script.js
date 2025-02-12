const garden = document.getElementById("garden");
const butterflies = [];
const butterflyImage = "/Imagenes/butterfly.webp"; // Imagen de mariposa
let butterflyCount = 0;

function createButterfly(x, y) {
    const butterfly = document.createElement("img");
    butterfly.src = butterflyImage;
    butterfly.classList.add("butterfly");

    let angle = Math.random() * 360; // Dirección inicial aleatoria
    let speed = Math.random() * 30 + 20; // Velocidad entre 20 y 50 px por paso

    butterfly.style.left = `${x}px`;
    butterfly.style.top = `${y}px`;
    butterfly.style.transform = `rotate(${angle + 52}deg)`; // Se ajusta con el ángulo de la imagen

    garden.appendChild(butterfly);
    butterflies.push({ element: butterfly, x, y, angle, speed });
}

function moveButterflies() {
    butterflies.forEach(b => {
        let radianes = (b.angle * Math.PI) / 180;
        b.x += Math.cos(radianes) * b.speed;
        b.y += Math.sin(radianes) * b.speed;

        // Si la mariposa toca un borde, rebota girando correctamente
        if (b.x < 0 || b.x > window.innerWidth) {
            b.angle = 180 - b.angle;
        }
        if (b.y < 0 || b.y > window.innerHeight) {
            b.angle = -b.angle;
        }

        // Pequeña variación en la dirección para vuelo más natural
        b.angle += Math.random() * 20 - 10; // Variación entre -10° y 10°

        // Aplicar posición y rotación
        b.element.style.left = `${b.x}px`;
        b.element.style.top = `${b.y}px`;
        b.element.style.transform = `rotate(${b.angle + 52}deg)`; // Ajuste de rotación
    });

    setTimeout(moveButterflies, 2000); // Movimiento cada 2 segundos
}

// Evento para agregar mariposas con clic
document.addEventListener("click", (event) => {
    createButterfly(event.clientX, event.clientY);
    // Incrementar el contador de mariposas
    butterflyCount++;

    // Si el contador llega a 5, mostrar el mensaje
    if (butterflyCount >= 5) {
        showMessage("Las mariposas son símbolo de transformación y libertad. Que este intento mio de jardín siempre te recuerde lo hermoso que es cambiar y crecer.");
    }
});

// Iniciar movimiento en bucle
moveButterflies();
function showMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.position = 'absolute';
    messageDiv.style.top = '90%';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translate(-50%, -50%)';
    messageDiv.style.fontSize = '1em';
    messageDiv.style.fontFamily = 'Poppins', 'sans-serif';
    messageDiv.style.color = 'white';
    messageDiv.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.5)';
    messageDiv.style.textAlign = 'center';
    messageDiv.style.zIndex = '3'; // Asegura que el texto esté por encima de las mariposas
    messageDiv.style.display = 'none'; // Oculto inicialmente

    const buttonDiv = document.createElement('button');
    buttonDiv.classList="btn btn-outline-light";

    document.body.appendChild(messageDiv);

    // Mostrar el mensaje después de que se hayan creado 5 mariposas
    setTimeout(() => {
        messageDiv.style.display = 'block'; // Mostrar mensaje
    }, 1000); // Puedes ajustar el tiempo de retraso si lo deseas
}
document.getElementsByName('volverBtn').forEach(elemento => {
    elemento.addEventListener('click', function() {
    window.location.href = "/boardInicio/index.html"; // Cambia por la URL que desees
    })
});


