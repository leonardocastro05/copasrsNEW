// ============================================================
// SPANISH RACING SERIES — eliminatorias.js
// Bracket simétrico: 4 oct-izq → cua → sem → FINAL ← sem ← cua ← 4 oct-der
// Depende de: srs-data.js (SRS.eliminatorias)
// ============================================================

(function () {
    const E = SRS.eliminatorias;

    // ── FOOTER ──────────────────────────────────────────────
    const fl = document.getElementById('footer-links');
    if (fl) {
        fl.innerHTML = SRS.redes
            .map(r => `<a href="${r.href}" target="_blank" rel="noopener noreferrer">${r.label}</a>`)
            .join('');
    }

    // ── HELPERS ─────────────────────────────────────────────
    function slotClass(winIdx, myIdx) {
        if (winIdx === null || winIdx === undefined) return 'b-slot--tbd';
        return winIdx === myIdx ? 'b-slot--win' : 'b-slot--los';
    }

    function buildMatch(m, mirror, isFinal) {
        const cls1 = slotClass(m.ganador ? (m.p1 === m.ganador ? 0 : 1) : null, 0);
        const cls2 = slotClass(m.ganador ? (m.p2 === m.ganador ? 1 : 0) : null, 1);

        const headCls = isFinal
            ? 'b-match-head--final'
            : mirror ? 'b-match-head--right' : '';

        const posG = m.posG ? `<span style="margin-left:auto;font-family:'DM Mono',monospace;font-size:0.5rem;color:var(--gold);flex-shrink:0;">${m.posG}</span>` : '';
        const posL = m.posL ? `<span style="margin-left:auto;font-family:'DM Mono',monospace;font-size:0.5rem;color:var(--text-muted);flex-shrink:0;">${m.posL}</span>` : '';

        const pos1 = m.ganador && m.p1 === m.ganador ? posG : (m.ganador ? posL : '');
        const pos2 = m.ganador && m.p2 === m.ganador ? posG : (m.ganador ? posL : '');

        return `<div class="b-match${isFinal ? ' b-match--final' : ''}">
      <div class="b-match-head ${headCls}">${m.id || ''}</div>
      <div class="b-slot ${cls1}">
        <div class="b-seed">${m.s1 || '?'}</div>
        <span class="b-name">${m.p1}</span>${pos1}
      </div>
      <div class="b-vs">vs</div>
      <div class="b-slot ${cls2}">
        <div class="b-seed">${m.s2 || '?'}</div>
        <span class="b-name">${m.p2}</span>${pos2}
      </div>
    </div>`;
    }

    // ── RENDER COLUMNAS ──────────────────────────────────────
    const octL = E.octavos.slice(0, 4);
    const octR = E.octavos.slice(4, 8);

    document.getElementById('b-col-oct-l').innerHTML = octL.map(m => buildMatch(m, false, false)).join('');
    document.getElementById('b-col-oct-r').innerHTML = octR.map(m => buildMatch(m, true, false)).join('');
    document.getElementById('b-col-cua-l').innerHTML = E.cuartos.slice(0, 2).map(m => buildMatch(m, false, false)).join('');
    document.getElementById('b-col-cua-r').innerHTML = E.cuartos.slice(2, 4).map(m => buildMatch(m, true, false)).join('');
    document.getElementById('b-col-sem-l').innerHTML = [E.semis[0]].map(m => buildMatch(m, false, false)).join('');
    document.getElementById('b-col-sem-r').innerHTML = [E.semis[1]].map(m => buildMatch(m, true, false)).join('');

    // Final + trofeo
    document.getElementById('b-center').innerHTML = `
    <div class="b-trophy">🏆</div>
    <div class="b-champ-label">Campeón<br>T37</div>
    ${buildMatch(E.final, false, true)}`;

    // ── SVG CONECTORES ───────────────────────────────────────
    function drawConnector(connId, fromColId, toColId, direction) {
        const connEl = document.getElementById(connId);
        if (!connEl) return;

        const fromCards = [...document.querySelectorAll(`#${fromColId} .b-match`)];
        const toCards = [...document.querySelectorAll(`#${toColId} .b-match`)];
        if (!fromCards.length || !toCards.length) return;

        const connRect = connEl.getBoundingClientRect();
        const H = connRect.height;
        const W = connRect.width;
        if (!H || !W) return;

        const paths = [];
        const pairSize = fromCards.length / toCards.length;

        toCards.forEach((toCard, ti) => {
            const toR = toCard.getBoundingClientRect();
            const toY = (toR.top + toR.bottom) / 2 - connRect.top;
            const x2 = direction === 'ltr' ? W : 0;
            const x1 = direction === 'ltr' ? 0 : W;
            const mx = W / 2;

            for (let i = 0; i < pairSize; i++) {
                const fromCard = fromCards[ti * pairSize + i];
                if (!fromCard) return;
                const fromR = fromCard.getBoundingClientRect();
                const fromY = (fromR.top + fromR.bottom) / 2 - connRect.top;
                paths.push(
                    `<path d="M${x1},${fromY} H${mx} V${toY} H${x2}" fill="none" stroke="rgba(240,184,0,0.28)" stroke-width="1" stroke-linejoin="round"/>`
                );
            }
        });

        connEl.innerHTML = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"
      style="position:absolute;inset:0;width:100%;height:100%;overflow:visible">
      ${paths.join('')}
    </svg>`;
    }

    // Conectores izquierda → centro
    function drawFinalConn(connId, fromColId, direction) {
        const connEl = document.getElementById(connId);
        if (!connEl) return;
        const fromCards = [...document.querySelectorAll(`#${fromColId} .b-match`)];
        const toCard = document.querySelector('#b-center .b-match');
        if (!fromCards.length || !toCard) return;

        const connRect = connEl.getBoundingClientRect();
        const H = connRect.height;
        const W = connRect.width;
        if (!H || !W) return;

        const toR = toCard.getBoundingClientRect();
        const toY = (toR.top + toR.bottom) / 2 - connRect.top;
        const x2 = direction === 'ltr' ? W : 0;
        const x1 = direction === 'ltr' ? 0 : W;
        const mx = W / 2;

        const paths = fromCards.map(fromCard => {
            const fromR = fromCard.getBoundingClientRect();
            const fromY = (fromR.top + fromR.bottom) / 2 - connRect.top;
            return `<path d="M${x1},${fromY} H${mx} V${toY} H${x2}" fill="none" stroke="rgba(240,184,0,0.28)" stroke-width="1" stroke-linejoin="round"/>`;
        });

        connEl.innerHTML = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"
      style="position:absolute;inset:0;width:100%;height:100%;overflow:visible">
      ${paths.join('')}
    </svg>`;
    }

    function redrawAll() {
        drawConnector('b-cn-ol-cl', 'b-col-oct-l', 'b-col-cua-l', 'ltr');
        drawConnector('b-cn-cl-sl', 'b-col-cua-l', 'b-col-sem-l', 'ltr');
        drawFinalConn('b-cn-sl-f', 'b-col-sem-l', 'ltr');
        drawFinalConn('b-cn-f-sr', 'b-col-sem-r', 'rtl');
        drawConnector('b-cn-sr-cr', 'b-col-sem-r', 'b-col-cua-r', 'rtl');
        drawConnector('b-cn-cr-or', 'b-col-cua-r', 'b-col-oct-r', 'rtl');
    }

    requestAnimationFrame(() => requestAnimationFrame(redrawAll));
    window.addEventListener('resize', redrawAll);

})();