// ============================================================
// COPA DE VERANO T39 — motor de clasificación y cortes
// Puntos = 3 por duelo ganado + 3 automáticos si el equipo
// descansó esa jornada (bye). NO se usan clasificaciones planas.
// ============================================================
(function () {
  // Suma puntos acumulados (jornada 1 a "hasta") a partir de los
  // enfrentamientos (duelos 1v1) de cada jornada + el bono de descanso.
  function puntosAcumulados(hastaJornada, equiposFiltro) {
    const puntos = {};
    (equiposFiltro || []).forEach((eq) => (puntos[eq] = 0));

    SRS.jornadas.forEach((j) => {
      if (j.numero > hastaJornada) return;

      // Bono de descanso: el equipo que no corre esa jornada se lleva 3 pts
      if (j.descansa) {
        if (!equiposFiltro || equiposFiltro.includes(j.descansa)) {
          puntos[j.descansa] = (puntos[j.descansa] || 0) + 3;
        }
      }

      if (!j.enfrentamientos) return;

      j.enfrentamientos.forEach((d) => {
        if (!d.ganador) return; // duelo aún sin resolver
        const ganador = d.ganador === "A" ? d.equipoA : d.equipoB;
        if (equiposFiltro && !equiposFiltro.includes(ganador)) return;
        puntos[ganador] = (puntos[ganador] || 0) + 3;
      });
    });

    return Object.entries(puntos)
      .map(([equipo, pts]) => ({ equipo, pts }))
      .sort((a, b) => b.pts - a.pts);
  }

  // Una jornada cuenta como "lista" cuando está marcada completada
  // (todos sus duelos tienen ganador asignado).
  function jornadasListas(hasta) {
    return SRS.jornadas
      .filter((j) => j.numero <= hasta)
      .every((j) => j.completada === true);
  }

  function estadoCopa(equipo, copa) {
    if (copa.clasificadosDirectos.includes(equipo)) return "directo";
    if (copa.eliminadosFase2.includes(equipo)) return "eliminado-f2";
    if (copa.eliminadosFase3.includes(equipo)) return "eliminado-f3";
    if (copa.clasificados16.includes(equipo)) return "final-16";
    if (copa.faseActual >= 2 && copa.faseActual < 4) return "en-liza";
    return "pendiente";
  }
  SRS.estadoCopa = estadoCopa;

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

    // FASE 1 — jornadas 1-8
    if (!jornadasListas(8)) {
      resultado.faseActual = 1;
      return resultado;
    }
    const tabla1 = puntosAcumulados(8, todos);
    resultado.tablaFase1 = tabla1;
    resultado.clasificadosDirectos = tabla1.slice(0, 8).map((r) => r.equipo);
    const siguen = tabla1.slice(8).map((r) => r.equipo);

    // FASE 2 — jornadas 9-10
    if (!jornadasListas(10)) {
      resultado.faseActual = 2;
      return resultado;
    }
    const tabla2 = puntosAcumulados(10, siguen);
    resultado.tablaFase2 = tabla2;
    resultado.eliminadosFase2 = tabla2.slice(-4).map((r) => r.equipo);
    const siguen20 = tabla2.slice(0, tabla2.length - 4).map((r) => r.equipo);

    // FASE 3 — jornadas 11-18
    if (!jornadasListas(18)) {
      resultado.faseActual = 3;
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
    const ultimaConDatos = Math.max(
      0,
      ...SRS.jornadas.filter((j) => j.completada).map((j) => j.numero),
    );
    const todos = SRS.pilotos.map((p) => p.equipo);
    return puntosAcumulados(ultimaConDatos, todos);
  }

  SRS.tablaEnVivo = tablaEnVivo;
  SRS.calcularCopa = calcularCopa;
  window.SRS_COPA = calcularCopa();
})();