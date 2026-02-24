import sanitizeHtml from 'sanitize-html';

export function sanitizeHtmlCharacters(string: string): string {
  // Replace some HTML meta characters =, ", ', <, >
  return string
    .replace(/=/g, '&#61;')
    .replace(/"/g, '&#34;')
    .replace(/'/g, '&#39;')
    .replace(/>/g, '&#62;')
    .replace(/</g, '&#60;');
}

export function sanitizeHtmlString(htmlString: string, attributes?: Record<string, unknown>): string {
  const allowedAttributes: { [key: string]: string[] } = { abbr: ['title'] };

  Object.entries(sanitizeHtml.defaults.allowedAttributes).forEach(([key, val]) => {
    if (key in allowedAttributes) {
      const values = allowedAttributes[key];
      allowedAttributes[key] = values.concat(val as string[]);
    } else {
      allowedAttributes[key] = val as string[];
    }
  });

  let otherAttributes = {
    allowedClasses: {
      li: ['highlight'],
    },
  };
  if (attributes && attributes.constructor === Object) {
    otherAttributes = attributes as typeof otherAttributes;
  }

  return sanitizeHtml(htmlString, { allowedAttributes: allowedAttributes, ...otherAttributes });
}