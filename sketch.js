var obstacleGroup, cloudGroup, bird,birdImage,cloud,obstacle, trex, ground, trexRunning, groundImage, invisibleGround, cloudImage, obstacleImage, gameState = "play";

function setup() {
  createCanvas(600,250);
  trex = createSprite(80,180, 40,50)
  bird = createSprite(760, 120, 50,20)
  bird.velocityX = -2
  ground = createSprite (300,230, 600,10)
  trex.addAnimation("running",trexRunning)
  trex.addAnimation("collided", trexCollided)
  trex.scale = 0.6
  ground.addImage(groundImage)
  ground.velocityX = -4
  invisibleGround = createSprite (300,240, 600, 10)
  invisibleGround.visible = false
  bird.addImage(birdImage)
  bird.scale = 0.3
  trex.setCollider("circle",0,0, 40 )
  trex.debug = true
  obstacleGroup = new Group()
  cloudGroup = new Group()
}

function preload(){
  trexRunning = loadAnimation("trex1.png","trex3.png","trex4.png")
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  obstacleImage3 = loadImage("obstacle3.png")
  birdImage = loadImage("Bird.png")
  obstacleImage1 = loadImage("obstacle1.png")
  obstacleImage2 = loadImage("obstacle2.png")
  obstacleImage4 = loadImage("obstacle4.png")
  obstacleImage5 = loadImage("obstacle5.png")
  obstacleImage6 = loadImage("obstacle6.png")
  trexCollided = loadAnimation("trex_collided.png")
}

function draw() 
{
  background("white");
  drawSprites()

  if(gameState == "play"){
    if(keyDown("space") && trex.y > 170){
      trex.velocityY=-10
    }
    trex.velocityY+=0.7
    trex.collide(invisibleGround)
    if(ground.x < 0){
      ground.x = ground.width/2
    }
    createCloud()
    createObstacle()
    if(trex.isTouching(obstacleGroup)){
    gameState = "end"
  }
  }else{
    ground.velocityX = 0
    obstacleGroup.setVelocityXEach(0)
    cloudGroup.setVelocityXEach(0)
    bird.velocityX = 0
    trex.changeAnimation('collided')
    trex.velocityY = 0
    cloudGroup.setLifetimeEach(-1)
    obstacleGroup.setLifetimeEach(-1)
  }
}

function createCloud(){
  if(frameCount%110 == 0){
    cloud = createSprite(630,random(50,120), 60,30)
    cloud.velocityX = -3
    // time = distance/speed
    // time = 600/3
    // time = 200
    cloud.lifetime = 200
    cloud.addImage(cloudImage)
    cloud.scale = 0.15
    cloudGroup.add(cloud)
   }
}

function createObstacle(){
  if(frameCount%100 == 0){
    obstacle = createSprite(650,210, 30,40)
    obstacle.velocityX = -4
    obstacle.scale = 0.6
    // set lifetime for onstacle
    obstacle.lifetime = 150
    exp = random(0,5)
    exp = Math.round(exp)
    switch(exp){
      case 0:
      obstacle.addImage(obstacleImage1)
      break;
      case 1:
      obstacle.addImage(obstacleImage2)
      break;
      case 2:
      obstacle.addImage(obstacleImage1)
      break;
      case 3:
      obstacle.addImage(obstacleImage4)
      break;
      case 4:
      obstacle.addImage(obstacleImage5)
      break;
      case 5:
      obstacle.addImage(obstacleImage6)
      break;
    }
    obstacleGroup.add(obstacle)
  }
}


