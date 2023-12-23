import Router from './src/router.js';

document.addEventListener('click', (event) => {
  const element = event.target as HTMLElement;

  if (element?.matches('a[href]')) {
    event.preventDefault();

    const href = element.getAttribute('href');
    if (href) Router.navigate(href);
  }
});

Router.loadRoute(location.pathname);

// TODO: motion blur the whole page when scrolling fast
// var checkScrollSpeed = (function (settings) {
//   settings = settings || {};

//   var lastPos,
//     newPos,
//     timer,
//     delta,
//     delay = settings.delay || 50; // in "ms" (higher means lower fidelity )

//   function clear() {
//     lastPos = null;
//     delta = 0;
//   }

//   clear();

//   return function () {
//     newPos = window.scrollY;
//     if (lastPos != null) {
//       // && newPos < maxScroll
//       delta = newPos - lastPos;
//     }
//     lastPos = newPos;
//     clearTimeout(timer);
//     timer = setTimeout(clear, delay);
//     return delta;
//   };
// })();

// // listen to "scroll" event
// window.onscroll = function () {
//   console.log(checkScrollSpeed());
//   if (checkScrollSpeed() > 5) {
//     document.querySelector('main')!.style.filter = 'blur(5px)';
//   }
// };
