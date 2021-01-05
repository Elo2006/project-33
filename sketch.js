const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var particles;
var plinkos = [];
var divisions =[];
var particle;

var divisionHeight=300;
var score =0;
var count = 0;
var gameState ="START";

var boundary

function preload(){

}
function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

  for (var k = 0; k <=width; k = k + 80){
    divisions.push(new Divisions(k, height-divisionHeight/2,10, divisionHeight))
  }
 
  for (var j = 40; j <=width; j=j+50){
    plinkos.push(new Plinko(j,75))}
 
    for (var j = 15; j <=width-10 ; j=j+50){
     plinkos.push(new Plinko(j,175))
   }
 
   for (var j = 40; j <=width; j=j+50){
     plinkos.push(new Plinko(j,275))
   }
 
   for (var j = 50; j <=width-10; j=j+50){
     plinkos.push(new Plinko(j,375))
   }
   
 
    boundary = createSprite(400, 430, 900, 10)
    boundary.shapeColor = "#E7FF62"
}
 
function draw() {
  background("#FF6868");
  textSize(20);
  text("Score: "+score,20,40);
  fill("white");

  textSize(15);
  text("You have 5 chances to increase your score.",250,20);
  fill("white");
  
  textSize(23)
  text(" 500 ", 10, 550);
  text(" 500 ", 90, 550);
  text(" 500 ", 170, 550);
  text(" 500 ", 250, 550);
  text(" 100 ", 330, 550);
  text(" 100 ", 410, 550);
  text(" 100 ", 490, 550);
  text(" 200 ", 570, 550);
  text(" 200 ", 650, 550);
  text(" 200 ", 730, 550);
  Engine.update(engine);
  ground.display();
  
  if ( gameState =="END") {
    
    gameOver_Sound.play();
    textSize(90);
    text("GameOver", 150, 300);
  }
boundary.display();
  

  

  for (var i = 0; i < plinkos.length; i++) {
     plinkos[i].display();  
  }
 
    if(particle!=null)
    {
       particle.display();
        
        if (particle.body.position.y>760)
        {
              if (particle.body.position.x < 300) 
              {
                  score=score+500;      
                  particle=null;
                  scoringSound.play();

                  if ( count>= 5) gameState ="END";                          
              }


              else if (particle.body.position.x < 600 && particle.body.position.x > 301 ) 
              {
                    score = score + 100;
                    particle=null;
                    scoringSound.play();

                    if ( count>= 5) gameState ="END";

              }
              else if (particle.body.position.x < 900 && particle.body.position.x > 601 )
              {
                    score = score + 200;
                    particle=null;
                    scoringSound.play();

                    if ( count>= 5)  gameState ="END";

              }      
              
        }
  
      }

   for (var k = 0; k < divisions.length; k++) 
   {
     divisions[k].display();
   }
 
}


function mousePressed()
{
  if(gameState!=="END")
  {
      count++;
     particle=new Particle(mouseX, 10, 10, 10); 
  }   
}