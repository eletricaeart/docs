document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('editor');
    const htmlOutput = document.getElementById('html-output');
    const toolbar = document.querySelector('.toolbar');
    const imageUpload = document.getElementById('imageUpload');
    const linkModal = document.getElementById('linkModal');
    const saveLinkBtn = document.getElementById('saveLinkBtn');
    const cancelLinkBtn = document.getElementById('cancelLinkBtn');
    const linkTextInput = document.getElementById('linkTextInput');
    const linkUrlInput = document.getElementById('linkUrlInput');
    let savedSelection;

    // Generic command execution
    const execCmd = (command, value = null) => {
        document.execCommand(command, false, value);
        editor.focus();
        updateHtmlOutput();
    };

    // Function to save the current selection
    const saveSelection = () => {
        if (window.getSelection) {
            const sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                savedSelection = sel.getRangeAt(0);
            }
        }
    };

    // Function to restore the saved selection
    const restoreSelection = () => {
        if (savedSelection) {
            if (window.getSelection) {
                const sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(savedSelection);
            }
        }
    };

    // Event listener for toolbar buttons
    toolbar.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (!target || !target.dataset.command) return;

        const command = target.dataset.command;

        if (command === 'createLink') {
            saveSelection();
            const selectedText = savedSelection ? savedSelection.toString() : '';
            linkTextInput.value = selectedText;
            linkUrlInput.value = '';
            linkModal.style.display = 'block';
            linkUrlInput.focus();
        } else if (command === 'insertImageFromUrl') {
            const url = prompt('Enter image URL:');
            if (url) {
                execCmd('insertImage', url);
            }
        } else if (command === 'uploadImage') {
            imageUpload.click();
        } else {
            execCmd(command);
        }
    });

    // Event listener for select (headings)
    toolbar.addEventListener('change', (e) => {
        const target = e.target.closest('select');
        if (target && target.dataset.command === 'formatBlock') {
            execCmd(target.dataset.command, target.value);
        }
    });

    // Event listener for color inputs
    toolbar.addEventListener('input', (e) => {
        const target = e.target.closest('input[type="color"]');
        if (target && target.dataset.command) {
            execCmd(target.dataset.command, target.value);
        }
    });

    // Event listener for image upload
    imageUpload.addEventListener('change', () => {
        const file = imageUpload.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                execCmd('insertImage', e.target.result);
            };
            reader.readAsDataURL(file);
            imageUpload.value = null;
        }
    });

    // Hide link modal
    cancelLinkBtn.addEventListener('click', () => {
        linkModal.style.display = 'none';
    });

    // Save link
    saveLinkBtn.addEventListener('click', () => {
        const text = linkTextInput.value;
        const url = linkUrlInput.value;
        linkModal.style.display = 'none';

        if (url) {
            restoreSelection();
            editor.focus();
            const linkText = text.trim() || url;
            const linkHTML = `<a href="${url}" target="_blank">${linkText}</a>`;
            execCmd('insertHTML', linkHTML);
        }
    });

    // Update HTML output on input
    editor.addEventListener('input', () => {
        updateHtmlOutput();
    });

    // Function to update the HTML output view
    function updateHtmlOutput() {
        htmlOutput.textContent = editor.innerHTML;
    }

    // Initial update
    updateHtmlOutput();
});