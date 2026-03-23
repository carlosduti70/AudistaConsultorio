/**
 * ============================================
 *   AUDITSA — Archivo de Configuración
 *   config.js
 * ============================================
 *
 *  ⚠️  ESTE ES EL ÚNICO ARCHIVO QUE DEBES EDITAR
 *     para actualizar datos de contacto, redes
 *     sociales, horarios y rutas de logos.
 *
 * ============================================
 */

const AUDITSA_CONFIG = {

  /* ------------------------------------------
     INFORMACIÓN GENERAL
  ------------------------------------------ */
  nombre:      "Auditsa",
  nombreLargo: "Auditsa Consultorios Auditivos",
  slogan:      "Escuchar bien es vivir mejor",

  /* ------------------------------------------
     LOGOS
     Coloca los archivos en la carpeta assets/
     y actualiza las rutas aquí.
  ------------------------------------------ */
  logos: {
    // Logo para navbar (horizontal, fondo claro)
    navbar:         "assets/MORADO_2.png",
    // Logo para footer (horizontal, fondo oscuro)
    footer:         "assets/BLANCO_2.png",
    // Logo cuadrado para favicon / hero
    iconoCuadrado:  "assets/MORADO_1.png",
    // Logo para favicon (puedes usar un .ico o .png pequeño)
    favicon:        "assets/MORADO_1.png",
  },

  /* ------------------------------------------
     CONTACTO
  ------------------------------------------ */
  contacto: {
    telefono:        "+593 00 000 0000",      // Número principal (con código país)
    telefonoLink:    "tel:+593000000000",      // Para href tel:
    whatsapp:        "+593 00 000 0000",       // Número WhatsApp
    whatsappLink:    "https://wa.me/593000000000", // URL de WhatsApp (sin espacios ni +)
    whatsappMsg:     "Hola, me gustaría agendar una cita en AUDITSA.",
    email:           "info@auditsa.ec",
    emailLink:       "mailto:info@auditsa.ec",
  },

  /* ------------------------------------------
     UBICACIÓN
  ------------------------------------------ */
  ubicacion: {
    calle:       "Calle Larga y Huayna Cápac",
    referencia:  "Frente a la puerta principal del Museo Pumapungo",
    ciudad:      "Cuenca",
    provincia:   "Azuay",
    pais:        "Ecuador",
    // URL del iframe de Google Maps (embed)
    // Para actualizar: Google Maps → Compartir → Insertar un mapa → copia la URL del src
    mapaEmbed:   "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3985.4906956019!2d-78.99776!3d-2.90191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cd18040b770689%3A0x84f0fcd3a1bcc25c!2sMuseo+Pumapungo!5e0!3m2!1ses!2sec!4v1700000000000!5m2!1ses!2sec",
    // URL directa para "Cómo llegar" (Google Maps normal)
    mapaLink:    "https://www.google.com/maps/search/Calle+Larga+y+Huayna+Cápac,+Cuenca+Ecuador",
  },

  /* ------------------------------------------
     HORARIOS
  ------------------------------------------ */
  horarios: {
    dias:   "Lunes a Viernes",
    manana: "09:00 – 13:00",
    tarde:  "15:00 – 18:00",
    // Texto corto para footer / strips
    resumen: "Lun – Vie: 09:00–13:00 · 15:00–18:00",
  },

  /* ------------------------------------------
     REDES SOCIALES
     Deja en "" si no tienes esa red todavía.
  ------------------------------------------ */
  redes: {
    whatsapp:  "https://wa.me/593000000000",
    facebook:  "https://www.facebook.com/auditsa",
    instagram: "https://www.instagram.com/auditsa",
    tiktok:    "",     // Dejar vacío si no aplica
    youtube:   "",     // Dejar vacío si no aplica
  },

  /* ------------------------------------------
     COPYRIGHT
  ------------------------------------------ */
  anio: "2025",
};

/* ============================================
   NO EDITAR DEBAJO DE ESTA LÍNEA
   (lógica de aplicación automática)
============================================ */

document.addEventListener('DOMContentLoaded', () => {
  applyConfig(AUDITSA_CONFIG);
});

function applyConfig(cfg) {
  const c  = cfg.contacto;
  const u  = cfg.ubicacion;
  const h  = cfg.horarios;
  const r  = cfg.redes;
  const lo = cfg.logos;

  // ---- Logos ----
  document.querySelectorAll('[data-logo="navbar"]').forEach(el => {
    el.src = lo.navbar; el.alt = cfg.nombreLargo;
  });
  document.querySelectorAll('[data-logo="footer"]').forEach(el => {
    el.src = lo.footer; el.alt = cfg.nombreLargo;
  });

  // Favicon
  let fav = document.querySelector("link[rel~='icon']");
  if (!fav) { fav = document.createElement('link'); fav.rel = 'icon'; document.head.appendChild(fav); }
  fav.href = lo.favicon;

  // ---- Texto dinámico ----
  setAll('[data-cfg="nombre"]',       cfg.nombre);
  setAll('[data-cfg="nombreLargo"]',  cfg.nombreLargo);
  setAll('[data-cfg="slogan"]',       cfg.slogan);
  setAll('[data-cfg="telefono"]',     c.telefono);
  setAll('[data-cfg="whatsapp"]',     c.whatsapp);
  setAll('[data-cfg="email"]',        c.email);
  setAll('[data-cfg="calle"]',        u.calle);
  setAll('[data-cfg="referencia"]',   u.referencia);
  setAll('[data-cfg="ciudad"]',       u.ciudad);
  setAll('[data-cfg="horarios"]',     h.resumen);
  setAll('[data-cfg="horarioManana"]',h.manana);
  setAll('[data-cfg="horarioTarde"]', h.tarde);
  setAll('[data-cfg="dias"]',         h.dias);
  setAll('[data-cfg="anio"]',         cfg.anio);

  // ---- Links ----
  setHref('[data-href="telefono"]',   c.telefonoLink);
  setHref('[data-href="whatsapp"]',   buildWa(c.whatsappLink, c.whatsappMsg));
  setHref('[data-href="email"]',      c.emailLink);
  setHref('[data-href="mapa"]',       u.mapaLink);
  setHref('[data-href="facebook"]',   r.facebook);
  setHref('[data-href="instagram"]',  r.instagram);
  setHref('[data-href="tiktok"]',     r.tiktok);

  // WhatsApp float button
  document.querySelectorAll('.whatsapp-float').forEach(el => {
    el.href = buildWa(c.whatsappLink, c.whatsappMsg);
  });

  // Google Maps embed
  document.querySelectorAll('[data-mapa-embed]').forEach(el => {
    el.src = u.mapaEmbed;
  });

  // Copyright year
  setAll('[data-cfg="copyright"]',
    `© ${cfg.anio} ${cfg.nombreLargo}. Todos los derechos reservados.`);

  // Ocultar redes vacías
  ['facebook','instagram','tiktok','youtube'].forEach(red => {
    if (!r[red]) {
      document.querySelectorAll(`[data-red="${red}"]`).forEach(el => {
        el.style.display = 'none';
      });
    }
  });
}

function setAll(sel, val) {
  document.querySelectorAll(sel).forEach(el => { el.textContent = val; });
}
function setHref(sel, href) {
  if (!href) return;
  document.querySelectorAll(sel).forEach(el => { el.href = href; });
}
function buildWa(base, msg) {
  return msg ? `${base}?text=${encodeURIComponent(msg)}` : base;
}
