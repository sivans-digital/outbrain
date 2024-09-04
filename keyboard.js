// KEYBOARD HANDLING
const keyboard = document.getElementById('keyboard');
const inputFields = document.querySelectorAll('input[type="text"]');
let activeInput = null;
let isWanakanaBound = false;  // Add a flag to track if Wanakana is bound

inputFields.forEach(input => {
    input.addEventListener('focus', function () {
        activeInput = this;
        document.getElementById('keyboard').style.display = 'block';

        // Bind WanaKana to the focused input field for Japanese typing, only if not already bound
        if (selectedLanguage === 'ja' && !activeInput.getAttribute('wanakana-bound')) {
            wanakana.bind(activeInput, { IMEMode: true });
            activeInput.setAttribute('wanakana-bound', 'true');  // Mark it as bound
        }
    });

    input.addEventListener('blur', function () {
        // Only unbind if Wanakana was previously bound
        if (selectedLanguage === 'ja' && activeInput.getAttribute('wanakana-bound')) {
            wanakana.unbind(activeInput);
            activeInput.removeAttribute('wanakana-bound');  // Remove the mark
        }
    });
});

const keys = document.querySelectorAll('.key');
keys.forEach(key => {
    key.addEventListener('click', function () {
        if (!activeInput) return;

        const keyValue = this.textContent.toLowerCase();

        if (keyValue === 'space') {
            activeInput.value += ' ';
        } else if (keyValue === '←') {
            activeInput.value = activeInput.value.slice(0, -1);
        } else {
            activeInput.value += keyValue;
        }

        // Keep the input focused after typing
        setTimeout(() => {
            activeInput.focus();
        }, 0);
    });
});

// AUTO FOCUS //
function toggleKeyboardVisibility(pageId) {
    const page = document.getElementById(pageId);
    const inputField = page.querySelector('input[type="text"]');

    if (inputField) {
        setTimeout(() => {
            inputField.focus();
        }, 100);

        document.getElementById('keyboard').style.display = 'block';

        // Bind WanaKana to the input field if Japanese is selected
        if (selectedLanguage === 'ja') {
            wanakana.bind(inputField, { IMEMode: true });
        }
    } else {
        document.getElementById('keyboard').style.display = 'none';
    }
}

// Hide the keyboard when clicking outside of an input field
document.addEventListener('click', function (event) {
    if (!keyboard.contains(event.target) && !event.target.matches('input[type="text"]')) {
        keyboard.style.display = 'none';
        if (activeInput) {
            activeInput.blur();
            if (selectedLanguage === 'ja') {
                wanakana.unbind(activeInput);
            }
            activeInput = null;
        }
    }
});
