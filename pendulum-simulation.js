// pendulum-simulation.js - Cartoon Interactive Pendulum Simulation (Energy Conservation)

let pendulumSim = {
  canvas: null,
  ctx: null,
  length: 1.4,        // m
  mass: 1.2,          // kg
  gravity: 9.8,       // m/s^2
  damping: 0.0008,    // air friction
  angle: Math.PI / 4, // radians
  angularVelocity: 0,
  angularAcceleration: 0,
  originX: 0,
  originY: 0,
  isDragging: false,
  isPaused: false,
  animId: null
};

function initPendulumSimulation() {
  pendulumSim.canvas = document.getElementById('pendulumCanvas');
  if (!pendulumSim.canvas) return;
  pendulumSim.ctx = pendulumSim.canvas.getContext('2d');

  resizePendulumCanvas();
  window.addEventListener('resize', resizePendulumCanvas);

  setupPendulumInteraction();

  const lenSlider = document.getElementById('pendLenSlider');
  const massSlider = document.getElementById('pendMassSlider');
  const gSelect = document.getElementById('pendGSelect');

  if (lenSlider) {
    lenSlider.addEventListener('input', (e) => {
      pendulumSim.length = parseFloat(e.target.value);
      const disp = document.getElementById('pendLenDisp');
      if (disp) disp.textContent = `${pendulumSim.length.toFixed(2)} m`;
      updatePendulumCalculations();
    });
  }

  if (massSlider) {
    massSlider.addEventListener('input', (e) => {
      pendulumSim.mass = parseFloat(e.target.value);
      const disp = document.getElementById('pendMassDisp');
      if (disp) disp.textContent = `${pendulumSim.mass.toFixed(2)} kg`;
      updatePendulumCalculations();
    });
  }

  if (gSelect) {
    gSelect.addEventListener('change', (e) => {
      pendulumSim.gravity = parseFloat(e.target.value);
      updatePendulumCalculations();
    });
  }

  updatePendulumCalculations();

  let lastTime = performance.now();
  function loop(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;

    if (!pendulumSim.isDragging && !pendulumSim.isPaused) {
      if (pendulumSim.length > 0) {
        pendulumSim.angularAcceleration = (-pendulumSim.gravity / pendulumSim.length) * Math.sin(pendulumSim.angle) - (pendulumSim.damping * pendulumSim.angularVelocity);
        pendulumSim.angularVelocity += pendulumSim.angularAcceleration * dt;
        pendulumSim.angle += pendulumSim.angularVelocity * dt;
      }
    }

    renderCartoonPendulum();
    pendulumSim.animId = requestAnimationFrame(loop);
  }

  if (pendulumSim.animId) cancelAnimationFrame(pendulumSim.animId);
  pendulumSim.animId = requestAnimationFrame(loop);
}

function resizePendulumCanvas() {
  if (!pendulumSim.canvas) return;
  const rect = pendulumSim.canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  pendulumSim.canvas.width = rect.width * dpr;
  pendulumSim.canvas.height = rect.height * dpr;
  pendulumSim.ctx.scale(dpr, dpr);

  pendulumSim.originX = rect.width / 2;
  pendulumSim.originY = 45;
}

function setupPendulumInteraction() {
  const canvas = pendulumSim.canvas;
  if (!canvas) return;

  function pointerDown(e) {
    pendulumSim.isDragging = true;
    pendulumSim.angularVelocity = 0;
    handlePointer(e);
  }

  function pointerMove(e) {
    if (!pendulumSim.isDragging) return;
    handlePointer(e);
  }

  function pointerUp() {
    pendulumSim.isDragging = false;
  }

  function handlePointer(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    const px = clientX - rect.left;
    const py = clientY - rect.top;

    const dx = px - pendulumSim.originX;
    const dy = py - pendulumSim.originY;

    if (dy > 15) {
      pendulumSim.angle = Math.atan2(dx, dy);
    }
  }

  canvas.addEventListener('mousedown', pointerDown);
  window.addEventListener('mousemove', pointerMove);
  window.addEventListener('mouseup', pointerUp);

  canvas.addEventListener('touchstart', pointerDown);
  window.addEventListener('touchmove', pointerMove);
  window.addEventListener('touchend', pointerUp);
}

