/* =========================================================
   CARGADOR DE COMPONENTES
   ========================================================= */
async function cargarComponente(idContenedor, ruta) {
    try {
        const respuesta = await fetch(ruta);
        const html = await respuesta.text();
        document.getElementById(idContenedor).innerHTML = html;
    } catch (error) {
        console.error("Uy, falló al cargar " + ruta, error);
    }
}

window.onload = async () => {
    await cargarComponente('caja-menu', 'componentes_globales/menu_lateral.html');
    await cargarComponente('caja-header', 'componentes_globales/barra_superior.html');
    
    await cargarComponente('caja-dashboard', 'interfaz_c31_cip/dashboard.html');
    await cargarComponente('caja-tabla', 'interfaz_c31_cip/tabla_registros.html');
    
    // NUEVO: Cargamos los componentes del SIP
    await cargarComponente('caja-tabla_sip', 'interfaz_c31_sip/tabla_registros_sip.html');
    await cargarComponente('caja-modal-registro-sip', 'interfaz_c31_sip/modal_registro_sip.html');

    await cargarComponente('caja-modal-registro', 'interfaz_c31_cip/modal_registro.html');
    await cargarComponente('caja-modal-visor', 'interfaz_c31_cip/modal_visor.html');

    // NUEVO: Cargamos los componentes del C-21 CIP
    await cargarComponente('caja-tabla_c21_cip', 'interfaz_c21_cip/tabla_registros_c21_cip.html');
    await cargarComponente('caja-modal-registro-c21-cip', 'interfaz_c21_cip/modal_registro_c21_cip.html');

    // NUEVO: Cargamos los componentes del C-21 SIP
    await cargarComponente('caja-tabla_c21_sip', 'interfaz_c21_sip/tabla_registros_c21_sip.html');
    await cargarComponente('caja-modal-registro-c21-sip', 'interfaz_c21_sip/modal_registro_c21_sip.html');

    // NUEVO: Cargamos los componentes de Asientos Manuales
    await cargarComponente('caja-tabla_asientos_manuales', 'interfaz_asientos_manuales/tabla_asientos_manuales.html');
    await cargarComponente('caja-modal-asientos-manuales', 'interfaz_asientos_manuales/modal_asientos_manuales.html');

    const botonInicio = document.querySelector('.menu-btn');
    if(botonInicio) navegar('dashboard', botonInicio);
};

/* =========================================================
   LÓGICA DE LA INTERFAZ
   ========================================================= */
function navegar(pantalla, btn) {
    // Escondo los contenedores principales
    document.getElementById('caja-dashboard').classList.add('hidden');
    document.getElementById('caja-tabla').classList.add('hidden');
    // NUEVO: Oculto también la tabla SIP
    document.getElementById('caja-tabla_sip').classList.add('hidden'); 
    document.getElementById('caja-tabla_c21_cip').classList.add('hidden'); // NUEVA LÍNEA
    document.getElementById('caja-tabla_c21_sip').classList.add('hidden'); // NUEVA LÍNEA
    document.getElementById('caja-tabla_asientos_manuales').classList.add('hidden'); // NUEVA LÍNEA
    
    document.querySelectorAll('.seccion').forEach(sec => sec.classList.remove('activa'));
    
    const contenedorElegido = document.getElementById('caja-' + pantalla);
    if(contenedorElegido) {
        contenedorElegido.classList.remove('hidden');
        const seccionInterna = contenedorElegido.querySelector('.seccion');
        if(seccionInterna) seccionInterna.classList.add('activa');
    }
    
    document.querySelectorAll('.menu-btn').forEach(b => {
        b.classList.remove('bg-accent', 'text-white', 'shadow-[0_0_15px_rgba(168,85,247,0.4)]');
        b.classList.add('text-slate-400');
    });
    
    btn.classList.add('bg-accent', 'text-white', 'shadow-[0_0_15px_rgba(168,85,247,0.4)]');
    btn.classList.remove('text-slate-400');
}

function cambiarGestion() {
    const inputAno = document.getElementById('gestionGlobal');
    if(inputAno.value.length === 4) {
        const tituloDash = document.getElementById('lbl-gestion-dash');
        if(tituloDash) tituloDash.innerText = inputAno.value;
        inputAno.classList.add('text-emerald-400');
        setTimeout(() => inputAno.classList.remove('text-emerald-400'), 500);
    }
}

/* =========================================================
   MODALES DEL CIP
   ========================================================= */
