let Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


let Player = function(x, y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function(dt){
    // User canvas constrains
    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0;
    if (this.x > 400) this.x = 400;
    if (this.y > 380) this.y = 380;
};

// Draw player on screen
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Control player movement
Player.prototype.handleInput = function(key){
    switch(key){
        case 'left':
            this.x -= 101;
            break;
        case 'right':
            this.x += 101;
            break;
        case 'up':
            this.y -= 85;
            break;
        case 'down':
            this.y += 85;
            break;
    }
};

// Enemies
let allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];

// Create player at start location
let player = new Player(200, 380);

// Listen for key presses and and sendit to player's handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
