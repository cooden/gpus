/* ============================================================
 *  历代最佳显卡 - 主脚本
 *  - 数据驱动渲染时间线
 *  - 中英文切换
 *  - 每张显卡图片位置预留 3D 容器（可替换为 Three.js 模型）
 * ============================================================ */

// ===== 显卡数据（颜色从原图像素提取） =====
const GPU_DATA = [
    {
        year: 2007, name: "8800 GT",
        arch: { zh: "G92架构", en: "G92 Architecture" },
        desc: { zh: "以优秀性能与亲民价格奠定一代经典。", en: "Set a classic standard with excellent performance and affordable price." },
        award: { zh: "性价比之王", en: "King of Value" },
        icon: "💎", color: "#4858b8", img: "images/8800gt.png",
    },
    {
        year: 2011, name: "GTX 560 Ti",
        arch: { zh: "费米架构", en: "Fermi Architecture" },
        desc: { zh: "性能出色、功耗控制优秀，是广受欢饮的全能显卡。", en: "Outstanding performance and power efficiency, a well-loved all-rounder." },
        award: { zh: "全民挚爱", en: "Fan Favorite" },
        icon: "👥", color: "#4878c8", img: "images/gtx560ti.png",
    },
    {
        year: 2014, name: "GTX 970",
        arch: { zh: "麦克斯韦架构", en: "Maxwell Architecture" },
        desc: { zh: "在 1080P 到 1440P 区间拥有出色平衡。", en: "Excellent balance across the 1080P to 1440P range." },
        award: { zh: "玩家首选", en: "Gamer's Pick" },
        icon: "⭐", color: "#387888", img: "images/gtx970.png",
    },
    {
        year: 2017, name: "GTX 1080 Ti",
        arch: { zh: "帕斯卡架构", en: "Pascal Architecture" },
        desc: { zh: "寿命长、性能强，被誉为一代神卡。", en: "Long-lived and powerful, hailed as a legendary GPU." },
        award: { zh: "传奇显卡", en: "Legendary GPU" },
        icon: "👑", color: "#d88858", img: "images/gtx1080ti.png",
    },
    {
        year: 2019, name: "RTX 2060 SUPER",
        arch: { zh: "图灵架构", en: "Turing Architecture" },
        desc: { zh: "无需高预算，也能获得优秀体验。", en: "Great experience without a high budget." },
        award: { zh: "性价比之选", en: "Value Choice" },
        icon: "⚖️", color: "#4878d8", img: "images/rtx2060s.png",
    },
    {
        year: 2020, name: "RTX 3060 Ti",
        arch: { zh: "安培架构", en: "Ampere Architecture" },
        desc: { zh: "中高端市场中的经典甜点卡。", en: "A classic sweet-spot card in the mid-to-high-end market." },
        award: { zh: "1440P 杀手", en: "1440P Killer" },
        icon: "🎯", color: "#387848", img: "images/rtx3060ti.png",
    },
    {
        year: 2024, name: "RTX 4070 SUPER",
        arch: { zh: "Ada Lovelace 架构", en: "Ada Lovelace Architecture" },
        desc: { zh: "性能与功耗表现均衡，是高端升级热门选择。", en: "Balanced performance and power, a popular high-end upgrade choice." },
        award: { zh: "能效冠军", en: "Efficiency Champion" },
        icon: "⚡", color: "#6848b8", img: "images/rtx4070s.png",
    },
    {
        year: 2025, name: "RTX 5070 Ti",
        arch: { zh: "Blackwell 架构", en: "Blackwell Architecture" },
        desc: { zh: "新一代主流高性能代表，面向未来。", en: "A new-generation mainstream high-performance representative, future-ready." },
        award: { zh: "新一代性能玩家", en: "Next-Gen Performer" },
        icon: "🚀", color: "#d85868", img: "images/rtx5070ti.png",
    },
    {
        year: 2026, name: "RTX 5090",
        arch: { zh: "Blackwell 架构", en: "Blackwell Architecture" },
        desc: { zh: "当前 GeForce 阵营中的现役性能旗舰。", en: "The current performance flagship of the GeForce lineup." },
        award: { zh: "现役性能旗舰", en: "Flagship Performer" },
        icon: "🏆", color: "#e8b868", img: "images/rtx5090.png",
    },
];

