document.querySelectorAll('.custom-dropdown-checkbox').forEach((el) => {
  const checkbox = el as HTMLInputElement;
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      const newTag = document.createElement('custom-tag');
      newTag.setAttribute('text', checkbox.value);
      document.querySelector('.tags-container')?.prepend(newTag);
    } else {
      const tag = document.querySelector(
        `custom-tag[text="${checkbox.value}"]`
      );
      tag?.remove();
    }
  });
});
