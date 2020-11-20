var gamestate = "serve"
var background1, carimage, car, background2, score, sanitizerimage, sanitizer, maskmage, mask, virusimage, virus, virusgroup, maskgroup, sanitizergroup, restartimage, restart, play1, playimage, text1

var score = 20

function preload() {
  background1 = loadImage("roads.jpg")
  carimage = loadImage("car1.png")
  sanitizerimage = loadImage("sanitizers.png")
  maskimage = loadImage("mask.png")
  virusimage = loadImage("virus.png")
  restartimage = loadImage("restart1.png")
  playimage = loadImage("play.png")
}

function setup() {
  createCanvas(600, 400);

  background("black")

  background2 = createSprite(290, 0, 600, 400)
  background2.addImage(background1)
  background2.scale = 3.4

  car = createSprite(300, 350, 50, 50)
  car.addImage(carimage)
  car.scale = 0.6;

  play1 = createSprite(300, 200, 200, 200)
  play1.addImage(playimage)
  
  
  restart = createSprite(300, 200, 200, 200)
  restart.scale = 0.2
  restart.addImage(restartimage)

  virusgroup = new Group();
  maskgroup = new Group();
  sanitizergroup = new Group();
  edges = createEdgeSprites()
}


function draw() {

restart.visible=false;
  if (gamestate === "serve") {
    background("black")
    background2.visible = false;
    car.visible = false
    fill("yellow")
    text("in this game you have to avoid the virus and collect the mask and the sanitizer Press the play button to start", 10, 300);
   

    if (mousePressedOver(play1)) {
      play1.visible = false
      console.log("gamestate" + gamestate)
 gamestate = "play"
    }
  }

  if (gamestate === "play") {

    serve();
  }

  if (score === 0 || score === -5 || score === -15) {
    gamestate = "reset"
    restart.visible = true
    reset();
  }
  if (mousePressedOver(restart) && gamestate==="reset") {
    restart.visible = false
    score=20
    console.log(serve)
    gamestate="serve"
    
    serve();
  }

  drawSprites();
  fill("yellow")
  text("Score: " + score, 520, 25);

}


function masks() {
  var mask = createSprite(Math.round(random(10, 400)), Math.round(random(0, 10)), 10, 10);
  mask.addImage(maskimage)
  mask.velocityY = 3;
  maskgroup.add(mask)
  mask.scale = 0.1;
  mask.lifetime = 600
}

function viruses() {
  var virus = createSprite(Math.round(random(10, 400)), Math.round(random(0, 10)), 10, 10);
  virus.addImage(virusimage)
  virus.velocityY = 3;
  virusgroup.add(virus)
  virus.scale = 0.1;
  virus.lifetime = 600

}

function sanitizers() {
  var sanitizer = createSprite(Math.round(random(10, 400)), Math.round(random(0, 10)), 10, 10);
  sanitizer.addImage(sanitizerimage)
  sanitizer.velocityY = 3;
  sanitizergroup.add(sanitizer)
  sanitizer.scale = 0.1;
  sanitizer.lifetime = 600
}


function serve() {

  car.bounceOff(edges)

  car.setCollider("rectangle", 0, 0, 100, 200);

  background2.velocityY = 5

  if (background2.y > 200) {
    background2.y = 150
  }


  if (keyDown("left_Arrow")) {
    car.x = car.x - 2
  }

  if (keyDown("right_Arrow")) {
    car.x = car.x + 2
  }


  var select_balloon = Math.round(random(1, 3));
  if (World.frameCount % 100 == 0) {
    if (select_balloon == 1) {
      masks();

    } else if (select_balloon == 2) {
      viruses();
    } else if (select_balloon == 3) {
      sanitizers();
    }
  }


  if (virusgroup.collide(car)) {
    virusgroup.destroyEach();
    score = score - 10
  }

  if (sanitizergroup.collide(car)) {
    sanitizergroup.destroyEach();
    score = score + 5
  }

  if (maskgroup.collide(car)) {
    maskgroup.destroyEach();
    score = score + 5
  }
  background2.visible = true;
  car.visible = true;

}

function reset() {

  
  maskgroup.setVelocityYEach(0)
  virusgroup.setVelocityYEach(0)
  sanitizergroup.setVelocityYEach(0)
  maskgroup.setLifetimeEach(0)
  virusgroup.setLifetimeEach(0)
  sanitizergroup.setLifetimeEach(0)
  background2.velocityY = 0
  car.velocityX = 0
}