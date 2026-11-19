// ohm-simulation.js - Cartoon PhET-inspired Ohm's Law Simulation Engine

let ohmSim = {
  canvas: null,
  ctx: null,
  voltage: 4.5,       // V
  resistance: 500,    // Ohms
  current: 0.009,     // Amperes
  power: 0.0405,      // Watts
  isSwitchClosed: true,
  electrons: [],
  animFrameId: null,
  lastTime: 0,
  circuitRect: null
};

function initOhmSimulation() {
  ohmSim.canvas = document.getElementById('ohmSimCanvas');
  if (!ohmSim.canvas) return;
  ohmSim.ctx = ohmSim.canvas.getContext('2d');

  resizeOhmCanvas();
  window.addEventListener('resize', resizeOhmCanvas);

  // Khởi tạo các hạt electron cartoon
  createCartoonElectrons(36);

  const vSlider = document.getElementById('voltageSlider');
  const rSlider = document.getElementById('resistanceSlider');

  if (vSlider) {
    vSlider.addEventListener('input', (e) => {
      ohmSim.voltage = parseFloat(e.target.value);
      updateOhmState();
    });
  }

  if (rSlider) {
    rSlider.addEventListener('input', (e) => {
      ohmSim.resistance = parseFloat(e.target.value);
      updateOhmState();
    });
  }

  updateOhmState();

  if (ohmSim.animFrameId) cancelAnimationFrame(ohmSim.animFrameId);
  ohmSim.lastTime = performance.now();
  ohmSim.animFrameId = requestAnimationFrame(renderOhmLoop);
}

function resizeOhmCanvas() {
  if (!ohmSim.canvas) return;
  const rect = ohmSim.canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  ohmSim.canvas.width = rect.width * dpr;
  ohmSim.canvas.height = rect.height * dpr;
  ohmSim.ctx.scale(dpr, dpr);

  const padX = Math.min(65, rect.width * 0.12);
  const padY = Math.min(50, rect.height * 0.14);
  ohmSim.circuitRect = {
    left: padX,
    top: padY,
    right: rect.width - padX,
    bottom: rect.height - padY,
    width: rect.width - padX * 2,
    height: rect.height - padY * 2
  };
}

function createCartoonElectrons(count) {
  ohmSim.electrons = [];
  for (let i = 0; i < count; i++) {
    ohmSim.electrons.push({
      dist: i / count,
      radius: 6.5
    });
  }
}

function getCircuitPoint(dist) {
  const { left, top, right, bottom, width, height } = ohmSim.circuitRect;
  const perimeter = 2 * (width + height);
  let d = ((dist % 1) + 1) % 1 * perimeter;

  if (d <= width) return { x: left + d, y: top };
  d -= width;
  if (d <= height) return { x: right, y: top + d };
  d -= height;
  if (d <= width) return { x: right - d, y: bottom };
  d -= width;
  return { x: left, y: bottom - d };
}

function updateOhmState() {
  if (ohmSim.isSwitchClosed) {
    ohmSim.current = ohmSim.voltage / ohmSim.resistance;
    ohmSim.power = ohmSim.voltage * ohmSim.current;
  } else {
    ohmSim.current = 0;
    ohmSim.power = 0;
  }

  const current_mA = ohmSim.current * 1000;
  const power_mW = ohmSim.power * 1000;

  // Cập nhật số liệu hiển thị
  const vDisp = document.getElementById('voltageDisplay');
  const rDisp = document.getElementById('resistanceDisplay');
  const iDisp = document.getElementById('currentDigitalVal');
  const pDisp = document.getElementById('powerDigitalVal');

  if (vDisp) vDisp.textContent = `${ohmSim.voltage.toFixed(1)} V`;
  if (rDisp) rDisp.textContent = `${Math.round(ohmSim.resistance)} Ω`;
  if (iDisp) iDisp.textContent = `${current_mA.toFixed(2)} mA`;
  if (pDisp) pDisp.textContent = power_mW >= 1000 ? `${ohmSim.power.toFixed(2)} W` : `${power_mW.toFixed(1)} mW`;

  // Cập nhật công thức PhET (Kích thước chữ biến thiên theo PhET)
  const elI = document.getElementById('formulaI');
  const elU = document.getElementById('formulaU');
  const elR = document.getElementById('formulaR');

  if (elI && elU && elR) {
    const uSize = Math.max(18, Math.min(46, 18 + (ohmSim.voltage / 12) * 28));
    const rSize = Math.max(18, Math.min(46, 18 + (ohmSim.resistance / 1000) * 28));
    const iSize = Math.max(18, Math.min(52, 18 + Math.log10(Math.max(0.1, current_mA) + 1) * 16));

    elU.style.fontSize = `${uSize.toFixed(0)}px`;
    elR.style.fontSize = `${rSize.toFixed(0)}px`;
    elI.style.fontSize = `${iSize.toFixed(0)}px`;
  }
}

