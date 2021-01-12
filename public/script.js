const question = document.querySelector('#question');
const answer1 = document.querySelector('#answer1');
const answer2 = document.querySelector('#answer2');
const answer3 = document.querySelector('#answer3');
const answer4 = document.querySelector('#answer4');
const gameBoard = document.querySelector("#game-board");
const h2 = document.querySelector('h2');



function fillQuestionElements(data) {
    if (data.winner === true) {
        gameBoard.style.display = 'none';
        h2.innerText = 'WYGRAŁEŚ/AŚ!!!';
        return;
    }
    if (data.loser === true) {
        gameBoard.style.display = 'none';
        h2.innerText = 'PRZEGRAŁEŚ/AŚ!!!';
        return;
    }

    question.innerText = data.question;
    data.answers.forEach((answer, index) => {
        answer = document.querySelector(`#answer${index+1}`);
        answer.innerText = data.answers[index];
    })
}

function showNextQuestion() {
  fetch("/question", {
    method: "GET",
  })
    .then((r) => r.json())
    .then((data) => {
      fillQuestionElements(data);
    });
}

showNextQuestion();

const goodAnswersSpan = document.querySelector('#good-answers');

function handleAnswerFeedback(data) {
    goodAnswersSpan.innerText = data.goodAnswers;
    showNextQuestion();
}

function sendAnswer(answerIndex) {
    fetch(`/answer/${answerIndex}`, {
        method: 'POST',
    }).then(r => r.json())
    .then(data => {
        handleAnswerFeedback(data);
    });
}

const buttons = document.querySelectorAll('button');

for(const button of buttons) {
    button.addEventListener('click', (event) => {
        const answerIndex = event.target.dataset.answer;
        sendAnswer(answerIndex);
    })
}
