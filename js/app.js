const answer = 'APPLE';
let attempts = 0;
let index = 0;
let timer;

function appStart(){
    const displayGameover = () => {
        const div = document.createElement('div');
        div.innerText = 'GAME OVER!!';
        div.style = 'display:flex; justify-content: center; align-items: center; position:absolute; top:40vh; left:50%; transform:translateX(-50%); width: 200px; height: 100px; background-color:white;' ;
        document.body.appendChild(div);
    }
    
    const handleBackspace = () => {
        if(index > 0){
            const preBlock = document.querySelector(`.board-block[data-index="${attempts}${index-1}"]`);
            preBlock.innerText = "";
        }
        if(index !== 0) index--;
    }

    const nextLine = () => {
        if(attempts === 6) return gameover();
        attempts += 1;
        index = 0;
    }

    const gameover = () => {
        window.removeEventListener('keydown', handleKeydown);
        displayGameover();
        clearInterval(timer);
    }

    const handleEnterKey = () => {
        let correctNums = 0;
        for(let i=0; i<5; i++){
            const block = document.querySelector(`.board-block[data-index="${attempts}${i}"]`);
            const input = block.innerText;
            const answerWord = answer[i];
            if(input === answerWord){
                correctNums++;
                block.style.background = '#6aaa64';
            }
            else if(answer.includes(input)) block.style.background = '#c9b458';
            else block.style.background = '#787c7e'; 
            
            block.style.color = 'white';
        }
        if(correctNums === 5) gameover();
        else nextLine();
    }
    const handleKeydown = (e) => {
        const key = e.key.toUpperCase();
        const keyCode = e.keyCode;
        const thisBlock = document.querySelector(`.board-block[data-index="${attempts}${index}"]`);

        if(e.key === 'Backspace') handleBackspace();
        else if(index === 5) {
            if(e.key === 'Enter') handleEnterKey();
            else return; // 함수 밖으로 나감
        }
        else if(keyCode >= 65 && keyCode <= 90){
            thisBlock.innerText = key;
            index++;
        }
    }

    const startTime = new Date();
    const startTimer = () => {
        const currentTime = new Date();
        const passedTime = new Date(currentTime - startTime);
        const min = passedTime.getMinutes().toString().padStart(2, '0');
        const sec = passedTime.getSeconds().toString().padStart(2, '0');
        const timeText = document.querySelector('#time');
        timeText.innerText = `${min}:${sec}`;
    }
    timer = setInterval(startTimer , 1000);
    window.addEventListener('keydown', handleKeydown);
}
appStart();