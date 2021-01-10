const dino = document.querySelector('.dino');
const plano_fundo = document.querySelector('.plano_fundo');
let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp (event) {
    if(event.keyCode === 32){
        if (!isJumping) {
            jump();
            console.log("Tecla espaço");
        }
       
    }
}

function jump() {
   
    isJumping = true;

    let upInterval = setInterval(() => {
    if (position >= 150){
        clearInterval(upInterval);
        //desce

        let downInterval = setInterval(() => {
            if (position <=0){
                clearInterval(downInterval);
                isJumping = false;

            } 
            else {
            position = position - 20;
            dino.style.bottom = position + 'px' ;
        }
            }, 20);
                          

    } 
    else{
           //sobe
        position = position + 20;
        dino.style.bottom = position + 'px' ;
        }
            }, 20);
}

function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1000;

    cactus.classList.add('cactus');
    //cactus.style.left = 1000 + 'px';
    let randomTime = Math.random() * 6000;

    if (isGameOver) return;

    cactus.classList.add('cactus');
    plano_fundo.appendChild(cactus);
    cactus.style.left = cactusPosition + 'px';

    let leftInterval = setInterval(() => {
        if (cactusPosition < -60) {
            // Saiu da tela.
            clearInterval(leftInterval);
            plano_fundo.removeChild(cactus);
          } 
          else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            // Fim do Jogo
            clearInterval(leftInterval);
            isGameOver = true;
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
          } 
          else {

        cactusPosition = cactusPosition - 10;
        cactus.style.left = cactusPosition + 'px';
        console.log("O jogo não acabou");
          }
    }, 20);

    setTimeout(createCactus, randomTime);
}

createCactus();

document.addEventListener('keyup', handleKeyUp); 


