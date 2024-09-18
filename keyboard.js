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

        // Move the caret to the end of the input field after each key press
        setTimeout(() => {
            activeInput.focus();
            activeInput.setSelectionRange(activeInput.value.length, activeInput.value.length); // Ensure caret is at the end
        }, 0);
    });
});

// Auto-focus input fields and display keyboard when navigating pages
function toggleKeyboardVisibility(pageId) {
    const page = document.getElementById(pageId);
    const inputField = page.querySelector('input[type="text"], input[type="email"]');

    if (inputField) {
        setTimeout(() => {
            inputField.focus();
        }, 100);
        keyboard.style.display = 'block';

        // Bind WanaKana for Japanese input
        if (selectedLanguage === 'ja') {
            wanakana.bind(inputField, { IMEMode: true });
        }
    } else {
        keyboard.style.display = 'none';
    }
}

// Bind focus and keyboard visibility after card generation for the email input
document.getElementById('email').addEventListener('focus', function () {
    const inputField = this;
    setTimeout(() => {
        inputField.focus();
    }, 100);
    document.getElementById('keyboard').style.display = 'block'; // Show keyboard for email input
});

// Hide the keyboard when clicking outside of an input field
document.addEventListener('click', function (event) {
    if (!keyboard.contains(event.target) && !event.target.matches('input[type="text"], input[type="email"]')) {
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
