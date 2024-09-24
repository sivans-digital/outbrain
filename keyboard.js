document.addEventListener('DOMContentLoaded', function () {

    // KEYBOARD HANDLING
    const keyboard = document.getElementById('keyboard');
    const virtualInputFields = document.querySelectorAll('input[type="text"]');
    let activeInput = null;

    virtualInputFields.forEach(input => {
        input.addEventListener('focus', function () {
            activeInput = this;
            document.getElementById('keyboard').style.display = 'block';
            if (selectedLanguage === 'ja' && !activeInput.hasAttribute('wanakana-bound')) {
                wanakana.bind(activeInput, {
                    IMEMode: true
                });
                activeInput.setAttribute('wanakana-bound', 'true');
            }
        });
        input.addEventListener('blur', function () {
            if (selectedLanguage === 'ja' && activeInput && activeInput.hasAttribute('wanakana-bound')) {
                wanakana.unbind(activeInput);
                activeInput.removeAttribute('wanakana-bound');
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
            // Convert input to Kana if Japanese is selected
            if (selectedLanguage === 'ja') {
                activeInput.value = wanakana.toKana(activeInput.value, {
                    IMEMode: true
                });
            }
            setTimeout(() => {
                activeInput.focus();
                activeInput.setSelectionRange(activeInput.value.length, activeInput.value.length);
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
                wanakana.bind(inputField, {
                    IMEMode: true
                });
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

});