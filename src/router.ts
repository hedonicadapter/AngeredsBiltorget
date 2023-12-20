const templatePathGenerator = (path: string, ...extraPaths: string[]) => [
  `src/pages/${path}/${path}.html`,
  `src/pages/${path}/${path}.css`,
  `src/pages/${path}/${path}.ts`,
  `src/pages/${path}/${path}.js`,
  ...extraPaths?.map((extraPath) => `src/pages/${path}/${extraPath}`),
];

class Router {
  routes: { path: string; templates: string[] }[] = [
    {
      path: '/404',
      templates: templatePathGenerator('404'),
    },
    {
      path: '/',
      templates: templatePathGenerator(
        'home',
        'hero.html',
        'hero.css',
        '../../components/three/carModel.js'
      ),
    },
    {
      path: '/about',
      templates: templatePathGenerator('about'),
    },
    {
      path: '/contact',
      templates: templatePathGenerator('contact'),
    },
    {
      path: '/bilar',
      templates: templatePathGenerator('bilar'),
    },
  ];

  constructor() {
    window.onpopstate = () => this.loadRoute(location.pathname.slice(1));
    this.navigate('/home');
  }

  addRoute(path: string, templates: string[]) {
    this.routes.push({ path, templates });
  }

  async loadRoute(path: string) {
    const matchedRoute = this.routes.find((route) => route.path === path);

    if (!matchedRoute) return console.error(`No route found for path ${path}`);

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
          const scriptEl = document.createElement('script');
          scriptEl.src = filePath;
          document.body.appendChild(scriptEl);
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
    this.loadRoute(path.slice(1));
  }
}

export default new Router();
