class Navbar extends HTMLElement {
  constructor() {
    super();
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
      const { top, left, width, padding } = evt.anchorInfo;
      const paddingWithoutUnit = parseInt(padding, 10);
      console.log({ paddingWithoutUnit, left, width, padding });
      anchorHighlighter.style.left = left - (width + paddingWithoutUnit / 2);
      // anchorHighlighter.style.top = top + 'px';
      anchorHighlighter.style.width = width + 'px';
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

    // Title if wanted
    const title = document.createElement('h4');
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
    const aboutAnchor = Navbar.anchorCreator('Om oss', 'omoss');
    const kontaktAnchor = Navbar.anchorCreator('Kontakt', 'kontakt');
    rightContainer.appendChild(carsAnchor);
    rightContainer.appendChild(aboutAnchor);
    rightContainer.appendChild(kontaktAnchor);
    nav.appendChild(rightContainer);

    this.appendChild(nav);

    // can't control z-index for border-bottom
    const borderBottom = document.createElement('div');
    borderBottom.className = 'navbar-top-border';
    borderBottom.style.top = nav.offsetHeight + 'px';
    this.appendChild(borderBottom);
  }

  static anchorCreator(anchorText, anchorHref) {
    const anchor = document.createElement('a');
    anchor.className = 'nav-anchor';
    anchor.href = `/${anchorHref}`;
    anchor.innerText = `${anchorText}`;

    anchor.onmouseover = (evt) => {
      const hoverEvent = new Event('nav-anchor-mouseover');
      const { padding } = window.getComputedStyle(anchor);

      hoverEvent.anchorInfo = {
        left: evt.target.offsetLeft,
        top: evt.target.offsetTop,
        width: evt.target.offsetWidth,
        padding: evt.target.style.get; fixa
      };

      document.dispatchEvent(hoverEvent);
    };

    return anchor;
  }
}

customElements.define('navbar-top', Navbar);
