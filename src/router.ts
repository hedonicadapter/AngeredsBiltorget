const commonPath = 'src/pages/';

const resolvePath = (relativePath: string) => {
  const url = new URL(relativePath, import.meta.url);
  return url.href;
};

class Router {
  routes: { path: string; templates: string[] }[] = [
    {
      path: '/404',
      templates: [`${commonPath}404/404.html`],
    },
    {
      path: '/',
      templates: [
        `${commonPath}home/home.html`,
        `${commonPath}home/hero.css`,
        `${commonPath}home/hero.html`,
        `${commonPath}home/inne-just-nu.html`,
        `${commonPath}home/inne-just-nu.css`,
        `${commonPath}home/inne-just-nu.ts`,
        resolvePath('components/three/carModel.js'),
      ],
    },
    {
      path: '/about',
      templates: [`${commonPath}about/about.html`],
    },
    {
      path: '/contact',
      templates: [`${commonPath}contact/contact.html`],
    },
    {
      path: '/bilar',
      templates: [
        `${commonPath}bilar/bilar.html`,
        `${commonPath}bilar/bilar.css`,
      ],
    },
  ];

  constructor() {
    window.onpopstate = () => this.loadRoute(location.pathname);
  }

  addRoute(path: string, templates: string[]) {
    this.routes.push({ path, templates });
  }

  async loadRoute(path: string) {
    const matchedRoute = this.routes.find((route) => route.path === path);
    if (!matchedRoute) {
      await this.loadRoute('/404');
      return console.error(`No route found for path: ${path}`);
    }

    const outletContainerElement = document.querySelector('#app');
    if (!outletContainerElement)
      return console.error('No router outlet found.');

    outletContainerElement.innerHTML = '';
    for (const filePath of matchedRoute.templates) {
      try {
        const response = await fetch(filePath);

        if (!response.ok)
          throw new Error(`Failed to fetch template file: ${filePath}`);

        if (filePath.endsWith('.js') || filePath.endsWith('.ts')) {
          const script = document.createElement('script');
          script.type = 'module';
          script.src = filePath;
          outletContainerElement.appendChild(script);
        } else if (filePath.endsWith('.css')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = filePath;
          document.head.appendChild(link);
        } else {
          const template = await response.text();
          outletContainerElement.innerHTML += template;
        }
      } catch (error) {
        console.error(`Failed to load template file ${filePath}: ${error}`);
      }
    }
  }

  navigate(path: string) {
    history.pushState({}, '', path);
    this.loadRoute(path);
  }
}

export default new Router();
