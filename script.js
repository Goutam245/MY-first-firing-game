const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    width: 50,
    height: 50,
    speed: 5,
    bullets: []
};

const bullets = [];
const targets = [];
let score = 0;
const targetWidth = 50;
const targetHeight = 50;

document.addEventListener('keydown', movePlayer);
document.addEventListener('keydown', shootBullet);
document.getElementById('leftBtn').addEventListener('click', () => movePlayer({ key: 'ArrowLeft' }));
document.getElementById('rightBtn').addEventListener('click', () => movePlayer({ key: 'ArrowRight' }));
document.getElementById('shootBtn').addEventListener('click', () => shootBullet({ key: ' ' }));

function movePlayer(event) {
    if (event.key === 'ArrowLeft' && player.x > 0) {
        player.x -= player.speed;
    } else if (event.key === 'ArrowRight' && player.x + player.width < canvas.width) {
        player.x += player.speed;
    }
}

function shootBullet(event) {
    if (event.key === ' ' || event.key === 'Spacebar') {
        bullets.push({
            x: player.x + player.width / 2 - 5,
            y: player.y,
            width: 5,
            height: 10,
            speed: 7
        });
    }
}

function drawPlayer() {
    ctx.fillStyle = '#00f';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBullets() {
    ctx.fillStyle = '#f00';
    bullets.forEach((bullet, index) => {
        bullet.y -= bullet.speed;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        if (bullet.y + bullet.height < 0) {
            bullets.splice(index, 1);
        }
    });
}

function drawTargets() {
    ctx.fillStyle = '#0f0';
    targets.forEach(target => {
        ctx.fillRect(target.x, target.y, target.width, target.height);
    });
}

function generateTargets() {
    if (Math.random() < 0.02) {
        targets.push({
            x: Math.random() * (canvas.width - targetWidth),
            y: 0,
            width: targetWidth,
            height: targetHeight,
            speed: 2
        });
    }
}

function updateTargets() {
    targets.forEach((target, index) => {
        target.y += target.speed;
        if (target.y > canvas.height) {
            targets.splice(index, 1);
        }
    });
}

function checkCollisions() {
    bullets.forEach((bullet, bIndex) => {
        targets.forEach((target, tIndex) => {
            if (
                bullet.x < target.x + target.width &&
                bullet.x + bullet.width > target.x &&
                bullet.y < target.y + target.height &&
                bullet.y + bullet.height > target.y
            ) {
                bullets.splice(bIndex, 1);
                targets.splice(tIndex, 1);
                score++;
            }
        });
    });
}

function drawScore() {
    ctx.fillStyle = '#fff';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawBullets();
    drawTargets();
    generateTargets();
    updateTargets();
    checkCollisions();
    drawScore();
    requestAnimationFrame(gameLoop);
}

gameLoop();




function changeSpeed(speed) {
    // Select the animated box
    const box = document.getElementById('box');

    // Change the duration of the animation
    box.style.animationDuration = speed + 's';
}

/////////=----------------------------------------------------------------------
document.getElementById("myButton").addEventListener("click", function() {
    setTimeout(function() {
        // Your code here
        console.log("Button clicked!");
    }, 2000); // Delay of 2000 milliseconds (2 seconds)
});
