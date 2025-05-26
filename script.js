// Add JavaScript code for your web site here and call it from index.html.
let WIDTH = 800; // new
let HEIGHT = 600; // new

const config = {
    type: Phaser.AUTO,
    width: WIDTH, // new
    height: HEIGHT, // new
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let ball;
let ballSize = 80; // new
let yspeed = 0.5;
let xspeed = 1.0;
let lives = 10;
let livesText;
let gameOverText;

function preload() {
    this.load.image("ball", "assets/ball.png"); // watch out for case sensitivity
  }

function create() { // new
   ball = this.add.sprite(WIDTH / 2, HEIGHT / 2, "ball"); // x, y, and the ball "key"
   ball.setDisplaySize(ballSize, ballSize); // width, height

   // Add lives text display
   livesText = this.add.text(10, 10, `Lives: ${lives}`, {
       fontSize: '24px',
       fill: '#808080'
   });

   // Make the ball interactive and add click handler
   ball.setInteractive();
   ball.on('pointerdown', function() {
       console.log("Ball clicked!");
       xspeed *= 1.1;
       yspeed *= 1.1;
       ballSize *= 0.9;
       ball.setDisplaySize(ballSize, ballSize); // width, height
      
       lives += 1; // increase lives when clicked
       livesText.setText(`Lives: ${lives}`); // update text
   });
   
      // Create but hide the game over text
   gameOverText = this.add.text(WIDTH/2, HEIGHT/2, 'GAME OVER', {
       fontSize: '64px',
       fill: '#ff0000'
   });
   gameOverText.setOrigin(0.5); // Centre the text
   gameOverText.setVisible(false);

  }

function update() {
    // Game logic here
    
       if (lives <= 0) { // No need to update if game is over
       return;
   }
    
     ball.y += yspeed; // += means "add yspeed to ball.y"
     ball.x += xspeed; // new
     
    // The || sign means "or"
   if (ball.y >= HEIGHT - ballSize / 2 || ball.y <= ballSize / 2) {
       // Multiplying by -1 will "flip" the direction
       yspeed *= -1;
       
       lives -= 1; // decrease lives on wall bounce
       livesText.setText(`Lives: ${lives}`); // update text
       checkGameOver();
   }

   if (ball.x >= WIDTH - ballSize / 2 || ball.x <= ballSize / 2) {
       xspeed *= -1;
       
       lives -= 1; // decrease lives on wall bounce
       livesText.setText(`Lives: ${lives}`); // update text
       checkGameOver();
   }

   
function checkGameOver() {
    if (lives <= 0) {
        lives = 0; // Ensure lives doesn't go below 0
        livesText.setText('Lives: 0');
        gameOverText.setVisible(true);
        ball.setVisible(false); // Hide the ball
    }}

}