// Declare selectedLanguage globally at the top of app.js
let selectedLanguage = '';

document.addEventListener('DOMContentLoaded', function () {
    let selectedTeam = '';
    let selectedGender = '';
    let selectedAnswers = {};
    let userName = '';

    // Team selection handling
    const outbrainTeam = document.getElementById('outbrainTeam');
    const onyxTeam = document.getElementById('onyxTeam');

    outbrainTeam.addEventListener('click', function () {
        selectedTeam = 'outbrain';
        highlightSelectedTeam(outbrainTeam, onyxTeam);
        applyTeamStyles('#EE6513', 'images/logo_OB.png');
    });

    onyxTeam.addEventListener('click', function () {
        selectedTeam = 'onyx';
        highlightSelectedTeam(onyxTeam, outbrainTeam);
        applyTeamStyles('#3BD4AE', 'images/logo_Onyx.png');
    });

    function highlightSelectedTeam(selectedCard, otherCard) {
        selectedCard.classList.add('selected');
        otherCard.classList.remove('selected');
    }

    function applyTeamStyles(mainColor, logoSrc) {
        document.documentElement.style.setProperty('--main-color', mainColor);
        document.getElementById('logo').src = logoSrc;

        // Show the team logo in logoContainer after page 1
        const teamLogo = document.getElementById('teamLogo');
        teamLogo.src = logoSrc;  // Update team logo
        teamLogo.style.display = 'block';  // Ensure it's visible

        document.querySelectorAll('.lang-button, .team-card.selected, button').forEach(element => {
            element.style.backgroundColor = mainColor;
        });
    }

    // Language selection handling
    document.getElementById('englishButton').addEventListener('click', function () {
        if (selectedTeam) {
            selectedLanguage = 'en';
            loadLanguage(selectedLanguage);
            navigateToNextPage(this);
        } else {
            alert('Please select a team first.');
        }
    });

    document.getElementById('japaneseButton').addEventListener('click', function () {
        if (selectedTeam) {
            selectedLanguage = 'ja';
            loadLanguage(selectedLanguage);
            navigateToNextPage(this);
        } else {
            alert('まずチームを選んでください');
        }
    });

    function loadLanguage(language) {
        let jsonData;
        if (language === 'en') {
            jsonData = document.getElementById('en-json').textContent;
        } else if (language === 'ja') {
            jsonData = document.getElementById('ja-json').textContent;
        }

        const translations = JSON.parse(jsonData.trim());
        applyTranslations(translations);
    }

    function applyTranslations(translations) {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[key]) {
                element.innerHTML = translations[key].replace(/\n/g, '<br>');
            }
        });
    }

    // Event listener for all 'Next' buttons using the common class
    document.querySelectorAll('.next-button').forEach(button => {
        button.addEventListener('click', function () {
            navigateToNextPage(this);
        });
    });

    // Navigate to the next page and ensure keyboard focus
    function navigateToNextPage(button) {
        const currentPage = button.closest('.page');
        const currentIndex = parseInt(currentPage.getAttribute('data-index'), 10);
        const nextPage = document.querySelector(`.page[data-index="${currentIndex + 1}"]`);

        if (nextPage) {
            goToPage(currentPage.id, nextPage.id);
        } else {
            console.log('No more pages available.');
        }
        showLogoAfterPage1();
    }

    function goToPage(currentPageId, nextPageId) {
        document.getElementById(currentPageId).classList.remove('active');
        document.getElementById(nextPageId).classList.add('active');
        showLogoAfterPage1();
        toggleKeyboardVisibility(nextPageId);  // Ensure keyboard visibility and input focus
    }

    // Show logo after page 1
    function showLogoAfterPage1() {
        const currentPage = document.querySelector('.page.active');
        const currentPageIndex = parseInt(currentPage.getAttribute('data-index'), 10);
        const logoContainer = document.getElementById('logoContainer');

        if (currentPageIndex > 1) {
            logoContainer.style.display = 'block';  // Show logo after page 1
        } else {
            logoContainer.style.display = 'none';  // Hide logo on page 1
        }
    }

    // Handle name input and store the value
    document.getElementById('next4').addEventListener('click', function () {
        const nameInput = document.getElementById('name').value.trim();
        if (nameInput === '') {
            alert('Please enter your name.');
            document.getElementById('name').focus();
            return;
        }
        userName = nameInput;
        selectedAnswers.name = userName;
        goToPage('page4', 'page5');
    });

    // Gender selection handling
    document.getElementById('maleButton').addEventListener('click', function () {
        selectedGender = 'male';
        selectedAnswers.gender = selectedGender;
        goToPage('page5', 'page6');
    });

    document.getElementById('femaleButton').addEventListener('click', function () {
        selectedGender = 'female';
        selectedAnswers.gender = selectedGender;
        goToPage('page5', 'page6');
    });

    document.getElementById('otherButton').addEventListener('click', function () {
        selectedGender = 'other';
        selectedAnswers.gender = selectedGender;
        goToPage('page5', 'page6');
    });

    // Multiple-choice question handling
    const multiChoiceButtons = document.querySelectorAll('button[id^="Q"]');
    multiChoiceButtons.forEach(button => {
        button.addEventListener('click', function () {
            const questionId = this.id.slice(0, 3);
            selectedAnswers[questionId] = this.getAttribute('data-translate');
            navigateToNextPage(this);
        });
    });

    // Input field handling
    document.querySelectorAll('input[type="text"]').forEach(inputField => {
        const nextButton = inputField.nextElementSibling;
        nextButton.addEventListener('click', function () {
            if (inputField.value.trim() === '') {
                alert('Please fill in the field.');
                inputField.focus();
                return;
            }

            const questionId = inputField.id;
            selectedAnswers[questionId] = inputField.value.trim();
            navigateToNextPage(this);
        });
    });

    // Navigation listeners for specific buttons
    addNavigationListener('yesButton', 'page2', 'page3');
    addNavigationListener('noButton', 'page2', 'page4');

    function addNavigationListener(buttonId, currentPageId, nextPageId) {
        document.getElementById(buttonId).addEventListener('click', function () {
            goToPage(currentPageId, nextPageId);
        });
    }

    // Camera Initialization
    document.getElementById('yesButton').addEventListener('click', function () {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
            const video = document.getElementById('video');
            video.srcObject = stream;
            video.play();
            goToPage('page2', 'page3');
        })
            .catch(error => {
            console.error("Error accessing the camera: ", error);
            alert("Unable to access the camera. Please check your settings.");
        });
    });

    // Capture button event listener for countdown and photo capture
    document.getElementById('captureButton').addEventListener('click', function () {
        const countdownOverlay = document.getElementById('countdownOverlay');
        const countdownText = document.getElementById('countdownText');
        let countdown = 3;  // Start countdown from 3 seconds

        countdownOverlay.style.display = 'flex';
        countdownText.textContent = countdown;

        const countdownInterval = setInterval(function () {
            countdown -= 1;
            countdownText.textContent = countdown;

            if (countdown === 0) {
                clearInterval(countdownInterval);
                countdownOverlay.style.display = 'none';

                const video = document.getElementById('video');
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const context = canvas.getContext('2d');
                context.drawImage(video, 0, 0);

                const imageData = canvas.toDataURL('image/png');
                document.getElementById('generatedImage').src = imageData;

                goToPage('page3', 'page4');
            }
        }, 1000);
    });

    // Handle the final submission
    document.getElementById('submit').addEventListener('click', function () {
        goToPageLoading();
    });

    async function goToPageLoading() {
        document.getElementById('lastQ').style.display = 'none';
        document.getElementById('pageLoading').style.display = 'block';

        try {
            // Assuming "selectedAnswers" contains all answers
            const generatedHeadline = await callOpenAIAPI('headline', selectedGender, selectedAnswers.Q3Prompt, selectedAnswers.Q4Prompt, selectedAnswers.Q5Prompt, selectedLanguage);
            document.getElementById('headline').textContent = generatedHeadline.slice(1, -1);

            const animePrompt = await callOpenAIAPI('anime', selectedGender, selectedAnswers.Q3Prompt, selectedAnswers.Q4Prompt, selectedAnswers.Q5Prompt, selectedLanguage);
            const animeImageUrl = await generateAnimeImage(animePrompt);

            if (animeImageUrl) {
                document.getElementById('generatedImage').src = animeImageUrl;
            } else {
                alert("Failed to generate the anime image. Please try again.");
            }

            // Display the stored name on the final card
            document.getElementById('cardName').textContent = userName;

            // Dynamically set the logo based on selected team
            const cardLogo = document.getElementById('cardLogo');
            if (selectedTeam === 'onyx') {
                cardLogo.src = 'images/logo_Onyx.png';
            } else {
                cardLogo.src = 'images/logo_white.svg';
            }

            document.getElementById('pageLoading').style.display = 'none';
            const finalPage = document.getElementById('pageLast');
            finalPage.classList.remove('hidden');
            finalPage.style.display = 'block';

            // Ensure the email field gains focus and the keyboard appears
            toggleKeyboardVisibility('pageLast');
        } catch (error) {
            console.error("Error during final page processing:", error);
            alert("An error occurred while generating your card. Please try again.");
        }
    }
});

