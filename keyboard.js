// KEYBOARD HANDLING
const keyboard = document.getElementById('keyboard');
const inputFields = document.querySelectorAll('input[type="text"]');
let activeInput = null;

inputFields.forEach(input => {
    input.addEventListener('focus', function () {
        activeInput = this;
        document.getElementById('keyboard').style.display = 'block';

        // Bind Wanakana to the focused input field for Japanese typing with IMEMode for better N handling
        if (selectedLanguage === 'ja' && !activeInput.hasAttribute('wanakana-bound')) {
            wanakana.bind(activeInput, { IMEMode: true }); // Enable IME Mode
            activeInput.setAttribute('wanakana-bound', 'true');  // Mark it as bound
        }
    });

    input.addEventListener('blur', function () {
        if (selectedLanguage === 'ja' && activeInput && activeInput.hasAttribute('wanakana-bound')) {
            wanakana.unbind(activeInput);
            activeInput.removeAttribute('wanakana-bound'); // Remove the mark
        }
    });
});

// Keyboard interactions
const keys = document.querySelectorAll('.key');
keys.forEach(key => {
    key.addEventListener('click', function () {
        if (!activeInput) return;

        const keyValue = this.textContent.toLowerCase();

        if (keyValue === 'space') {
            activeInput.value += ' ';
        } else if (keyValue === '←') {
            activeInput.value = activeInput.value.slice(0, -1); // Handle backspace
        } else {
            activeInput.value += keyValue;
        }

        // If Japanese is selected, convert input using Wanakana IME Mode
        if (selectedLanguage === 'ja') {
            const convertedValue = wanakana.toKana(activeInput.value, { IMEMode: true });
            activeInput.value = convertedValue;
        }

        // Move the caret to the end of the input field
        setTimeout(() => {
            activeInput.focus();
            activeInput.setSelectionRange(activeInput.value.length, activeInput.value.length); // Ensure caret is at the end
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

// Show or hide the keyboard based on input field focus
document.addEventListener('click', function (event) {
    if (!keyboard.contains(event.target) && !event.target.matches('input[type="text"]')) {
        keyboard.style.display = 'none';

        if (activeInput && selectedLanguage === 'ja' && activeInput.hasAttribute('wanakana-bound')) {
            wanakana.unbind(activeInput);  // Unbind if it was bound
            activeInput.removeAttribute('wanakana-bound');
        }

        activeInput = null;  // Reset activeInput
    }
});