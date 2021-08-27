const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1;
var backgroundImg,platform;
var sling;
var score=0;
var gameState="onSling";

function preload() {
    //backgroundImg = loadImage("sprites/bg.png");
    
    getBackgroundImage();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);
    //constraintLog = new Log(200,200,100,20,PI)

    bird = new Bird(100,50);

    sling = new SlingShot(bird.body,{x:200,y:50})
    console.log(bird.body)

   /* var options = {
        bodyA : bird.body,
        bodyB : constraintLog.body,
        length : 10,
        stiffness : 1.3
    }
    chain = Constraint.create(options);

    World.add(world,chain);*/

    //chain1 = new Chain (bird.body,constraintLog.body);
    //chain2 = new Chain (bird.body,pig1.body)

}

function draw(){
    
    if(backgroundImg){
        background(backgroundImg);
    }
   
    Engine.update(engine);
    //console.log(box2.body.position.x);
    //console.log(box2.body.position.y);
    //console.log(box2.body.angle);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    console.log(pig1.body.speed)
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

   // constraintLog.display();
    //chain1.display();
    //chain2.display();

    //line(bird.body.position.x,bird.body.position.y,constraintLog.body.position.x,constraintLog.body.position.y);

    bird.display();
    platform.display();
    sling.display();
    pig1.score();
    pig3.score();

    textSize(25)
    fill("white")
    text("Score:"+score,width-300,50);
}
function mouseDragged(){
    if (gameState!=="launch")
        Matter.Body.setPosition(bird.body,{x:mouseX,y:mouseY})
}
function mouseReleased(){
    gameState="launch"
    sling.fly();
    Matter.Body.applyForce(bird.body,bird.body.position,{x:10,y:-20})
}
function keyPressed(){
    if (keyCode===32){
        gameState="onSling"
        sling.attach(bird.body);
    }
}

async function getBackgroundImage(){
    var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/kolkata");
    //console.log(response);
    var responseJSON = await response.json();
    var datetime = responseJSON.datetime;
   
    var hr = datetime.slice(11,13)
    console.log(hr);
     
    if(hr >= 06 && hr<=19){
        bgPath = "sprites/bg.png";
    }
    else{
        bgPath = "sprites/bg2.jpg";
    }
    backgroundImg=loadImage(bgPath)

}
