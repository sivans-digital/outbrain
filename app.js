let selectedLanguage = ''; // Global declaration

document.addEventListener('DOMContentLoaded', function () {
    let selectedTeam = '';
    let selectedTeamColor = '#9C9C9C'; // Default color
    let selectedGender = '';
    let selectPlaceYouLikeStay = '';
    let selectPlaceYouLikeGo = '';
    let selectAboutYourself = '';
    let selectedAnswers = {};
    let userName = '';

    // Team selection handling
    let outbrainTeam = document.getElementById('outbrainTeam');
    let onyxTeam = document.getElementById('onyxTeam');

    outbrainTeam.addEventListener('click', function () {
        selectedTeam = 'outbrain';
        selectedTeamColor = '#EE6513'; // Outbrain team color
        highlightSelectedTeam(outbrainTeam, onyxTeam);
        applyTeamStyles(selectedTeamColor, 'images/logo_OB.png');
    });

    onyxTeam.addEventListener('click', function () {
        selectedTeam = 'onyx';
        selectedTeamColor = '#3BD4AE'; // Onyx team color
        highlightSelectedTeam(onyxTeam, outbrainTeam);
        applyTeamStyles(selectedTeamColor, 'images/logo_Onyx.png');
    });

    function highlightSelectedTeam(selectedCard, otherCard) {
        selectedCard.classList.add('selected');
        otherCard.classList.remove('selected');
    }

    function applyTeamStyles(mainColor, logoSrc) {
        document.documentElement.style.setProperty('--main-color', mainColor);
        // Update the correct logo container
        let logoElement = document.getElementById('teamLogo');
        if (logoElement) {
            logoElement.src = logoSrc; // Ensure you're updating the correct image element
        }

        // Update the button and selected team card styles
        document.querySelectorAll('.lang-button, .team-card.selected').forEach(element => {
            element.style.backgroundColor = mainColor;
        });
    }
    // Language selection handling
    document.getElementById('englishButton').addEventListener('click', function () {
        if (selectedTeam) {
            selectedLanguage = 'en';
            loadLanguage(selectedLanguage);
            navigateToNextPage(this);
            selectedAnswers.language = selectedLanguage; // Store language
        } else {
            alert('Please select a team first.');
        }
    });

    document.getElementById('japaneseButton').addEventListener('click', function () {
        if (selectedTeam) {
            selectedLanguage = 'ja';
            loadLanguage(selectedLanguage);
            navigateToNextPage(this);
            selectedAnswers.language = selectedLanguage; // Store language
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

        let translations = JSON.parse(jsonData.trim());
        applyTranslations(translations);
    }

    function applyTranslations(translations) {
        document.querySelectorAll('[data-translate]').forEach(element => {
            let key = element.getAttribute('data-translate');
            if (translations[key]) {
                element.innerHTML = translations[key].replace(/\n/g, '<br>');
            }
        });
    }

    // T&C checkbox and button logic
    let confirmCheckbox = document.getElementById('confirmCheckbox');
    let TnCnextButton = document.getElementById('TnCnext');

    // Initialize the button as disabled
    function initializeButton() {
        TnCnextButton.disabled = true;
        TnCnextButton.style.backgroundColor = '#9C9C9C'; // Set disabled color
        TnCnextButton.style.cursor = 'not-allowed';
    }

    // Initialize the button state when the page is loaded
    initializeButton();

    // Checkbox change listener to toggle button state
    confirmCheckbox.addEventListener('change', function () {
        if (this.checked) {
            TnCnextButton.disabled = false;
            TnCnextButton.style.backgroundColor = selectedTeamColor; // Change to team color
            TnCnextButton.style.cursor = 'pointer';
        } else {
            initializeButton(); // Reset button to disabled state
        }
    });

    // Button click event to navigate to page2
    TnCnextButton.addEventListener('click', function () {
        if (!TnCnextButton.disabled) {
            goToPage('page1B', 'page2');
        }
    });

    // Navigation function
    function goToPage(currentPageId, nextPageId) {
        document.getElementById(currentPageId).classList.remove('active');
        document.getElementById(nextPageId).classList.add('active');
        showLogoAfterPage1();
        toggleKeyboardVisibility(nextPageId); // Ensure keyboard visibility and input focus
    }

    // Show logo after page 1
    function showLogoAfterPage1() {
        let currentPage = document.querySelector('.page.active');
        let currentPageIndex = parseInt(currentPage.getAttribute('data-index'), 10);
        let logoContainer = document.getElementById('logoContainer');

        if (currentPageIndex > 1) {
            logoContainer.style.display = 'block'; // Show logo after page 1
        } else {
            logoContainer.style.display = 'none'; // Hide logo on page 1
        }
    }

    // Handle name input and store the value
    document.getElementById('next4').addEventListener('click', function () {
        let nameInput = document.getElementById('name').value.trim();
        if (nameInput === '') {
            alert('Please enter your name.');
            document.getElementById('name').focus();
            return;
        }else{
            userName = nameInput;
            selectedAnswers.name = userName;
            goToPage('page4', 'page5');
        }
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

    // Place you like stay selection handling
    document.getElementById('Q3A1').addEventListener('click', function () {
        selectPlaceYouLikeStay = 'the mountains';
        selectedAnswers.Q3Prompt = selectPlaceYouLikeStay;
        goToPage('page6', 'page7');
    });

    document.getElementById('Q3A2').addEventListener('click', function () {
        selectPlaceYouLikeStay = 'the ocean';
        selectedAnswers.Q3Prompt = selectPlaceYouLikeStay;
        goToPage('page6', 'page7');
    });

    document.getElementById('Q3A3').addEventListener('click', function () {
        selectPlaceYouLikeStay = 'The city';
        selectedAnswers.Q3Prompt = selectPlaceYouLikeStay;
        goToPage('page6', 'page7');
    });

    document.getElementById('Q3A4').addEventListener('click', function () {
        selectPlaceYouLikeStay = 'staying in the house';
        selectedAnswers.Q3Prompt = selectPlaceYouLikeStay;
        goToPage('page6', 'page7');
    });

    // Place you like go selection handling
    document.getElementById('Q5A1').addEventListener('click', function () {
        selectPlaceYouLikeGo = 'Asia or Oceania';
        selectedAnswers.Q5Prompt = selectPlaceYouLikeGo;
        goToPage('page7', 'page8');
    });

    document.getElementById('Q5A2').addEventListener('click', function () {
        selectPlaceYouLikeGo = 'The Americas';
        selectedAnswers.Q5Prompt = selectPlaceYouLikeGo;
        goToPage('page7', 'page8');
    });

    document.getElementById('Q5A3').addEventListener('click', function () {
        selectPlaceYouLikeGo = 'Africa';
        selectedAnswers.Q5Prompt = selectPlaceYouLikeGo;
        goToPage('page7', 'page8');
    });

    document.getElementById('Q5A4').addEventListener('click', function () {
        selectPlaceYouLikeGo = 'Europe';
        selectedAnswers.Q5Prompt = selectPlaceYouLikeGo;
        goToPage('page7', 'page8');
    });

    document.getElementById('Q5A5').addEventListener('click', function () {
        selectPlaceYouLikeGo = 'Antartica';
        selectedAnswers.Q5Prompt = selectPlaceYouLikeGo;
        goToPage('page7', 'page8');
    });

    // Something you like to do
    document.getElementById('next6').addEventListener('click', function () {
        let youLikeInput = document.getElementById('you_like').value.trim();
        console.log('You Like: ' + youLikeInput);

        if (youLikeInput === '') {
            alert('Please enter your name.');
            return;
        }

        selectedAnswers.Q6Prompt = youLikeInput;
        goToPage('page9', 'page10');
    });

    // Like about yourself
    document.getElementById('Q7A1').addEventListener('click', function () {
        selectAboutYourself = "I'm positive";
        selectedAnswers.Q7Prompt = selectAboutYourself;
        goToPage('page9', 'page10');
    });

    document.getElementById('Q7A2').addEventListener('click', function () {
        selectAboutYourself = "I'm compassionate";
        selectedAnswers.Q7Prompt = selectAboutYourself;
        goToPage('page9', 'page10');
    });

    document.getElementById('Q7A3').addEventListener('click', function () {
        selectAboutYourself = "I Never give up";
        selectedAnswers.Q7Prompt = selectAboutYourself;
        goToPage('page9', 'page10');
    });

    document.getElementById('Q7A4').addEventListener('click', function () {
        selectAboutYourself = "All of the above";
        selectedAnswers.Q7Prompt = selectAboutYourself;
        goToPage('page9', 'page10');
    });


    // Multiple-choice question handling
    let multiChoiceButtons = document.querySelectorAll('button[id^="Q"]');
    multiChoiceButtons.forEach(button => {
        button.addEventListener('click', function () {
            let questionId = this.id.slice(0, 3);
            selectedAnswers[questionId] = this.getAttribute('data-translate');
            navigateToNextPage(this);
        });
    });

    // Input field handling
    document.querySelectorAll('input[type="text"]').forEach(inputField => {
        let nextButton = inputField.nextElementSibling;
        nextButton.addEventListener('click', function () {
            if (inputField.value.trim() === '') {
                inputField.focus();
                return;
            }else{
                let questionId = inputField.id;
                selectedAnswers[questionId] = inputField.value.trim(); // Save the answer properly
                navigateToNextPage(this); // Ensure this is only called if input is valid
            }
        });
    });

    // // Event listener for all 'Next' buttons using the common class
    // document.querySelectorAll('.next-button').forEach(button => {
    //     button.addEventListener('click', function () {
    //         navigateToNextPage(this);
    //     });
    // });

    // Navigate to the next page and ensure keyboard focus
    function navigateToNextPage(button) {
        let currentPage = button.closest('.page');
        let currentIndex = parseInt(currentPage.getAttribute('data-index'), 10);
        let nextPage = document.querySelector(`.page[data-index="${currentIndex + 1}"]`);


        if (nextPage) {
            goToPage(currentPage.id, nextPage.id);
        } else {
            console.log('No more pages available.');
        }
        showLogoAfterPage1();
    }

    // Navigation listener for the "No" button to jump directly to page 4
    document.getElementById('noButton').addEventListener('click', function () {
        goToPage('page2', 'page4'); // Jump directly to page 4 when "No" is clicked
    });


    // Camera Initialization
    document.getElementById('yesButton').addEventListener('click', function () {
        navigator.mediaDevices.getUserMedia({
                video: true
            })
            .then(stream => {
                let video = document.getElementById('video');
                video.srcObject = stream;
                video.play();
                goToPage('page2', 'page3'); // Correct navigation to camera
            })
            .catch(error => {
                console.error("Error accessing the camera: ", error);
                alert("Unable to access the camera. Please check your camera settings and permissions.");
            });
    });

    // Handle camera capture
    document.getElementById('captureButton').addEventListener('click', function () {
        let countdownOverlay = document.getElementById('countdownOverlay');
        let countdownText = document.getElementById('countdownText');
        let countdown = 5;

        countdownOverlay.style.display = 'flex';
        countdownText.textContent = countdown;

        let countdownInterval = setInterval(function () {
            countdown -= 1;
            countdownText.textContent = countdown;

            if (countdown === 0) {
                clearInterval(countdownInterval);
                countdownOverlay.style.display = 'none';

                let video = document.getElementById('video');
                let canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                let context = canvas.getContext('2d');
                context.drawImage(video, 0, 0);

                let imageData = canvas.toDataURL('image/png');
                document.getElementById('generatedImage').src = imageData;

                goToPage('page3', 'page4');
            }
        }, 1000);
    });

    // Handle the final submission
    document.getElementById('next6').addEventListener('click', function () {
        goToPageLoading();
    });

    async function goToPageLoading() {

        try {
            // Pass language from selectedAnswers to the callOpenAIAPI function
            let generatedHeadline = await callOpenAIAPI(
                'headline',
                selectedAnswers.gender,
                selectedAnswers.Q3Prompt,
                selectedAnswers.Q4Prompt,
                selectedAnswers.Q5Prompt,
                selectedAnswers.Q6Prompt,
                selectedAnswers.Q7Prompt,
                selectedAnswers.language // Pass language correctly here
            );

            document.getElementById('headline').textContent = generatedHeadline.slice(1, -1);

            let animePrompt = await callOpenAIAPI(
                'anime',
                selectedAnswers.gender,
                selectedAnswers.Q3Prompt,
                selectedAnswers.Q4Prompt,
                selectedAnswers.Q5Prompt,
                selectedAnswers.Q6Prompt,
                selectedAnswers.Q7Prompt,
                selectedAnswers.language // Pass language correctly here
            );

            let animeImageUrl = await generateAnimeImage(animePrompt);

            if (animeImageUrl) {
                document.getElementById('generatedImage').src = animeImageUrl;
            } else {
                alert("Failed to generate the anime image. Please try again.");
            }

            document.getElementById('cardName').textContent = userName;

            let cardLogo = document.getElementById('cardLogo');
            if (selectedTeam === 'onyx') {
                cardLogo.src = 'images/logo_Onyx.png';
            } else {
                cardLogo.src = 'images/logo_white.svg';
            }

            toggleKeyboardVisibility('pageLast');
        } catch (error) {
            console.error("Error during final page processing:", error);
            alert("An error occurred while generating your card. Please try again.");
        }
    }
});

// Show final result after submit
document.getElementById('submit').addEventListener('click', function () {
    document.getElementById('pageLoading').style.display = 'block';
    let finalPage = document.getElementById('pageLast');

    setTimeout(() => {
        document.getElementById('lastQ').style.display = 'none';
        document.getElementById('pageLoading').style.display = 'none';
        finalPage.classList.remove('hidden');
        finalPage.style.display = 'block';
    }, 2000);

});

// KEYBOARD HANDLING
// let keyboard = document.getElementById('keyboard');
let inputFields = document.querySelectorAll('input[type="text"], input[type="email"]');
let activeInput = null;

inputFields.forEach(input => {
    input.addEventListener('focus', function () {
        activeInput = this;
        document.getElementById('keyboard').style.display = 'block';

        // Bind Wanakana to the focused input field for Japanese typing
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

// AUTO FOCUS FUNCTIONALITY
function toggleKeyboardVisibility(pageId) {
    let page = document.getElementById(pageId);
    let inputField = page.querySelector('input[type="text"], input[type="email"]');

    if (inputField) {
        setTimeout(() => {
            inputField.focus();
        }, 100);
        document.getElementById('keyboard').style.display = 'block';

        if (selectedLanguage === 'ja') {
            wanakana.bind(inputField, {
                IMEMode: true
            });
        }
    } else {
        document.getElementById('keyboard').style.display = 'none';
    }
}

// Hide the keyboard when clicking outside of an input field
document.addEventListener('click', function (event) {
    if (!keyboard.contains(event.target) && !event.target.matches('input[type="text"], input[type="email"]')) {
        keyboard.style.display = 'none';
        if (activeInput) {
            activeInput.blur();
            if (selectedLanguage === 'ja') {
                // wanakana.unbind(activeInput);
            }
            activeInput = null;
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    let selectedTeam = '';
    let selectedTeamColor = '#9C9C9C'; // Default color
    let logo = document.getElementById('teamLogo');

    // Hide the logo on page 1 and display it on other pages
    function showLogoAfterPage1() {
        let currentPage = document.querySelector('.page.active');
        let currentPageIndex = parseInt(currentPage.getAttribute('data-index'), 10);

        if (currentPageIndex > 1) {
            logo.style.display = 'block'; // Ensure the logo is visible
        } else {
            logo.style.display = 'none'; // Hide logo on page 1
        }
    }

    // Team selection handling
    let outbrainTeam = document.getElementById('outbrainTeam');
    let onyxTeam = document.getElementById('onyxTeam');

    outbrainTeam.addEventListener('click', function () {
        selectedTeam = 'outbrain';
        selectedTeamColor = '#EE6513'; // Outbrain team color
        logo.style.width = '100%'
        applyTeamStyles(selectedTeamColor, 'images/logo_OB.png');
    });

    onyxTeam.addEventListener('click', function () {
        selectedTeam = 'onyx';
        selectedTeamColor = '#3BD4AE'; // Onyx team color
        logo.style.width = '70%'
        applyTeamStyles(selectedTeamColor, 'images/logo_Onyx.png');
    });

    function applyTeamStyles(mainColor, logoSrc) {
        document.documentElement.style.setProperty('--main-color', mainColor);
        document.getElementById('teamLogo').src = logoSrc; // Dynamically change the logo
        document.querySelectorAll('.lang-button, .team-card.selected').forEach(element => {
            element.style.backgroundColor = mainColor;
        });
    }

    // Trigger page transition and update logo visibility
    function goToPage(currentPageId, nextPageId) {
        document.getElementById(currentPageId).classList.remove('active');
        document.getElementById(nextPageId).classList.add('active');
        showLogoAfterPage1(); // Check logo visibility when changing pages
    }

    // Additional logic here...

    // On team selection or language selection, navigate to the next page
    document.getElementById('englishButton').addEventListener('click', function () {
        if (selectedTeam) {
            goToPage('page1', 'page1B');
        } else {
            alert('Please select a team first.');
        }
    });

    document.getElementById('japaneseButton').addEventListener('click', function () {
        if (selectedTeam) {
            goToPage('page1', 'page1B');
        } else {
            alert('まずチームを選んでください');
        }
    });
});

document.getElementById('downloadButton').addEventListener('click', function () {
    let downloadButton = this;
    let countdown = 3; // Start countdown from 3 seconds

    // Change the button text to "Thank you <br> returning to homepage in X seconds"
    downloadButton.innerHTML = `Thank you <br> returning to homepage in ${countdown}`;

    // Start the countdown
    let countdownInterval = setInterval(function () {
        countdown--; // Decrease countdown by 1
        downloadButton.innerHTML = `Thank you <br> returning to homepage in ${countdown}`; // Update button text

        if (countdown === 0) {
            clearInterval(countdownInterval); // Stop the countdown
            window.location.reload(); // Reload the page to return to page1
        }
    }, 1000); // 1000 milliseconds = 1 second
});