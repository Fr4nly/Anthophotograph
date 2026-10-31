// Luz que sigue al cursor. Solo se activa con ratón (en táctil no hace falta).
export function initSpotlight(root: ParentNode) {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  root.querySelectorAll<HTMLElement>('[data-spot]').forEach((el) => {
    let raf = 0;
    let cx = 0;
    let cy = 0;

    el.addEventListener(
      'pointermove',
      (e) => {
        cx = e.clientX;
        cy = e.clientY;
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          const r = el.getBoundingClientRect();
          el.style.setProperty('--x', `${cx - r.left}px`);
          el.style.setProperty('--y', `${cy - r.top}px`);
        });
      },
      { passive: true }
    );
  });
}