/**
 * Board constants.  Used throughout the code.
 */
var board = {
    WIDTH: 505,
    HEIGHT: 606,
    BLOCKSIZE_X: 101,
    BLOCKSIZE_Y: 83
};

/**
 * Enemies our player must avoid
 * @constructor
 */
function Enemy(sprite, x, y, speed) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 99;
    this.height = 66;
}

/**
 * Update the enemy's position.
 * Parameter: dt, a time delta between tick.
 * When enemy goes past the canvas, the position is reset
 * to the other side of the canvas.
 */
Enemy.prototype.update = function(dt) {
    var newX = this.x + this.speed * dt;

    if (newX < -board.BLOCKSIZE_X)
        this.x = board.WIDTH;
    else if (newX > board.WIDTH)
        this.x = -board.BLOCKSIZE_X;
    else
        this.x += this.speed * dt;
};

/**
 * Draw the enemy on the screen, required method for game
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * the player class.
 * @constructor
 */
function Player(sprite, x, y) {
    this.sprite = sprite;
    this.initialX = x;
    this.initialY = y;
    this.x = x;
    this.y = y;
    // player's sprite width and height
    this.width = 67;
    this.height = 76;
    // how far left/right/up/down can the player be
    this.limitX0 = (board.BLOCKSIZE_X - this.width) / 2;
    this.limitX1 = board.WIDTH  - this.width - this.limitX0;
    this.limitY0 = 57;
    this.limitY1 = board.HEIGHT - board.BLOCKSIZE_Y - this.height/2 - 13;
};

/**
 * Sends the player to its initial position
 */
Player.prototype.resetPosition = function() {
    this.x = this.initialX;
    this.y = this.initialY;
}

Player.prototype.update = function() {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * handleInput receives a tuple where the first element
 * is the delta X and the second element is the delta Y.
 * It moves the player in the specified direction, making
 * sure the player never goes out of limits.
 */
Player.prototype.handleInput = function(direction) {
    var dX = direction[0],
        dY = direction[1];
    this.x = Math.min(Math.max(this.x + dX, this.limitX0), this.limitX1);
    this.y = Math.min(Math.max(this.y + dY, this.limitY0), this.limitY1);
};

/**
 * an array with all the enemies.
 */
var allEnemies = [
        new Enemy('images/enemy-bug-1.png',   0, 140,  60),
        new Enemy('images/enemy-bug-1.png', 130, 140,  60),
        new Enemy('images/enemy-bug-2.png', 500, 223, -90),
        new Enemy('images/enemy-bug-2.png', 300, 223, -90),
        new Enemy('images/enemy-bug-1.png',  60, 306, 210),
        new Enemy('images/enemy-bug-1.png', 290, 306, 210)
    ];

/**
 * the player object
 */
var player = new Player('images/char-boy.png', 219, 472);

/**
 * This listens for key presses and sends the keys to your
 * Player.handleInput() method. You don't need to modify this.
 */
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: [-board.BLOCKSIZE_X, 0], // left
        38: [0, -board.BLOCKSIZE_Y], // up
        39: [board.BLOCKSIZE_X, 0],  // right
        40: [0, board.BLOCKSIZE_Y]   // down
    };

    var direction = allowedKeys[e.keyCode];
    if (direction) player.handleInput(direction);
});
