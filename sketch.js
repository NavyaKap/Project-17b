var monkey;
var monkeyRunning;
var banana ;
var bananaImage;
var obstacle;
var obstacleImage;
var FoodGroup;
var obstacleGroup;
var score;
var bgImage;

function preload(){

monkeyRunning=loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png",
"monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png",
"monkey_8.png");
 
 bgImage = loadImage("CD forest.jpg"); 
  
bananaImage  = loadImage("banana.png");
obstaceImage = loadImage("obstacle.png");

}

function setup() {
createCanvas(400, 360);
 bg=createSprite(200,180);
 bg.x=bg.width/2; 
 bg.addImage(bgImage);
 
  
   monkey  = createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkeyRunning);
   monkey.scale=0.1
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  ground.visible=false;
  FoodGroup      = new Group();
  obstaclesGroup = new Group();

  score = 0;
 }
function draw() {
  background("white");
  
  bg.velocityX = -3;
  console.log(bg.x);
  if (bg.x<100){
    bg.x=bg.width/2;       
  }
  
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
   
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.7;
     
    monkey.collide(ground);   
   
  spawnFood();
  spawnObstacles();
 
  drawSprites();
    
  text("Made by NAVYA",250,50);
   if(obstaclesGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY= 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
        frameRate(0);
  
   }
  var survivalTime=0;
  stroke("white");
  textSize(20);
  fill("white"); 
  text("Score",+score,  500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50); 
}

function spawnFood() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,300);    
    banana.velocityX = -5;
    
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
     banana.addImage(bananaImage);
     banana.scale=0.1;
    
   FoodGroup.add(banana);
  }
}
function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
  obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
  obstacle.lifetime = 300;
    
  obstaclesGroup.add(obstacle);
  }
}
