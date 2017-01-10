require('./scss/style.scss');

// Click the icon, open the nav
const icon = document.querySelector('.navbar-toggler');
const bodyWrap = document.querySelector('.body-wrap');
function runThing() {
  bodyWrap.classList.toggle('nav-out');
}
icon.addEventListener('click', runThing, false);

// If the nav is open at too high a viewport, collapse it.
// This is super edgecase of people fiddling with width but it's a possibility
const windowWidth = document.querySelector('body');
function widthThing() {
  if (windowWidth.offsetWidth > 991) {
    if (bodyWrap.classList) {
      bodyWrap.classList.remove('nav-out');
    }
  }
}
window.addEventListener('resize', widthThing, false);
console.log('Start app, Yay!');
