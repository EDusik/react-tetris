import React, { useState, useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";

import { createStage, checkCollision } from "../../gameHelpers";
import { StyledTetrisWrapper, StyledTetris } from "../../styles/StyledTetris";
import { useGameStatus } from "../../hooks/useGameStatus";
import { useInterval } from "../../hooks/useInterval";
import { usePlayer } from "../../hooks/usePlayer";
import { useStage } from "../../hooks/useStage";

import AudioPlayerController from "../AudioPlayer/AudioPlayer";
import Display from "../Display/Display";
import Stage from "../Stage/Stage";
import StartButton from "../StartButton/StartButton";

import gameOverMusic from "../../assets/music/game-over.mp3";
import music from "../../assets/music/tetris-gameboy.mp3";

const Tetris = () => {
	const [dropTime, setDropTime] = useState(null);
	const [gameOver, setGameOver] = useState(false);
	const [muted, setMuted] = useState(true);

	const [player, updatePlayerPosition, resetPlayer, playerRotate] = usePlayer();
	const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
	const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

	const movePlayer = (direction) => {
		if (!checkCollision(player, stage, { x: direction, y: 0 })) {
			updatePlayerPosition({ x: direction, y: 0 });
		}
	};

	const startGame = () => {
		// Reset the game
		setStage(createStage());
		setDropTime(1000);
		setGameOver(false);
		resetPlayer();
		setScore(0);
		setRows(0);
		setLevel(0);
	};

	const dropTimeCalc = () => {
		return 1000 / (level + 1) + 200;
	};

	const drop = () => {
		// Increase level when player has cleared 10 rows

		if (rows > (level + 1) * 1) {
			setLevel((previousState) => previousState + 1);
			setDropTime(dropTimeCalc);
		}

		if (!checkCollision(player, stage, { x: 0, y: 1 })) {
			updatePlayerPosition({ x: 0, y: 1, collided: false });
		} else {
			if (player.position.y < 1) {
				console.log("Game Over!");
				setGameOver(true);
				setDropTime(null);
			}
			updatePlayerPosition({ x: 0, y: 0, collided: true });
		}
	};

	const keyUp = ({ keyCode }) => {
		if (!gameOver) {
			if (keyCode === 40) {
				setDropTime(dropTimeCalc);
			}
		}
	};

	const dropPlayer = () => {
		setDropTime(null);
		drop();
	};

	const move = ({ keyCode }) => {
		if (!gameOver) {
			// Move to Left
			if (keyCode === 37) {
				movePlayer(-1);
			}
			// Move to Right
			else if (keyCode === 39) {
				movePlayer(1);
			}
			// Move to Right
			else if (keyCode === 40) {
				dropPlayer();
				// Key up
			} else if (keyCode === 38) {
				playerRotate(stage, 1);
			}
		}
	};

	useInterval(() => {
		drop();
	}, dropTime);

	const handleMuted = () => {
		setMuted(!muted);
	};

	useEffect(() => {
		startGame();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={(e) => move(e)} onKeyUp={keyUp}>
			<StyledTetris>
				<Stage stage={stage} />
				<aside>
					<AudioPlayerController muted={muted} callback={handleMuted} />
					<div>
						<ReactAudioPlayer
							controls={false}
							src={!gameOver ? music : gameOverMusic}
							autoPlay={true}
							loop={!gameOver ? true : false}
							muted={muted}
						/>
					</div>
					<Display text={!gameOver ? `Score: ${score}` : `You did: ${score} points!`} />
					{gameOver ? (
						<Display gameOver={gameOver} text="Game Over" />
					) : (
						<div>
							<Display text={`Rows: ${rows}`} />
							<Display text={`Level: ${level}`} />
						</div>
					)}

					<StartButton callback={startGame} />
				</aside>
			</StyledTetris>
		</StyledTetrisWrapper>
	);
};

export default Tetris;
