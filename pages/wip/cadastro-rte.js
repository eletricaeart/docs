// pages/wip/cadastro-rte.js
function initRichTextEditor(sectionElement) {
    const editorElement = sectionElement.querySelector('.editor');
    const toolbarElement = sectionElement.querySelector('.toolbar');
    const titleInputElement = sectionElement.querySelector('.section-title-input');

    // Generic command execution
    const execCmd = (command, value = null) => {
        document.execCommand(command, false, value);
        editorElement.focus();
    };

    // Helper function to insert a styled image
    const insertStyledImage = (url) => {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        const img = document.createElement('img');
        img.src = url;
        img.style.maxWidth = '90%';
        img.style.margin = '0 auto';
        img.style.display = 'block';

        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(img);

        // Move cursor after the image
        const newRange = document.createRange();
        newRange.setStartAfter(img);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);

        editorElement.focus();
    };

    // Event listener for the title input
    if (titleInputElement) {
        titleInputElement.addEventListener('input', () => {
            const titleText = titleInputElement.value.trim();
            sectionElement.setAttribute('label', titleText);
            // Dispatch a custom event to notify the main script that a title has changed
            const titleChangeEvent = new Event('titlechange', { bubbles: true });
            titleInputElement.dispatchEvent(titleChangeEvent);
        });
    }

    // Function to update the toolbar button states based on the current selection
    const updateToolbar = () => {
        const buttons = toolbarElement.querySelectorAll('button[data-command]');
        buttons.forEach(button => {
            const command = button.dataset.command;
            // Commands that don't have a state
            const nonStateCommands = ['insertImageFromUrl', 'uploadImage', 'createLink', 'addText'];
            if (nonStateCommands.includes(command)) {
                return; // Skip these buttons
            }

            // Check the state of the command
            try {
                if (document.queryCommandState(command)) {
                    button.classList.add('clicked');
                } else {
                    button.classList.remove('clicked');
                }
            } catch (e) {
                // Some commands might throw an error if checked in the wrong context
                // console.error(`Error checking state for command: ${command}`, e);
                button.classList.remove('clicked');
            }
        });
    };

    // Event listener for toolbar buttons
    toolbarElement.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (!target || !target.dataset.command) return;

        const command = target.dataset.command;

        // Execute the command
        if (command === 'createLink') {
            const url = prompt('Enter the link URL:');
            if (url) {
                execCmd(command, url);
            }
        } else if (command === 'insertImageFromUrl') {
            const url = prompt('Enter image URL:');
            if (url) {
                insertStyledImage(url);
            }
        } else if (command === 'uploadImage') {
            const imageUpload = document.getElementById('imageUpload');
            if (imageUpload) {
                imageUpload.click();
            }
        } else if (command === 'addText') {
            if (document.queryCommandState('insertOrderedList')) {
                execCmd('insertOrderedList');
            } else if (document.queryCommandState('insertUnorderedList')) {
                execCmd('insertUnorderedList');
            }
            execCmd('formatBlock', 'p');
        } else {
            execCmd(command);
        }

        // Update the toolbar state after executing the command
        updateToolbar();
    });

    // Add event listeners to update the toolbar whenever the selection changes
    document.addEventListener('selectionchange', () => {
        // Check if the selection is inside the current editor before updating
        const selection = window.getSelection();
        if (selection.rangeCount > 0 && editorElement.contains(selection.getRangeAt(0).commonAncestorContainer)) {
            updateToolbar();
        }
    });
    editorElement.addEventListener('focus', updateToolbar);

    // Event listener for select (headings) - REMOVED from HTML, but keeping logic for other selects
    toolbarElement.addEventListener('change', (e) => {
        const target = e.target.closest('select');
        if (target && target.dataset.command === 'formatBlock') {
            execCmd(target.dataset.command, target.value);
        }
    });

    // Event listener for color inputs
    toolbarElement.addEventListener('input', (e) => {
        const target = e.target.closest('input[type="color"]');
        if (target && target.dataset.command) {
            execCmd(target.dataset.command, target.value);
        }
    });

    // Event listener for image upload (assuming it's a single global input)
    const globalImageUpload = document.getElementById('imageUpload');
    if (globalImageUpload) {
        globalImageUpload.addEventListener('change', () => {
            const file = globalImageUpload.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    insertStyledImage(e.target.result);
                };
                reader.readAsDataURL(file);
                globalImageUpload.value = null;
            }
        });
    }

    // Initial focus
    editorElement.focus();
}