class Navbar extends HTMLElement {
  constructor() {
    super();

    const nav = document.createElement('nav');
    nav.className +=
      'navbar-top flex flex-row justify-between items-center navbar';

    const leftContainer = document.createElement('div');
    leftContainer.className += 'flex flex-row items-center';

    const homeAnchor = document.createElement('a');
    const logo = document.createElement('img');
    logo.id = 'navbar-logo';
    logo.src = '/images/logo.svg';
    logo.alt = 'Logo/link to home';
    homeAnchor.appendChild(logo);

    const borgerIcon = document.createElement('div');
    borgerIcon.className = 'material-symbols-sharp';
    borgerIcon.id = 'borger-icon';
    borgerIcon.innerText = 'menu';

    const borgerAnchor = document.createElement('a');
    borgerAnchor.appendChild(borgerIcon);
    borgerAnchor.id = 'borger';
    borgerAnchor.className = 'flex flex-row items-center';

    leftContainer.appendChild(homeAnchor);
    nav.appendChild(leftContainer);
    nav.appendChild(borgerAnchor);

    this.appendChild(nav);
  }
}

customElements.define('navbar-top', Navbar);
