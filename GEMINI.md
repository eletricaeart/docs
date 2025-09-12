# Gemini Project Context

This file is intended to be a journal of the development of this project, to be used to provide context to the Gemini assistant. It should be updated with every significant change.

## Project Overview

The project is a web-based system for creating and managing budgets for "Elétrica & Art", a company that seems to provide electrical and painting services.

## Development Log

### 2025-09-12 (Update 3)

*   **Image Insertion in Rich Text Editor:**
    *   Implemented functionality to insert images into the editor.
    *   Users can now insert an image by providing a URL or by uploading a file from their computer.
    *   Uploaded images are embedded as Base64 Data URLs.
    *   Updated `rich-text-editor.html`, `teste-editor.html`, and `rich-text-editor.js`.

### 2025-09-12 (Update 2)

*   **Editor Test Page:**
    *   Created a new page `teste-editor.html` to host the rich text editor for testing purposes.
    *   Added a link to the new test page in the navigation bar of `index.html`.

### 2025-09-12 (Update 1)

*   **Rich Text Editor Enhancements:**
    *   Added several new features to the rich text editor:
        *   Headings (H1, H2, H3) via a dropdown.
        *   Ordered and unordered lists.
        *   Text alignment (left, center, right).
        *   Text and background color pickers.
        *   A button to insert hyperlinks.
    *   Updated the HTML, CSS, and JavaScript files accordingly.

### 2025-09-12 (Initial)

*   **Rich Text Editor Component:**
    *   Created a WYSIWYG rich text editor component using a `contenteditable` div.
    *   The component includes a toolbar with buttons for bold, italic, and underline.
    *   The generated HTML is displayed below the editor.
    *   Created `rich-text-editor.html`, `rich-text-editor.css`, and `rich-text-editor.js`.

### 2025-09-11 (Update 3)

*   **CRUD features for `novo-orçamento.html`:**
    *   Added Edit (✏️) and Delete (🗑️) icons with corresponding functionality to the budget list.
    *   Clicking the edit icon populates the form with the selected budget's data for modification.
    *   The form logic now handles both creating new budgets and updating existing ones.
    *   Clicking the delete icon prompts for confirmation and removes the budget from local storage.

### 2025-09-11 (Update 2)

*   **`novo-orçamento.html` Refactoring:**
    *   Overhauled the page to align with the new local storage-based architecture.
    *   The form now saves budget data directly to local storage.
    *   The page now lists all budgets saved in local storage and includes a preview feature.

### 2025-09-11 (Update 1)

*   **New Budget Management System:**
    *   Pivoted from creating individual HTML files for budgets to a single-page application model.
    *   Created `gerenciador-orcamentos.html`, a central interface for full CRUD operations.
    *   Budget data is now stored client-side in the browser's local storage.
*   **`index.html`:**
    *   Added a "Gerenciador" link in the navigation bar pointing to the new `gerenciador-orcamentos.html` page.

### 2025-09-11 (Initial)

*   **`novo-orçamento.html` (Legacy):**
    *   Initially created as a form to generate the content for new budget files.
*   **`index.html`:**
    *   Added a link to `novo-orçamento.html` in the navigation bar.

## Future Intentions

*   Refine the `gerenciador-orcamentos.html` page with more advanced features, such as data export/import, improved printing templates, and more detailed status tracking for each budget.

## Instructions for Gemini

*   When asked to make changes, update the "Development Log" in this file with a summary of the changes.
*   Before making changes, consult this file to understand the project's context and history.
*   `gerenciador-orcamentos.html` is the primary, full-featured budget management tool.
*   `novo-orçamento.html` serves as a simplified tool for creating, previewing, and managing budgets. Both pages use the same local storage (`EaOrcamentosDB`).
*   The old workflow of creating individual HTML files is deprecated.