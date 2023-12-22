class Dropdown extends HTMLElement {
  connectedCallback() {
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
        input.className = 'custom-dropdown-checkbox';
        input.type = 'checkbox';
        input.id = option;
        input.value = option;

        const label = document.createElement('label');
        label.className =
          'label-and-input flex flex-row items-center justify-between';
        label.innerText = option;
        label.for = option;

        label.appendChild(input);
        inputContainer.appendChild(label);
        dropdown.appendChild(inputContainer);
      });
    } catch (err) {
      console.error(`Failed to parse options for dropdown: ${err}`);
    }

    this.appendChild(dropdown);
    this.style.minWidth = `${dropdown.offsetWidth}px`;
  }

  constructor() {
    super();
  }
}

class Tag extends HTMLElement {
  connectedCallback() {
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

    this.onclick = this.removeTag;
  }

  constructor() {
    super();
  }

  removeTag = () => {
    const correspondingCheckbox = document.querySelector(
      `.custom-dropdown-checkbox[value="${this.getAttribute('text')}"]`
    );
    if (correspondingCheckbox) {
      correspondingCheckbox.checked = false;
    }

    this.remove();
  };
}

customElements.define('custom-dropdown', Dropdown);
customElements.define('custom-tag', Tag);
