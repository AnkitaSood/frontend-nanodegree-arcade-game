
var GameObjects = function() {
}
//required method to draw the enemies and player on the screen
GameObjects.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Enemies our player must avoid
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.setPosition(); 
};
Enemy.prototype = Object.create(GameObjects.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.    
    this.x > ctx.canvas.width ? this.setPosition() : this.x += this.speed*dt;
};
Enemy.prototype.setPosition = function(){
    //set different position coordinates for the enemy everytime the game starts or it crosses the canvas
    this.x = 1;
    this.y = Math.floor(Math.random() * ((240-60)+1) + 60);

    //assign speed ranging between 50 to 300 to the enemies for variation everytime they cross the canvas
    this.speed = Math.floor(Math.random()* ((300 -50)+1) +50);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-princess-girl.png';
    this.setPosition();
}

Player.prototype = Object.create(GameObjects.prototype);
Player.prototype.constructor = Player;
Player.prototype.setPosition = function() {
    //intial position coordinates for the player
    this.x = 480, this.y = 400; 
}
Player.prototype.handleInput = function(e){
    /*ensure the player stays inside the canvas*/
    switch(e) {
        case "left" : this.x -= 12;
        break;
        case "right" : this.x += 12;
        break;
        case "up" : {
         this. y > 4 ? this.y -= 12 : this.y = 2;   
        }
        break;
        case "down" :  {
            this.y < 434 ? this.y += 12 : this.y = 434;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = new Array(2), 
    player = new Player();

    //Starting with 2 enemies. TODO: Increase number of enemies as per the level of difficulty chosen.
    allEnemies[0] = new Enemy();
    allEnemies[1] = new Enemy();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
