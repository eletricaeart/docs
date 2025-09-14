# Gemini Project Context

This file is intended to be a journal of the development of this project, to be used to provide context to the Gemini assistant. It should be updated with every significant change.

## Project Overview

The project is a web-based system for creating and managing budgets for "Elétrica & Art", a company that seems to provide electrical and painting services.

## Development Log

### 2025-09-12 (Update 19)

*   **Updated Warranty Input:**
    *   Changed the "Validade da Garantia" (Warranty/Validity) input in `pages/wip/cadastro.html` to `type="number"`.
    *   The default value is now `6` (representing months).
    *   Updated `pages/wip/cadastro.js` to handle this change in default value and clearing.
*   **Enhanced Scope of Services Title Display:**
    *   Added a blank `<p class="section-display-title"></p>` tag above the toolbar within each rich text editor section in `pages/wip/cadastro.html`.
    *   When a title is entered via the modal, it is now displayed in this `<p>` tag, prefixed with a section number in the format `X.Y` (e.g., "1.1 Pintura"), where `X` is `1` (for the main scope section) and `Y` is the section's sequential number.
    *   Updated `pages/wip/cadastro.js` and `pages/wip/cadastro-rte.js` to implement this dynamic title display and numbering.

### 2025-09-12 (Update 18)

*   **Updated Warranty Input:**
    *   Changed the "Validade da Garantia" (Warranty/Validity) input in `pages/wip/cadastro.html` to `type="number"`.
    *   The default value is now `6` (representing months).
    *   Updated `pages/wip/cadastro.js` to handle this change in default value and clearing.
*   **Enhanced Scope of Services Title Display:**
    *   Added a blank `<p class="section-display-title"></p>` tag above the toolbar within each rich text editor section in `pages/wip/cadastro.html`.
    *   When a title is entered via the modal, it is now displayed in this `<p>` tag, prefixed with a section number in the format `X.Y` (e.g., "1.1 Pintura"), where `X` is `1` (for the main scope section) and `Y` is the section's sequential number.
    *   Updated `pages/wip/cadastro.js` and `pages/wip/cadastro-rte.js` to implement this dynamic title display and numbering.

### 2025-09-12 (Update 17)

*   **Rich Text Editor Enhancements for Scope of Services:**
    *   The "Escopo dos serviços" rich text editor now supports multiple sections, each wrapped in a `<section>` tag.
    *   The title for each section is no longer an `<h2>` tag inside the content, but is set as the `label` attribute of the `<section>` tag.
    *   The dropdown for Paragraph/Headings has been replaced with a single "Add Title" button.
    *   Clicking "Add Title" opens a modal for title input. The entered title is set as the `label` attribute of the current section, and the button is then disabled for that section.
    *   A new "Adicionar Nova Seção" (Add New Section) button allows users to create additional rich text editor sections, each with its own toolbar and title functionality.
    *   Updated `pages/wip/cadastro.html` and `pages/wip/cadastro-rte.js` to implement these features.
    *   Updated `pages/wip/cadastro.js` to correctly initialize and manage multiple editor sections, and to retrieve their content and labels for saving.

### 2025-09-12 (Update 16)

*   **Updated Warranty Input and Added Scope of Services:**
    *   Changed the "Validade da Garantia" (Warranty/Validity) input in `pages/wip/cadastro.html` from a date to a text field, defaulting to "6 meses".
    *   Added a new section for "Escopo dos serviços" (Scope of Services) in `pages/wip/cadastro.html`.
    *   This section now includes a rich text editor, using a simplified version of the existing `rich-text-editor.html`'s toolbar and functionality, managed by `pages/wip/cadastro-rte.js`.
    *   The content of the "Escopo dos serviços" editor is captured and saved as part of the budget object.
    *   Updated `pages/wip/cadastro.js` to handle these changes.

### 2025-09-12 (Update 15)

*   **Added Due Date and Warranty/Validity to Budget:**
    *   Added input fields for "Data de Vencimento" (Due Date) and "Validade da Garantia" (Warranty/Validity) to `pages/wip/cadastro.html`.
    *   Due Date defaults to 30 days from the current date.
    *   Warranty/Validity defaults to 15 days after the Issue Date and updates dynamically if the Issue Date changes.
    *   These dates are captured and saved as part of the budget object in `assets/scripts/db.js`.
    *   Updated `pages/wip/cadastro.js` to handle these new input fields and their default calculations.

### 2025-09-12 (Update 14)

*   **Updated Service ID Generation:**
    *   Modified the `serviceId` generation in `assets/scripts/db.js` to follow the format: `s:random1-random2-random3`.
    *   Removed the `nextServiceId` counter as it's no longer needed for sequential IDs.
    *   Updated `_saveToLocalStorage` and `_loadFromLocalStorage` functions in `db.js` to reflect the removal of `nextServiceId`.
*   **Added Issue Date to Budget:**
    *   Added an editable input field for "Data de Emissão" (Issue Date) to `pages/wip/cadastro.html`.
    *   This input is pre-filled with the current date when the page loads.
    *   The issue date is captured and saved as part of the budget object in `assets/scripts/db.js`.
    *   Updated `pages/wip/cadastro.js` to handle the new input field.

