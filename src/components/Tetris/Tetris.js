import React from 'react';
import Stage from '../Stage/Stage';
import Display from '../Display/Display';
import StartButton from '../StartButton/StartButton';

const Tetris = () => {
    return (
        <div>   
            <Stage />
            <aside>
                <div>
                    <Display text="Score" />
                    <Display text="Rows" />
                    <Display text="Level" />
                </div>            
            </aside>
            <StartButton />
        </div>
    )
}

export default Tetris;
