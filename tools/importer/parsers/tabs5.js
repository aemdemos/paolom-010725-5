/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate tab links
  const tabLinks = Array.from(element.querySelectorAll(':scope > a'));

  // Table rows: first header row, then one row per tab (label, content)
  const rows = [['Tabs']];
  tabLinks.forEach((tabLink) => {
    let label = '';
    const labelDiv = tabLink.querySelector('div');
    if (labelDiv && labelDiv.textContent.trim()) {
      label = labelDiv.textContent.trim();
    } else if (tabLink.textContent.trim()) {
      label = tabLink.textContent.trim();
    }
    rows.push([label, '']);
  });

  // Create the table with the WebImporter tool
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Critical fix: Ensure the <th> cell in the first row has colspan=2 if there are two columns in tab rows
  if (rows.length > 1) {
    const headerRow = table.querySelector('tr');
    if (headerRow) {
      const th = headerRow.querySelector('th');
      if (th) {
        th.setAttribute('colspan', '2');
      }
    }
  }

  // Replace the original element with the created table block
  element.replaceWith(table);
}