### 2025-09-12 (Update 13)

*   **Updated Client ID Generation:**
    *   Modified the `userId` generation in `assets/scripts/db.js` to follow the format: `MM:random/YYYY`.
    *   Removed the `nextUserId` counter as it's no longer needed for sequential IDs.
    *   Updated `_saveToLocalStorage` and `_loadFromLocalStorage` functions in `db.js` to reflect the removal of `nextUserId`.

### 2025-09-12 (Update 12)

*   **Updated Budget ID Generation:**
    *   Modified the `budgetId` generation in `assets/scripts/db.js` to follow the format: `E&A-o:random1-random2/YYYY`.
    *   Removed the `nextBudgetId` counter as it's no longer needed for sequential IDs.
    *   Updated `_saveToLocalStorage` and `_loadFromLocalStorage` functions in `db.js` to reflect the removal of `nextBudgetId`.

### 2025-09-12 (Update 11)

*   **LocalStorage Synchronization for Simulated Database:**
    *   Implemented full synchronization between the simulated MySQL database (`assets/scripts/db.js`) and `localStorage`.
    *   The entire state of the simulated database (users, budgets, services, and their respective `nextId` counters) is now saved to `localStorage` whenever data is modified.
    *   The simulated database loads its state from `localStorage` upon initialization, ensuring data persistence across browser sessions.
    *   `pages/wip/cadastro.js` was updated to remove direct `localStorage` calls, relying solely on `db.js` for data persistence.

### 2025-09-12 (Update 10)

*   **Simulated MySQL Database for Cadastro Page:**
    *   Replaced `localStorage` with a simulated in-memory MySQL database (`assets/scripts/db.js`) for storing client and service data from the Cadastro page.
    *   Implemented relational data structure: `User` (client) with `id`, `Budget` (orcamento) with `id` linked to `User`, and `Service` with `id` linked to `Budget`.
    *   The "Save All Data" button now triggers a simulated API call to save data as a new budget entry, including client and associated services.
    *   Updated `pages/wip/cadastro.html` to include `db.js` and `pages/wip/cadastro.js` to use the simulated database.

### 2025-09-12 (Update 9)

*   **New WIP Registration Page:**
    *   Created a new registration page (`pages/wip/cadastro.html`) for client and service data.
    *   Includes client name/address input and service details (name, description, quantity, unit value, total value).
    *   Provides functionality to add, edit, and delete services dynamically.
    *   Data is persisted using `localStorage`.
    *   Associated CSS (`pages/wip/cadastro.css`) and JavaScript (`pages/wip/cadastro.js`) files were created.
*   **Updated Navigation with WIP Pages Menu:**
    *   Added a new "WIP Pages" dropdown menu to `index.html`'s navigation bar.
    *   This menu contains a link to the new `pages/wip/cadastro.html`.

### 2025-09-12 (Update 8)

*   **Split Image Insertion Functionality:**
    *   The "Insert Image" button has been split into two distinct buttons: "Image URL" and "Upload Image".
    *   "Image URL" prompts the user for a web address.
    *   "Upload Image" opens a file dialog for local image selection.
    *   Updated `rich-text-editor.html` and `rich-text-editor.js` to reflect this change.

### 2025-09-12 (Update 7)

*   **Restored Link Functionality to Rich Text Editor:**
    *   Brought back the link button, modal, and all associated CSS and JavaScript.
    *   The functionality is based on the implementation from "Update 5".
    *   Updated `rich-text-editor.html`, `rich-text-editor.css`, and `rich-text-editor.js`.
*   **Updated Navigation:**
    *   In `index.html`, changed the "Testar Editor" link to "Editor" and pointed it to `rich-text-editor.html`.

### 2025-09-12 (Update 6)

*   **Removed Link Functionality from Rich Text Editor:**
    *   Removed the link button, modal, and all associated CSS and JavaScript due to persistent issues.
    *   Updated `rich-text-editor.html`, `rich-text-editor.css`, and `rich-text-editor.js`.

### 2025-09-12 (Update 5)

*   **Rich Text Editor Link Insertion Fix:**
    *   Fixed a bug where the link button was creating a link instantly with "null" values.
    *   Refactored the JavaScript to have a single event listener for the toolbar.
    *   The link button now correctly opens the modal for URL and text input.
    *   Simplified the link creation logic to use `insertHTML` for better reliability.
    *   Updated `rich-text-editor.html` and `rich-text-editor.js`.

### 2025-09-12 (Update 4)

*   **Rich Text Editor Link Insertion:**
    *   Changed the link insertion functionality to use a modal.
    *   When the "Link" button is clicked, a modal appears with two inputs: one for the link text and one for the URL.
    *   The selected text in the editor is used to pre-fill the "Link Text" input.
    *   Updated `rich-text-editor.html`, `rich-text-editor.css`, and `rich-text-editor.js`.

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
