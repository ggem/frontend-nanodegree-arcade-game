// Enemies our player must avoid
var Enemy = function(sprite, x, y, speed) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.speed = speed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    var newX = this.x + this.speed * dt;

    if (newX < -board.blockSizeX)
        this.x = board.width;
    else if (newX > board.width)
        this.x = -board.blockSizeX;
    else
        this.x += this.speed * dt;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(sprite, x, y) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.limitX = board.width  - board.blockSizeX;
    this.limitY = board.height - 200;
}

Player.prototype.update = function(dt) {
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(direction) {
    var dX = direction[0],
        dY = direction[1];
    this.x = Math.min(Math.max(this.x + dX,  0), this.limitX);
    this.y = Math.min(Math.max(this.y + dY, -9), this.limitY);
}


var board = {
    width: 505,
    height: 606,
    blockSizeX: 101,
    blockSizeY: 83
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [
        new Enemy('images/enemy-bug-1.png',   0,  60,  60),
        new Enemy('images/enemy-bug-1.png', 130,  60,  60),
        new Enemy('images/enemy-bug-2.png', 500, 145, -90),
        new Enemy('images/enemy-bug-2.png', 300, 145, -90),
        new Enemy('images/enemy-bug-1.png',  60, 230, 210),
        new Enemy('images/enemy-bug-1.png', 290, 230, 210)
    ];

var player = new Player('images/char-boy.png', 202, 406);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: [-board.blockSizeX, 0], // left
        38: [0, -board.blockSizeY], // up
        39: [board.blockSizeX, 0],  // right
        40: [0, board.blockSizeY]   // down
    };

    var direction = allowedKeys[e.keyCode];
    if (direction) player.handleInput(direction);
});
