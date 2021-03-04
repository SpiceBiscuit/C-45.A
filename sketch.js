var PLAY = 1;
var END = 0;
var gameState = PLAY;

var man, man_running, man_jumping, man_collided;
var ground, invisibleGround, groundImage;

var obstaclesGroup, hurdleImg, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;


function preload(){
  restartImg = loadImage("restart.png");
  hurdleImg = loadImage("Images/Hurdle1.png")
  man_collided = loadAnimation("Images/man(1).png", "Images/man(2).png");
  man_jumping = loadAnimation("Images/man3.png", "Images/man1.png", "Images/man2.png");
  man_running = loadAnimation("Images/man(1).png", "Images/man(2).png", "Images/man1.png", "Images/man2.png", "Images/man3.png", "Images/man(2).png");

  groundImage = loadImage("Images/prototype (Concept1).jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  obstaclesGroup = new Group();


  ground = createSprite(width/2 +555, height/2, width, height);
  ground.addImage("bg", groundImage);
  ground.scale = 2.59;
  ground.velocityX = -15
  
  invisibleGround = createSprite(width/2, height/4*3, width, 10);

  man = createSprite(width/4, height/2);
  man.debug = true;
  man.addAnimation("run", man_running);
}

function draw() {
  background(0);
  man.collide(invisibleGround);
  man.velocityY += 0.5

  if(gameState === PLAY){
    text("Score: "+ score, 500,50);
    spawnHurdles();
    invisibleGround.visible = false;
    if (obstaclesGroup.isTouching(man)){
      gameState = END
    }
    if (keyDown("space") && man.y>height/2){
      jump()
    } else{
      man.changeAnimation("run", man_running)
    } 
    if (ground.x<0){
      ground.x = width/2 +555
    }
  } else{
    ground.velocityX = 0;
    man.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0)
    obstaclesGroup.setLifetimeEach(-1)
    man.addAnimation("owie", man_collided);
    man.changeAnimation("owie", man_collided)
  }
  drawSprites();
}


function spawnHurdles() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var hurdle = createSprite(width,height/4.5*3,40,235);
    hurdle.debug = true;
    hurdle.setCollider("rectangle", 0, 0, 50, hurdle.height)
    //hurdle.y = Math.round(random(80,120));
    hurdle.addImage(hurdleImg);
    hurdle.scale = 0.65;
    hurdle.velocityX = -15;
    
     //assign lifetime to the variable
     hurdle.lifetime = 200;
    
    //adjust the depth
    //hurdle.depth = man.depth;
    man.depth = hurdle.depth + 1;
    
    //add each cloud to the group
    obstaclesGroup.add(hurdle);
  }
  
}


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  hurdlesGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}

function jump(){
  man.velocityY = -17.5;
  man.addAnimation("jump", man_jumping);
  man.changeAnimation("jump", man_jumping);
}