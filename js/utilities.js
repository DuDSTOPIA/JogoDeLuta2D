// detecta as bordas dos retangulos
function retangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + 
        rectangle1.attackBox.width >= 
        rectangle2.position.x &&
        rectangle1.attackBox.position.x <= 
        rectangle2.position.x + 
        rectangle2.width &&
        rectangle1.attackBox.position.y + 
        rectangle1.attackBox.height >= 
        rectangle2.position.y &&
        rectangle1.attackBox.position.y <= 
        rectangle2.position.y + rectangle2.height
    );
};

// determina o ganhador mediante a uma condição
function determineWinner ({player, enemy, timerId}) {
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display = 'flex'
    if(player.health === enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Empate'
    } else if(player.health > enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Vitoria Player 1'
    }else if (player.health < enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Vitoria Player 2'
    };
};

// timer e o que acontece quando o tempo acaba
let timer = 60
let timerId
function decreaseTimer() {
    if(timer > 0) {
        timerId=setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    };
    
    if ( timer === 0) {
        determineWinner({player, enemy, timerId})
    };

};