function btnHeart() {
    const heart = document.getElementById("heart");
    const text = document.getElementById("text");
    const buttons = document.getElementById("buttons");

    heart.classList.add("hide");
    heart.classList.remove("show");

    text.classList.remove("hide");
    text.classList.add("text");

    buttons.classList.remove("hide");
}

function answerNo() {
    const reaction = document.getElementById("reactionMessage");
    const buttons = document.getElementById("buttons");
    const finalMessage = document.getElementById("finalMessage");
    const text = document.getElementById("text");

    buttons.classList.add("hide");
    reaction.classList.remove("hide");
    text.textContent = "";

    reaction.textContent = "¿Estás segur@ de lo que acabás de hacer? 😢";

    setTimeout(() => {
        reaction.textContent = "3...";
        setTimeout(() => {
            reaction.textContent = "2...";
            setTimeout(() => {
                reaction.textContent = "1...";
                setTimeout(() => {
                    reaction.classList.add("hide");
                    finalMessage.classList.remove("hide");
                    finalMessage.textContent = "Mentiraaa, igual sé que sí 💕";
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1500);
}


function answerYes() {
    document.getElementById("buttons").classList.add("hide");
    document.getElementById("text").textContent = "";
    document.getElementById("finalMessage").classList.remove("hide");
    document.getElementById("reactionMessage").classList.add("hide");
}

function escapeNo() {
    const btnNo = document.getElementById("btnNo");
    const container = document.querySelector(".heartContainer");
    const reaction = document.getElementById("reactionMessage");

    // Mostrar mensaje por intento
    reaction.textContent = "Creete que me vas a decir que no";
    reaction.classList.remove("hide");

    // Mover botón a posición aleatoria
    const containerRect = container.getBoundingClientRect();
    const maxX = containerRect.width - 120;
    const maxY = containerRect.height - 100;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    btnNo.style.position = "absolute";
    btnNo.style.left = `${randomX}px`;
    btnNo.style.top = `${randomY}px`;
}
