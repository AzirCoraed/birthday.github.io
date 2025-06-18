let yesButton = document.getElementById("yes");
let noButton = document.getElementById("no");
let questionText = document.getElementById("question");
let mainImage = document.getElementById("mainImage");

let clickCount = 0;  // 记录点击 No 的次数

// No 按钮的文字变化
const noTexts = [
    "？", 
    "系不系真嘎？", 
    "尊嘟假嘟！ ", 
    "你伤着我火红地心啊", 
    "就系毋得",
    "毋得"
];

// No 按钮点击事件
noButton.addEventListener("click", function() {
    clickCount++;

    // 让 Yes 变大，每次放大 2 倍
    let yesSize = 1 + (clickCount * 1.2);
    yesButton.style.transform = `scale(${yesSize})`;

    // 挤压 No 按钮，每次右移 100px
    let noOffset = clickCount * 50;
    noButton.style.transform = `translateX(${noOffset}px)`;

    // **新增：让图片和文字往上移动**
    let moveUp = clickCount * 25; // 每次上移 20px
    mainImage.style.transform = `translateY(-${moveUp}px)`;
    questionText.style.transform = `translateY(-${moveUp}px)`;

    // No 文案变化（前 5 次变化）
    if (clickCount <= 5) {
        noButton.innerText = noTexts[clickCount - 1];
    }

    // 图片变化（前 5 次变化）
    if (clickCount === 1) mainImage.src = "images/开心.png"; // 震惊
    if (clickCount === 2) mainImage.src = "images/蒙圈疑惑.png";   // 思考
    if (clickCount === 3) mainImage.src = "images/翻脸.png";   // 生气
    if (clickCount === 4) mainImage.src = "images/emo.png";  // 哭
    if (clickCount >= 5) mainImage.src = "images/emo.png";  // 之后一直是哭

});

// Yes 按钮点击后，进入成功页面
yesButton.addEventListener("click", function() {
    document.body.innerHTML = `
        <div class="yes-screen">
            <h1 class="yes-text">🎂生日快乐,天天开心！！！🎂</h1>
            <img src="images/生日快乐.png" alt="生日快乐" class="yes-image">
        </div>
    `;

    document.body.style.overflow = "hidden";
});