function renderOhmLoop(now) {
  const dt = Math.min((now - ohmSim.lastTime) / 1000, 0.1);
  ohmSim.lastTime = now;

  if (ohmSim.canvas && ohmSim.ctx) {
    const w = ohmSim.canvas.getBoundingClientRect().width;
    const h = ohmSim.canvas.getBoundingClientRect().height;
    drawCartoonOhmCircuit(w, h, dt);
  }

  ohmSim.animFrameId = requestAnimationFrame(renderOhmLoop);
}

function drawCartoonOhmCircuit(w, h, dt) {
  const ctx = ohmSim.ctx;
  ctx.clearRect(0, 0, w, h);

  if (!ohmSim.circuitRect) resizeOhmCanvas();
  const { left, top, right, bottom } = ohmSim.circuitRect;

  // 1. Dây dẫn cartoon dày bo góc
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(left, top, right - left, bottom - top, 20);
  ctx.lineWidth = 14;
  ctx.strokeStyle = '#1A2C3D';
  ctx.stroke();

  ctx.beginPath();
  ctx.roundRect(left, top, right - left, bottom - top, 20);
  ctx.lineWidth = 7;
  ctx.strokeStyle = '#79CEED';
  ctx.stroke();
  ctx.restore();

  // 2. Các hạt electron cartoon chuyển động
  if (ohmSim.isSwitchClosed && ohmSim.current > 0) {
    const speed = Math.min(0.45, Math.max(0.015, (ohmSim.current * 1000) * 0.003));
    
    ctx.save();
    ohmSim.electrons.forEach(e => {
      e.dist = (e.dist - speed * dt + 1) % 1;
      const pt = getCircuitPoint(e.dist);

      // Thân hạt electron màu xanh bạc hà có viền đen
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, e.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#60EFDB';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#1A2C3D';
      ctx.stroke();

      // Dấu (-) mắt cartoon
      ctx.fillStyle = '#1A2C3D';
      ctx.fillRect(pt.x - 3, pt.y - 1, 6, 2);
    });
    ctx.restore();
  }

  // 3. Nguồn Pin Cartoon (nhánh bên trái)
  const battX = left;
  const battY = (top + bottom) / 2;
  drawCartoonBattery(ctx, battX, battY, ohmSim.voltage);

  // 4. Điện trở Cartoon (nhánh dưới)
  const resX = (left + right) / 2;
  const resY = bottom;
  drawCartoonResistor(ctx, resX, resY, ohmSim.resistance);

  // 5. Bóng đèn Cartoon (nhánh bên phải)
  const bulbX = right;
  const bulbY = (top + bottom) / 2;
  drawCartoonBulb(ctx, bulbX, bulbY, ohmSim.power, ohmSim.isSwitchClosed);

  // 6. Công tắc Cartoon (nhánh trên)
  const swX = (left + right) / 2;
  const swY = top;
  drawCartoonSwitch(ctx, swX, swY, ohmSim.isSwitchClosed);
}

function drawCartoonBattery(ctx, x, y, voltage) {
  ctx.save();
  ctx.translate(x, y);

  // Thân pin cartoon
  ctx.fillStyle = '#60EFDB';
  ctx.beginPath();
  ctx.roundRect(-16, -26, 32, 52, 6);
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#1A2C3D';
  ctx.stroke();

  // Cực dương trên đầu
  ctx.fillStyle = '#1A2C3D';
  ctx.beginPath();
  ctx.roundRect(-6, -32, 12, 6, 2);
  ctx.fill();

  // Dải kẻ sọc cartoon
  ctx.fillStyle = '#BFF3E7';
  ctx.fillRect(-14, -6, 28, 12);

  // Ký hiệu + và -
  ctx.fillStyle = '#1A2C3D';
  ctx.font = 'bold 12px "Trebuchet MS", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('+', 0, -10);
  ctx.fillText('−', 0, 20);

  // Nhãn số vôn
  ctx.fillStyle = '#1A2C3D';
  ctx.font = 'bold 11px "Trebuchet MS", sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText(`${voltage.toFixed(1)}V`, -22, 4);

  ctx.restore();
}

