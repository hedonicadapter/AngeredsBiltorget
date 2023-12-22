class Dropdown extends HTMLElement {
  constructor() {
    super();
    this.className = `dropdown-container ${this.getAttribute('className')}`;

    const dropdown = document.createElement('div');
    dropdown.className += 'btn dropdown flex flex-col';

    const title = document.createElement('div');
    title.innerText = this.getAttribute('title');

    dropdown.appendChild(title);

    try {
      const options = JSON.parse(this.getAttribute('options'));

      options?.forEach((option) => {
        const inputContainer = document.createElement('div');
        inputContainer.className = 'drop-down-input-label-container';

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = option;
        input.value = option;

        const label = document.createElement('label');
        label.innerText = option;
        label.for = option;

        inputContainer.append(input, label);
        dropdown.appendChild(inputContainer);
      });
    } catch (err) {
      console.error(`Failed to parse options for dropdown: ${err}`);
    }

    this.appendChild(dropdown);
    this.style.minWidth = `${dropdown.offsetWidth}px`;
  }
}

class Tag extends HTMLElement {
  constructor() {
    super();
    this.className = `tag-container ${this.getAttribute('className')}`;

    const tag = document.createElement('div');
    tag.className += 'btn tag flex flex-row items-center justify-between';

    const text = document.createElement('div');
    text.className = 'tag-text';
    text.innerText = this.getAttribute('text');

    const cross = document.createElement('div');
    cross.className = 'material-symbols-sharp tag-cross';
    cross.innerText = 'close_small';

    tag.append(text, cross);

    this.appendChild(tag);
    tag.style.setProperty(
      '--full-width',
      `${text.offsetWidth + cross.offsetWidth}px`
    );
    tag.style.setProperty(
      '--max-width',
      `${text.offsetWidth - cross.offsetWidth}px`
    );

    this.onclick = () => {
      this.remove();
    };
  }
}

customElements.define('custom-dropdown', Dropdown);
customElements.define('custom-tag', Tag);