// ===== 当前语言 =====
let currentLang = localStorage.getItem("gpu-lang") || "zh";

// ===== 渲染时间线 =====
function renderTimeline() {
    const timeline = document.getElementById("timeline");
    timeline.innerHTML = GPU_DATA.map((gpu, idx) => `
        <div class="gpu-row" style="--year-color:${gpu.color}; animation-delay:${idx * 0.06}s">
            <div class="gpu-year-block">
                <span class="year-dot"></span>
                <div class="year-text">
                    <span class="year-num">${gpu.year}</span>
                    <span class="year-arch" data-zh="${gpu.arch.zh}" data-en="${gpu.arch.en}">${gpu.arch[currentLang]}</span>
                </div>
            </div>
            <div class="gpu-visual" data-gpu="${gpu.name}">
                <img src="${gpu.img}" alt="${gpu.name}" loading="lazy">
                <!-- 3D 容器：将 img 替换为 Three.js 渲染的显卡 3D 模型 -->
                <div class="gpu-3d-layer">
                    <canvas></canvas>
                </div>
            </div>
            <div class="gpu-text">
                <div class="gpu-name">${gpu.name}</div>
                <div class="gpu-desc" data-zh="${gpu.desc.zh}" data-en="${gpu.desc.en}">${gpu.desc[currentLang]}</div>
            </div>
            <div class="gpu-award">
                <span class="award-icon">${gpu.icon}</span>
                <span data-zh="${gpu.award.zh}" data-en="${gpu.award.en}">${gpu.award[currentLang]}</span>
            </div>
        </div>
    `).join("");
}

// ===== 切换语言 =====
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("gpu-lang", lang);
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";

    document.querySelectorAll("[data-zh][data-en]").forEach((el) => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });

    const btn = document.getElementById("langToggle");
    btn.querySelector(".lang-zh").classList.toggle("active", lang === "zh");
    btn.querySelector(".lang-en").classList.toggle("active", lang === "en");

    renderTimeline();
}

/* ============================================================
 *  显卡 3D 效果接入说明
 *  每张显卡的图片位置都是一个 .gpu-visual 容器，内含：
 *    - <img>  静态配图（默认显示）
 *    - <div class="gpu-3d-layer"><canvas></canvas></div>  3D 层
 *
 *  启用某张显卡的 3D 效果：
 *    1. 在 index.html <head> 引入 Three.js：
 *       <script type="importmap">
 *         {"imports":{"three":"https://unpkg.com/three@0.160.0/build/three.module.js"}}
 *       </script>
 *    2. 调用 enableGPU3D(name) 传入显卡名称，例如：
 *       enableGPU3D("RTX 5090");
 *    3. 将对应 .glb 模型放入 models/ 目录，命名与显卡名一致。
 * ============================================================ */
async function enableGPU3D(gpuName) {
    const visual = document.querySelector(`.gpu-visual[data-gpu="${gpuName}"]`);
    if (!visual) return;
    visual.classList.add("use-3d");
    // 在此处初始化 Three.js，将模型渲染到 visual.querySelector('canvas')
    // 示例（需先引入 three）：
    // const canvas = visual.querySelector('canvas');
    // const scene = new THREE.Scene();
    // const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth/canvas.clientHeight, 0.1, 100);
    // const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    // const loader = new THREE.GLTFLoader();
    // loader.load(`models/${gpuName}.glb`, (gltf) => { scene.add(gltf.scene); animate(); });
}

// ===== 初始化 =====
document.addEventListener("DOMContentLoaded", () => {
    setLanguage(currentLang);

    document.getElementById("langToggle").addEventListener("click", () => {
        setLanguage(currentLang === "zh" ? "en" : "zh");
    });
});
