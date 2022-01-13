"use strict";

const loader = document.querySelector(".loader");
const questionsSelectors = document.querySelectorAll("[data-question]");
const answersSelectors = document.querySelectorAll("[data-answer]");

const correctSound = document.querySelector(".correct-sound");
const incorrectSound = document.querySelector(".incorrect-sound");

const appContainer = document.querySelector(".container");
const backdropContainer = document.querySelector(".backdrop");
const resourceContainer = document.querySelector(".resource");
const helpContainer = document.querySelector(".help");
const gameContainer = document.querySelector(".game");
const linesContainer = document.querySelector(".game__results svg");

const replayBtn = document.querySelector(".replay");
const showAnsBtn = document.querySelector(".show-ans");
const resourceBtn = document.querySelector(".resource-btn");
const helpBtn = document.querySelector(".help-btn");
const closeBtns = document.querySelectorAll(".close-btn");

const state = {
  currentQuestion: "",
  currentQuestionSelector: null,
};

// Event listeners
document.addEventListener("DOMContentLoaded", function hideLoader() {
  addClass(loader, "hidden");
  rescaleWindow();
});

window.addEventListener("resize", rescaleWindow);

questionsSelectors.forEach((circle) => {
  circle.addEventListener("click", selectQuestion);
});

answersSelectors.forEach((circle) => {
  circle.addEventListener("click", selectAnswer);
});

showAnsBtn.addEventListener("click", showAnswer);

replayBtn.addEventListener("click", resetGame);

resourceBtn.addEventListener("click", openResourcModal);

helpBtn.addEventListener("click", openHelpModal);

closeBtns.forEach((btn) => btn.addEventListener("click", closeHelpModel));

// Event Handlers
function selectQuestion(e) {
  const currentQuestionSelector = e.target.closest("[data-question]");

  if (currentQuestionSelector.classList.contains("disabled")) return;

  questionsSelectors.forEach((selector) =>
    removeClass(getCircle(selector), "active")
  );

  addClass(getCircle(currentQuestionSelector), "active");

  state.currentQuestion = currentQuestionSelector.dataset.question;
  state.currentQuestionSelector = currentQuestionSelector;
}

function selectAnswer(e) {
  const currentAnswerSelector = e.target.closest("[data-answer]");

  if (!state.currentQuestion) return;
  if (currentAnswerSelector.classList.contains("disabled")) return;

  // Show wrong answer img and play incorrect sound
  if (state.currentQuestion !== currentAnswerSelector.dataset.answer) {
    const crossImg = currentAnswerSelector.querySelector(".wrong-answer");
    removeClass(crossImg, "hidden");

    setTimeout(() => {
      addClass(crossImg, "hidden");
    }, 500);

    return incorrectSound.play();
  }

  // Render line between matched question and answer
  renderConnectionLines(
    getCircle(state.currentQuestionSelector),
    getCircle(currentAnswerSelector)
  );

  // Disable those question and answer
  disableQuestionAndAnswer(
    state.currentQuestionSelector,
    currentAnswerSelector
  );

  // Unselect the current question circle
  removeClass(getCircle(state.currentQuestionSelector), "active");

  // Rest state
  state.currentQuestion = "";
  state.currentQuestionSelector = null;
  correctSound.play();
}

function disableQuestionAndAnswer(questionSelector, answerSelector) {
  addClass(questionSelector.querySelector("img"), "disabled");
  addClass(getCircle(questionSelector), "selected");

  addClass(answerSelector.querySelector("h2"), "disabled");
  addClass(getCircle(answerSelector), "selected");
}

function renderConnectionLines(questionCircle, answerCircle) {
  const x1 = questionCircle.offsetLeft;
  const x2 = answerCircle.offsetLeft;

  // X1 from left the quesion, y1 from the top of svg
  // X2 from left the answer, y2 from the bottom of svg
  const html = `<line  x1="${x1}" y1="0" x2="${x2}" y2="${linesContainer.clientHeight}"  />`;

  linesContainer.insertAdjacentHTML("beforeend", html);
}

function rescaleWindow(e) {
  // The equations ==> 2 * Left + appWidth * ratio = windowWidth
  //               ==> appHeight * ratio = windowHeigth

  // 1) if aspect of window greater than our app
  const baseRatio = appContainer.clientWidth / appContainer.clientHeight;
  const windowRatio = window.innerWidth / window.innerHeight;

  if (windowRatio > baseRatio) {
    const ratio = window.innerHeight / appContainer.clientHeight;

    appContainer.style.left = `${
      (window.innerWidth - appContainer.clientWidth * ratio) / 2
    }px`;

    appContainer.style.transform = `scale(${ratio})`;
    return;
  }

  // 2) else
  // Reset the margin
  appContainer.style.left = `0px`;
  appContainer.style.transform = `scale(${
    window.innerWidth / appContainer.clientWidth
  })`;
}

function showAnswer() {
  questionsSelectors.forEach((questionSelector) => {
    answersSelectors.forEach((answerSelector) => {
      if (questionSelector.dataset.question === answerSelector.dataset.answer) {
        renderConnectionLines(
          getCircle(questionSelector),
          getCircle(answerSelector)
        );
      }

      disableQuestionAndAnswer(questionSelector, answerSelector);
    });
  });

  addClass(showAnsBtn, "disabled");
  showAnsBtn.removeEventListener("click", showAnswer);
}

function resetGame() {
  // Reset the state
  state.currentQuestion = "";
  state.currentQuestionSelector = null;

  // Reset the answers selectors
  answersSelectors.forEach((answerSelector) => {
    removeClass(answerSelector.querySelector("h2"), "disabled");
    removeClass(getCircle(answerSelector), "selected");
  });

  // Reset  the Qustions selectors
  questionsSelectors.forEach((questionSelector) => {
    removeClass(questionSelector.querySelector("img"), "disabled");
    removeClass(getCircle(questionSelector), "selected");
  });

  // Clear the lines between questions and answers
  linesContainer.innerHTML = "";

  // Reset show answer button
  removeClass(showAnsBtn, "disabled");
  showAnsBtn.removeEventListener("click", showAnswer);
  showAnsBtn.addEventListener("click", showAnswer);
}

function openResourcModal() {
  showBackdrop();
  removeClass(resourceContainer, "hidden");
}

function openHelpModal() {
  showBackdrop();
  removeClass(helpContainer, "hidden");
}

function showBackdrop() {
  removeClass(backdropContainer, "hidden");
  addClass(gameContainer, "hidden");
}

function closeHelpModel() {
  addClass(helpContainer, "hidden");
  addClass(resourceContainer, "hidden");
  addClass(backdropContainer, "hidden");
  removeClass(gameContainer, "hidden");
}

// Helper
function getCircle(parent) {
  return parent.querySelector(".match-circle");
}

function addClass(element, className) {
  element.classList.add(className);
}

function removeClass(element, className) {
  element.classList.remove(className);
}
