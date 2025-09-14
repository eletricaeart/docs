document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('scopeEditor');
    const toolbar = document.getElementById('scopeToolbar');
    const imageUpload = document.getElementById('imageUpload'); // This ID is shared, might need to be unique if multiple RTEs

    // Generic command execution
    const execCmd = (command, value = null) => {
        document.execCommand(command, false, value);
        editor.focus();
    };

    // Event listener for toolbar buttons
    toolbar.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (!target || !target.dataset.command) return;

        const command = target.dataset.command;

        if (command === 'createLink') {
            const url = prompt('Enter the link URL:');
            if (url) {
                execCmd(command, url);
            }
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

    // Initial focus
    editor.focus();
});
