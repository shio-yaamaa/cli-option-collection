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
