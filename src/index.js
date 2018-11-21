//@ts-nocheck
// Módulos da biblioteca
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Vector = Matter.Vector,
    Runner = Matter.Runner,

    //Variáveis para nos auxiliar na programação
    runningState = false,  // Deteca se o ambiente está pausado ou continuando
    tempo = null,          // Uma função que contará o tempo
    posicaoAtual = null,   // Uma função para controlar a posição da bola
    timeSegundos = 0,      // Variável que contará os segundos
    iniciarState = false   // Variável para detectar se o ambiente iniciou    


// Criando o motor do ambiente
var engine = Engine.create();

// Criando o renderizador
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        //Mudando a largura da janela do ambiente
        width: 1820,
        height: 700,
        wireframes: false
    }
});

// Criando o Runner para o controle dinâmico do motor
var runner = Runner.create({isFixed: true})

// Criando o chão, as paredes direita, esquerda e a bola
var ground = Bodies.rectangle(910, 710, 2000, 60, { isStatic: true, friction: 0, render: {
    fillStyle: 'blue' //Mudando a cor do chão
}});

var wallLeft = Bodies.rectangle(0, 710, 60, 1500, { isStatic: true, friction: 0, render: {
    fillStyle: 'blue' //Mudando a cor do chão
}});

var wallRight = Bodies.rectangle(1820, 710, 60, 1500, { isStatic: true, friction: 0, render: {
    fillStyle: 'blue' //Mudando a cor do chão
}});

var roof = Bodies.rectangle(910, 10, 2000, 60, { isStatic: true, friction: 0, render: {
    fillStyle: 'blue' //Mudando a cor do chão
}});

var ball = Bodies.circle(910 , 655, 10, {frictionStatic: false, render: {
    fillStyle: 'red' //Mudando a cor da bola
}});

var center = Bodies.circle(ball.position.x, ball.position.y, 5, {render: {fillStyle: 'white'}, isStatic: true, isSensor: true})

// Abrindo a janela para visualização do ambiente
World.add(engine.world, [ball ,ground, wallLeft, wallRight, center, roof]);
Runner.run(runner, engine);
Render.run(render);

// Funções utilizadas nos botões

//Botão lançar (launch)
function launch() {
    var xForce = Number.parseFloat(document.getElementById("forcex").value);
    var yForce = Number.parseFloat(document.getElementById("forcey").value);
    var mass = Number.parseFloat(document.getElementById("mass").value);
    Body.setMass(ball, mass);
    Body.setAngle(ball, 45);

    if (!runningState) {    
        runningState = true;
        tempo = setInterval(function(){
            timeSegundos++;
            document.getElementById("timing").innerText = "Time: " + timeSegundos;
        }, 1000);

        posicaoAtual = setInterval(function(){
            document.getElementById("details").innerText = "Posição: x: " + (ball.position.x - 910).toFixed(0) + "  y: " + ((ball.position.y - 655)*-1).toFixed(0);
            document.getElementById("timing").innerText = "Time: " + timeSegundos;
        }, 100);
    }

Body.applyForce(ball, {x: ball.position.x, y: ball.position.y},{x: xForce/150, y: (yForce/150)*-1})
}

//Botão reiniciar (reset)
function reset(){
    location.reload();
}

//Botão Pausar (pause)
function pause() {
    if (runningState) {
        
        //Código para parar no instante a simulação
        clearInterval(tempo);
        clearInterval(posicaoAtual);

        runningState = false;
        ball.isStatic = true;

        Engine.clear(engine);
        Runner.stop(Engine.run(engine));
        return Render.stop(render);
    }

    // Reiniciando a simulação
    tempo = setInterval(function(){
        timeSegundos++;
        document.getElementById("timing").innerText = "Time: " + timeSegundos;
    }, 1000)

    posicaoAtual = setInterval(function(){
        document.getElementById("details").innerText = "Posição: x: " + (ball.position.x - 500).toFixed(0) + "  y: " + ((ball.position.y - 655)*-1).toFixed(0);
    }, 100);


    ball.isStatic = false;
    runningState = true;
    return Render.run(render);
}

//Adicionando eventos aos botões
document.getElementById("launch").addEventListener("click", launch, false);
document.getElementById("pause").addEventListener("click", pause, false);
document.getElementById("reset").addEventListener("click", reset, false);