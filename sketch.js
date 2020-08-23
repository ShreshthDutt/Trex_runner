var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImage,ob1,ob2,ob3,ob4,ob5,ob6;
var PLAY,END,gameState;
var ObstaclesGroup,CloudsGroup,gameOver,gameOverImg,restart,restartImg
var score
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
}

function setup() {
  createCanvas(600, 200);
  score = 0;
  trex = createSprite(50,180,20,50);
  trex.addAnimation("trex_running", trex_running);
  trex.addAnimation("trex_collided",trex_collided);
  
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  PLAY = 1;
  END = 0;
  gameState = PLAY;
  ObstaclesGroup = createGroup();
  CloudsGroup = createGroup();
  gameOver = createSprite(300,80,20,20);
  gameOver.addImage(gameOverImg);
  restart = createSprite(300,120,20,20);
  restart.addImage(restartImg);
  restart.scale = 0.6;
  gameOver.visible = false;
  restart.visible = false;
  trex.setCollider("circle",0,0,40);
  
}

function draw() {
  background(255);
  textSize(15);
  text("Score: "+score,500,50);
  if(gameState===PLAY){
    score=score+Math.round(getFrameRate()/60);
    
  if(keyDown("space")&&trex.y>161 ) {
    trex.velocityY = -12;
  }
  console.log(trex.y);
  
  trex.velocityY = trex.velocityY + 0.8
  ground.velocityX = -6;
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  spawnObstacles();
  spawnClouds();
    if(ObstaclesGroup.isTouching(trex)){
      gameState = END;
    }
  }else if(gameState === END) {
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("trex_collided");
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    //place gameOver and restart icon on the screen
    restart.visible=true;
    gameOver.visible=true;
    if(mousePressedOver(restart)){
    reset();
  }
  }
  trex.collide(invisibleGround);
  drawSprites();
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
     
    //generate random obstacles
    var rand = Math.round(random(1,6));
   
    switch(rand){
      case 1:obstacle.addImage(ob1);break;
      case 2:obstacle.addImage(ob2);break;
      case 3:obstacle.addImage(ob3);break;
      case 4:obstacle.addImage(ob4);break;
      case 5:obstacle.addImage(ob5);break;
      case 6:obstacle.addImage(ob6);break;
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 110;
  ObstaclesGroup.add(obstacle);
    
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 210;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    CloudsGroup.add(cloud);
  }
  
}
function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  trex.changeAnimation("trex_running");
  score=0;
  
}