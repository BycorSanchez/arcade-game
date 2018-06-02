class Enemy {
    constructor() {
        this.sprite = 'images/enemy-bug.png';
        this.reset();
    }

    // Set a random speed and road line
    reset() {
        this.x = -100;
        this.y = map.streets[random(0, 3)];
        this.speed = random(120, 640);
    }

    // Check whether the enemy collides with the player
    collidesWithPlayer() {
        return Math.abs(this.y - player.y) < 40 && Math.abs(this.x - player.x) < 40;
    }

    // Update the enemy's position
    // Parameter: dt, a time delta between ticks
    update(dt) {
        this.x += this.speed * dt;
        // Check if collides with a player
        if (this.collidesWithPlayer()) {
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
        selector.show();
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
                selector.hide();
                break;
            case 'right':
                this.x += map.stepX;
                selector.hide();
                break;
            case 'up':
                this.y -= map.stepY;
                selector.hide();
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

class Selector {
    constructor() {
        this.sprite = 'images/Selector.png';
        this.currentSprite = 0;
        this.playerSprites = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png']
    }

    show() {
        this.x = map.width / 2;
        this.y = map.heigth;
    }

    // Hide selection box off canvas
    hide() {
        this.x = map.width / 2;
        this.y = map.heigth + 400;
    }

    // Draw selector box
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Check whether the player is close to selector box
    isOnSelection() {
        return Math.abs(this.y - player.y) < 30 && Math.abs(this.x - player.x) < 30;
    }

    // Return next available sprite
    nextPlayerSprite() {
        this.currentSprite = (this.currentSprite + 1) % this.playerSprites.length;
        return this.playerSprites[this.currentSprite];
    }

    // Change player's sprite when the player press space bar at the starting position
    handleInput(key) {
        if (key === 'space' && this.isOnSelection()) {
            player.sprite = this.nextPlayerSprite();
        }
    }
}

// Create a random integer number between 'from' and 'to' numbers
const random = (from, to) => Math.floor(Math.random() * to) + from;

// Map constrains
const map = { width: 400, heigth: 380, stepX: 101, stepY: 85, streets: [40, 125, 210] };

// Create instances
let allEnemies = [];
const numEnemies = 5;
const selector = new Selector();
const player = new Player();

for (let i = 0; i < numEnemies; i++) {
    allEnemies.push(new Enemy());
}

// Listen for key presses and and sendit to player's handleInput() method
document.addEventListener('keyup', (e) => {
    const allowedKeys = {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    selector.handleInput(allowedKeys[e.keyCode]);
    player.handleInput(allowedKeys[e.keyCode]);
});