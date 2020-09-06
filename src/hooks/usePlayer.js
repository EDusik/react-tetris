import { useState, useCallback } from 'react';

import { STAGE_WIDTH } from '../gameHelpers';
import { TETROMINOS, randomTetromino } from '../tetrominos';

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        position: {
            x: 0,
            y: 0
        },
        tetromino: TETROMINOS[0].shape,
        collided: false
    });

    const updatePlayerPosition = ({ x, y, collided }) => {
        setPlayer(previousState => ({
            ...previousState, 
            position: { 
                x: (previousState.position.x += x),
                y: (previousState.position.y += y)
            },
            collided
        }))
    }

    const resetPlayer = useCallback(() => {
        setPlayer({
            position: { 
                x: STAGE_WIDTH / 2 - 2,
                y: 0
            },
            tetromino: randomTetromino().shape,
            collided: false
        })
    }, []);

    return [player, updatePlayerPosition, resetPlayer];
}
