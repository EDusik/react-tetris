import { useState, useCallback } from 'react';

import { STAGE_WIDTH, checkCollision } from '../gameHelpers';
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

    const rotate = (matrix, direction) => {
        // Make the rows to become cols (transpose)
        const rotatedTetromino = matrix.map((_, index) => 
            matrix.map(col => col[index])
        );
        // Reverse each row to get a rotated matrix
        if (direction > 0) {
            return rotatedTetromino.map(row => row.reverse());
        }
        return rotatedTetromino.reverse();
    }

    const playerRotate = (stage, direction) => {
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, direction);

        const position = clonedPlayer.position.x;
        let offset = 1;
        while(checkCollision(clonedPlayer, stage, {x: 0, y: 0})) {
            clonedPlayer.position.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > clonedPlayer.tetromino[0].length) {
                rotate(clonedPlayer.tetromino, -direction);
                clonedPlayer.position.x = position;
                return;
            }
        }

        setPlayer(clonedPlayer);
    }

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
        });
    }, []);

    return [player, updatePlayerPosition, resetPlayer, playerRotate];
}
