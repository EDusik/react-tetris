import React, { useState } from 'react';

import { createStage } from '../../gameHelpers';
import { StyledTetrisWrapper, StyledTetris } from '../../styles/StyledTetris';
import { usePlayer } from '../../hooks/usePlayer';
import { useStage } from '../../hooks/useStage';
import Display from '../Display/Display';
import Stage from '../Stage/Stage';
import StartButton from '../StartButton/StartButton';

const Tetris = () => {

    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPosition, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage(player);

    const movePlayer = direction => {
        updatePlayerPosition({ x: direction, y: 0 });
    }

    const startGame = () => {
      // Reset the game
      setStage(createStage());
      resetPlayer();
    }

    const drop = () => {
        updatePlayerPosition({ x: 0, y: 1, collided: false });
    }

    const dropPlayer = () => {
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
            }
        }
    }

    return (
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
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
                                <StartButton callback={startGame} />
                            </div>
                        )}    
                    </aside>      
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;
