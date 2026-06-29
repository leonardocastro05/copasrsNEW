// ============================================================
// SPANISH RACING SERIES — ELIMINATORIAS (bracket de 16)
// ============================================================
// Lee SRS.eliminatorias = { octavos, cuartos, semis, final }
// Cada partido tiene la forma:
//   { id, p1, s1, p2, s2, ganador, posG, posL }
//     p1 / p2  -> nombre del equipo (o 'TBD' si aún no está definido)
//     s1 / s2  -> seed / cabeza de serie (opcional, 'G' = genérico)
//     ganador  -> 1 | 2 | null
//     posG/posL -> posiciones finales de carrera del ganador/perdedor (opcional)
//
// Si SRS.eliminatorias.octavos está vacío (todavía no hay 16 clasificados),
// se pintan 8 partidos "TBD vs TBD" para que el bracket se vea desde ya.

(function () {
  function vacioOcho() {
    return Array.from({ length: 8 }, (_, i) => ({
      id: `oct-${i + 1}`,
      p1: "TBD",
      s1: "G",
      p2: "TBD",
      s2: "G",
      ganador: null,
      posG: null,
      posL: null,
    }));
  }

  function vacioCuatro(prefijo) {
    return Array.from({ length: 4 }, (_, i) => ({
      id: `${prefijo}-${i + 1}`,
      p1: "TBD",
      s1: "G",
      p2: "TBD",
      s2: "G",
      ganador: null,
      posG: null,
      posL: null,
    }));
  }

  const elim = SRS.eliminatorias || {};
  const octavos =
    elim.octavos && elim.octavos.length === 8 ? elim.octavos : vacioOcho();
  const cuartos =
    elim.cuartos && elim.cuartos.length === 4
      ? elim.cuartos
      : vacioCuatro("cua");
  const semis =
    elim.semis && elim.semis.length === 2
      ? elim.semis
      : vacioCuatro("sem").slice(0, 2);
  const final = elim.final || {
    id: "fin-1",
    p1: "TBD",
    s1: "G",
    p2: "TBD",
    s2: "G",
    ganador: null,
    posG: null,
    posL: null,
  };

  // Octavos: 8 partidos repartidos 4 a la izquierda / 4 a la derecha
  const octL = octavos.slice(0, 4);
  const octR = octavos.slice(4, 8);
  // Cuartos: 4 partidos, 2 a cada lado
  const cuaL = cuartos.slice(0, 2);
  const cuaR = cuartos.slice(2, 4);
  // Semis: 1 a cada lado
  const semL = semis.slice(0, 1);
  const semR = semis.slice(1, 2);

  // ── RENDER DE UN PARTIDO ───────────────────────────────────
  function renderMatch(m, opts = {}) {
    const { headLabel = "", alignRight = false, isFinal = false } = opts;

    const slotClass = (esGanador, esTbd) => {
      if (esTbd) return "b-slot b-slot--tbd";
      if (m.ganador === null) return "b-slot";
      return esGanador ? "b-slot b-slot--win" : "b-slot b-slot--los";
    };

    const tbd1 = !m.p1 || m.p1 === "TBD";
    const tbd2 = !m.p2 || m.p2 === "TBD";

    const posTag = (pos) =>
      pos !== null && pos !== undefined
        ? `<span class="b-seed">${pos}</span>`
        : `<span class="b-seed">${m.s1 || m.s2 || "·"}</span>`;

    const slot1 = `<div class="${slotClass(m.ganador === 1, tbd1)}">
            <span class="b-seed">${tbd1 ? "·" : m.ganador === 1 ? (m.posG ?? m.s1 ?? "·") : m.ganador === 2 ? (m.posL ?? m.s1 ?? "·") : (m.s1 ?? "·")}</span>
            <span class="b-name">${m.p1 || "TBD"}</span>
        </div>`;

    const slot2 = `<div class="${slotClass(m.ganador === 2, tbd2)}">
            <span class="b-seed">${tbd2 ? "·" : m.ganador === 2 ? (m.posG ?? m.s2 ?? "·") : m.ganador === 1 ? (m.posL ?? m.s2 ?? "·") : (m.s2 ?? "·")}</span>
            <span class="b-name">${m.p2 || "TBD"}</span>
        </div>`;

    const headClass = isFinal
      ? "b-match-head b-match-head--final"
      : `b-match-head${alignRight ? " b-match-head--right" : ""}`;
    const matchClass = isFinal ? "b-match b-match--final" : "b-match";

    return `<div class="${matchClass}">
            <div class="${headClass}">${headLabel}</div>
            ${slot1}
            ${slot2}
        </div>`;
  }

  function renderCol(elId, matches, opts) {
    const el = document.getElementById(elId);
    if (!el) return;
    el.innerHTML = matches
      .map((m, i) =>
        renderMatch(m, { ...opts, headLabel: `${opts.label} · M${i + 1}` }),
      )
      .join("");
  }

  // ── PINTAR COLUMNAS ─────────────────────────────────────────
  renderCol("b-col-oct-l", octL, { label: "Octavos", alignRight: false });
  renderCol("b-col-oct-r", octR, { label: "Octavos", alignRight: true });
  renderCol("b-col-cua-l", cuaL, { label: "Cuartos", alignRight: false });
  renderCol("b-col-cua-r", cuaR, { label: "Cuartos", alignRight: true });
  renderCol("b-col-sem-l", semL, { label: "Semis", alignRight: false });
  renderCol("b-col-sem-r", semR, { label: "Semis", alignRight: true });

  // ── CENTRO: FINAL + TROFEO ──────────────────────────────────
  (function () {
    const el = document.getElementById("b-center");
    if (!el) return;

    const campeon =
      final.ganador === 1 ? final.p1 : final.ganador === 2 ? final.p2 : null;

    el.innerHTML = `
            <div class="b-trophy">🏆</div>
            ${renderMatch(final, { label: "Final", headLabel: "Gran Final", isFinal: true })}
            <div class="b-champ-label">${campeon ? campeon : "Por determinar"}</div>
        `;
  })();

  // ── CONECTORES (líneas simples entre columnas) ───────────────
  (function () {
    const ids = [
      "b-cn-ol-cl",
      "b-cn-cl-sl",
      "b-cn-sl-f",
      "b-cn-f-sr",
      "b-cn-sr-cr",
      "b-cn-cr-or",
    ];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.innerHTML = `<svg viewBox="0 0 28 100" preserveAspectRatio="none">
                <line x1="0" y1="25" x2="28" y2="25" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
                <line x1="0" y1="75" x2="28" y2="75" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
                <line x1="14" y1="25" x2="14" y2="75" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
            </svg>`;
    });
  })();
})();
