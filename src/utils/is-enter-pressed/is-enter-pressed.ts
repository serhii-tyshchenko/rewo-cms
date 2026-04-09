type TKeyboardEventLike = {
  key?: string;
  keyCode?: number;
};

/**
 * Checks if the Enter key was pressed in a keyboard event.
 *
 * @param {TKeyboardEventLike} e - The keyboard event to check.
 * @returns {boolean} True if the Enter key was pressed, false otherwise.
 */
const isEnterPressed = (e: TKeyboardEventLike): boolean =>
  e.key === 'Enter' || e.keyCode === 13;

export default isEnterPressed;
