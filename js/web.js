// Utilidades comunes: header, enlaces a perfiles y popup de bienvenida
function urlManager(nombre) {
  var id = PERFILES[nombre];
  if (id) return IGP.perfil + id;
  return IGP.liga;
}

function linkManager(nombre, clase) {
  return '<a class="mgr ' + (clase || "") + '" href="' + urlManager(nombre) +
    '" target="_blank" rel="noopener">' + nombre + "</a>";
}

function fichaManager(nombre, equipo) {
  var coche = COCHES[nombre];
  if (!coche) return "";
  return '<span class="manager-preview" role="status"><span class="preview-kicker">Conoce a este mánager</span>' +
    '<img src="' + coche + '" alt="Monoplaza de ' + nombre + '" loading="lazy">' +
    "</span>";
}

function buscarPorEquipo(equipo) {
  var encontrado = null;
  SRS.pilotos.forEach(function (p) {
    if (p.equipo === equipo) encontrado = p;
  });
  return encontrado;
}

function pintarHeader(activa) {
  var paginas = [
    ["index.html", "Inicio"],
    ["jornadas.html", "Jornadas"],
    ["eliminatorias.html", "Eliminatorias"],
  ];
  var html = '<header class="site-header"><a class="brand" href="index.html"><span class="brand-mark">+</span>SRS</a><nav>';
  paginas.forEach(function (p) {
    var c = p[0] === activa ? ' class="active"' : "";
    html += '<a href="' + p[0] + '"' + c + ">" + p[1] + "</a>";
  });
  html += '<a href="' + IGP.historia + '" target="_blank" rel="noopener">Historia <span aria-hidden="true">↗</span></a>';
  html += '<button id="btn-info" type="button" aria-label="Cómo funciona">?</button>';
  html += "</nav></header>";
  html += '<div class="banner-wrap"><img class="banner" src="img/banner.webp" alt="Spanish Racing Series"></div>';
  document.getElementById("header").innerHTML = html;
  document.getElementById("btn-info").addEventListener("click", abrirInfo);
}

var INFO_HTML =
  "<h2>Cómo funciona la próxima Copa</h2>" +
  '<div class="info-step"><b>1 · 13 jornadas</b><p>Se disputan 13 carreras en días aleatorios. En cada una, tu resultado se compara con el de tu oponente.</p></div>' +
  '<div class="info-step"><b>2 · Sistema de puntos</b><p>Ganar el duelo suma 3 puntos. La vuelta rápida añade 1 punto. Un NC resta 5 puntos y quedarse sin combustible, sin NC, resta 2.</p></div>' +
  '<div class="info-step"><b>3 · Dos caminos a la final</b><p>Los 16 mejores entran en la <strong>upper bracket</strong>. Los otros 16 disputan la <strong>lower bracket</strong> por una segunda oportunidad.</p></div>' +
  '<div class="info-step"><b>4 · Gran final</b><p>La final es un 1v1v1: los dos finalistas de la upper bracket más el ganador de la lower bracket.</p></div>' +
  '<div class="info-step"><b>5 · Recompensa</b><p>La lower bracket no tiene premios económicos. Si su ganador vence la final, se lleva el premio de la Copa, pero no las recompensas previas de la upper bracket.</p></div>' +
  '<button type="button" id="info-cerrar" class="btn">¡A correr!</button>';

function abrirInfo() {
  var m = document.getElementById("modal");
  if (!m) {
    m = document.createElement("div");
    m.id = "modal";
    m.innerHTML = '<div class="modal-box">' + INFO_HTML + "</div>";
    document.body.appendChild(m);
    m.addEventListener("click", function (e) {
      if (e.target === m || e.target.id === "info-cerrar") cerrarInfo();
    });
  }
  m.className = "open";
}

function cerrarInfo() {
  document.getElementById("modal").className = "";
}

function infoPrimeraVisita() {
  try {
    if (localStorage.getItem("srsInfoVista")) return;
    localStorage.setItem("srsInfoVista", "1");
  } catch (e) {
    return;
  }
  abrirInfo();
}