import React, { useState } from 'react';

import { createStage, checkCollision } from '../../gameHelpers';
import { StyledTetrisWrapper, StyledTetris } from '../../styles/StyledTetris';
import { usePlayer } from '../../hooks/usePlayer';
import { useInterval } from '../../hooks/useInterval';
import { useStage } from '../../hooks/useStage';
import Display from '../Display/Display';
import Stage from '../Stage/Stage';
import StartButton from '../StartButton/StartButton';

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPosition, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage] = useStage(player, resetPlayer);

    const movePlayer = direction => {
        if (!checkCollision(player, stage, {x: direction, y: 0})) {
            updatePlayerPosition({ x: direction, y: 0 });
        }
    }

    const startGame = () => {
      // Reset the game
      setStage(createStage());
      setDropTime(1000);
      setGameOver(false);
      resetPlayer();
    }

    const drop = () => {
        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPosition({ x: 0, y: 1, collided: false });
        } else {
            if (player.position.y < 1) {
                console.log('Game Over!');
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPosition({ x: 0, y: 0, collided: true }); 
        }
    }

    const keyUp = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 40) {
                setDropTime(1000);
            }
        }
    }

    const dropPlayer = () => {
        setDropTime(null);
        drop();
    }

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
            } else if ( keyCode === 38) {
                playerRotate(stage, 1);
            }
        }
    }

    useInterval(() => {
        drop();
    }, dropTime);

    return (
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
            <StyledTetris>  
                <Stage stage={stage} />
                    <aside>
                        {gameOver ? (
                            <Display gameOver={gameOver} text="Game Over" />
                        ): (
                            <div>
                                <Display text="Score" />
                                <Display text="Rows" />
                                <Display text="Level" />      
                            </div>
                        )}
                        <StartButton callback={startGame} />  
                    </aside>      
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;
