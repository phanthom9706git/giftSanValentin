$(document).ready(function () {
  const calendar = $("#calendar");
  const monthDisplay = $("#monthDisplay");
  const yearDisplay = $("#yearDisplay");
  const entryForm = $("#entryForm");
  const entryIdInput = $("#entryId");
  const entryDateInput = $("#entryDate");
  const entryTextInput = $("#entryText");
  const successMessage = $("#successMessage");
  const calendarSection = $("#calendarSection");
  const allEntriesSection = $("#allEntriesSection");
  const allEntriesList = $("#allEntriesList");
  const viewAllBtn = $("#viewAllBtn");
  const backToCalendar = $("#backToCalendar");
  const entradaCompleta = $("#entradaCompleta");
  const entradaCompletaFecha = $("#entradaCompletaFecha");
  const entradaCompletaTodas = $("#entradaCompletaTodas");
  const volverListado = $("#volverListado");
  const $goTopBtn = $("#goTop");
  const TOKEN_SECRETO_IMAGENES = "d8a0a91e0bfe10ef5b4c8edbffd68b9e"



  let entries = {};
  let entradaActiva = {};
  const monthNames = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  let editingIndex = null;
  let vista = "calendar";
  let dateStr = null;

  const formModal = new bootstrap.Modal(document.getElementById("formModal"));

  //funcion para generar los años del select
  function populateYears() {
    const yearList = $("#yearList").empty();
    for (let y = 2020; y <= 2030; y++) {
      const link = $("<a>").addClass("dropdown-item").attr("href", "#").text(y).on("click", (event) => {
        event.preventDefault();
        currentYear = y;
        generateCalendar(currentYear, currentMonth);
      });
      $("<li>").append(link).appendTo(yearList);
    }
    yearDisplay.text(currentYear);
  }

  //funcion para obtener los datos en el inicio
  async function loadEntries() {
    try {
      const res = await fetch("https://diario-backend.onrender.com/entries");
      entries = await res.json();
      console.log(entries);
      generateCalendar(currentYear, currentMonth);
    } catch (err) {
      console.error("Error cargando entradas:", err);
    }
  }

  //funcion para generar el calendario y evento mostrar entrada completa
  function generateCalendar(year, month) {
    calendar.empty();
    monthDisplay.text(monthNames[month]);
    yearDisplay.text(year);

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;

    for (let i = 0; i < startOffset; i++) {
      $("<div>").addClass("day blank").appendTo(calendar);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      const day = $("<div>").addClass("day").text(i);

      if (entries[date]) {
        day.addClass("entry");
        $("<span>").addClass("heart-marker").text("❤").appendTo(day);
        day.on("click", () => mostrarEntradaCompleta(date, entries[date]));
      }

      calendar.append(day);
    }
    updateMonthlySummary(year, month);
  }

  //funcion para ir al mes anterior
  $("#prevMonth").on("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    generateCalendar(currentYear, currentMonth);
  });
  //funcion para ir al mes siguiente
  $("#nextMonth").on("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    generateCalendar(currentYear, currentMonth);
  });

  //funcion para abrir modal de crear entrada
  $("#openFormModal").on("click", (indice) => {
    editingIndex = null;
    formModal.show();
  });

  //funcion de llenada de datos de modal de formulario para edicion o creacion de entradas
  $('#formModal').on('show.bs.modal', function (e) {
    const modal = $(this);

    if (editingIndex !== null) {
      const entradaActiva = entries[dateStr];
      const entry = entradaActiva[editingIndex];

      modal.find('#entryId').val(entry.id);
      modal.find('#entryDate').val(dateStr);
      modal.find('#entryTitle').val(entry.titulo);
      modal.find('#entryText').val(entry.texto);

      // Si querés mostrar una vista previa de la imagen:
      if (entry.imagen) {
        $('#imagenActual').attr("src", entry.imagen).removeClass("d-none");
      }
    } else {
      const today = new Date();
      const todayStr = today.toISOString().split("T")[0]; // Devuelve "2025-04-24"
      modal.find('#entryId').val("");
      modal.find('#entryDate').val(todayStr);
      modal.find('#entryTitle').val("");
      modal.find('#entryText').val("");
    }
  });

  //funcion de cerrar modal de edicion
  $("#closeForm").on("click", () => formModal.hide());

  //funcion para ir actualizando mes y año en prevMonth y nextMonth
  function updateMonthlySummary(year, month) {
    const summary = $("#entrySummary");
    let count = 0;

    for (let day = 1; day <= 31; day++) {
      const date = new Date(year, month, day);
      if (date.getMonth() !== month) break;

      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      if (entries[dateStr]?.length) {
        count++;
      }
    }

    summary.text(`This month, you have ${count} ${count === 1 ? 'written memory' : 'written memories'}…`);
  }
  //funcion para mostrar todas las entradas en forma de lista
  function viewAllEntries() {
    allEntriesList.empty();
    const sortedDates = Object.keys(entries).sort();
    vista = "lista";

    sortedDates.forEach(date => {
      const [year, month, day] = date.split("-");
      const monthNames = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
      const monthText = monthNames[parseInt(month) - 1];
      const obj = entries[date][0];


      const text = obj.texto;
      const row = $("<div>").addClass("entry-line");
      const dateCol = $("<div>").addClass("entry-date").html(`
          <div class='entry-day'>${parseInt(day)}</div><div class='entry-month'>${monthText}</div>
        `);

      const content = $("<div>").addClass("entry-content").html(`
          <div class='entry-year'>${year} - ${obj.titulo}</div>
          <p class='entry-snippet'>${text.slice(0, 50)}${text.length > 50 ? '…' : ''}</p>
        `);

      const readMore = $("<button>")
        .addClass("btn btn-sm btn-link p-0")
        .text("Read more")
        .on("click", () => mostrarEntradaCompleta(date, entries[date]));

      content.append(readMore);
      row.append(dateCol, content);
      allEntriesList.append(row);

    });

    calendarSection.addClass("d-none");
    entradaCompleta.addClass("d-none");
    allEntriesSection.removeClass("d-none");
  }

  //evento para mostrar todas las entradas en forma de lista
  viewAllBtn.on("click", () => {
    cambiarVistaSuave($("#calendarSection"), $("#allEntriesSection"));
    viewAllEntries()
  });

  //evento para volver a mostrar calendario
  backToCalendar.on("click", () => {
    vista = "calendar";
    cambiarVistaSuave($("#allEntriesSection"), $("#calendarSection"));
    mostrarCalendario();
  });

  //funcion para mostrar calendario
  function mostrarCalendario() {
    entradaCompleta.addClass("d-none");
    allEntriesSection.addClass("d-none");
    calendarSection.removeClass("d-none");
  }

  volverListado.on("click", () => {
    if (vista === "calendar") {
      cambiarVistaSuave($("#entradaCompleta"), $("#calendarSection"));
      mostrarCalendario();
    } else {
      cambiarVistaSuave($("#entradaCompleta"), $("#allEntriesSection"));
      viewAllEntries();
    }
    entradaCompleta.addClass("d-none");
  });

  //funcion para mostrar entrada detallada
  function mostrarEntradaCompleta(date) {
    entradaCompletaFecha.text(date);
    dateStr = date;
    crearDetalleEntradas();
    if (vista === "calendar") {
      cambiarVistaSuave($("#calendarSection"), $("#entradaCompleta"));
      mostrarCalendario();
    } else {
      cambiarVistaSuave($("#allEntriesSection"), $("#entradaCompleta"));
      viewAllEntries();
    }
    allEntriesSection.addClass("d-none");
    calendarSection.addClass("d-none");
    entradaCompleta.removeClass("d-none");
  }

  //funcion para crear las entradas detalladas
  function crearDetalleEntradas() {
    if (dateStr == undefined) {
      return;
    }

    const entradas = entries[dateStr];
    let html = "";
    let indice = 0;

    if (entradas == undefined || entradas.length == 0) {
      vista === "calendar" ? mostrarCalendario() : viewAllEntries();
      entradaCompleta.addClass("d-none");
      dateStr = null;
      return;
    }

    entradas.forEach(obj => {
      const idImagen = `imagenDetalle_${indice}`;

      if (indice % 2 == 0) {
        html += `<div class="contenedor-entrada">
          <div class="foto-polaroid rotar-izquierda">
            <div class="polaroid-background"></div> <!-- Fondo vacío tipo polaroid -->
            <img id="${idImagen}" class="foto-real" alt="Imagen de la entrada">
          </div>  
          <div class="texto-entrada">
            <p>${obj.texto}</p>
            <button data-id="${obj.id}" class="btn btn-sm btn-link p-0 deleteEntry"> Eliminar </button>
            <button data-indice="${indice}" class="btn btn-sm btn-link p-0 editEntry"> Editar </button>
          </div>
        </div>`;
      } else {
        html += `<div class="contenedor-entrada der">
          <div class="texto-entrada-right">
            <p>${obj.texto}</p>
            <button data-id="${obj.id}" class="btn btn-sm btn-link p-0 deleteEntry"> Eliminar </button>
            <button data-indice="${indice}" class="btn btn-sm btn-link p-0 editEntry"> Editar </button>
          </div>
          <div class="foto-polaroid rotar-derecha">
            <div class="polaroid-background"></div>
            <img id="${idImagen}" class="foto-real" alt="Imagen de la entrada">
          </div>
        </div>`;
      }

      indice++;
    });

    entradaCompletaTodas.html(html);

    // Ahora, cargar las imágenes protegidas
    indice = 0;
    entradas.forEach(obj => {
      if (obj.imagen) {
        const idImagen = `imagenDetalle_${indice}`;
        cargarImagenProtegida(obj.imagen, idImagen);
      }
      indice++;
    });
  }


  //evento de boton para editar entrada
  $(document).on("click", ".editEntry", function () {
    editingIndex = $(this).data("indice");
    formModal.show();
  });

  //evento de boton para eliminar entrada
  $(document).on("click", ".deleteEntry", async function () {
    const entryId = $(this).data("id");

    if (!entryId) {
      alert("No se encontró el ID de la entrada.");
      return;
    }


    if (!confirm("¿Estás seguro que querés eliminar esta entrada?")) return;
    let obj = {
      id: entryId,
      date: null,
      titulo: null,
      texto: null,
      imagen: null
    }
    saveEntries(obj);
  });

  //funcion para guardar o editar entradas
  async function saveEntries(entry) {
    const formData = new FormData();

    if (entry.id) formData.append("id", entry.id);
    if (entry.date) formData.append("date", entry.date);
    if (entry.titulo) formData.append("titulo", entry.titulo);
    if (entry.texto) formData.append("text", entry.texto);
    if (entry.imagen instanceof File) formData.append("image", entry.imagen);

    try {
      mostrarLoader();
      const response = await fetch("https://diario-backend.onrender.com/entries", {
        method: "POST",
        body: formData
      });

      if (!response.ok) throw new Error("Error al guardar la entrada");

      const result = await response.json();
      console.log("✅ Resultado del guardado:", result);
      populateYears();
      await loadEntries();
      entradaActiva = entries[dateStr];
      crearDetalleEntradas(entries[dateStr])
      ocultarLoader();
    } catch (err) {
      console.error("❌ Error en saveEntries:", err);
    }

  }

  //funcion de subir formulario con datos para edicion o creacion
  entryForm.on("submit", async function (e) {
    mostrarLoader();
    e.preventDefault();

    const id = entryIdInput.val();
    const date = entryDateInput.val();
    const text = entryTextInput.val();
    const title = $("#entryTitle").val();
    const imageFile = $("#entryImage")[0].files[0];

    if (!date || !text || !title) return;

    const formData = new FormData();
    formData.append("id", id);
    formData.append("date", date);
    formData.append("titulo", title);
    formData.append("text", text);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const res = await fetch("https://diario-backend.onrender.com/entries", {
        method: "POST",
        body: formData
      });

      if (!res.ok) throw new Error("Error guardando la entrada");

      await loadEntries();
      generateCalendar(currentYear, currentMonth);
      crearDetalleEntradas()
      ocultarLoader();
      successMessage.removeClass("d-none");
      setTimeout(() => {
        successMessage.addClass("d-none");
        formModal.hide();
        entryForm[0].reset();
      }, 1500);
    } catch (err) {
      alert("❌ Hubo un error al guardar la entrada.");
      console.error(err);
    }
  });

  async function cargarImagenProtegida(nombreImagen, contenedorId) {
    try {
      const response = await fetch(`https://diario-backend.onrender.com/imagen/${nombreImagen}`, {
        headers: {
          Authorization: "Bearer " + TOKEN_SECRETO_IMAGENES
        }
      });

      if (!response.ok) throw new Error("No se pudo cargar la imagen");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const $img = $(`#${contenedorId}`);
      $img.attr("src", url);

      // Esperar a que realmente se cargue
      $img.on("load", function () {
        $(this).css("opacity", "1");
      });

    } catch (err) {
      console.error("❌ Error cargando imagen protegida:", err.message);
    }
  }


  function mostrarLoader() {
    $("#loader").fadeIn(200); // Lo muestra suavecito
  }

  function ocultarLoader() {
    $("#loader").fadeOut(500); // Suavemente en 0.5 segundos
  }
  function cambiarVistaSuave($vistaActual, $nuevaVista) {
    $nuevaVista.removeClass("d-none").css("opacity", 0).show(); // Preparamos la nueva, invisible
    $vistaActual.animate({ opacity: 0 }, 400, function () {
      $vistaActual.addClass("d-none").css("opacity", 1); // Ocultamos vieja, restauramos su opacidad para la próxima vez
    });
    $nuevaVista.animate({ opacity: 1 }, 400); // La nueva sube su opacidad al mismo tiempo
  }
  $(window).scroll(function () {
    if ($(window).scrollTop() > 0) {
      $goTopBtn.removeClass("d-none").fadeIn();
    } else {
      $goTopBtn.fadeOut(function () {
        $(this).addClass("d-none");
      });
    }
  });

  $goTopBtn.click(function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
  });

  async function cargaInicial() {
    mostrarLoader();
    populateYears();
    await loadEntries();
    ocultarLoader();
  }

  cargaInicial();

});