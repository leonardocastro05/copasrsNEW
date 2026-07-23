// ============================================================
// COPA DE VERANO T39 — motor de clasificación y cortes
// ============================================================
(function () {
  // Suma puntos acumulados (jornada 1 a "hasta") de una lista de equipos
  function puntosAcumulados(hastaJornada, equiposFiltro) {
    const puntos = {};
    (equiposFiltro || []).forEach((eq) => (puntos[eq] = 0));

    SRS.jornadas.forEach((j) => {
      if (j.numero > hastaJornada || !j.resultados) return;
      j.resultados.forEach((r) => {
        if (equiposFiltro && !equiposFiltro.includes(r.equipo)) return;
        puntos[r.equipo] = (puntos[r.equipo] || 0) + (r.pts || 0);
      });
    });

    return Object.entries(puntos)
      .map(([equipo, pts]) => ({ equipo, pts }))
      .sort((a, b) => b.pts - a.pts);
  }

  // Comprueba si todas las jornadas hasta "n" ya tienen resultados cargados
  function jornadasListas(hasta) {
    return SRS.jornadas
      .filter((j) => j.numero <= hasta)
      .every((j) => j.resultados && j.resultados.length > 0);
  }

  function calcularCopa() {
    const todos = SRS.pilotos.map((p) => p.equipo);
    const resultado = {
      clasificadosDirectos: [],
      eliminadosFase2: [],
      eliminadosFase3: [],
      clasificados16: [],
      tablaFase1: [],
      tablaFase2: [],
      tablaFase3: [],
      faseActual: 1,
    };

    function estadoCopa(equipo, copa) {
      if (copa.clasificadosDirectos.includes(equipo)) return "directo"; // top 8 tras F1
      if (copa.eliminadosFase2.includes(equipo)) return "eliminado-f2"; // fuera en F2
      if (copa.eliminadosFase3.includes(equipo)) return "eliminado-f3"; // fuera en F3
      if (copa.clasificados16.includes(equipo)) return "final-16"; // en fase final
      if (copa.faseActual >= 2 && copa.faseActual < 4) return "en-liza"; // sigue compitiendo, sin resolver aún
      return "pendiente"; // fase 1 todavía sin cerrar
    }

    SRS.estadoCopa = estadoCopa;

    // FASE 1 — carreras 1-8
    if (!jornadasListas(8)) {
      resultado.faseActual = 1;
      return resultado;
    }
    const tabla1 = puntosAcumulados(8, todos);
    resultado.tablaFase1 = tabla1;
    resultado.clasificadosDirectos = tabla1.slice(0, 8).map((r) => r.equipo);

    const siguen24 = tabla1.slice(8).map((r) => r.equipo);

    // FASE 2 — carreras 9-10 (puntos acumulados desde carrera 1)
    if (!jornadasListas(10)) {
      resultado.faseActual = 2;
      return resultado;
    }
    const tabla2 = puntosAcumulados(10, siguen24);
    resultado.tablaFase2 = tabla2;
    resultado.eliminadosFase2 = tabla2.slice(-4).map((r) => r.equipo);

    const siguen20 = tabla2.slice(0, 20).map((r) => r.equipo);

    // FASE 3 — carreras 11-18 (puntos acumulados desde carrera 1)
    if (!jornadasListas(18)) {
      resultado.faseActual = 3;
      return resultado;
    }
    const tabla3 = puntosAcumulados(18, siguen20);
    resultado.tablaFase3 = tabla3;
    resultado.eliminadosFase3 = tabla3.slice(-4).map((r) => r.equipo);
    resultado.clasificados16 = tabla3.slice(0, 16).map((r) => r.equipo);
    resultado.faseActual = 4; // fase final / eliminatorias

    return resultado;
  }

  function tablaEnVivo() {
    const ultimaConResultados = Math.max(
      0,
      ...SRS.jornadas
        .filter((j) => j.resultados && j.resultados.length > 0)
        .map((j) => j.numero),
    );
    const todos = SRS.pilotos.map((p) => p.equipo);
    return puntosAcumulados(ultimaConResultados, todos);
  }

  SRS.tablaEnVivo = tablaEnVivo;
  SRS.calcularCopa = calcularCopa;
  window.SRS_COPA = calcularCopa();
})();
