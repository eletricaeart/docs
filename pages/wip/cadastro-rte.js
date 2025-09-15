// pages/wip/cadastro-rte.js
function initRichTextEditor(sectionElement, titleModal, titleInput, saveTitleBtn, cancelTitleBtn, mainSectionNumber, sectionNumber) {
    const editorElement = sectionElement.querySelector('.editor');
    const toolbarElement = sectionElement.querySelector('.toolbar');
    const addTitleButton = toolbarElement.querySelector('button[data-command="addTitle"]');
    const sectionDisplayTitle = sectionElement.querySelector('.section-display-title'); // Get the p tag

    // Generic command execution
    const execCmd = (command, value = null) => {
        document.execCommand(command, false, value);
        editorElement.focus();
    };

    // Event listener for toolbar buttons
    toolbarElement.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (!target || !target.dataset.command) return;

        const command = target.dataset.command;

        if (command === 'addTitle') {
            // Handled by the specific logic below, but we stop it from going to execCmd
            return;
        } else if (command === 'createLink') {
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
            const imageUpload = document.getElementById('imageUpload');
            if (imageUpload) {
                imageUpload.click();
            }
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
                    execCmd('insertImage', e.target.result);
                };
                reader.readAsDataURL(file);
                globalImageUpload.value = null;
            }
        });
    }

    // Add Title Button Logic
    if (addTitleButton) {
        addTitleButton.addEventListener('click', () => {
            // Check if a label already exists for this section
            if (sectionElement.hasAttribute('label') && sectionElement.getAttribute('label').trim() !== '') {
                alert('Já existe um título para esta seção.');
                return;
            }
            titleModal.style.display = 'block';
            titleInput.value = ''; // Clear previous input
            titleInput.focus();

            // A specific handler for when THIS modal's save button is clicked
            const specificSaveHandler = () => {
                const titleText = titleInput.value.trim();
                if (titleText) {
                    // Set the label attribute on the section element
                    sectionElement.setAttribute('label', titleText);

                    // Display the title in the p tag with X.Y format
                    if (sectionDisplayTitle) {
                        sectionDisplayTitle.textContent = `${mainSectionNumber}.${sectionNumber} ${titleText}`;
                    }

                    // Disable the button after the title is added
                    addTitleButton.disabled = true;
                }
                titleModal.style.display = 'none';
                // Clean up this specific listener
                saveTitleBtn.removeEventListener('click', specificSaveHandler);
            };

            // A specific handler for when THIS modal's cancel button is clicked
            const specificCancelHandler = () => {
                titleModal.style.display = 'none';
                // Clean up the listeners
                saveTitleBtn.removeEventListener('click', specificSaveHandler);
                cancelTitleBtn.removeEventListener('click', specificCancelHandler);
            };

            // Remove any previous listeners to avoid multiple triggers
            // (This is a simple way to handle it, could be more robust)
            saveTitleBtn.replaceWith(saveTitleBtn.cloneNode(true));
            cancelTitleBtn.replaceWith(cancelTitleBtn.cloneNode(true));
            
            // Re-select the buttons after cloning
            const newSaveTitleBtn = document.getElementById('saveTitleBtn');
            const newCancelTitleBtn = document.getElementById('cancelTitleBtn');

            // Add the new, specific event listeners
            newSaveTitleBtn.addEventListener('click', specificSaveHandler);
            newCancelTitleBtn.addEventListener('click', specificCancelHandler);
        });
    }

    // Initial focus
    editorElement.focus();
}