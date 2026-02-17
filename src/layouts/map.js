// 1. Diccionario de Artesanías con viñetas
const datosArtesanias = {
    "Aguascalientes": ["• Deshilados", "• Mayólica", "• Juguetería de cartón"],
    "Baja California": ["• Cestería Kumiai", "• Cerámica Paipai", "• Artesanía de concha"],
    "Baja California Sur": ["• Artesanía de concha de abulón", "• Cestería de palma roja", "• Cuchillería"],
    "Campeche": ["• Sombreros Jipijapa", "• Alfarería de Tepakán", "• Tallado en madera"],
    "Chiapas": ["• Textiles de San Andrés Larráinzar", "• Ámbar de Simojovel", "• Laca de Chiapa de Corzo"],
    "Chihuahua": ["• Cerámica de Mata Ortiz", "• Cestería Rarámuri", "• Violines tallados"],
    "Ciudad de México": ["• Alebrijes", "• Cartonería", "• Textiles en telar de cintura"],
    "Coahuila": ["• Sarape de Saltillo", "• Talla en madera de mezquite", "• Cerámica de barro"],
    "Colima": ["• Equipales de cuero", "• Máscaras de madera", "• Alfarería de Comala"],
    "Durango": ["• Artesanía Huichol", "• Cestería de mimbre", "• Trabajos en cuero"],
    "Estado de México": ["• Árbol de la Vida (Metepec)", "• Tapetes de Temoaya", "• Rebozos de Tenancingo"],
    "Guanajuato": ["• Mayólica de Dolores Hidalgo", "• Latón martillado", "• Sombreros de San Francisco del Rincón"],
    "Guerrero": ["• Cajitas de Olinalá", "• Platería de Taxco", "• Pintura en papel amate"],
    "Hidalgo": ["• Tenangos (bordados)", "• Campanas de bronce", "• Platería de Pachuca"],
    "Jalisco": ["• Alfarería de Tonalá", "• Huichol (arte con chaquira)", "• Vidrio soplado de Tlaquepaque"],
    "Michoacán": ["• Cobre martillado de Santa Clara", "• Guitarras de Paracho", "• Piñas de barro vidriado"],
    "Morelos": ["• Alfarería de Cuentepec", "• Gabanes de Hueyapan", "• Cestería"],
    "Nayarit": ["• Arte Huichol (Nierikas)", "• Textiles coras", "• Joyas de chaquira"],
    "Nuevo León": ["• Talabartería", "• Tallado en madera", "• Alfarería"],
    "Oaxaca": ["• Barro negro de Coyotepec", "• Alebrijes de Arrazola", "• Textiles de Teotitlán del Valle"],
    "Puebla": ["• Talavera poblana", "• Papel amate de Pahuatlán", "• Esferas de Chignahuapan"],
    "Querétaro": ["• Muñecas Lele (Amealco)", "• Opales tallados", "• Cestería de mimbre"],
    "Quintana Roo": ["• Cestería en bejuco", "• Tallado en madera de ciricote", "• Bordados de maya"],
    "San Luis Potosí": ["• Rebozo de Santa María del Río", "• Máscaras de madera", "• Cestería de palma"],
    "Sinaloa": ["• Alfarería", "• Cestería de palma", "• Tallado en madera"],
    "Sonora": ["• Coritas (cestería)", "• Tallado en palo fierro", "• Textiles Seri"],
    "Tabasco": ["• Jícaras labradas", "• Fibras vegetales", "• Cerámica de Cupilco"],
    "Tamaulipas": ["• Cuera tamaulipeca", "• Cestería de caña", "• Muebles de cedro"],
    "Tlaxcala": ["• Talavera de San Pablo del Monte", "• Bastones de madera", "• Textiles de Contla"],
    "Veracruz": ["• Alfarería de San Miguel", "• Vainilla artesanal", "• Artesanía de café"],
    "Yucatán": ["• Guayaberas", "• Hamacas tejidas", "• Joyas de filigrana de plata"],
    "Zacatecas": ["• Platería", "• Piedra volcánica labrada", "• Textiles de lana"]
};

