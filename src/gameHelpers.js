export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
    Array.from(Array(STAGE_HEIGHT), () => 
        new Array(STAGE_WIDTH).fill([0, 'clear'])
    )

    export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
        for (let y = 0; y < player.tetromino.length; y += 1) {
            for (let x = 0; x < player.tetromino[y].length; x += 1) {
                // 1. Check that we're on actual Tetromino cell
                if (player.tetromino[y][x] !== 0) {
                    // 2. Check that our move is inside the game areas height (y)
                    // We shouldn't go throw the bottom of the play area
                    if (
                        !stage[y + player.position.y + moveY] || 
                        // 3. Check the our move is inside game areas with (x)
                        !stage[y + player.position.y + moveY][x + player.position.x + moveX] ||
                        // 4. Check that the cell were moving to isn't set to clear
                        stage[y + player.position.y + moveY][x + player.position.x + moveX][1] !== 'clear'
                    ) {
                        return true;
                    }
                }
            }
        }
    };
          