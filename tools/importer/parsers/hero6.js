/* global WebImporter */
export default function parse(element, { document }) {
  // Find the active tab pane or fallback to first
  let pane = element.querySelector('.w-tab-pane.w--tab-active') || element.querySelector('.w-tab-pane');
  if (!pane) return;

  // Get the main grid layout inside the tab pane
  const grid = pane.querySelector('.w-layout-grid');
  if (!grid) return;

  // Gather all children in the grid
  const gridChildren = Array.from(grid.children);

  // Find the first image
  const img = gridChildren.find(el => el.tagName === 'IMG');

  // For the text cell, gather all elements that are not images, preserve order
  const nonImgElements = gridChildren.filter(el => el.tagName !== 'IMG');
  let textCellContent;
  if (nonImgElements.length === 1) {
    textCellContent = nonImgElements[0];
  } else if (nonImgElements.length > 1) {
    textCellContent = nonImgElements;
  } else {
    textCellContent = '';
  }

  // Build the block table (header, image row, content row)
  const cells = [
    ['Hero (hero6)'],
    [img || ''],
    [textCellContent]
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
