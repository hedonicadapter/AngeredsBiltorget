import Router from './src/router.js';

document.addEventListener('click', (event) => {
  const element = event.target as HTMLElement;

  if (element?.matches('a[href]')) {
    event.preventDefault();

    const href = element.getAttribute('href');
    if (href) Router.navigate(href);
  }
});

Router.navigate('/');
