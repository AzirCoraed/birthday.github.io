// 配置区
const imageSteps = [
    { src: "images/开心.png", alt: "开心表情" },    // 第1次
    { src: "images/蒙圈疑惑.png", alt: "蒙圈疑惑表情" }, // 第2次
    { src: "images/翻脸.png", alt: "翻脸表情" },      // 第3次
    { src: "images/emo.png", alt: "emo表情" },      // 第4次及以后
];
const yesSuccess = { src: "images/生日快乐.png", alt: "生日快乐表情" };
const noTexts = [
    "？", 
    "系不系真嘎？", 
    "尊嘟假嘟！ ", 
    "你伤着我火红地心啊", 
    "就系毋得",
    "毋得"
];

// 预加载图片
const preloadImages = [
    ...imageSteps.map(i => i.src),
    yesSuccess.src,
    "images/冲.png"
];
preloadImages.forEach(src => {
    const img = new Image();
    img.src = src;
});

let yesButton = document.getElementById("yes");
let noButton = document.getElementById("no");
let questionText = document.getElementById("question");
let mainImage = document.getElementById("mainImage");

let clickCount = 0;  // 记录点击 No 的次数

function updateMainImage(step) {
    const imgInfo = imageSteps[Math.min(step, imageSteps.length - 1)];
    mainImage.src = imgInfo.src;
    mainImage.alt = imgInfo.alt;
}

function updateNoText(step) {
    if (step < noTexts.length) {
        noButton.innerText = noTexts[step];
    }
}

function moveElements(step) {
    // 让 Yes 变大，每次放大 2 倍，字体也变大
    let yesSize = 1 + (step * 1.2);
    yesButton.style.transform = `scale(${yesSize})`;
    yesButton.style.fontSize = `${18 + step * 4}px`;
    // 挤压 No 按钮，每次右移 50px
    let noOffset = step * 50;
    noButton.style.transform = `translateX(${noOffset}px)`;
    // 图片和文字往上移动
    let moveUp = step * 25;
    mainImage.style.transform = `translateY(-${moveUp}px)`;
    questionText.style.transform = `translateY(-${moveUp}px)`;
}

// No 按钮点击事件
noButton.addEventListener("click", function() {
    clickCount++;
    moveElements(clickCount);
    updateNoText(clickCount - 1);
    updateMainImage(clickCount - 1);
});

// Yes 按钮点击后，进入成功页面
function showSuccessScreen() {
    document.body.innerHTML = `
        <div class="yes-screen">
            <h1 class="yes-text">🎂生日快乐,天天开心！！！🎂</h1>
            <img src="${yesSuccess.src}" alt="${yesSuccess.alt}" class="yes-image">
        </div>
    `;
    document.body.style.overflow = "hidden";
}
yesButton.addEventListener("click", showSuccessScreen);

// 键盘可操作性增强
[yesButton, noButton].forEach(btn => {
    btn.setAttribute('tabindex', '0');
    btn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            btn.click();
        }
    });
});
// 初始图片alt属性
mainImage.alt = "冲表情";