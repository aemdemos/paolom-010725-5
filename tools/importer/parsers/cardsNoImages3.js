/* global WebImporter */
export default function parse(element, { document }) {
  // Header for the Cards block
  const cells = [['Cards']];
  // Select all direct card items
  const cardDivs = element.querySelectorAll(':scope > div');
  cardDivs.forEach((cardDiv) => {
    // Get the text container for the card (the <p> element)
    const textParagraph = cardDiv.querySelector('p');
    // Defensive: skip empty or missing cards
    if (textParagraph && textParagraph.textContent.trim()) {
      cells.push([textParagraph]);
    }
  });
  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the element
  element.replaceWith(table);
}
