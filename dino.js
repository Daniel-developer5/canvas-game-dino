let canvas = document.getElementById("canvas")
let ctx = canvas.getContext('2d')
let progressText = document.getElementById("progress")
let highScoreText = document.getElementById("high-score")
let progress = 0
let highScore = localStorage.getItem("highScore") || 0
highScoreText.textContent += ' ' + highScore + 'm'
let reloadBtn = document.getElementById("reload")
let y = 130

reloadBtn.addEventListener('click', () => {
    location.reload()
})

function main(coord) {
    ctx.beginPath()
    ctx.fillStyle = 'blue'
    ctx.strokeStyle = 'blue'
    ctx.arc(10, coord, 5, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.strokeStyle = '#000'
    ctx.moveTo(0, 140)
    ctx.lineTo(300, 140)
    ctx.stroke()
}

main(y)

function renderEnemy() {
    let randX = Math.floor(Math.random() * (300 - 80) + 80)
    ctx.beginPath()
    ctx.fillStyle = '#000'
    ctx.fillRect(randX, 110, 10, 30)
    move(randX)
}

renderEnemy()

function move(x) {
    let moveInterval = setInterval(() => {
        if (x > 0) {
            ctx.fillStyle = '#fff'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = '#000'
            ctx.fillRect(--x, 110, 10, 30)
            main(y)
        } else if (x == 0 && y == 130) {
            clearInterval(moveInterval)
            gameOver()
        } else {
            clearInterval(moveInterval)
            renderEnemy()
            main(y)
        }
    }, 5)
}

let progressInterval = setInterval(() => {
    ++progress
    progressText.textContent = progress + ' ' + 'm'
}, 100)

document.addEventListener('keydown', (event) => {
    if (event.keyCode == 38 || event.keyCode == 87) {
        jump()
    }
})

document.addEventListener('click', jump)

function jump() {
    y = 90
    setTimeout(() => {
        y = 130
    }, 400)
}

function gameOver() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.font = '30px Roboto'
    ctx.fillText("Game over", 75, 80)
    clearInterval(progressInterval)
    if (progress > highScore) {
        highScore = progress
    }
    if (highScore > localStorage.getItem(highScore)) {
        localStorage.setItem("highScore", highScore)
        highScoreText.textContent = 'High' + ':' + ' ' + highScore + 'm'
    }
}