function abrirModalRegistro(esEdicion = false) {
    const modal = document.getElementById('modalRegistro');
    const tarjeta = document.getElementById('modalRegistroContent');
    if(esEdicion) {
        document.getElementById('tituloFormulario').innerHTML = '<i class="fas fa-edit text-blue-400"></i> Editar Registro Existente';
        document.getElementById('lblCodigoFormulario').innerText = "002"; 
    } else {
        document.getElementById('tituloFormulario').innerHTML = '<i class="fas fa-plus-square text-accent"></i> Nuevo Formulario C-31 CIP';
        document.getElementById('lblCodigoFormulario').innerText = "AUTO";
    }
    modal.classList.remove('hidden');
    setTimeout(() => {
        tarjeta.classList.remove('scale-95', 'opacity-0');
        tarjeta.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function cerrarModalRegistro() {
    const modal = document.getElementById('modalRegistro');
    const tarjeta = document.getElementById('modalRegistroContent');
    tarjeta.classList.remove('scale-100', 'opacity-100');
    tarjeta.classList.add('scale-95', 'opacity-0');
    setTimeout(() => { modal.classList.add('hidden'); }, 300);
}

/* =========================================================
   NUEVO: MODALES DEL SIP (Con IDs diferentes)
   ========================================================= */
function abrirModalRegistroSip(esEdicion = false) {
    const modal = document.getElementById('modalRegistroSip');
    const tarjeta = document.getElementById('modalRegistroContentSip');
    if(esEdicion) {
        document.getElementById('tituloFormularioSip').innerHTML = '<i class="fas fa-edit text-blue-400"></i> Editar Registro SIP';
        document.getElementById('lblCodigoFormularioSip').innerText = "003"; 
    } else {
        document.getElementById('tituloFormularioSip').innerHTML = '<i class="fas fa-plus-square text-accent"></i> Nuevo Formulario C-31 SIP';
        document.getElementById('lblCodigoFormularioSip').innerText = "AUTO";
    }
    modal.classList.remove('hidden');
    setTimeout(() => {
        tarjeta.classList.remove('scale-95', 'opacity-0');
        tarjeta.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function cerrarModalRegistroSip() {
    const modal = document.getElementById('modalRegistroSip');
    const tarjeta = document.getElementById('modalRegistroContentSip');
    tarjeta.classList.remove('scale-100', 'opacity-100');
    tarjeta.classList.add('scale-95', 'opacity-0');
    setTimeout(() => { modal.classList.add('hidden'); }, 300);
}

/* =========================================================
   VISOR PDF
   ========================================================= */
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

/* =========================================================
   NUEVO: MODALES DEL C-21 CIP
   ========================================================= */
function abrirModalRegistroC21Cip(esEdicion = false) {
    const modal = document.getElementById('modalRegistroC21Cip');
    const tarjeta = document.getElementById('modalRegistroContentC21Cip');
    if(esEdicion) {
        document.getElementById('tituloFormularioC21Cip').innerHTML = '<i class="fas fa-edit text-blue-400"></i> Editar Registro C-21 CIP';
        document.getElementById('lblCodigoFormularioC21Cip').innerText = "004"; 
    } else {
        document.getElementById('tituloFormularioC21Cip').innerHTML = '<i class="fas fa-plus-square text-accent"></i> Nuevo Formulario C-21 CIP';
        document.getElementById('lblCodigoFormularioC21Cip').innerText = "AUTO";
    }
    modal.classList.remove('hidden');
    setTimeout(() => {
        tarjeta.classList.remove('scale-95', 'opacity-0');
        tarjeta.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function cerrarModalRegistroC21Cip() {
    const modal = document.getElementById('modalRegistroC21Cip');
    const tarjeta = document.getElementById('modalRegistroContentC21Cip');
    tarjeta.classList.remove('scale-100', 'opacity-100');
    tarjeta.classList.add('scale-95', 'opacity-0');
    setTimeout(() => { modal.classList.add('hidden'); }, 300);
}

/* =========================================================
   NUEVO: MODALES DEL C-21 SIP
   ========================================================= */
function abrirModalRegistroC21Sip(esEdicion = false) {
    const modal = document.getElementById('modalRegistroC21Sip');
    const tarjeta = document.getElementById('modalRegistroContentC21Sip');
    if(esEdicion) {
        document.getElementById('tituloFormularioC21Sip').innerHTML = '<i class="fas fa-edit text-blue-400"></i> Editar Registro C-21 SIP';
        document.getElementById('lblCodigoFormularioC21Sip').innerText = "005"; 
    } else {
        document.getElementById('tituloFormularioC21Sip').innerHTML = '<i class="fas fa-plus-square text-accent"></i> Nuevo Formulario C-21 SIP';
        document.getElementById('lblCodigoFormularioC21Sip').innerText = "AUTO";
    }
    modal.classList.remove('hidden');
    setTimeout(() => {
        tarjeta.classList.remove('scale-95', 'opacity-0');
        tarjeta.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function cerrarModalRegistroC21Sip() {
    const modal = document.getElementById('modalRegistroC21Sip');
    const tarjeta = document.getElementById('modalRegistroContentC21Sip');
    tarjeta.classList.remove('scale-100', 'opacity-100');
    tarjeta.classList.add('scale-95', 'opacity-0');
    setTimeout(() => { modal.classList.add('hidden'); }, 300);
}

/* =========================================================
   NUEVO: MODALES DE ASIENTOS MANUALES
   ========================================================= */
function abrirModalAsientosManuales(esEdicion = false) {
    const modal = document.getElementById('modalAsientosManuales');
    const tarjeta = document.getElementById('modalAsientosManualesContent');
    if(esEdicion) {
        document.getElementById('tituloFormularioAsientos').innerHTML = '<i class="fas fa-edit text-blue-400"></i> Editar Asiento Manual';
        document.getElementById('lblCodigoFormularioAsientos').innerText = "006"; 
    } else {
        document.getElementById('tituloFormularioAsientos').innerHTML = '<i class="fas fa-book text-accent"></i> Nuevo Asiento Manual';
        document.getElementById('lblCodigoFormularioAsientos').innerText = "AUTO";
    }
    modal.classList.remove('hidden');
    setTimeout(() => {
        tarjeta.classList.remove('scale-95', 'opacity-0');
        tarjeta.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function cerrarModalAsientosManuales() {
    const modal = document.getElementById('modalAsientosManuales');
    const tarjeta = document.getElementById('modalAsientosManualesContent');
    tarjeta.classList.remove('scale-100', 'opacity-100');
    tarjeta.classList.add('scale-95', 'opacity-0');
    setTimeout(() => { modal.classList.add('hidden'); }, 300);
}