function drawCartoonResistor(ctx, x, y, ohms) {
  ctx.save();
  ctx.translate(x, y);

  // Thân điện trở màu pastel mint
  ctx.fillStyle = '#BFF3E7';
  ctx.beginPath();
  ctx.roundRect(-42, -14, 84, 28, 8);
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#1A2C3D';
  ctx.stroke();

  // Vạch màu cartoon
  const colors = ['#6F89A4', '#60EFDB', '#79CEED', '#1A2C3D'];
  const bandX = [-24, -8, 8, 24];
  colors.forEach((col, idx) => {
    ctx.fillStyle = col;
    ctx.fillRect(bandX[idx], -14, 6, 28);
  });

  // Nhãn điện trở
  ctx.fillStyle = '#1A2C3D';
  ctx.font = 'bold 12px "Trebuchet MS", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`${Math.round(ohms)} Ω`, 0, 28);

  ctx.restore();
}

function drawCartoonBulb(ctx, x, y, powerWatts, isClosed) {
  ctx.save();
  ctx.translate(x, y);

  const brightness = (!isClosed || powerWatts <= 0) ? 0 : Math.min(1, powerWatts / 0.45);

  // Ánh sáng tỏa tròn dạng cartoon
  if (brightness > 0.05) {
    const rGlow = 26 + brightness * 35;
    ctx.beginPath();
    ctx.arc(0, 0, rGlow, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(96, 239, 219, ${0.45 * brightness})`;
    ctx.fill();
  }

  // Quả bóng đèn
  ctx.beginPath();
  ctx.arc(0, 0, 20, 0, Math.PI * 2);
  ctx.fillStyle = brightness > 0.05 ? '#60EFDB' : '#C6E6F1';
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#1A2C3D';
  ctx.stroke();

  // Dây tóc
  ctx.beginPath();
  ctx.moveTo(-6, 4);
  ctx.lineTo(-4, -6);
  ctx.lineTo(0, -9);
  ctx.lineTo(4, -6);
  ctx.lineTo(6, 4);
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = brightness > 0.1 ? '#FFFFFF' : '#1A2C3D';
  ctx.stroke();

  // Đui đèn
  ctx.fillStyle = '#6F89A4';
  ctx.fillRect(-8, 18, 16, 8);
  ctx.strokeRect(-8, 18, 16, 8);

  ctx.restore();
}

function drawCartoonSwitch(ctx, x, y, isClosed) {
  ctx.save();
  ctx.translate(x, y);

  // Chốt tiếp điểm
  ctx.fillStyle = '#1A2C3D';
  ctx.beginPath();
  ctx.arc(-22, 0, 5, 0, Math.PI * 2);
  ctx.arc(22, 0, 5, 0, Math.PI * 2);
  ctx.fill();

  // Thanh gạt công tắc
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#60EFDB';

  if (isClosed) {
    ctx.moveTo(-22, 0);
    ctx.lineTo(22, 0);
  } else {
    ctx.moveTo(-22, 0);
    ctx.lineTo(14, -18);
  }
  ctx.stroke();

  // Viền thanh gạt
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#1A2C3D';
  if (isClosed) {
    ctx.moveTo(-22, 0);
    ctx.lineTo(22, 0);
  } else {
    ctx.moveTo(-22, 0);
    ctx.lineTo(14, -18);
  }
  ctx.stroke();

  ctx.restore();
}

function toggleCartoonSwitch() {
  ohmSim.isSwitchClosed = !ohmSim.isSwitchClosed;
  const btn = document.getElementById('circuitSwitchBtn');
  if (btn) {
    btn.textContent = ohmSim.isSwitchClosed ? 'Trạng Thái: ĐÓNG MẠCH (ON)' : 'Trạng Thái: NGẮT MẠCH (OFF)';
    btn.className = ohmSim.isSwitchClosed ? 'cartoon-btn cartoon-btn-pastel' : 'cartoon-btn cartoon-btn-slate';
  }
  updateOhmState();
  if (typeof playCartoonSound === 'function') playCartoonSound('pop');
}
