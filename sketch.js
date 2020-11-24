var PLAY=1;
var END=0;
var gameState=PLAY;

var sword;

var fruitGroup,fruit1,fruit2,fruit3,fruit4;

var enemyGroup;

var Score=0;

var gameover;

function preload(){
  sword_Image=loadImage("sword.png");
  
    fruit1=loadImage("fruit1.png");
    fruit2=loadImage("fruit2.png");
    fruit3=loadImage("fruit3.png");
    fruit4=loadImage("fruit4.png");
 
   monster_Image=loadImage("alien1.png");
  
   gameoverImage=loadImage("gameover.png");
  
   knifeswooshsound=loadSound("knifeSwooshSound.mp3")
}

function setup(){
  createCanvas(400,400)
  
Score = 0;
  
  sword=createSprite(40,200,20,20)
  sword.addImage(sword_Image)
  sword.scale=0.7
  
  gameover=createSprite(200,200)
  gameover.addImage(gameoverImage)
  
  fruitGroup=new Group();
  enemyGroup=new Group();
  
  gameover.visible=false;
  
}

function draw(){
  background("lightblue")
  
    text("Score: "+ Score, 324,50);
  
fruits();
enemy();
  
  if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    
    knifeSwooshSound.play();
    Score=Score+2;
  }
  
  sword.y=World.mouseY;
  sword.x=World.mouseX;
  
  if(enemyGroup.isTouching(sword)){
    gameState=END;
  }
  
  if(gameState===END){
    sword.addImage(gameoverImage)
    sword.X=200;
    sword.Y=200;
    
    gameover.visible=true;
  }
drawSprites();
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20)
    fruit.scale=0.2
    
    r=Math.round(random(1,4));
    if (r==1){
      fruit.addImage(fruit1)
    }else if(r==2){
      fruit.addImage(fruit2)
    }else if(r==3){
      fruit.addImage(fruit3)
    }else if(r==4){
      fruit.addImage(fruit4)
    }
    
    fruit.y=Math.round(random(50,340))
                              
    fruit.velocityX=-7;
    fruit.setLifetime=100;
    
    fruit.velocityX= (7+(Score/4))
    
    fruitGroup.add(fruit);
  }
}

function enemy(){
  if(World.framecount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving",monster_Image);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(Score/10));
    monster.lifetime=50;
    
    enemyGroup.add(monster);
  }
}
