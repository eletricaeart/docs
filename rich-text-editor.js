document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('editor');
    const htmlOutput = document.getElementById('html-output');
    const toolbar = document.querySelector('.toolbar');
    const imageUpload = document.getElementById('imageUpload');

    // Generic command execution
    const execCmd = (command, value = null) => {
        document.execCommand(command, false, value);
        editor.focus();
        updateHtmlOutput();
    };

    // Event listener for buttons
    toolbar.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (!target || !target.dataset.command) return;

        const command = target.dataset.command;

        if (command === 'createLink') {
            const url = prompt('Enter the link URL:');
            if (url) {
                execCmd(command, url);
            }
        } else if (command === 'insertImage') {
            const url = prompt('Enter image URL or leave blank to upload:');
            if (url) {
                execCmd(command, url);
            } else if (url !== null) { // User left it blank and clicked OK
                imageUpload.click();
            }
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
            // Reset file input
            imageUpload.value = null;
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
