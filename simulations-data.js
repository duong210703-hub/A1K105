// simulations-data.js - Storytelling Simulations Database for STEMLab VN (AAA Cartoon Theme)

const SIMULATIONS_DATA = [
  {
    id: "ohm-law",
    chapter: "01",
    title_vi: "Dòng Chảy Năng Lượng & Định Luật Ohm",
    title_en: "Energy Flow & Ohm's Law",
    subject_vi: "Vật Lý Lượng Tử & Mạch Điện",
    grade_label_vi: "Học Phần Cơ Bản & Nâng Cao",
    badgeColor: "bg-[#BFF3E7] text-[#1A2C3D]",
    desc_vi: "Giải mã bí mật chuyển động của bầy hạt electron trong dây dẫn đồng dưới hiệu điện thế biến thiên.",
    accentColor: "#60EFDB",
    hasLiveDemo: true,
    svgVisual: `
      <svg viewBox="0 0 340 200" class="w-full h-full">
        <rect width="340" height="200" fill="#C6E6F1" rx="16"/>
        <!-- Dây dẫn mạch dạng cartoon bo tròn dày -->
        <rect x="40" y="40" width="260" height="120" rx="20" fill="none" stroke="#1A2C3D" stroke-width="8"/>
        <rect x="40" y="40" width="260" height="120" rx="20" fill="none" stroke="#79CEED" stroke-width="4"/>
        
        <!-- Cục Pin Nguồn Cartoon -->
        <g transform="translate(30, 80)">
          <rect x="0" y="0" width="20" height="40" rx="4" fill="#60EFDB" stroke="#1A2C3D" stroke-width="2.5"/>
          <rect x="4" y="-5" width="12" height="6" rx="2" fill="#1A2C3D"/>
          <text x="10" y="24" fill="#1A2C3D" font-size="14" font-weight="900" text-anchor="middle" font-family="'Trebuchet MS', sans-serif">+</text>
        </g>

        <!-- Điện Trở Cartoon Gốm Sứ -->
        <g transform="translate(130, 32)">
          <rect x="0" y="0" width="80" height="18" rx="8" fill="#BFF3E7" stroke="#1A2C3D" stroke-width="2.5"/>
          <rect x="15" y="0" width="8" height="18" fill="#6F89A4"/>
          <rect x="35" y="0" width="8" height="18" fill="#60EFDB"/>
          <rect x="55" y="0" width="8" height="18" fill="#79CEED"/>
        </g>

        <!-- Bóng Đèn Tròn Cartoon Phát Sáng -->
        <g transform="translate(290, 100)">
          <circle cx="0" cy="0" r="28" fill="#BFF3E7" opacity="0.6"/>
          <circle cx="0" cy="0" r="18" fill="#60EFDB" stroke="#1A2C3D" stroke-width="3"/>
          <path d="M -5 -3 Q 0 -10 5 -3" fill="none" stroke="#1A2C3D" stroke-width="2.5"/>
          <rect x="-6" y="16" width="12" height="8" rx="2" fill="#6F89A4" stroke="#1A2C3D" stroke-width="1.5"/>
        </g>

        <!-- Hạt Electron Vui Nhộn -->
        <circle cx="100" cy="40" r="6" fill="#1A2C3D"/>
        <circle cx="230" cy="40" r="6" fill="#1A2C3D"/>
        <circle cx="200" cy="160" r="6" fill="#1A2C3D"/>
        <circle cx="90" cy="160" r="6" fill="#1A2C3D"/>
        
        <!-- Nhãn Công Thức Cartoon -->
        <g transform="translate(110, 90)">
          <rect x="0" y="0" width="120" height="34" rx="10" fill="#FFFFFF" stroke="#1A2C3D" stroke-width="2"/>
          <text x="60" y="22" fill="#1A2C3D" font-size="14" font-weight="900" text-anchor="middle" font-family="'Trebuchet MS', sans-serif">I = U / R</text>
        </g>
      </svg>
    `
  },
  {
    id: "chemical-equation",
    chapter: "02",
    title_vi: "Lò Luyện Phân Tử & Cân Bằng Phản Ứng",
    title_en: "Molecular Forge & Equation Balancing",
    subject_vi: "Hóa Học Hạt Nhân & Liên Kết",
    grade_label_vi: "Học Phần Trung Cấp",
    badgeColor: "bg-[#60EFDB] text-[#1A2C3D]",
    desc_vi: "Tự tay hòa trộn khí nitơ và hiđrô, điều chỉnh số mol và giải phóng liên kết tạo khí amoniac thơm nồng.",
    accentColor: "#79CEED",
    hasLiveDemo: false,
    svgVisual: `
      <svg viewBox="0 0 340 200" class="w-full h-full">
        <rect width="340" height="200" fill="#BFF3E7" rx="16"/>
        <!-- Bình tam giác erlenmeyer cartoon -->
        <g transform="translate(110, 30)">
          <path d="M 50 15 L 50 45 L 10 120 A 10 10 0 0 0 18 135 L 102 135 A 10 10 0 0 0 110 120 L 70 45 L 70 15 Z" fill="#FFFFFF" stroke="#1A2C3D" stroke-width="3.5"/>
          <!-- Dung dịch sủi bọt -->
          <path d="M 22 110 Q 60 95 98 110 L 100 130 L 20 130 Z" fill="#60EFDB"/>
          <circle cx="45" cy="100" r="5" fill="#FFFFFF" stroke="#1A2C3D" stroke-width="1.5"/>
          <circle cx="75" cy="85" r="7" fill="#FFFFFF" stroke="#1A2C3D" stroke-width="1.5"/>
          <circle cx="60" cy="115" r="4" fill="#FFFFFF"/>
        </g>
        <!-- Phân tử bóng bay xung quanh -->
        <g transform="translate(45, 60)">
          <circle cx="0" cy="0" r="16" fill="#79CEED" stroke="#1A2C3D" stroke-width="2.5"/>
          <circle cx="22" cy="0" r="16" fill="#79CEED" stroke="#1A2C3D" stroke-width="2.5"/>
          <text x="11" y="5" fill="#FFFFFF" font-weight="900" font-size="11" text-anchor="middle">N₂</text>
        </g>
        <g transform="translate(255, 60)">
          <circle cx="0" cy="0" r="18" fill="#6F89A4" stroke="#1A2C3D" stroke-width="2.5"/>
          <circle cx="-12" cy="16" r="9" fill="#FFFFFF" stroke="#1A2C3D" stroke-width="2"/>
          <circle cx="12" cy="16" r="9" fill="#FFFFFF" stroke="#1A2C3D" stroke-width="2"/>
          <text x="0" y="5" fill="#FFFFFF" font-weight="900" font-size="10" text-anchor="middle">NH₃</text>
        </g>
        <!-- Nhãn banner -->
        <rect x="70" y="155" width="200" height="30" rx="8" fill="#FFFFFF" stroke="#1A2C3D" stroke-width="2"/>
        <text x="170" y="175" fill="#1A2C3D" font-size="13" font-weight="900" text-anchor="middle" font-family="'Trebuchet MS', sans-serif">N₂ + 3H₂ ⇌ 2NH₃</text>
      </svg>
    `
  },
  {
    id: "cell-osmosis",
    chapter: "03",
    title_vi: "Thành Trì Tế Bào & Cơn Sóng Thẩm Thấu",
    title_en: "Living Cell Citadel & Osmosis",
    subject_vi: "Sinh Học Tế Bào & Vi Mô",
    grade_label_vi: "Học Phần Trung Cấp",
    badgeColor: "bg-[#C6E6F1] text-[#1A2C3D]",
    desc_vi: "Thâm nhập vào màng sinh chất kép, quan sát giọt nước H₂O vượt rào cản làm căng mọng hoặc teo tóp tế bào.",
    accentColor: "#6F89A4",
    hasLiveDemo: false,
    svgVisual: `
      <svg viewBox="0 0 340 200" class="w-full h-full">
        <rect width="340" height="200" fill="#F2FAF9" rx="16"/>
        <!-- Thành tế bào cartoon gợn sóng -->
        <rect x="50" y="30" width="240" height="140" rx="40" fill="#BFF3E7" stroke="#1A2C3D" stroke-width="3.5"/>
        <rect x="65" y="45" width="210" height="110" rx="30" fill="#FFFFFF" stroke="#6F89A4" stroke-width="2" stroke-dasharray="4,4"/>
        
        <!-- Không bào bự nước -->
        <ellipse cx="170" cy="100" rx="65" ry="38" fill="#79CEED" stroke="#1A2C3D" stroke-width="2.5"/>
        <text x="170" y="105" fill="#1A2C3D" font-weight="900" font-size="11" text-anchor="middle" font-family="'Trebuchet MS', sans-serif">Túi H₂O (Không bào)</text>

        <!-- Nhân tế bào hạt đậu -->
        <circle cx="110" cy="75" r="18" fill="#60EFDB" stroke="#1A2C3D" stroke-width="2"/>
        <circle cx="114" cy="72" r="6" fill="#1A2C3D"/>

        <!-- Hạt nước bay vào màng -->
        <circle cx="30" cy="90" r="7" fill="#79CEED" stroke="#1A2C3D" stroke-width="2"/>
        <circle cx="20" cy="115" r="5" fill="#79CEED" stroke="#1A2C3D" stroke-width="1.5"/>
        <circle cx="310" cy="105" r="7" fill="#79CEED" stroke="#1A2C3D" stroke-width="2"/>
      </svg>
    `
  },
  {
    id: "projectile-motion",
    chapter: "04",
    title_vi: "Đại Bác Không Gian & Quỹ Đạo Parabol",
    title_en: "Space Cannon & Trajectory Arc",
    subject_vi: "Động Lực Học Newton",
    grade_label_vi: "Học Phần Nâng Cao",
    badgeColor: "bg-[#79CEED] text-[#1A2C3D]",
    desc_vi: "Điều chỉnh góc nâng nòng pháo, nạp lực thuốc súng và phóng viên đạn bay lượn vút qua bầu khí quyển.",
    accentColor: "#60EFDB",
    hasLiveDemo: false,
    svgVisual: `
      <svg viewBox="0 0 340 200" class="w-full h-full">
        <rect width="340" height="200" fill="#C6E6F1" rx="16"/>
        <!-- Đồi cỏ đệm -->
        <path d="M 0 160 Q 170 145 340 160 L 340 200 L 0 200 Z" fill="#6F89A4" stroke="#1A2C3D" stroke-width="3"/>
        
        <!-- Khẩu pháo cartoon -->
        <g transform="translate(45, 155) rotate(-38)">
          <rect x="-8" y="-12" width="46" height="24" rx="6" fill="#60EFDB" stroke="#1A2C3D" stroke-width="3"/>
        </g>
        <!-- Bánh xe pháo -->
        <circle cx="45" cy="155" r="14" fill="#BFF3E7" stroke="#1A2C3D" stroke-width="3"/>
        <circle cx="45" cy="155" r="4" fill="#1A2C3D"/>

        <!-- Đường bay parabol chấm tròn to -->
        <path d="M 68 135 Q 180 20 285 155" fill="none" stroke="#1A2C3D" stroke-width="3" stroke-dasharray="6,6"/>
        
        <!-- Quả pháo mặt cười -->
        <circle cx="180" cy="78" r="9" fill="#1A2C3D"/>
        <circle cx="180" cy="78" r="7" fill="#79CEED"/>
        
        <!-- Bia mục tiêu hình tròn -->
        <ellipse cx="285" cy="155" rx="18" ry="6" fill="#60EFDB" stroke="#1A2C3D" stroke-width="2"/>
        <ellipse cx="285" cy="155" rx="9" ry="3" fill="#FFFFFF"/>
      </svg>
    `
  },
  {
    id: "pendulum-energy",
    chapter: "05",
    title_vi: "Con Lắc Thời Gian & Vũ Điệu Cơ Năng",
    title_en: "Chrono Pendulum & Energy Dance",
    subject_vi: "Dao Động & Trường Hấp Dẫn",
    grade_label_vi: "Học Phần Thao Trường",
    badgeColor: "bg-[#BFF3E7] text-[#1A2C3D]",
    desc_vi: "Kéo thả quả cầu đồng hồ, hoán chuyển liên tục giữa động năng xé gió và thế năng đứng yên trên đỉnh cao.",
    accentColor: "#79CEED",
    hasLiveDemo: true,
    svgVisual: `
      <svg viewBox="0 0 340 200" class="w-full h-full">
        <rect width="340" height="200" fill="#BFF3E7" rx="16"/>
        <!-- Xà treo bằng gỗ xám -->
        <rect x="110" y="20" width="120" height="14" rx="4" fill="#6F89A4" stroke="#1A2C3D" stroke-width="2.5"/>
        
        <!-- Trục xoay chốt -->
        <circle cx="170" cy="27" r="5" fill="#1A2C3D"/>
        
        <!-- Dây con lắc lệch góc -->
        <line x1="170" y1="27" x2="245" y2="125" stroke="#1A2C3D" stroke-width="3.5"/>
        
        <!-- Vòng cung quỹ đạo -->
        <path d="M 95 125 Q 170 155 245 125" fill="none" stroke="#6F89A4" stroke-width="2" stroke-dasharray="4,4"/>

        <!-- Quả cầu cartoon mắt to -->
        <circle cx="245" cy="125" r="20" fill="#60EFDB" stroke="#1A2C3D" stroke-width="3.5"/>
        <circle cx="240" cy="120" r="4" fill="#1A2C3D"/>
        <circle cx="250" cy="120" r="4" fill="#1A2C3D"/>
        <path d="M 241 130 Q 245 135 249 130" stroke="#1A2C3D" stroke-width="2" fill="none"/>

        <!-- Cột năng lượng đồ họa -->
        <rect x="35" y="60" width="45" height="90" rx="8" fill="#FFFFFF" stroke="#1A2C3D" stroke-width="2"/>
        <rect x="42" y="100" width="12" height="42" rx="3" fill="#60EFDB"/>
        <rect x="58" y="75" width="12" height="67" rx="3" fill="#79CEED"/>
        <text x="48" y="147" fill="#1A2C3D" font-size="8" font-weight="900">Wđ</text>
        <text x="64" y="147" fill="#1A2C3D" font-size="8" font-weight="900">Wt</text>
      </svg>
    `
  },
  {
    id: "greenhouse-effect",
    chapter: "06",
    title_vi: "Lồng Kính Địa Cầu & Tấm Chắn Bức Xạ",
    title_en: "Planetary Dome & Infrared Trap",
    subject_vi: "Vật Lý Địa Cầu & Khí Hậu",
    grade_label_vi: "Học Phần Môi Trường",
    badgeColor: "bg-[#6F89A4] text-[#FFFFFF]",
    desc_vi: "Theo dấu những tia nắng mặt trời rực rỡ và khám phá chiếc bẫy nhiệt hồng ngoại của các phân tử CO₂.",
    accentColor: "#60EFDB",
    hasLiveDemo: false,
    svgVisual: `
      <svg viewBox="0 0 340 200" class="w-full h-full">
        <rect width="340" height="200" fill="#C6E6F1" rx="16"/>
        <!-- Trái đất cong cong ở dưới -->
        <path d="M 0 155 Q 170 135 340 155 L 340 200 L 0 200 Z" fill="#60EFDB" stroke="#1A2C3D" stroke-width="3"/>
        <!-- Mặt trời góc trái -->
        <circle cx="40" cy="35" r="26" fill="#BFF3E7" stroke="#1A2C3D" stroke-width="3"/>
        <circle cx="34" cy="30" r="3" fill="#1A2C3D"/>
        <circle cx="46" cy="30" r="3" fill="#1A2C3D"/>
        
        <!-- Tia sáng mặt trời xuyên xuống -->
        <line x1="65" y1="55" x2="150" y2="145" stroke="#79CEED" stroke-width="3.5" stroke-linecap="round"/>
        <!-- Tia phản xạ cong queo bị giữ lại -->
        <path d="M 160 145 Q 190 90 220 120 Q 250 150 280 100" fill="none" stroke="#6F89A4" stroke-width="3" stroke-dasharray="5,4"/>

        <!-- Bầy phân tử CO2 lơ lửng -->
        <g transform="translate(180, 65)">
          <circle cx="0" cy="0" r="8" fill="#1A2C3D"/>
          <circle cx="-11" cy="0" r="6" fill="#6F89A4" stroke="#1A2C3D" stroke-width="1.5"/>
          <circle cx="11" cy="0" r="6" fill="#6F89A4" stroke="#1A2C3D" stroke-width="1.5"/>
        </g>
        <g transform="translate(260, 50)">
          <circle cx="0" cy="0" r="7" fill="#1A2C3D"/>
          <circle cx="-9" cy="0" r="5" fill="#6F89A4" stroke="#1A2C3D" stroke-width="1.5"/>
          <circle cx="9" cy="0" r="5" fill="#6F89A4" stroke="#1A2C3D" stroke-width="1.5"/>
        </g>
      </svg>
    `
  }
];
