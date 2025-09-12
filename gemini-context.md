# Gemini Project Context

This file is intended to be a journal of the development of this project, to be used to provide context to the Gemini assistant. It should be updated with every significant change.

## Project Overview

The project is a web-based system for creating and managing budgets for "Elétrica & Art", a company that seems to provide electrical and painting services.

## Development Log

### 2025-09-11

*   **`novo-orçamento.html`:**
    *   Created the `novo-orçamento.html` page to serve as a form for generating new budgets.
    *   The form captures the client's name, address, and the emission date.
    *   The emission date is pre-filled with the current date.
    *   Upon submission, the form fetches the content of `orçamentos/@base.html`, replaces placeholders with the form data, and displays the generated file name and content in a `<textarea>`. The user can then copy this information and ask Gemini to create the file.
*   **`index.html`:**
    *   Added a link to `novo-orçamento.html` in the navigation bar.

## Future Intentions

*   Implement the file creation logic after the user provides the generated content from `novo-orçamento.html`.

## Instructions for Gemini

*   When asked to make changes, update the "Development Log" in this file with a summary of the changes.
*   Before making changes, consult this file to understand the project's context and history.
*   Maintain the existing code style and conventions.
*   When creating new budget files, they should be placed in the `orçamentos/` directory.
*   The file name for new budgets should follow the pattern: `{nome-do-cliente-em-minusculo-com-hifens}-{data-de-emissao}.html`.
