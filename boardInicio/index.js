document.querySelectorAll('.sadbtn').forEach(button => {
    button.addEventListener('click', function() {
        // Ocultar todos los botones excepto el clickeado
        document.querySelectorAll('.btnhide').forEach(btn => {           
                btn.style.display = 'none';            
        });

        // Cambiar la imagen del botón clickeado
        const img = document.querySelector('.imgStich');
        const text= document.querySelector('.textChange');
        const btnHappy= document.querySelector('.happybtn');
        img.src = 'Imagenes/stichLlorando.png'; // Cambia esto por la nueva imagen
        text.innerHTML="Mala persona, hiciste llorar al pobre Stich.";
        btnHappy.classList="btn btn-outline-primary happybtn";
        btnHappy.style.display = 'block';     
    });
});

document.querySelectorAll('.happybtn').forEach(button => {
    button.addEventListener('click', function() {
        // Ocultar todos los botones excepto el clickeado
        document.querySelectorAll('.btnhide').forEach(btn => {           
                btn.style.display = 'block';            
        });
        this.style.display= 'none';  

        // Cambiar la imagen del botón clickeado
        const img = document.querySelector('.imgStich');
        const text= document.querySelector('.textChange');
        const btnHappy= document.querySelector('.sadbtn');
        img.src = 'Imagenes/stichHappy.png'; // Cambia esto por la nueva imagen
        text.innerHTML="What do you want to see first?";
        btnHappy.classList="btn btn-outline-primary btnhide sadbtn";
    });
});

document.getElementsByName('gardenbtn').forEach(elemento => {
    elemento.addEventListener('click', function() {
    window.location.href = "campoMariposas/index.html"; // Cambia por la URL que desees
    })
});
document.getElementsByName('music').forEach(elemento => {
    elemento.addEventListener('click', function() {
    window.location.href = "canciones/index.html"; // Cambia por la URL que desees
    })
});
document.getElementsByName('gift').forEach(elemento => {
    elemento.addEventListener('click', function() {
    window.location.href = "regalo/index.html"; // Cambia por la URL que desees
    })
});