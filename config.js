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
  nombre: "Auditsa",
  nombreLargo: "Auditsa Consultorios Auditivos",
  slogan: "Escuchar bien es vivir mejor",

  /* ------------------------------------------
     LOGOS
     Coloca los archivos en la carpeta assets/
     y actualiza las rutas aquí.
  ------------------------------------------ */
  logos: {
    // Logo para navbar (horizontal, fondo claro)
    navbar: "assets/MORADO_2.png",
    // Logo para footer (horizontal, fondo oscuro)
    footer: "assets/BLANCO_2.png",
    // Logo cuadrado para favicon / hero
    iconoCuadrado: "assets/MORADO_1.png",
    // Logo para favicon (puedes usar un .ico o .png pequeño)
    favicon: "assets/MORADO_1.png",
  },

  /* ------------------------------------------
     CONTACTO
  ------------------------------------------ */
  contacto: {
    telefono: "+593964114893",      // Número principal (con código país)
    telefonoLink: "tel:+593964114893",      // Para href tel:
    whatsapp: "+593964114893",       // Número WhatsApp
    whatsappLink: "https://wa.me/593964114893", // URL de WhatsApp (sin espacios ni +)
    whatsappMsg: "Hola, me gustaría agendar una cita en AUDITSA.",
    // email:           "cmzuniga@sudamericano.edu.ec",
    // emailLink:       "mailto:cmzuniga@sudamericano.edu.ec",
    email: "auditsaconsultoriosauditivos@gmail.com",
    emailLink: "mailto:auditsaconsultoriosauditivos@gmail.com",
  },

  /* ------------------------------------------
     UBICACIÓN
  ------------------------------------------ */
  ubicacion: {
    calle: "Calle Larga y Huayna Cápac",
    referencia: "Frente a la puerta principal del Museo Pumapungo",
    ciudad: "Cuenca",
    provincia: "Azuay",
    pais: "Ecuador",

    // URL del iframe con el marcador oficial de Auditsa
    // mapaEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.721454651336!2d-78.9958742!3d-2.9038234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cd278f9dbfaffb%3A0xff34f86cbc00ed25!2sAuditsa%20Consultorios%20Auditivos!5e0!3m2!1ses-419!2sec!4v1715421234567!5m2!1ses-419!2sec",
    mapaEmbed: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3984.686501487229!2d-78.9971703214264!3d-2.9063190620539032!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cd19f5a8fe92a5%3A0xe6ee64fb90f72598!2sAUDITSA!5e0!3m2!1ses!2sec!4v1775681329006!5m2!1ses!2sec",

    // Enlace directo a la ficha para el botón "Cómo llegar"
    mapaLink: "https://maps.app.goo.gl/bEzpRGsFYqvV1gy27",
  },

  /* ------------------------------------------
     HORARIOS
  ------------------------------------------ */
  horarios: {
    dias: "Lunes a Viernes",
    manana: "09:00 – 13:00",
    tarde: "15:00 – 18:00",
    // Texto corto para footer / strips
    resumen: "Lun – Vie: 09:00–13:00 · 15:00–18:00",
  },

  /* ------------------------------------------
     REDES SOCIALES
     Deja en "" si no tienes esa red todavía.
  ------------------------------------------ */
  redes: {
    whatsapp: "https://wa.me/593964114893",
    facebook: "https://www.facebook.com/AUDITSACentroAuditivo",
    instagram: "https://www.instagram.com/auditsa.ec/",
    tiktok: "",     // Dejar vacío si no aplica
    youtube: "",     // Dejar vacío si no aplica
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
  const c = cfg.contacto;
  const u = cfg.ubicacion;
  const h = cfg.horarios;
  const r = cfg.redes;
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
  setAll('[data-cfg="nombre"]', cfg.nombre);
  setAll('[data-cfg="nombreLargo"]', cfg.nombreLargo);
  setAll('[data-cfg="slogan"]', cfg.slogan);
  setAll('[data-cfg="telefono"]', c.telefono);
  setAll('[data-cfg="whatsapp"]', c.whatsapp);
  setAll('[data-cfg="email"]', c.email);
  setAll('[data-cfg="calle"]', u.calle);
  setAll('[data-cfg="referencia"]', u.referencia);
  setAll('[data-cfg="ciudad"]', u.ciudad);
  setAll('[data-cfg="horarios"]', h.resumen);
  setAll('[data-cfg="horarioManana"]', h.manana);
  setAll('[data-cfg="horarioTarde"]', h.tarde);
  setAll('[data-cfg="dias"]', h.dias);
  setAll('[data-cfg="anio"]', cfg.anio);

  // ---- Links ----
  setHref('[data-href="telefono"]', c.telefonoLink);
  setHref('[data-href="whatsapp"]', buildWa(c.whatsappLink, c.whatsappMsg));
  setHref('[data-href="email"]', c.emailLink);
  setHref('[data-href="mapa"]', u.mapaLink);
  setHref('[data-href="facebook"]', r.facebook);
  setHref('[data-href="instagram"]', r.instagram);
  setHref('[data-href="tiktok"]', r.tiktok);

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
  ['facebook', 'instagram', 'tiktok', 'youtube'].forEach(red => {
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
