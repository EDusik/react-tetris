import { useState, useEffect } from 'react';

import { createStage } from '../gameHelpers';

export const useStage = (player, resetPlayer) => {
    
    const [stage, setStage] = useState(createStage());

    useEffect(() => {
        const updateStage = previousStage => {
            const newStage = previousStage.map(row => 
                row.map(cell => (
                        cell[1] === 'clear' ? [0, 'clear'] : cell
                    )
                )
            );
           
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        newStage[y + player.position.y][x + player.position.x] = [
                            value,
                            `${player.collided ? 'merged' : 'clear'}`
                        ]
                    }
                });
            });
            
            return newStage;
        };
        
        setStage(previousStage => updateStage(previousStage));
    }, [    
        player
    ]);

    return [stage, setStage];
}
