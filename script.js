const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');

let score = 0;
let isJumping = false;
let isGameOver = false;

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !isJumping && !isGameOver) {
        jump();
    }
});

function jump() {
    isJumping = true;
    dino.classList.add('jump');
    setTimeout(() => {
        dino.classList.remove('jump');
        isJumping = false;
    }, 500);
}

function gameLoop() {
    if (isGameOver) {
        alert('Game Over! Your score: ' + score);
        return;
    }

    // Move obstacle
    let obstacleRight = parseInt(window.getComputedStyle(obstacle).getPropertyValue('right'));
    if (obstacleRight > 600) {
        obstacle.style.right = '-20px';
        score++;
        scoreDisplay.textContent = 'Score: ' + score;
    } else {
        obstacle.style.right = (obstacleRight + 5) + 'px';
    }

    // Collision detection
    let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom'));
    let obstacleLeft = 580 - obstacleRight; // 600 (container width) - 20 (obstacle width) - obstacleRight

    if (obstacleLeft < 100 && obstacleLeft > 50 && dinoBottom <= 40) {
        isGameOver = true;
    }

    requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);
