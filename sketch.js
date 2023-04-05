var skyImg, sky;
var mangoImg, mango;
var bird, birdImg;
var invisibleBlockGroup, invisibleBlock;
var bskt, bsktImg;
var gameState = "play"

function preload(){
  skyImg = loadImage("sky2.png");
  mangoImg = loadImage("mango.png");
  birdImg = loadImage("bird2.png");
  bskt = loadImage("bskt.png");
  bsktGroup = new Group()
  mangoGroup = new Group()
  invisibleBlockGroup = new Group()
  
  
}

function setup() {
  createCanvas(600, 600);
  sky = createSprite(300,300);
  sky.addImage("sky2",skyImg);
  sky.velocityY = 1;
  bird = createSprite(200,200,50,50)
  bird.addImage("bird2", birdImg)
  bird.scale = 0.25
  
  
  
}

function draw() {
  background(200);
  
  if(gameState==="play"){
    bird.scale=0.5
  
  if (keyDown("left_arrow")){
    bird.x = bird.x-2
  }

  if (keyDown("right_arrow")){
    bird.x = bird.x+2
  }

  if (keyDown("space")){
    bird.velocityY = -6
  }

  bird.velocityY = bird.velocityY + 0.2
  if(sky.y > 400){
      sky.y = 300
    }
    if(bsktGroup.isTouching(bird)){
     bskt.velocityY = 0
    }
    if(invisibleBlockGroup.isTouching(bskt)|| bskt.y>600){
      bskt.destroy()
      gameState="end"
    }
    spawnMangos()
    drawSprites()
  }
  if(gameState==="end"){
    stroke("blue")
    fill ("blue")
    textSize(50)
    text("game over", 250,270)
  }
}






function spawnMangos(){
  if(frameCount%250===0){
  var mango = createSprite(200,-50)
  mango.addImage(mangoImg)
  mango.x = Math.round(random(120,400))
  mango.velocityY = 1
  mango.lifetime = 700
  mangoGroup.add(mango)
  


  var bskt = createSprite(200,10)
  bskt.addImage("bskt",bsktImg)
  bskt.x = mango.x - 15
  bskt.velocityY = 1
  bskt.lifetime = 700
  bsktGroup.add(bskt)

  var invisibleBlock = createSprite(200,15)
  invisibleBlock.width = bskt.width
  invisibleBlock.height = 2
  invisibleBlock.x = mango.x
  invisibleBlock.velocityY = 1
  invisibleBlock.lifetime = 700
  invisibleBlock.debug=true
  invisibleBlockGroup.add(invisibleBlock)

  bird.depth = mango.depth 
    bird.depth+=1
}
}