/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must have only one cell with the block name
  const headerRow = ['Columns (columns2)'];

  // Get all direct children (these are the columns)
  const columnDivs = element.querySelectorAll(':scope > div');

  // For each column, include the div itself to preserve wrappers (e.g. for aspect ratio/rounded corners)
  const colCells = Array.from(columnDivs);

  // Structure the table: header is one cell, second row matches number of columns
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    colCells
  ], document);

  // Replace original element with the table
  element.replaceWith(table);
}