// 2. Referencias
const tooltip = document.getElementById('tooltip');
const tNombre = document.getElementById('tooltip-nombre');
const tLista = document.getElementById('tooltip-artesanias');
const svgMapa = document.getElementById('mapa-mexico');
const contenedor = document.querySelector('.contenedor-svg');
const estados = document.querySelectorAll('#mapa-mexico path');

// 3. Variables de Estado
let escala = 1;
let posicionActual = { x: 0, y: 0 };
let puntoInicio = { x: 0, y: 0 };
let estaArrastrando = false;
let movioMapa = false;

// 4. Transformación del Mapa
function actualizarTransformacion() {
    svgMapa.style.transform = `translate(${posicionActual.x}px, ${posicionActual.y}px) scale(${escala})`;
}

// 5. Configuración de los Estados
estados.forEach(estado => {
    function mostrarInfo(e) {
        if (movioMapa) return;

        // Reset de clases
        estados.forEach(est => est.classList.remove('estado-activo'));
        estado.classList.add('estado-activo');

        const nombre = estado.getAttribute('name');
        if (!nombre) return;

        tNombre.innerText = nombre;
        tLista.innerHTML = "";
        const artesanias = datosArtesanias[nombre] || ["Información próximamente..."];
        artesanias.forEach(art => {
            const li = document.createElement('li');
            li.innerText = art;
            tLista.appendChild(li);
        });

        tooltip.style.display = 'block';

        const x = e.clientX || (e.changedTouches ? e.changedTouches[0].clientX : 0);
        const y = e.clientY || (e.changedTouches ? e.changedTouches[0].clientY : 0);

        tooltip.style.left = (x + 15) + 'px';
        tooltip.style.top = (y - 100) + 'px';
    }

    // Eventos Mouse
    estado.addEventListener('mouseenter', (e) => {
        if (!estaArrastrando) mostrarInfo(e);
    });

    estado.addEventListener('mousemove', (e) => {
        if (!estaArrastrando && tooltip.style.display === 'block') {
            tooltip.style.left = (e.clientX + 15) + 'px';
            tooltip.style.top = (e.clientY + 15) + 'px';
        }
    });

    estado.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
        estado.classList.remove('estado-activo');
    });

    // Evento Touch
    estado.addEventListener('touchend', (e) => {
        if (!movioMapa) {
            mostrarInfo(e);
            e.preventDefault();
        }
    });
});

// 6. Lógica de Zoom
document.getElementById('zoom-in').addEventListener('click', () => {
    escala = Math.min(escala + 0.3, 5);
    actualizarTransformacion();
});
document.getElementById('zoom-out').addEventListener('click', () => {
    escala = Math.max(escala - 0.3, 0.5);
    actualizarTransformacion();
});
document.getElementById('zoom-reset').addEventListener('click', () => {
    escala = 1;
    posicionActual = { x: 0, y: 0 };
    actualizarTransformacion();
});

// 7. Lógica de Arrastre
function iniciarArrastre(e) {
    if (e.target.tagName === 'BUTTON') return;
    estaArrastrando = true;
    movioMapa = false;
    tooltip.style.display = 'none';

    const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const y = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

    puntoInicio = { x: x - posicionActual.x, y: y - posicionActual.y };
    contenedor.style.cursor = 'grabbing';
}

function moviendo(e) {
    if (!estaArrastrando) return;
    movioMapa = true;

    const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const y = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

    posicionActual.x = x - puntoInicio.x;
    posicionActual.y = y - puntoInicio.y;

    actualizarTransformacion();
}

function detenerArrastre() {
    estaArrastrando = false;
    contenedor.style.cursor = 'grab';
}

contenedor.addEventListener('mousedown', iniciarArrastre);
window.addEventListener('mousemove', moviendo);
window.addEventListener('mouseup', detenerArrastre);
contenedor.addEventListener('touchstart', iniciarArrastre, { passive: false });
window.addEventListener('touchmove', (e) => { if (estaArrastrando) e.preventDefault(); moviendo(e); }, { passive: false });
window.addEventListener('touchend', detenerArrastre);