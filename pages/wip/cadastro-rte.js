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

    // Event listener for toolbar buttons
    toolbarElement.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (!target || !target.dataset.command) return;

        const command = target.dataset.command;

        const excludedCommands = ['insertImageFromUrl', 'uploadImage', 'createLink', 'addText'];
        const alignmentCommands = ['justifyLeft', 'justifyCenter', 'justifyRight'];

        if (!excludedCommands.includes(command)) {
            if (alignmentCommands.includes(command)) {
                // Remove clicked class from other alignment buttons
                toolbarElement.querySelectorAll('button').forEach(button => {
                    if (alignmentCommands.includes(button.dataset.command) && button !== target) {
                        button.classList.remove('clicked');
                    }
                });
            }
            target.classList.toggle('clicked');
        }

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
            // Toggle off any active list
            if (document.queryCommandState('insertOrderedList')) {
                execCmd('insertOrderedList');
            } else if (document.queryCommandState('insertUnorderedList')) {
                execCmd('insertUnorderedList');
            }
            // Ensure the current block is a paragraph
            execCmd('formatBlock', 'p');
        } else {
            execCmd(command);
        }
    });

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