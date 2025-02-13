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
        text.innerHTML="Mala persona, como no vas a querer ver nada! Hiciste llorar al pobre Stich.";
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
