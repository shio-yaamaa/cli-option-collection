export const escapeHTML = (string: string): string => {
  return string.replace(/[&'`"<>]/g, (match) => {
    return (
      {
        '&': '&amp;',
        "'": '&#x27;',
        '`': '&#x60;',
        '"': '&quot;',
        '<': '&lt;',
        '>': '&gt;',
      }[match] || match
    );
  });
};

// If there are more than two consecutive empty lines, squash them into one.
export const squashLinebreaks = (string: string): string => {
  return string.replace(/\n{3,}/g, '\n\n');
};
