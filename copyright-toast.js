/**
 * Shows the copyright notice toast on every page load, and again whenever a
 * "Copyright notice" control is used. It closes with its buttons or Escape.
 */
(() => {
  const toast = document.getElementById('copyright-toast');
  if (!toast) return;

  /** @type {HTMLElement | null} */
  let returnFocusTo = null;

  /**
   * Opens the toast. When a control opened it, focus moves into the toast and
   * returns to that control on close; on page load focus stays where it is.
   * @param {HTMLElement | null} opener element to refocus when the toast closes
   */
  function openToast(opener) {
    returnFocusTo = opener;
    toast.hidden = false;
    if (opener) toast.querySelector('.toast-body')?.focus();
  }

  /** Closes the toast and returns focus to whatever opened it. */
  function closeToast() {
    toast.hidden = true;
    returnFocusTo?.focus();
    returnFocusTo = null;
  }

  document.querySelectorAll('[data-close-notice]').forEach((button) => {
    button.addEventListener('click', closeToast);
  });

  document.querySelectorAll('[data-open-notice]').forEach((button) => {
    button.addEventListener('click', () => openToast(/** @type {HTMLElement} */ (button)));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !toast.hidden) closeToast();
  });

  openToast(null);
})();
