/* =========================================================
   CARGADOR DE COMPONENTES (Para unir los HTML separados)
   ========================================================= */

// Función asíncrona para buscar un archivo HTML e inyectarlo en un div vacío
async function cargarComponente(idContenedor, ruta) {
    try {
        const respuesta = await fetch(ruta);
        const html = await respuesta.text();
        document.getElementById(idContenedor).innerHTML = html;
    } catch (error) {
        console.error("Uy, falló al cargar " + ruta, error);
    }
}

// Apenas carga la página principal, llamamos a todas las partes
window.onload = async () => {
    
    // 1. Cargo las piezas fijas (Menú y Barra de arriba)
    await cargarComponente('caja-menu', 'componentes_globales/menu_lateral.html');
    await cargarComponente('caja-header', 'componentes_globales/barra_superior.html');
    
    // 2. Cargo las pantallas del módulo C-31
    await cargarComponente('caja-dashboard', 'interfaz_c31_cip/dashboard.html');
    await cargarComponente('caja-tabla', 'interfaz_c31_cip/tabla_registros.html');
    
    // 3. Cargo las ventanas flotantes que están escondidas
    await cargarComponente('caja-modal-registro', 'interfaz_c31_cip/modal_registro.html');
    await cargarComponente('caja-modal-visor', 'interfaz_c31_cip/modal_visor.html');

    // Le digo al sistema que arranque mostrando el Dashboard por defecto
    const botonInicio = document.querySelector('.menu-btn');
    
    // CORREGIDO: Llamamos a 'dashboard' para que se muestre al iniciar
    if(botonInicio) navegar('dashboard', botonInicio);
};


/* =========================================================
   LÓGICA DE LA INTERFAZ
   ========================================================= */

// Función para cambiar de pantalla en el centro (esconde unas, muestra otras)
function navegar(pantalla, btn) {
    // Escondo los contenedores principales
    document.getElementById('caja-dashboard').classList.add('hidden');
    document.getElementById('caja-tabla').classList.add('hidden');
    
    // Le quito la clase 'activa' a los sections de adentro por si acaso
    document.querySelectorAll('.seccion').forEach(sec => sec.classList.remove('activa'));
    
    // Prendo el contenedor que el usuario pidió hacer click
    const contenedorElegido = document.getElementById('caja-' + pantalla);
    if(contenedorElegido) {
        contenedorElegido.classList.remove('hidden');
        // Busco el <section> que está adentro y lo pongo activo
        const seccionInterna = contenedorElegido.querySelector('.seccion');
        if(seccionInterna) seccionInterna.classList.add('activa');
    }
    
    // Le quito el morado a todos los botones del menú
    document.querySelectorAll('.menu-btn').forEach(b => {
        b.classList.remove('bg-accent', 'text-white', 'shadow-[0_0_15px_rgba(168,85,247,0.4)]');
        b.classList.add('text-slate-400');
    });
    
    // Le pongo el color morado encendido solo al botón que apreté
    btn.classList.add('bg-accent', 'text-white', 'shadow-[0_0_15px_rgba(168,85,247,0.4)]');
    btn.classList.remove('text-slate-400');
}

// Guardo el valor que metió el usuario en la cajita del año
function cambiarGestion() {
    const inputAno = document.getElementById('gestionGlobal');
    
    // Solo me importa si puso 4 números cabales
    if(inputAno.value.length === 4) {
        const tituloDash = document.getElementById('lbl-gestion-dash');
        if(tituloDash) tituloDash.innerText = inputAno.value;
        
        // Hago que las letras brillen verde un ratito para saber que funcionó
        inputAno.classList.add('text-emerald-400');
        setTimeout(() => inputAno.classList.remove('text-emerald-400'), 500);
    }
}

// Le quito lo oculto al formulario para agregar o editar un registro
function abrirModalRegistro(esEdicion = false) {
    const modal = document.getElementById('modalRegistro');
    const tarjeta = document.getElementById('modalRegistroContent');
    
    // Cambio el título si estoy creando o editando
    if(esEdicion) {
        document.getElementById('tituloFormulario').innerHTML = '<i class="fas fa-edit text-blue-400"></i> Editar Registro Existente';
        document.getElementById('lblCodigoFormulario').innerText = "002"; 
    } else {
        document.getElementById('tituloFormulario').innerHTML = '<i class="fas fa-plus-square text-accent"></i> Nuevo Formulario C-31 CIP';
        document.getElementById('lblCodigoFormulario').innerText = "AUTO";
    }

    modal.classList.remove('hidden');
    // Le doy un margen de tiempo ínfimo para que Tailwind haga el zoom-in
    setTimeout(() => {
        tarjeta.classList.remove('scale-95', 'opacity-0');
        tarjeta.classList.add('scale-100', 'opacity-100');
    }, 10);
}

// Vuelvo a ocultar el formulario
function cerrarModalRegistro() {
    const modal = document.getElementById('modalRegistro');
    const tarjeta = document.getElementById('modalRegistroContent');
    
    tarjeta.classList.remove('scale-100', 'opacity-100');
    tarjeta.classList.add('scale-95', 'opacity-0');
    
    // Espero a que termine el zoom out para esconder el fondo negro
    setTimeout(() => { modal.classList.add('hidden'); }, 300);
}

// Muestro la ventana negra grande para leer el PDF
function cargarDoc(nombre) {
    const modal = document.getElementById('modalVisor');
    const tarjeta = document.getElementById('modalVisorContent');
    
    document.getElementById('tituloDocModal').innerHTML = `<i class="fas fa-file-pdf text-red-400 mr-2"></i> Viendo: ${nombre}`;
    document.getElementById('visorPdfModal').src = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
    
    modal.classList.remove('hidden');
    setTimeout(() => {
        tarjeta.classList.remove('scale-95', 'opacity-0');
        tarjeta.classList.add('scale-100', 'opacity-100');
    }, 10);
}

// Cierro el visor y lo dejo vacío para que la compu no se ponga lenta
function cerrarVisor() {
    const modal = document.getElementById('modalVisor');
    const tarjeta = document.getElementById('modalVisorContent');
    
    tarjeta.classList.remove('scale-100', 'opacity-100');
    tarjeta.classList.add('scale-95', 'opacity-0');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        document.getElementById('visorPdfModal').src = "";
    }, 300);
}