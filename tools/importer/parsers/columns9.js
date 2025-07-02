/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get all direct children columns of the grid
  const columns = Array.from(grid.children);
  // The block header row must be a single cell
  const headerRow = ['Columns (columns9)'];
  // Create a content row with each column's inner content as a cell (not the wrapping column node)
  const contentRow = columns.map(col => {
    // If the column contains only one child, pass just that child
    if (col.children.length === 1) {
      return col.firstElementChild;
    }
    // Otherwise, collect all children in an array
    return Array.from(col.childNodes).filter(node => {
      // Only keep non-empty elements and text
      if (node.nodeType === Node.ELEMENT_NODE) {
        // Don't keep empty divs or empty text
        if (node.textContent.trim() === '' && !node.querySelector('svg,img,ul,li,a')) return false;
        return true;
      } else if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent.trim() !== '';
      }
      return false;
    });
  });
  const tableRows = [
    headerRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
