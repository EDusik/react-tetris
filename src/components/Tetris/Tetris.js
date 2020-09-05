import React, { useState } from 'react';

import { StyledTetrisWrapper, StyledTetris } from '../../styles/StyledTetris';
import { usePlayer } from '../../hooks/usePlayer';
import { useStage } from '../../hooks/useStage';
import Display from '../Display/Display';
import Stage from '../Stage/Stage';
import StartButton from '../StartButton/StartButton';

const Tetris = () => {
    console.log('re-render');

    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player] = usePlayer();
    const [stage, setStage] = useStage();

    return (
        <StyledTetrisWrapper>
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
                                <StartButton />
                            </div>
                        )}    
                    </aside>      
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;
