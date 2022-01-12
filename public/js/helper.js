export function getCircle(parent) {
  return parent.querySelector('.match-circle');
}

export function addClass(element, className) {
  element.classList.add(className);
}

export function removeClass(element, className) {
  element.classList.remove(className);
}
