// KEYBOARD HANDLING
const keyboard = document.getElementById('keyboard');
const inputFields = document.querySelectorAll('input[type="text"]');
let activeInput = null;

inputFields.forEach(input => {
    input.addEventListener('focus', function () {
    console.log('Input focused, Wanakana binding...');
        activeInput = this;
        document.getElementById('keyboard').style.display = 'block';

        // Bind WanaKana to the focused input field for Japanese typing
        if (selectedLanguage === 'ja') {
            wanakana.bind(activeInput, { IMEMode: true });
            console.log("Current selected language in keyboard.js:", selectedLanguage);  // Debug log

        }
    });

    input.addEventListener('blur', function () {
        // Unbind WanaKana when the input field loses focus if it is active
        if (selectedLanguage === 'ja') {
            wanakana.unbind(activeInput);
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
