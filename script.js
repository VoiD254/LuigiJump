"use strict";

let score = 0;
let crossed = true;
const bgMusic = new Audio("sounds/music.mp3");
const overMusic = new Audio("sounds/gameover.mp3");

function startGame() {
	score = 0;
	crossed = true;
	const gameOver = document.querySelector(".over");
	gameOver.style.visibility = "hidden";
	updateScore(score);

	const p1 = document.querySelector(".player");
	p1.style.left = "100px";

	const obstacle = document.querySelector(".obstacle");
	obstacle.style.right = "430px";
	obstacle.classList.add("animateObstacle");

	setTimeout(() => {
		bgMusic.play();
	}, 1000);
}

document.addEventListener("keydown", (f) => {
	if (f.key === "Enter") {
		startGame();
	}

	if (f.key === "ArrowUp" || f.key === " " || f.key === "w") {
		const p1 = document.querySelector(".player");
		p1.classList.add("animatePlayer");

		setTimeout(() => {
			p1.classList.remove("animatePlayer");
		}, 700);
	}

	if (f.key === "ArrowRight" || f.key === "d") {
		const p1 = document.querySelector(".player");
		const p1X = parseInt(
			window.getComputedStyle(p1, null).getPropertyValue("left")
		);

		p1.style.left = p1X + 90 + "px";
		if (p1.style.transform === "scaleX(-1)") {
			p1.style.transform = "scaleX(1)";
		}
	}

	if (f.key === "ArrowLeft" || f.key === "a") {
		const p1 = document.querySelector(".player");
		const p1X = parseInt(
			window.getComputedStyle(p1, null).getPropertyValue("left")
		);

		p1.style.left = p1X - 90 + "px";
		p1.style.transform = "scaleX(-1)";
	}
});

setInterval(() => {
	const p1 = document.querySelector(".player");
	const gameOver = document.querySelector(".over");
	const obstacle = document.querySelector(".obstacle");

	const dx = parseInt(
		window.getComputedStyle(p1, null).getPropertyValue("left")
	);
	const dy = parseInt(
		window.getComputedStyle(p1, null).getPropertyValue("top")
	);

	const px = parseInt(
		window.getComputedStyle(obstacle, null).getPropertyValue("left")
	);
	const py = parseInt(
		window.getComputedStyle(obstacle, null).getPropertyValue("top")
	);

	const offsetX = Math.abs(dx - px);
	const offsetY = Math.abs(dy - py);

	if (offsetX < 70 && offsetY < 52) {
		gameOver.style.visibility = "visible";
		gameOver.innerHTML = "Game Over ! Press Enter To Restart";
		obstacle.classList.remove("animateObstacle");
		overMusic.play();
		setTimeout(() => {
			bgMusic.pause();
			overMusic.pause();
		}, 1000);

		obstacle.style.animationDuration = "4s";
	} else if (offsetX < 69 && crossed) {
		score++;
		updateScore(score);
		crossed = false;

		setTimeout(() => {
			crossed = true;
		}, 1000);

		setTimeout(() => {
			let aniDur = parseFloat(
				window
					.getComputedStyle(obstacle, null)
					.getPropertyValue("animation-duration")
			);
			let newDur = aniDur - 0.8;
			if (newDur < 1.5) {
				newDur = aniDur;
			}
			if (score > 20) {
				newDur -= 0.01;
			}
			// console.log(newDur);
			obstacle.style.animationDuration = newDur + "s";
		}, 500);
	}
}, 10);

function updateScore(score) {
	const scoreCounter = document.querySelector(".scoreCount");
	scoreCounter.innerHTML = "Your Score : " + score;
}
