document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const closeModal = document.getElementById("closeModal");
    const applyButtons = document.querySelectorAll("[id^='applyService']");
    const submitForm = document.getElementById("submitForm");
    const applyForm = document.getElementById("applyForm");
    const mensaje = document.createElement('div'); 
    mensaje.id = 'mensajeFormulario';
    applyForm.appendChild(mensaje);  

    // Secciones
    const carousel = document.getElementById("carouselExampleIndicators");
    const quienesSomosSection = document.getElementById("quienes-somos");
    const serviciosSection = document.getElementById("servicios");
    const contactanosSection = document.getElementById("contactanos");

    // Función para abrir el modal
    function openModal() {
        modal.style.display = "block";
    }

    // Función para cerrar el modal
    function closeModalFunction() {
        modal.style.display = "none";
        applyForm.reset(); 
        mensaje.textContent = ''; 
    }

    // Evento de clic para el boton "Aplicar"
    applyButtons.forEach(button => {
        button.addEventListener("click", openModal);
    });

    // Evento de clic para cerrar el modal
    closeModal.addEventListener("click", closeModalFunction);

    // Manejo de clic en el menú
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');

            // Oculta el carrusel y muestra la sección correspondiente
            carousel.style.display = "none";
            quienesSomosSection.style.display = "none";
            serviciosSection.style.display = "none";
            contactanosSection.style.display = "none";

            // Muestra la sección correspondiente
            if (targetId === '#inicio') {
                carousel.style.display = "block"; 
            } else {
                document.querySelector(targetId).style.display = "block";
            }
        });
    });

    submitForm.addEventListener("click", function() {
        if (applyForm.checkValidity()) {
            mensaje.textContent = 'Solicitud enviada con éxito.';
            mensaje.style.color = 'green';  
            setTimeout(closeModalFunction, 1100); 
        } else {
            mensaje.textContent = 'Por favor, completa todos los campos requeridos.';
            mensaje.style.color = 'red';  
        }
    });
    
});