// KEYBOARD HANDLING
const keyboard = document.getElementById('keyboard');
const inputFields = document.querySelectorAll('input[type="text"], input[type="email"]');
let activeInput = null;

inputFields.forEach(input => {
    input.addEventListener('focus', function () {
        activeInput = this;
        document.getElementById('keyboard').style.display = 'block';

        // Bind Wanakana to the focused input field for Japanese typing
        if (selectedLanguage === 'ja' && !activeInput.hasAttribute('wanakana-bound')) {
            wanakana.bind(activeInput, { IMEMode: true });
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

        // If Japanese is selected, convert input using Wanakana
        if (selectedLanguage === 'ja') {
            const convertedValue = wanakana.toKana(activeInput.value, { IMEMode: true });
            activeInput.value = convertedValue;
        }

        setTimeout(() => {
            activeInput.focus();
            activeInput.setSelectionRange(activeInput.value.length, activeInput.value.length);
        }, 0);
    });
});

// AUTO FOCUS FUNCTIONALITY
function toggleKeyboardVisibility(pageId) {
    const page = document.getElementById(pageId);
    const inputField = page.querySelector('input[type="text"], input[type="email"]');

    if (inputField) {
        setTimeout(() => {
            inputField.focus();
        }, 100);
        document.getElementById('keyboard').style.display = 'block';

        // Bind WanaKana for Japanese input
        if (selectedLanguage === 'ja') {
            wanakana.bind(inputField, { IMEMode: true });
        }
    } else {
        document.getElementById('keyboard').style.display = 'none';
    }
}

// Bind focus and keyboard visibility after card generation for the email input
document.getElementById('email').addEventListener('focus', function () {
    const inputField = this;
    setTimeout(() => {
        inputField.focus();
    }, 100);
    document.getElementById('keyboard').style.display = 'block';
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
