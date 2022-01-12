'use strict';

const loader = document.querySelector('.loader');
const appContainer = document.querySelector('.container');
const questionsMatchCircles = document.querySelectorAll('[data-question]');
const answersMatchCircles = document.querySelectorAll('[data-answer]');
const correctSound = document.querySelector('.correct-sound');
const incorrectSound = document.querySelector('.incorrect-sound');

const state = {
  currentQuestion: '',
  currentQuestionCircle: null,
};

document.addEventListener('DOMContentLoaded', function hideLoader() {
  console.log('START PROGRAM');
  loader.classList.add('hidden');
  resclaeWindow();
});

window.addEventListener('resize', resclaeWindow);

questionsMatchCircles.forEach(circle => {
  circle.addEventListener('click', selectQuestion);
});

answersMatchCircles.forEach(circle => {
  circle.addEventListener('click', selectAnswer);
});

function selectQuestion(e) {
  const currentQuestionCircle = e.target;

  if (currentQuestionCircle.classList.contains('disabled')) return;

  questionsMatchCircles.forEach(circle => circle.classList.remove('active'));
  currentQuestionCircle.classList.add('active');

  state.currentQuestion = currentQuestionCircle.dataset.question;
  state.currentQuestionCircle = currentQuestionCircle;
  console.log(state);
}

function selectAnswer(e) {
  const currentAnswerCircle = e.target;

  if (!state.currentQuestion) return;
  if (currentAnswerCircle.classList.contains('disabled')) return;

  if (state.currentQuestion == currentAnswerCircle.dataset.answer) {
    state.currentQuestionCircle.classList.add('disabled');
    state.currentQuestionCircle.classList.remove('active');
    state.currentQuestion = '';
    state.currentQuestionCircle = null;
    currentAnswerCircle.classList.add('disabled');
    console.log('CORRECT');
    correctSound.play();
    return;
  }

  incorrectSound.play();
  console.log(currentAnswerCircle.dataset);
}

function resclaeWindow() {
  const diffAppFromWindow = window.innerWidth - appContainer.clientWidth;
  if (diffAppFromWindow > 0) {
    appContainer.style.right = `${diffAppFromWindow / 2}px`;
    appContainer.style.left = `${diffAppFromWindow / 2}px`;
    appContainer.style.transform = 'scale(1)';
    return;
  }

  appContainer.style.left = `0px`;
  appContainer.style.transform = `scale(${
    window.innerWidth / appContainer.clientWidth
  })`;
}
