// ============================================================
// COPA DE VERANO T39 — motor de clasificación, cortes y vista previa
// Puntos = 3 por duelo ganado (+ 3 si el equipo descansó esa jornada).
// Mientras una fase está en curso, se muestra una previsión en vivo
// (con borde discontinuo) de quién quedaría dentro/fuera si acabara
// ahora mismo. En cuanto la fase se cierra del todo, esa previsión
// se sustituye por el resultado oficial y bloqueado.
// ============================================================
(function () {
  function puntosAcumulados(hastaJornada, equiposFiltro) {
    const puntos = {};
    (equiposFiltro || []).forEach((eq) => (puntos[eq] = 0));

    SRS.jornadas.forEach((j) => {
      if (j.numero > hastaJornada) return;

      if (j.descansa) {
        if (!equiposFiltro || equiposFiltro.includes(j.descansa)) {
          puntos[j.descansa] = (puntos[j.descansa] || 0) + 3;
        }
      }

      if (!j.enfrentamientos) return;
      j.enfrentamientos.forEach((d) => {
        if (!d.ganador) return;
        const ganador = d.ganador === "A" ? d.equipoA : d.equipoB;
        if (equiposFiltro && !equiposFiltro.includes(ganador)) return;
        puntos[ganador] = (puntos[ganador] || 0) + 3;
      });
    });

    return Object.entries(puntos)
      .map(([equipo, pts]) => ({ equipo, pts }))
      .sort((a, b) => b.pts - a.pts);
  }

  function jornadasListas(hasta) {
    return SRS.jornadas
      .filter((j) => j.numero <= hasta)
      .every((j) => j.completada === true);
  }

  function ultimaJornadaCompletada() {
    return Math.max(
      0,
      ...SRS.jornadas.filter((j) => j.completada).map((j) => j.numero),
    );
  }

  function estadoCopa(equipo, copa) {
    // Estados OFICIALES (fase ya cerrada, no cambian)
    if (copa.clasificadosDirectos.includes(equipo)) return "directo";
    if (copa.eliminadosFase2.includes(equipo)) return "eliminado-f2";
    if (copa.eliminadosFase3.includes(equipo)) return "eliminado-f3";
    if (copa.clasificados16.includes(equipo)) return "final-16";

    // Estados PROVISIONALES (la fase sigue en curso, puede cambiar)
    if (copa.faseActual === 1) {
      return copa.previewDirectos.includes(equipo)
        ? "directo-preview"
        : "en-liza";
    }
    if (copa.faseActual === 2) {
      return copa.previewEliminadosF2.includes(equipo)
        ? "eliminado-f2-preview"
        : "en-liza";
    }
    if (copa.faseActual === 3) {
      if (copa.previewEliminadosF3.includes(equipo)) return "eliminado-f3-preview";
      if (copa.previewFinal16.includes(equipo)) return "final-16-preview";
      return "en-liza";
    }
    return "pendiente";
  }
  SRS.estadoCopa = estadoCopa;

  function calcularCopa() {
    const todos = SRS.pilotos.map((p) => p.equipo);
    const ultima = ultimaJornadaCompletada();

    const resultado = {
      clasificadosDirectos: [],
      eliminadosFase2: [],
      eliminadosFase3: [],
      clasificados16: [],
      tablaFase1: [],
      tablaFase2: [],
      tablaFase3: [],
      previewDirectos: [],
      previewEliminadosF2: [],
      previewEliminadosF3: [],
      previewFinal16: [],
      faseActual: 1,
    };

    // ── FASE 1 (J1-J8) ─────────────────────────────────────────
    if (!jornadasListas(8)) {
      resultado.faseActual = 1;
      const tablaLive = puntosAcumulados(ultima, todos);
      resultado.previewDirectos = tablaLive.slice(0, 8).map((r) => r.equipo);
      return resultado;
    }
    const tabla1 = puntosAcumulados(8, todos);
    resultado.tablaFase1 = tabla1;
    resultado.clasificadosDirectos = tabla1.slice(0, 8).map((r) => r.equipo);
    const siguen = todos.filter((eq) => !resultado.clasificadosDirectos.includes(eq));

    // ── FASE 2 (J9-J10) ────────────────────────────────────────
    if (!jornadasListas(10)) {
      resultado.faseActual = 2;
      const tablaLive2 = puntosAcumulados(ultima, siguen);
      resultado.previewEliminadosF2 = tablaLive2.slice(-4).map((r) => r.equipo);
      return resultado;
    }
    const tabla2 = puntosAcumulados(10, siguen);
    resultado.tablaFase2 = tabla2;
    resultado.eliminadosFase2 = tabla2.slice(-4).map((r) => r.equipo);
    const siguen20 = siguen.filter((eq) => !resultado.eliminadosFase2.includes(eq));

    // ── FASE 3 (J11-J18) ───────────────────────────────────────
    if (!jornadasListas(18)) {
      resultado.faseActual = 3;
      const tablaLive3 = puntosAcumulados(ultima, siguen20);
      resultado.previewEliminadosF3 = tablaLive3.slice(-4).map((r) => r.equipo);
      resultado.previewFinal16 = tablaLive3.slice(0, 16).map((r) => r.equipo);
      return resultado;
    }
    const tabla3 = puntosAcumulados(18, siguen20);
    resultado.tablaFase3 = tabla3;
    resultado.eliminadosFase3 = tabla3.slice(-4).map((r) => r.equipo);
    resultado.clasificados16 = tabla3.slice(0, 16).map((r) => r.equipo);
    resultado.faseActual = 4;

    return resultado;
  }

  function tablaEnVivo() {
    const ultima = ultimaJornadaCompletada();
    const todos = SRS.pilotos.map((p) => p.equipo);
    return puntosAcumulados(ultima, todos);
  }

  SRS.tablaEnVivo = tablaEnVivo;
  SRS.calcularCopa = calcularCopa;
  window.SRS_COPA = calcularCopa();
})();