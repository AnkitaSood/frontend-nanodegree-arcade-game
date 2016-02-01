
var GameObjects = function() {
};
//required method to draw the enemies and player on the screen
GameObjects.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
GameObjects.prototype.randomRange = function (upper,lower) {
    return Math.floor(Math.random() * ((upper-lower)+1) + lower);
}
//Gemstones the Player needs to collect
var Gems = function() {
    this.spriteGems = ['images/gem-blue.png',
                        'images/gem-green.png',
                        'images/gem-orange.png'];
    /*Select random gemstone to generate everytime*/                    
    this.sprite = this.spriteGems[this.randomRange(2,0)];
    this.setPosition();
    this.gemCollected = false;
};
Gems.prototype = Object.create(GameObjects.prototype);
Gems.prototype.constructor = Gems;
Gems.prototype.setPosition = function() {
    /*Position gemstones randomly anywhere within the canvas*/
    this.x = this.randomRange(980,1);
    this.y = this.randomRange(430,1);
}
Gems.prototype.collected = function() {
    /*Remove the collected gem from canvas, increase score and push new enemy for every 10 points*/
    ctx.clearRect(this.x, this.y, 1010, 606);
    player.score ++;
    player.score > 0 && player.score % 10 === 0 ? allEnemies.push(new Enemy()) : '';
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
    this.y = this.randomRange(240,60);

    //assign speed ranging between 50 to 300 to the enemies for variation everytime they cross the canvas
    this.speed = this.randomRange(300,50);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.playerSprites = [  'images/char-princess-girl.png',
                            'images/char-boy.png',
                            'images/char-cat-girl.png',
                            'images/char-horn-girl.png',
                            'images/char-pink-girl.png'];
    this.sprite = this.playerSprites[0];
    this.currentIndex = 0;
    this.setPosition();
    this.score = 0;
}

Player.prototype = Object.create(GameObjects.prototype);
Player.prototype.constructor = Player;
Player.prototype.setPosition = function() {
    //intial position coordinates for the player
    this.x = 440, this.y = 400; 
}
Player.prototype.handleInput = function(e){
    /*ensure the player stays inside the canvas when the user navigates the player,
    and change player image when user hits spacebar on initial game load*/
    switch(e) {
        case "left" : this.x > 0 ? this.x-= 12 : this.x = 0;
        break;
        case "right" : this.x < 920? this.x += 12 : this.x = 920;
        break;
        case "up" : {
         this. y > 4 ? this.y -= 12 : this.y = 2;   
        }
        break;
        case "down" :  {
            this.y < 434 ? this.y += 12 : this.y = 434;
        }
        break;
        case "space" : {
            if (this.currentIndex < this.playerSprites.length) {
                this.currentIndex++;
            }
            if (this.currentIndex == this.playerSprites.length){
                this.currentIndex = 0;
            }
        }
        break;
        case "enter" : {
            playerChosen = true;
        }
    }
    this.sprite = this.playerSprites[this.currentIndex];
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [], 
    player = new Player(),
    gem = new Gems();

    //Starting with 2 enemies.
    allEnemies[0] = new Enemy();
    allEnemies[1] = new Enemy();


// This listens for key presses and sends the keys to handleInput() method.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space',
        13: 'enter'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
