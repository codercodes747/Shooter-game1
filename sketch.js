var ground,groundImage;
var player1,player1Image,player2,player2Image;
var gun1,gun1Image,gun2,gun2Image
var bullet1,bullet1Img,bullet2,bullet2Img;
var bullet1Group,bullet2Group
var wall1,wall2,wallImage
var Life1 = 100;
var Life2 = 100;
var score1 = 0;
var score2 = 0;
var gameState = "play";

function preload(){
  groundImage = loadImage("map.png");
  player1Image = loadImage("Player1.png");
  player2Image = loadImage("Player2.png");
  gun1Image = loadImage("pistol1.png");
  gun2Image = loadImage("pistol2.png");
  wallImage = loadImage("Wall.jpg");
  bullet1Img = loadImage("Bullet1.png");
  bullet2Img = loadImage("Bullet2.png");
  
}


function setup() {
  createCanvas(1200,750);

  ground = createSprite(600,375,1200,750)
  ground.addImage("ground",groundImage)
  ground.scale = 1.25

  player1 = createSprite(80,700,20,20)
  player1.addImage("player1",player1Image);
  player1.scale = 0.4;
  player1.setCollider("rectangle",0,0,100,player1.height);
  //player1.debug = true;

  player2 = createSprite(1100,700,20,20)
  player2.addImage("player2",player2Image);
  player2.scale = 0.2;
  player2.setCollider("rectangle",0,0,150,player2.height);
  //player2.debug = true;

  gun1 = createSprite(player1.x + 20,player1.y + 20,5,5)
  gun1.addImage("pistol1",gun1Image)
  gun1.scale = 0.112

  gun2 = createSprite(player2.x - 20,player2.y + 22,5,5)
  gun2.addImage("pistol2",gun2Image)
  gun2.scale = 0.125

  bullet1Group = createGroup()
  bullet2Group = createGroup()

  edges = createEdgeSprites()
}

function draw() 
{
  background("white");

 if(gameState=="play"){
    //player movement
    if(keyDown("w")){
      player1.y = player1.y - 5
    }

    if(keyDown("s")){
      player1.y = player1.y + 5
    }

    if(keyDown(UP_ARROW)){
      player2.y = player2.y - 5
    }

    if(keyDown(DOWN_ARROW)){
      player2.y = player2.y + 5
      }

  //gun movement
    if(keyDown("w")){
      gun1.y = gun1.y - 5 
    }
      
    if(keyDown("s")){
      gun1.y = gun1.y + 5
    }
    
    if(keyDown(UP_ARROW)){
      gun2.y = gun2.y - 5
    }
      
    if(keyDown(DOWN_ARROW)){
      gun2.y = gun2.y + 5
    }

    
    if(keyDown("Q")){
      createBullet1()
    }

    if(keyDown("P")){
      createBullet2()
    }

    if(bullet1Group.isTouching(player2)){
      Life2 -= 1;
      score1 += 10;
      bullet1Group.get(0).destroy()
    }

    if(bullet2Group.isTouching(player1)){
      Life1 -= 1;
      score2 += 10;
      bullet2Group.get(0).destroy()
    }

    if (Life1 == 0){
      gameState = "end"
    }

    if (Life2 == 0){
      gameState = "end"
    }
 } 

  player1.bounceOff(edges)
  player2.bounceOff(edges)
  gun1.bounceOff(edges)
  gun2.bounceOff(edges)
  
  drawSprites();

  if(gameState == "end"){
    gameOver();
    if(keyDown("R")){
      gameState = "play"
      Life1 = 100;
      Life2 = 100;

      score1 = 0;
      score2 = 0;

      player1.x = 80;
      player1.y = 700;
      player2.x = 1100;
      player2.y = 700;

      gun1.x = player1.x + 20
      gun1.y = player1.y + 20
      gun2.x = player2.x - 20
      gun2.y = player2.y + 20

    }
  }  

  textSize(30);
  fill("black")
  text("Life: "+Life1, 300, 30);
  text("Life: "+Life2, 890, 30);
  text("Score: "+score1,170, 106)
  text("Score: "+score2,1010, 106)
}


function createBullet1(){
    bullet1 = createSprite(gun1.x,gun1.y,2,2)
    bullet1.addImage("bullet1",bullet1Img)
    bullet1.scale = 0.2
    bullet1.velocityX = 10
    bullet1.lifetime = 1200/10
    bullet1.setCollider("rectangle",0,0,bullet1.width,10);
    //bullet1.debug = true;
    bullet1Group.add(bullet1)
}

function createBullet2(){
    bullet2 = createSprite(gun2.x,gun2.y,2,2)
    bullet2.addImage("bullet2",bullet2Img)
    bullet2.scale = 0.1
    bullet2.velocityX = -10
    bullet2.lifetime = 1200/10
    bullet2.setCollider("rectangle",0,0,bullet2.width,10);
    //bullet2.debug = true;
    bullet2Group.add(bullet2)
}

function gameOver(){
  textSize(100);
  fill("red")
  text("Game Over",300,550 )
  text("Press R to restart.",200,650)
  bullet1Group.setVelocityEach(0);
  bullet2Group.setVelocityEach(0);
}