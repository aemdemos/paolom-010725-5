/* global WebImporter */
export default function parse(element, { document }) {
  // Compose rows for the Accordion block
  const rows = [['Accordion']]; // Header matches example exactly

  // Select all accordion items at the top level
  const accordionItems = Array.from(element.querySelectorAll(':scope > .w-dropdown'));
  accordionItems.forEach((item) => {
    // Title cell: find .w-dropdown-toggle > .paragraph-lg (or fallback to text content)
    let titleEl = null;
    const toggle = item.querySelector(':scope > .w-dropdown-toggle');
    if (toggle) {
      titleEl = toggle.querySelector('.paragraph-lg');
      if (!titleEl) {
        // Fallback: use toggle's text content
        titleEl = document.createElement('span');
        titleEl.textContent = toggle.textContent.trim();
      }
    } else {
      titleEl = document.createElement('span');
      titleEl.textContent = '';
    }

    // Content cell: take nav.accordion-content (all content inside)
    let contentEl = null;
    const contentNav = item.querySelector(':scope > nav.accordion-content');
    if (contentNav) {
      // Prefer .w-richtext inside nav; else, use all nav children
      const rich = contentNav.querySelector('.w-richtext');
      if (rich) {
        contentEl = rich;
      } else {
        // If no rich text, use all children
        if (contentNav.children.length) {
          contentEl = document.createElement('div');
          Array.from(contentNav.children).forEach((child) => {
            contentEl.appendChild(child);
          });
        } else {
          contentEl = document.createElement('span');
          contentEl.textContent = contentNav.textContent.trim();
        }
      }
    } else {
      contentEl = document.createElement('span');
      contentEl.textContent = '';
    }

    // Reference the actual DOM elements (without cloning)
    rows.push([titleEl, contentEl]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
