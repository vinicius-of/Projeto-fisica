//@ts-nocheck
// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Vector = Matter.Vector,
    Runner = Matter.Runner,
    runningState = false,
    onTime = null;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        //Changing the width of canvas
        width: 1820
    }
});

// creating a ball and a ground
const ground = Bodies.rectangle(400, 610, 3000, 60, { isStatic: true, friction: 0});
const ball = Bodies.circle(10 , 500, 25);

// Setting the friction
ball.friction = 0;
ball.frictionAir = 0;

//Functions
function launch() {
    let m = Number.parseFloat(document.getElementById("force").value);;
    let angle = Number.parseFloat(document.getElementById("angle").value);
    let mass = Number.parseFloat(document.getElementById("mass").value);
    World.add(engine.world, [ball ,ground]);
    Runner.run(engine);
    Render.run(render);
    Body.setMass(ball, mass);
    Body.setAngle(ball, angle);
    Body.applyForce(ball, Vector.create(1,1), Vector.create(0.01*m,0.01*m));
    runningState = true;
    onTime = setInterval(() => {
        //Velocidade resultante
        document.getElementById("details").innerText = `Potision: x: ${ball.position.x.toFixed(0)}, y: ${ball.position.y.toFixed(0)}`
        document.getElementById("timing").innerText = `Time: ${(engine.timing.timestamp/1000).toFixed(0)}`;
    }, 100)
}

function reset(){
    location.reload();
}

function pause() {
    if (runningState) {
        //Pausing the simulation
        clearInterval(onTime);
        runningState = false;
        ball.isStatic = true;
        Runner.stop(Engine.run(engine));
        return Render.stop(render);
    }
    // Resetting the simulation
    setInterval(() => {
        //Velocidade resultante
        document.getElementById("details").innerText = `Potision: x: ${ball.position.x.toFixed(0)}, y: ${ball.position.y.toFixed(0)}`
        document.getElementById("timing").innerText = `Time: ${(engine.timing.timestamp/1000).toFixed(0)}`;
    }, 100);
    ball.isStatic = false;
    runningState = true;
    return Render.run(render);
}

//Events Listerners
document.getElementById("launch").addEventListener("click", launch, false);
document.getElementById("pause").addEventListener("click", pause, false);
document.getElementById("reset").addEventListener("click", reset, false);