// ============================================================
// SORTEO DE OCTAVOS — Copa de Verano T39
// (revelado uno por uno + persistencia validada + fase final T39)
// ============================================================
(function () {
  const STORAGE_KEY = "srs_t39_sorteo";

  // Los 16 clasificados salen del motor de la Copa (copa.js),
  // no de SRS.pilotos como en T38
  function clasificados() {
    if (!window.SRS_COPA || SRS_COPA.faseActual < 4) {
      return [];
    }
    return SRS_COPA.clasificados16.map((equipo) => {
      const pos = SRS_COPA.tablaFase3.findIndex((r) => r.equipo === equipo) + 1;
      return { equipo: equipo, pos: pos };
    });
  }

  function firmaClasificados(lista) {
    // Firma estable para saber si los datos guardados corresponden
    // a este mismo conjunto de 16 clasificados
    return lista
      .map((p) => p.equipo)
      .sort()
      .join("|");
  }

  const TODOS = clasificados();
  const FIRMA_ACTUAL = firmaClasificados(TODOS);
  const COPA_LISTA = TODOS.length === 16;

  SRS.sorteo = { pendientes: TODOS.slice(), orden: [] };

  function guardarEstado() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        firma: FIRMA_ACTUAL,
        octavos: SRS.eliminatorias.octavos,
        pendientes: SRS.sorteo.pendientes,
        orden: SRS.sorteo.orden,
      }),
    );
  }

  function cargarEstadoGuardado() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;
      const data = JSON.parse(raw);

      // Si los datos guardados no corresponden a los 16 clasificados
      // actuales (p.ej. cambió algo en la Copa, o eran datos corruptos
      // de antes), los descartamos y empezamos de cero.
      if (data.firma !== FIRMA_ACTUAL) {
        localStorage.removeItem(STORAGE_KEY);
        return false;
      }

      SRS.eliminatorias.octavos = data.octavos || [];
      SRS.sorteo.pendientes = data.pendientes || TODOS.slice();
      SRS.sorteo.orden = data.orden || [];
      return SRS.sorteo.orden.length > 0;
    } catch (e) {
      localStorage.removeItem(STORAGE_KEY);
      return false;
    }
  }

  function reiniciarSorteo() {
    localStorage.removeItem(STORAGE_KEY);
    SRS.eliminatorias.octavos = [];
    SRS.sorteo.pendientes = TODOS.slice();
    SRS.sorteo.orden = [];
    if (typeof window.renderBracket === "function") window.renderBracket();

    const reveladas = document.getElementById("sorteo-reveladas");
    if (reveladas) {
      reveladas.innerHTML = "";
      reveladas.hidden = true;
    }
  }

  function crearPartidoOctavos() {
    const orden = SRS.sorteo.orden;
    const equipoA = orden[orden.length - 2];
    const equipoB = orden[orden.length - 1];
    const numeroPartido = orden.length / 2;

    SRS.eliminatorias.octavos.push({
      id: "oct-" + numeroPartido,
      p1: equipoA.equipo,
      s1: equipoA.pos,
      p2: equipoB.equipo,
      s2: equipoB.pos,
      ganador: null,
      posG: null,
      posL: null,
    });
  }

  function añadirBolaRevelada(equipo) {
    const cont = document.getElementById("sorteo-reveladas");
    if (!cont) return;
    cont.hidden = false;
    const bola = document.createElement("div");
    bola.className = "sorteo-bola";
    bola.textContent = equipo;
    cont.appendChild(bola);
  }

  // Efecto ruleta: recorre nombres al azar y frena en el elegido real
  function animarSeleccion(candidatos, elegidoReal, elNombre, callback) {
    let vueltas = 0;
    const totalTicks = 18 + Math.floor(Math.random() * 8);
    let intervalo = 55;

    function tick() {
      const visual = candidatos[Math.floor(Math.random() * candidatos.length)];
      elNombre.textContent = visual.equipo;
      vueltas++;

      if (vueltas < totalTicks) {
        intervalo += 7; // frenada progresiva
        setTimeout(tick, intervalo);
      } else {
        elNombre.textContent = elegidoReal.equipo;
        setTimeout(callback, 550);
      }
    }
    tick();
  }

  function sortearSiguiente(onFinTotal) {
    const pendientes = SRS.sorteo.pendientes;
    const elNombre = document.getElementById("sorteo-nombre-actual");
    const elContador = document.getElementById("sorteo-contador");

    if (pendientes.length === 0) {
      if (onFinTotal) onFinTotal();
      return;
    }

    const numeroBola = SRS.sorteo.orden.length + 1;
    if (elContador) elContador.textContent = `Bola ${numeroBola} de 16`;

    const indice = Math.floor(Math.random() * pendientes.length);
    const elegido = pendientes[indice];

    animarSeleccion(pendientes, elegido, elNombre, function () {
      pendientes.splice(indice, 1);
      SRS.sorteo.orden.push(elegido);
      añadirBolaRevelada(elegido.equipo);

      // El bracket solo se repinta al cerrar cada pareja,
      // así el emparejamiento no se ve "antes de tiempo"
      if (SRS.sorteo.orden.length % 2 === 0) {
        crearPartidoOctavos();
        if (typeof window.renderBracket === "function") window.renderBracket();
      }

      guardarEstado();
      setTimeout(() => sortearSiguiente(onFinTotal), 900);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    const btnGenerar = document.getElementById("btn-generar-sorteo");
    const btnReiniciar = document.getElementById("btn-reiniciar-sorteo");
    const ruleta = document.getElementById("sorteo-ruleta");
    const reveladas = document.getElementById("sorteo-reveladas");

    // La Copa aún no ha llegado a la fase final (faltan jornadas 1-18)
    if (!COPA_LISTA) {
      if (btnGenerar) {
        btnGenerar.disabled = true;
        btnGenerar.textContent = "⏳ Copa en curso — faltan jornadas";
      }
      if (btnReiniciar) btnReiniciar.disabled = true;
      return;
    }

    const restaurado = cargarEstadoGuardado();

    if (restaurado) {
      if (typeof window.renderBracket === "function") window.renderBracket();
      // repinta las bolas ya sorteadas de sesiones anteriores
      if (reveladas) {
        reveladas.hidden = SRS.sorteo.orden.length === 0;
        SRS.sorteo.orden.forEach((p) => {
          const bola = document.createElement("div");
          bola.className = "sorteo-bola";
          bola.style.animation = "none";
          bola.style.opacity = "1";
          bola.style.transform = "scale(1)";
          bola.textContent = p.equipo;
          reveladas.appendChild(bola);
        });
      }
      if (SRS.sorteo.pendientes.length === 0 && btnGenerar) {
        btnGenerar.disabled = true;
        btnGenerar.textContent = "🎉 Sorteo completo";
      }
    }

    if (btnGenerar) {
      btnGenerar.addEventListener("click", function () {
        if (SRS.sorteo.pendientes.length === 0) {
          alert(
            "El sorteo ya está completo. Usa 'Reiniciar' si quieres repetirlo.",
          );
          return;
        }
        if (ruleta) ruleta.hidden = false;
        btnGenerar.disabled = true;
        sortearSiguiente(function () {
          btnGenerar.disabled = false;
          btnGenerar.textContent = "🎉 Sorteo completo";
        });
      });
    }

    if (btnReiniciar) {
      btnReiniciar.addEventListener("click", function () {
        if (
          confirm(
            "¿Seguro que quieres borrar el sorteo actual y empezar de cero?",
          )
        ) {
          reiniciarSorteo();
          if (btnGenerar) {
            btnGenerar.disabled = false;
            btnGenerar.textContent = "🎲 Generar sorteo";
          }
          if (ruleta) ruleta.hidden = true;
        }
      });
    }
  });
})();
