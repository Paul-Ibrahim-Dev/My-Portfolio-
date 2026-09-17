document.addEventListener('DOMContentLoaded', () => {

  const stage = document.querySelector('.hero-visual');
  const labels = document.querySelectorAll('.floating-label');

  if (!stage || !labels.length) return;

  const orbitSettings = [
    { radiusX: 210, radiusY: 130, speed: 0.15, offset: 0 },
    { radiusX: 190, radiusY: 150, speed: 0.12, offset: 2.2 },
    { radiusX: 170, radiusY: 110, speed: 0.18, offset: 4.4 },
  ];

  labels.forEach((label, i) => {
    const s = orbitSettings[i % orbitSettings.length];
    label.dataset.radiusX = s.radiusX;
    label.dataset.radiusY = s.radiusY;
    label.dataset.speed = s.speed;
    label.dataset.offset = s.offset;

    label.style.position = 'absolute';
    label.style.top = '0px';
    label.style.left = '0px';
  });

  let elapsed = 0;
  let lastTime = performance.now();

  function animate(now) {
    const delta = (now - lastTime) / 1000;
    lastTime = now;
    elapsed += delta;

    const stageRect = stage.getBoundingClientRect();
    const centerX = stageRect.width / 2;
    const centerY = stageRect.height / 2;

    labels.forEach((label) => {
      const radiusX = parseFloat(label.dataset.radiusX);
      const radiusY = parseFloat(label.dataset.radiusY);
      const speed = parseFloat(label.dataset.speed);
      const offset = parseFloat(label.dataset.offset);

      const angle = elapsed * speed + offset;

      const x = centerX + Math.cos(angle) * radiusX - label.offsetWidth / 2;
      const y = centerY + Math.sin(angle) * radiusY - label.offsetHeight / 2;

      label.style.transform = `translate(${x}px, ${y}px)`;
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      lastTime = performance.now();
    }
  });

});