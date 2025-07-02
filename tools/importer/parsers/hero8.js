/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified
  const headerRow = ['Hero (hero8)'];

  // Find the grid layout inside the element
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);

  // The first column: text content (heading, subheading, etc)
  let textContentCell = [];
  if (columns[0]) {
    // Collect all block-level elements (h1-h6, p, ul, ol, etc)
    const blockNodes = Array.from(columns[0].children).filter(el =>
      /^(H[1-6]|P|OL|UL|DIV|BLOCKQUOTE)$/i.test(el.tagName)
    );
    textContentCell = [...blockNodes];
    // If no blocks found, just take all children
    if (textContentCell.length === 0) {
      textContentCell = Array.from(columns[0].children);
    }
  }

  // The second column: call-to-action buttons (links)
  let ctaCell = [];
  if (columns[1]) {
    const ctaLinks = Array.from(columns[1].querySelectorAll('a'));
    ctaCell = ctaLinks;
  }

  // Compose the main cell: all text content followed by CTAs
  const mainCell = [...textContentCell];
  if (ctaCell.length > 0) mainCell.push(...ctaCell);

  // Build the table as 1 column, 3 rows as per spec
  // Row 1: Header
  // Row 2: Background image (none in this HTML, so blank)
  // Row 3: Content and CTAs
  const cells = [
    headerRow,
    [''],
    [mainCell]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
