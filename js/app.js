class Enemy {
    constructor() {
        this.sprite = 'images/enemy-bug.png';
        this.reset();
    }

    // Set a random speed and street line
    reset() {
        this.x = -100;
        this.y = streets[random(0, 3)];
        this.speed = random(120, 600);
    }

    // Checks whether the enemy collides with the player
    collidePlayer() {
        const xDifference = Math.abs(this.x - player.x);
        const yDifference = Math.abs(this.y - player.y);
        return yDifference < 40 && xDifference < 40;
    }

    // Update the enemy's position
    // Parameter: dt, a time delta between ticks
    update(dt) {
        this.x += this.speed * dt;
        // Check if collides with a player
        if (this.collidePlayer()) {
            player.reset();
        }
        // Reset to starting position once it disappears
        if (this.x > map.width + 100) {
            this.reset();
        }
    }

    // Draw the enemy on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.reset();
    }

    // Place player at starting position (centered at bottom)
    reset() {
        this.x = map.width / 2;
        this.y = map.heigth;
    }

    update() {
        // Do not allow user to move beyond map constraints
        if (this.x < 0) this.x = 0;
        if (this.y < 0) this.y = 0;
        if (this.x > map.width) this.x = map.width;
        if (this.y > map.heigth) this.y = map.heigth;
    }

    // Control player movement
    handleInput(key) {
        switch (key) {
            case 'left':
                this.x -= map.stepX;
                break;
            case 'right':
                this.x += map.stepX;
                break;
            case 'up':
                this.y -= map.stepY;
                break;
            case 'down':
                this.y += map.stepY;
                break;
        }

        // Check if player reached the water
        if (this.y <= 0) {
            alert('Congratulations, you\'ve crossed the road!!');
            this.reset();
        }
    }

    // Draw player on screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

const random = function(from, to){
    return Math.floor(Math.random() * to) + from;
}

// Map constrains
const map = {width: 400, heigth: 380, stepX: 101, stepY: 85};
const streets = [40, 125, 210];


// Create enemies
const allEnemies = [new Enemy(), new Enemy(), new Enemy()];

// Create new player
const player = new Player();

// Listen for key presses and and sendit to player's handleInput() method
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});