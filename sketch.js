var space,alien,star,rocket,gameOver,play,reset,laser,coinStatic,safteyLine,moon,reset_2;

var spaceImg,alien1Img,star1Img,star2Img,rocketImg,gameOverImg,playImg,resetImg,laserImage,coinStaticImg,safteyLineImg,moonImg,reset_2Img;

var alienG,starG,laserG;

var rocketS,touchingS,gameOverS,laserS,checkPointS;

var PLAY = 1;
var END = 2;
var gameState = PLAY;

var score=0;

var coins=0;

var destoried=0;

function preload(){
  
  // Loading Images
  spaceImg=loadImage("Images/Space.png");
  
  alien1Img=loadImage("Images/Alien_1.png");
  
  alien2Img=loadImage("Images/Alien_2.png");

  gameOverImg=loadImage("Images/GameOver.png");

  resetImg=loadImage("Images/Reset.PNG");

  playImg=loadImage("Images/Play.PNG");

  moonImg=loadImage("Images/Moon.png");

  coinStaticImg=loadImage("Images/Coins_Rotating/1/Coin_1.png");

  safteyLineImg=loadImage("Images/Saftey Line.png");

  reset_2Img=loadImage("Images/Reset_2.png");

// Loading Animations
  rocketImg=loadAnimation("Images/Rocket Moving/Rocket_1.png","Images/Rocket Moving/Rocket_2.png","Images/Rocket Moving/Rocket_3.png");

  star1Img=loadAnimation("Images/Coins_Rotating/1/Coin_1.png","Images/Coins_Rotating/1/Coin_2.png","Images/Coins_Rotating/1/Coin_3.png",
  "Images/Coins_Rotating/1/Coin_4.png","Images/Coins_Rotating/1/Coin_5.png","Images/Coins_Rotating/1/Coin_6.png","Images/Coins_Rotating/1/Coin_7.png"
  ,"Images/Coins_Rotating/1/Coin_8.png","Images/Coins_Rotating/1/Coin_9.png","Images/Coins_Rotating/1/Coin_10.png","Images/Coins_Rotating/1/Coin_11.png",
  "Images/Coins_Rotating/1/Coin_12.png","Images/Coins_Rotating/1/Coin_13.png");

  star2Img=loadAnimation("Images/Coins_Rotating/2/Coin_1.png","Images/Coins_Rotating/2/Coin_2.png","Images/Coins_Rotating/2/Coin_3.png",
  "Images/Coins_Rotating/2/Coin_4.png","Images/Coins_Rotating/2/Coin_5.png","Images/Coins_Rotating/2/Coin_6.png","Images/Coins_Rotating/2/Coin_7.png",
  "Images/Coins_Rotating/2/Coin_8.png","Images/Coins_Rotating/2/Coin_9.png","Images/Coins_Rotating/2/Coin_10.png");

  laserImage = loadAnimation("Images/LaserImages/Laser_1.png","Images/LaserImages/Laser_2.png","Images/LaserImages/Laser_3.png","Images/LaserImages/Laser_4.png",
  "Images/LaserImages/Laser_5.png","Images/LaserImages/Laser_6.png","Images/LaserImages/Laser_7.png","Images/LaserImages/Laser_8.png");

  
// Loading Sounds
  gameOverS=loadSound("Sounds/GameOver.mp3");

  touchingS=loadSound("Sounds/Touching star sound.mp3");

  checkPointS=loadSound("Sounds/CheckpointSound.mp3");


}

function setup() {
  
//Creating canvas
  createCanvas(600,600);
  
// Creating background
  space=createSprite(200,200,10,10);
  space.addImage(spaceImg);
  space.velocityY=10;
  
// Creating rocket
  rocket=createSprite(300,mouseY,10,10);
  rocket.addAnimation("Rocket Moving",rocketImg);
  rocket.scale=0.2;
  rocket.debug=false;
  
// Creating gameover image
  gameOver=createSprite(300,300,10,10);
  gameOver.addImage(gameOverImg);
 
// Creating reset botton
  reset=createSprite(300,400,10,10);
  reset.addImage(resetImg);
  reset.scale=0.5;

// Creating coinImage next to coin score
  coinStatic=createSprite(20,40);
  coinStatic.addImage(coinStaticImg);
  coinStatic.scale=0.5;

// Creating Saftey Line
  safteyLine=createSprite(300,590);
  safteyLine.addImage(safteyLineImg);
  
// Creating Moon
  moon=createSprite(300,300);
  moon.addImage(moonImg);

// Creating reset_2 button
  reset_2=createSprite(300,520);
  reset_2.addImage(reset_2Img);
  reset_2.scale=0.5;
  
// Creating groups  
  starG = new Group();
  alienG= new Group();
  laserG= new Group();
  
}

