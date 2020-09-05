import React from 'react';

import { createStage } from '../../gameHelpers';
import { StyledTetrisWrapper, StyledTetris } from '../../styles/StyledTetris';
import Display from '../Display/Display';
import Stage from '../Stage/Stage';
import StartButton from '../StartButton/StartButton';

const Tetris = () => {
    return (
        <StyledTetrisWrapper>  
            <StyledTetris>        
                <Stage stage={createStage()} />
                    <aside>
                        <div>
                            <Display text="Score" />
                            <Display text="Rows" />
                            <Display text="Level" />
                            <StartButton />
                        </div>      
                    </aside>          
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;
