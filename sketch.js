
var trex ,trex_running,trex_collided;
var ground, invisibleGround,groundImage, cloudImage;
var gameOverImage,restartImg,gameOver;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){

  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");

  trex_collided=loadAnimation("trex_collided.png");
  groundImage=loadImage("ground2.png");
 cloudImage=loadImage("cloud.png");
 obstacle1=loadImage("obstacle1.png");
 obstacle2=loadImage("obstacle2.png");
 obstacle3=loadImage("obstacle3.png");
 obstacle4=loadImage("obstacle4.png");
 obstacle5=loadImage("obstacle5.png");
 obstacle6=loadImage("obstacle6.png");
 restartImg=loadImage("restart.png");
 gameOverImage=loadImage("gameOver.png");
 sound=loadSound("jump.mp3");
 die=loadSound("die.mp3");
sound2=loadSound("checkpoint.mp3");




}

function setup(){
  createCanvas (windowWidth,windowHeight)

  trex =  createSprite(50,height-40,20,50);

  ground=createSprite(width/2,height-10,width,125);
  ground.addImage("ground",groundImage)
 trex.addAnimation("running",trex_running);
 invisibleGround=createSprite(width/2,height-5,width,1);
 invisibleGround.visible=false;
 obstaclesGroup=createGroup();
 cloudsGroup=createGroup();

 var rand=Math.round(random(1,100))
 //console.log(rand);
 console.log("Hola"+"Mundo")

 score=0;
 trex.setCollider("circle",0,0,40)
 trex.debug=true

 trex.scale=0.5;
 trex.addAnimation("collided",trex_collided);

 gameOver=createSprite(width/2,height/2-50);
 gameOver.addImage(gameOverImage);
 gameOver.scale=0.5
 gameOver.visible=false;

 restart=createSprite(width/2,height/2);
 restart.addImage(restartImg);
 restart.scale=0.5
 restart.visible=false;
 
 
 
 //trex.x=50;

  //crear sprite de Trex
 
}

function draw(){
  background("white")



  text("Puntuacion: "+score,width-100,50);
  if(gameState===PLAY){
   ground.velocityX=-(4+2*score/100);
 score=score+Math.round(getFrameRate()/60)
 if(score>0 &&  score%100===0){
  sound.play();
 }
 if(ground.x < 0){
  ground.x=ground.width/2;
  }
 if((touches.length>0 ||keyDown("space")) && trex.y >=height-100){
  trex.velocityY=-10;    
  sound.play();
  touches=[];
  } 
 trex.velocityY=trex.velocityY +0.5;

 spawnObstacles();
 spawnCloud();
 if(obstaclesGroup.isTouching(trex)){
  gameState=END;
  die.play();
 }
  }
else if(gameState===END){
  ground.velocityX=0;
  trex.velocityY=0;
  trex.changeAnimation("collided",trex_collided)
  gameOver.visible=true;
  restart.visible=true;
  if((touches.legth>0 || mousePressedOver(restart))){
    reset();
    touches=[];
  }
   
 
  obstaclesGroup.setLifetimeEach(-1)
  cloudsGroup.setLifetimeEach(-1)
  obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
}
  
  console.log(ground.x)

  
 
  //trex.collide(ground);
  trex.collide(invisibleGround);
 
  drawSprites();
 

 }
 function reset(){
 gameState=PLAY
 gameOver.visible=false
 restart.visible=false
 trex.changeAnimation("running",trex_running)
 obstaclesGroup.destroyEach()
 cloudsGroup.destroyEach()
 score=0
 }
 
 function spawnCloud(){
  if(frameCount%60===0){
  cloud=createSprite(width/2,100,40,10);
  cloud.addImage(cloudImage)
  cloud.y=Math.round(random(10,height-200))
  cloud.scale=0.9;
  cloud.velocityX=-3
  cloud.lifetime=215
  console.log(trex.depth);
  console.log(cloud.depth);
  cloud.depth=trex.depth
  trex.depth=trex.depth+1
  cloudsGroup.add(cloud);
}
}
function spawnObstacles(){
  if(frameCount%60==0){
  var obstacle=createSprite(width/2,height-20,width,125);
  obstacle.velocityX=-(6+score/100);
  var rand=Math.round(random(1,6))
  switch(rand){
 case 1: obstacle.addImage(obstacle1);
 break;
 case 2: obstacle.addImage(obstacle2);
 break;
 case 3: obstacle.addImage(obstacle3);
 break;
 case 4: obstacle.addImage(obstacle4);
 break;
 case 5: obstacle.addImage(obstacle5);
 break;
 case 6: obstacle.addImage(obstacle6);
 break;
default:break;
  }
  obstaclesGroup.add(obstacle)
  obstacle.scale=0.5;
  obstacle.lifetime=300;
  }
}