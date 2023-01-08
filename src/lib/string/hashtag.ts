export function parseHashtag(href: string, display: string) {
  return `<a href="${href}" target="_blank" class="hashtag link">${display}</a>`;
}
