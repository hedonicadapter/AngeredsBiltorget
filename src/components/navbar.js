class Navbar extends HTMLElement {
  connectedCallback() {
    this.className = 'navbar-top-container';

    const nav = document.createElement('nav');
    nav.className +=
      'navbar-top flex flex-row justify-between items-center navbar';

    const leftContainer = document.createElement('div');
    leftContainer.className =
      'nav-container nav-container-left flex flex-row items-center';
    const rightContainer = document.createElement('div');
    rightContainer.className =
      'nav-container nav-container-right flex-row items-center'; // no flex bc it goes from none or flex depending on media query

    const anchorHighlighter = document.createElement('div');
    anchorHighlighter.className = 'nav-anchor-highlighter';
    document.addEventListener('nav-anchor-mouseover', (evt) => {
      const { top, left, width, paddingInline } = evt.anchorInfo;
      const ratio = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue('--golden-ratio');
      const widthInEm =
        width /
        parseFloat(getComputedStyle(anchorHighlighter.parentElement).fontSize);

      anchorHighlighter.style.setProperty(
        '--highlighter-width',
        `${ratio * widthInEm}em`
      );
      anchorHighlighter.style.setProperty('--anchor-left', `${left}px`);
      anchorHighlighter.style.setProperty('--anchor-width', `${width}px`);
    });
    rightContainer.appendChild(anchorHighlighter);

    const homeAnchor = document.createElement('a');
    homeAnchor.id = 'navbar-home';
    homeAnchor.href = '/';
    homeAnchor.className += 'flex flex-row items-center';

    const logo = document.createElement('img');
    logo.id = 'navbar-logo';
    logo.src = '/images/logo.svg';
    logo.alt = 'Logo/link to home';
    homeAnchor.appendChild(logo);

    const title = document.createElement('h5');
    title.innerText = 'Angered biltorget';
    homeAnchor.appendChild(title);

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

    const carsAnchor = Navbar.anchorCreator('Bilar', 'bilar');
    const aboutAnchor = Navbar.anchorCreator('Om oss', 'about');
    const kontaktAnchor = Navbar.anchorCreator('Kontakt', 'contact');
    rightContainer.appendChild(carsAnchor);
    rightContainer.appendChild(aboutAnchor);
    rightContainer.appendChild(kontaktAnchor);
    nav.appendChild(rightContainer);

    this.appendChild(nav);

    // can't control z-index for border-bottom
    const borderBottom = document.createElement('div');
    borderBottom.className = 'navbar-top-border';
    borderBottom.style.setProperty('--top', nav.offsetHeight + 'px');
    this.appendChild(borderBottom);

    document.addEventListener('scroll', this.expandAndContract.bind(this));
  }

  constructor() {
    super();

    this.scrollTop = 0;
  }

  expandAndContract() {
    const direction = window.scrollY > this.scrollTop ? 'down' : 'up';
    console.log(this.classList);
    if (direction == 'up') {
      this.firstChild.classList.remove('navbar-contracted');
    } else if (direction == 'down') {
      this.firstChild.classList.add('navbar-contracted');
    }

    this.scrollTop = window.scrollY;
  }

  static anchorCreator(anchorText, anchorHref) {
    const anchor = document.createElement('a');
    anchor.className = 'nav-anchor';
    anchor.href = `/${anchorHref}`;
    anchor.innerText = `${anchorText}`;

    anchor.onmouseover = (evt) => {
      const hoverEvent = new Event('nav-anchor-mouseover');

      const { paddingLeft, paddingRight } =
        anchor.currentStyle || window.getComputedStyle(anchor);

      hoverEvent.anchorInfo = {
        left: evt.target.offsetLeft,
        top: evt.target.offsetTop,
        width: evt.target.offsetWidth,
        paddingInline: parseFloat(paddingLeft) + parseFloat(paddingRight),
      };

      document.dispatchEvent(hoverEvent);
    };

    return anchor;
  }
}

customElements.define('navbar-top', Navbar);