function renderCartoonPendulum() {
  const ctx = pendulumSim.ctx;
  if (!ctx || !pendulumSim.canvas) return;

  const w = pendulumSim.canvas.getBoundingClientRect().width;
  const h = pendulumSim.canvas.getBoundingClientRect().height;
  ctx.clearRect(0, 0, w, h);

  const ox = w / 2;
  const oy = 45;
  const pixelLen = pendulumSim.length * 125;

  const bobX = ox + Math.sin(pendulumSim.angle) * pixelLen;
  const bobY = oy + Math.cos(pendulumSim.angle) * pixelLen;

  // 1. Giá treo cartoon
  ctx.fillStyle = '#6F89A4';
  ctx.beginPath();
  ctx.roundRect(ox - 70, oy - 14, 140, 16, 6);
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#1A2C3D';
  ctx.stroke();

  // Khớp xoay
  ctx.fillStyle = '#1A2C3D';
  ctx.beginPath();
  ctx.arc(ox, oy, 6, 0, Math.PI * 2);
  ctx.fill();

  // 2. Trục thẳng đứng tham chiếu mờ
  ctx.beginPath();
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = '#6F89A4';
  ctx.lineWidth = 1.5;
  ctx.moveTo(ox, oy);
  ctx.lineTo(ox, oy + pixelLen + 30);
  ctx.stroke();
  ctx.setLineDash([]);

  // 3. Dây treo cartoon dày dặn
  ctx.beginPath();
  ctx.moveTo(ox, oy);
  ctx.lineTo(bobX, bobY);
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#1A2C3D';
  ctx.stroke();

  // 4. Quả cầu nặng cartoon mắt to
  const bobRadius = 16 + Math.sqrt(pendulumSim.mass) * 8;
  ctx.beginPath();
  ctx.arc(bobX, bobY, bobRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#60EFDB';
  ctx.fill();
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = '#1A2C3D';
  ctx.stroke();

  // Mắt và nụ cười cartoon trên quả cầu
  const eyeOffset = bobRadius * 0.3;
  ctx.fillStyle = '#1A2C3D';
  ctx.beginPath();
  ctx.arc(bobX - eyeOffset, bobY - 3, 3, 0, Math.PI * 2);
  ctx.arc(bobX + eyeOffset, bobY - 3, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(bobX, bobY + 4, 5, 0, Math.PI);
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#1A2C3D';
  ctx.stroke();

  // 5. Tính toán Năng lượng cơ học
  const v = pendulumSim.length * pendulumSim.angularVelocity;
  const kinetic = 0.5 * pendulumSim.mass * v * v;
  const height = pendulumSim.length * (1 - Math.cos(pendulumSim.angle));
  const potential = pendulumSim.mass * pendulumSim.gravity * Math.max(0, height);
  const total = kinetic + potential;

  const elK = document.getElementById('pendKineticVal');
  const elP = document.getElementById('pendPotentialVal');
  const elT = document.getElementById('pendTotalVal');

  if (elK) elK.textContent = `${kinetic.toFixed(2)} J`;
  if (elP) elP.textContent = `${potential.toFixed(2)} J`;
  if (elT) elT.textContent = `${total.toFixed(2)} J`;

  // Cập nhật thanh năng lượng visual
  const barK = document.getElementById('pendKineticBar');
  const barP = document.getElementById('pendPotentialBar');
  if (barK && barP && total > 0) {
    const kPct = Math.min(100, Math.max(0, (kinetic / total) * 100));
    const pPct = Math.min(100, Math.max(0, (potential / total) * 100));
    barK.style.height = `${kPct}%`;
    barP.style.height = `${pPct}%`;
  }
}

function updatePendulumCalculations() {
  const periodDisp = document.getElementById('pendPeriodVal');
  if (periodDisp && pendulumSim.gravity > 0) {
    const T = 2 * Math.PI * Math.sqrt(pendulumSim.length / pendulumSim.gravity);
    periodDisp.textContent = `T ≈ ${T.toFixed(2)} giây`;
  }
}

function resetCartoonPendulum() {
  pendulumSim.angle = Math.PI / 4;
  pendulumSim.angularVelocity = 0;
  pendulumSim.angularAcceleration = 0;
  pendulumSim.isPaused = false;
  if (typeof playCartoonSound === 'function') playCartoonSound('pop');
}
