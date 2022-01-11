'use strict';

const loader = document.querySelector('.loader');
const appContainer = document.querySelector('.container');

document.addEventListener('DOMContentLoaded', function hideLoader() {
  console.log('START PROGRAM');
  loader.classList.add('hidden');
  resclaeWindow();
});

window.addEventListener('resize', resclaeWindow);

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