function draw() {
  
  if(mousePressedOver(reset)){
    
    resetGame();
  }

  if(mousePressedOver(reset_2)){

    resetGame_2();
  }

  if(keyDown("SPACE")){
    // Creating laser
  laser=createSprite(500,500);
  laser.addAnimation("Shooting",laserImage);
  laser.scale=0.1;
  laser.x=rocket.x;
  laser.y=rocket.y;
  laser.velocityY=-5;
  laserG.add(laser);
  }

  
 if(gameState===PLAY){
   
  gameOver.visible=false;
  reset.visible=false;
   
   
   if(space.y>400){
    space.y=300;
    
    if(World.frameCount % 5 == 0){
      createAliens();
      
    }
    
    if(World.frameCount % 10 == 0){
      createStars();
    }
    
    if(starG.isTouching(rocket)){
      starG.destroyEach();
      score+=1;
      coins++;
      touchingS.play();
    }
    
    if(alienG.isTouching(rocket)){
      
      gameState=END;
      rocket.x=300;
      starG.destroyEach();
      gameOverS.play();
    
  }

    if(alienG.isTouching(laserG)){
      alienG.destroyEach();
      score+=1;
      destoried++;
      laserG.destroyEach();
      touchingS.play();
    }

  }

  if(alienG.isTouching(safteyLine)){
    gameState=END;
    gameOverS.play();
  }

   space.velocityY=10;
   rocket.x=mouseX;
   rocket.y=mouseY;
 }  
  
  if(gameState===END){
    
    space.velocityY=0;
    gameOver.visible=true;
    rocket.visible=false;
    reset.visible=true;
    laserG.visible=false;
    alienG.destroyEach();

  }

  if(score<100){
    moon.visible=false;
    reset_2.visible=false;
  }
  
  
  drawSprites();
  
  fill("cornsilk");
  textSize(15);
  text("Score: " + score,250,50);

  text("Coins: " + coins,50,50);

  text("Number of aliens shooted: " + destoried,390,50);

  if(score>99){
    space.velocityY=0;

    textSize(40);
    fill("lavender");
    text("YOU REACHED THE MOON",50,120);
    moon.visible=true;
    rocket.visible=false;
    alienG.destroyEach();
    reset_2.visible=true;

    
  }

  fill("bisque")
  if(score<100){
  text("Hints:",50,100);
  text("Press 'SPACE' key to shoot the aliens",80,120);
  text("Collect 100 Scores to reach the moon",80,140);
  text("Do not leave the aliens to cross the saftey line",80,160);
  }

}

function createAliens(){
  
  var r=Math.round(random(1,2));
  
  alien=createSprite(100,0,10,10);
  
  alien.x=Math.round(random(50,550));
  
  if(r == 1){
    alien.addImage(alien1Img);
    alien.scale=0.2;
  }
  
  if(r ==  2){
    alien.addImage(alien2Img);
    alien.scale=0.1;
  }
  
  alien.debug=false;
  // alien.scale=0.1;
  alien.velocityY=10;
  alien.lifetime=200;
  alienG.add(alien);
    
}

function createStars(){
  
  var r=Math.round(random(1,2));
    
  star=createSprite(100,0,10,10);
  
  star.x=Math.round(random(50,550));
  
  if(r == 1){
    star.addAnimation("Star Rotating",star1Img);
    star.scale=1;
  }
  
  if(r == 2){
    star.addAnimation("Star Rotating",star2Img);
    star.scale=1.5;
  }
  
  star.debug=false;
  star.velocityY= 10;
  star.lifetime=200;
  starG.add(star);
  
}

function resetGame(){
  gameState=PLAY;
    
  rocket.visible=true;
  score=0;
  coins=0;
  destoried=0;
}

function resetGame_2(){
  score=0;
  coins=0;
  destoried=0;

  rocket.visible=true;
}