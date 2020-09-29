var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running, monkeyImage;
var banana ,bananaImage, obstacle, obstacleImage, bananaGroup;
var FoodGroup, obstacleGroup, ground;
var score=0;
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkeyImage = loadImage("sprite_0.png");
  
 
}



function setup() {
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1
  
  ground = createSprite(400,350,900,10);
  ground.velocityX= -6;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  bananaGroup= new Group();
  obstacleGroup= new Group();
  
}


function draw() {
background('white');
  monkey.collide(ground);
  
  if (gameState===PLAY){
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500, 50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("SurvivalTime: "+ survivalTime, 100, 50);
    
    createBanana();
  createObstacles();
    
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -20;
    }
  monkey.velocityY = monkey.velocityY + 0.8
    
  if(obstacleGroup.isTouching(monkey)){
      gameState = END;
  }
  }
  else if (gameState===END) {
    monkey.addImage("dead",monkeyImage);
  ground.velocityX = 0;
      monkey.velocityY = 0
    obstacleGroup.setLifetimeEach(-1);
     obstacleGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
     bananaGroup.setVelocityXEach(0);
    survivalTime=0;
  
  }
  
  drawSprites();
  }

function createBanana(){

if(frameCount % 80 === 0) {
  var banana = createSprite(390,Math.round(random(120,200)),20,20)
  banana.addImage(bananaImage);
  banana.velocityX= -10;
  banana.scale=0.1;
  banana.lifetime = 40;
  bananaGroup.add(banana);
}
}

function createObstacles() {
  if(frameCount % 200 === 0) {
  var obstacle = createSprite(390,330,20,20)
  obstacle.addImage(obstacleImage);
  obstacle.velocityX= -10;
  obstacle.scale=0.1;
  obstacle.lifetime=40;
  obstacleGroup.add(obstacle);
  
}
}