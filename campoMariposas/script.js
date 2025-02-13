const garden = document.getElementById("garden");
const butterflies = [];
let butterflyCount = 0;
let messageShown = false; // Evita que el mensaje aparezca varias veces

function createButterfly(x, y) {
    // Crear el contenedor de la mariposa
    const butterfly = document.createElement("div");
    butterfly.classList.add("butterfly");

    // Crear alas
    for (let i = 0; i < 2; i++) {
        const wing = document.createElement("div");
        wing.classList.add("wing");

        for (let j = 0; j < 2; j++) {
            const bit = document.createElement("div");
            bit.classList.add("bit");
            wing.appendChild(bit);
        }
        butterfly.appendChild(wing);
    }

    let angle = Math.random() * 360; // Dirección inicial aleatoria
    let speed = Math.random() * 30 + 20; // Velocidad entre 20 y 50 px por paso

    butterfly.style.left = `${x}px`;
    butterfly.style.top = `${y}px`;
    butterfly.style.transform = `rotate(${angle}deg)`;

    garden.appendChild(butterfly);
    butterflies.push({ element: butterfly, x, y, angle, speed });
}

function moveButterflies() {
    butterflies.forEach(b => {
        let radianes = (b.angle * Math.PI) / 180;
        b.x += Math.cos(radianes) * b.speed;
        b.y += Math.sin(radianes) * b.speed;

        // Rebote en los bordes
        if (b.x < 0 || b.x > window.innerWidth) {
            b.angle = 180 - b.angle;
        }
        if (b.y < 0 || b.y > window.innerHeight) {
            b.angle = -b.angle;
        }

        // Variación para movimiento más natural
        b.angle += Math.random() * 20 - 10;

        // Aplicar nuevas posiciones y orientar mariposas en la dirección correcta
        b.element.style.left = `${b.x}px`;
        b.element.style.top = `${b.y}px`;
        b.element.style.transform = `rotate(${b.angle}deg)`;
    });

    setTimeout(moveButterflies, 2000);
}

// Evento para agregar mariposas con clic
document.addEventListener("click", (event) => {
    createButterfly(event.clientX, event.clientY);
    butterflyCount++;

    if (butterflyCount >= 5 && !messageShown) {
        showMessage("Adoro que te encanten las mariposas, son símbolo de transformación y libertad. Que este intento mío de jardín siempre te recuerde lo hermoso que es cambiar y crecer.");
        messageShown = true; // Asegura que el mensaje solo aparece una vez
    }
});

// Iniciar movimiento en bucle
moveButterflies();

function showMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList = 'textLow';
    messageDiv.textContent = message;

    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.style.display = 'block';
    }, 1000);
}
