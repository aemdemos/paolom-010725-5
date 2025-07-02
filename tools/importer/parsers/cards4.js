/* global WebImporter */
export default function parse(element, { document }) {
  // Cards block header row
  const cells = [['Cards']];

  // Each card is a direct <a> child of the main element
  const cardLinks = element.querySelectorAll(':scope > a');

  cardLinks.forEach((cardLink) => {
    // Image cell: first <img> descendant of the card link
    const img = cardLink.querySelector('img');
    
    // Text cell: get the inner grid div (should contain all text content)
    // Usually: cardLink > div > div (text content)
    let textCell = null;
    const gridDiv = cardLink.querySelector(':scope > div');

    if (gridDiv) {
      // The image is a direct child of gridDiv, as is the text content div
      // So, get all children, find the one that is not the <img>
      const gridDivChildren = Array.from(gridDiv.children);
      textCell = gridDivChildren.find(child => child !== img && child.tagName === 'DIV');
      // If not found, fallback to gridDiv itself
      if (!textCell) textCell = gridDiv;
    } else {
      // Fallback: use the card link itself
      textCell = cardLink;
    }

    // Add the row to the table
    cells.push([img, textCell]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
