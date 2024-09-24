<?php include('./api.php'); ?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Outbrain | Be the Headline</title>
    <link href="https://fonts.googleapis.com/css2?family=Audiowide&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/main.min.css?ver=1.0.0">
    <link rel="icon" href="images/favicon.svg" type="image/x-icon">
</head>

<body>
    <div id="app">

        <div id="logoContainer" style="display: none;">
            <img id="teamLogo" src="" alt="Team Logo">
        </div>

        <div align="center">

                <!-- Page 1: Start Screen -->
                <div id="page1" class="page active" data-index="1">
                    <h1 class="title">create your own card<br>オリジナルカードを作ろう</י>
                        <h3>Choose a team & create your unique player card<br>チームを選んであなたのユニークな<br>プレイヤーカードを作成する</h3>

                        <div class="team-selection">
                            <div class="team-card" id="outbrainTeam">
                                <img src="images/card_outbrain.png">
                            </div>
                            <div class="team-card" id="onyxTeam">
                                <img src="images/card_onyx.png">
                            </div>
                        </div>
                        <div class="language-selection">
                            <button id="englishButton" class="lang-button">Start<br>🇺🇸</button>
                            <button id="japaneseButton" class="lang-button">スタート<br>🇯🇵</button>
                        </div>
                </div>

                <!-- Page 1B: T&C -->
                <div id="page1B" class="page" data-index="2">
                    <label class="title" data-translate="TnC"></label>
                    <h3 data-translate="conditions" style="text-align: left;"></h3>
                    <p data-translate="conditionsDisclaimer"></p>

                    <div class="checkbox-container">
                        <input type="checkbox" id="confirmCheckbox">
                        <label for="confirmCheckbox" data-translate="cbLabel"></label>
                    </div>

                    <button id="TnCnext" data-translate="letsGo" disabled></button>
                </div>

                <!-- Page 2: Permission to Take Photo -->
                <div id="page2" class="page" data-index="3">

                    <label class="title" data-translate="permissionPhoto"></label>
                    <h6 data-translate="photoDisclaimer"></h6> <!--FIX THIS PART-->

                    <div class="language-selection">
                        <button id="yesButton" data-translate="yes"></button>
                        <button id="noButton" data-translate="no"></button>
                    </div>
                </div>

                <!-- Page 3: Camera Capture -->
                <div id="page3" class="page" data-index="4">
                    <label class="title" data-translate="pose"></label>
                    <div id="videoContainer" style="position: relative; display: inline-block;">
                        <video id="video" autoplay></video>
                        <div id="countdownOverlay" style="display: none;">
                            <span id="countdownText" style="text-align: center">5</span>
                        </div>
                    </div>
                    <h3 data-translate="poseinstruction"></h3>
                    <button id="captureButton" class="position-bottom" data-translate="takePhoto"></button>
                </div>

                <!-- Page 4: Q1 Name Input -->
                <div id="page4" class="page" data-index="5">
                    <label class="title" data-translate="name"></label>
                    <input type="text" id="name" placeholder="Lara Croft" maxlength="25" required>
                    <button id="next4" data-translate="next" class="next-button position-bottom">Next</button>
                </div>

                <!-- Page 5: Q2 Gender Selection -->
                <div id="page5" class="page" data-index="6">
                    <label class="title" data-translate="gender">Select Your Gender</label>
                    <button id="maleButton" data-translate="male">Male</button>
                    <button id="femaleButton" data-translate="female">Female</button>
                    <button id="otherButton" data-translate="other">Other</button>
                </div>

                <!-- Page 6: Q3 A place you like -->
                <div id="page6" class="page" data-index="7">
                    <label class="title" data-translate="Q3Prompt"></label>
                    <button id="Q3A1" data-translate="Q3A1" data-answer="the mountains"></button>
                    <button id="Q3A2" data-translate="Q3A2" data-answer="The ocean"></button>
                    <button id="Q3A3" data-translate="Q3A3" data-answer="The city"></button>
                    <button id="Q3A4" data-translate="Q3A4" data-answer="their house"></button>
                </div>

                <!-- Page 7: Q4 Something you are good at -->
                <div id="page7" class="page" data-index="8">
                    <label class="title" data-translate="Q4Prompt"></label>
                    <input type="text" id="Q4Prompt" placeholder="" maxlength="25" required data-translate-placeholder="likePlaceholder">
                    <button id="next" data-translate="next" class="next-button position-bottom">Next</button>
                </div>

                <!-- Page 8: Q5 Where would you like to go? -->
                <div id="page8" class="page" data-index="9">
                    <label class="title" data-translate="Q5Prompt"></label>
                    <button id="Q5A1" data-translate="Q5A1" data-answer="Asia or Oceania"></button>
                    <button id="Q5A2" data-translate="Q5A2" data-answer="The Americas"></button>
                    <button id="Q5A3" data-translate="Q5A3" data-answer="Africa"></button>
                    <button id="Q5A4" data-translate="Q5A4" data-answer="Europe"></button>
                    <button id="Q5A5" data-translate="Q5A5" data-answer="Antartica"></button>
                </div>

                <!-- Page 9: Q6 Something you like -->
                <div id="page9" class="page" data-index="10">
                    <label class="title" data-translate="Q6Prompt"></label>
                    <input type="text" id="you_like" placeholder="" maxlength="25" required data-translate-placeholder="likePlaceholder">
                    <button id="next6" data-translate="next" class="next-button position-bottom">Next</button>
                </div>

                <!-- Page 10: Q7 What do you like about yourself -->
                <div id="page10" class="page" data-index="11">
                    <label class="title" data-translate="Q7Prompt"></label>
                    <button id="Q7A1" data-translate="Q7A1"></button>
                    <button id="Q7A2" data-translate="Q7A2"></button>
                    <button id="Q7A3" data-translate="Q7A3"></button>
                    <button id="Q7A4" data-translate="Q7A4"></button>
                </div>

                <!-- Page 11: Q8 How often do you game? -->
                <div id="page11" class="page" data-index="12">
                    <label class="title" data-translate="Q8Prompt"></label>
                    <button id="Q8A1" data-translate="Q8A1"></button>
                    <button id="Q8A2" data-translate="Q8A2"></button>
                    <button id="Q8A3" data-translate="Q8A3"></button>
                    <button id="Q8A4" data-translate="Q8A4"></button>
                </div>

                <!-- Page 13: Q10 Are you interested in online marketing? -->
                <div id="page13" class="page" data-index="13">
                    <label class="title" data-translate="Q10Prompt"></label>
                    <button id="Q10A1" data-translate="Q10A1"></button>
                    <button id="Q10A2" data-translate="Q10A2"></button>
                </div>

                <!-- LAST Q Your company's name -->
                <div id="lastQ" class="page" data-index="14">
                    <label class="title" data-translate="lastQPrompt"></label>
                    <input type="text" id="interest" placeholder="" maxlength="25" required data-translate-placeholder="likePlaceholder">
                    <button type="submit" id="submit" data-translate="submit">Submit</button>
                </div>


            <!-- Loading Screen -->
            <div id="pageLoading" class="page" data-index="15">
                <label class="title" data-translate="generating">Generating your personalized card...</label>
                <h3 data-translate="wait"></h3>
                <div class="container">
                    <div class="box">
                        <div class="loader1"></div>
                    </div>
                </div>
            </div>

            <!-- Page Last: Result - Displaying the Card -->
            <div id="pageLast" class="page" data-index="16">
                <div id="card">
                    <div id="cardName"></div> <!-- This is where the name will be displayed -->
                    <img id="generatedImage">
                    <p id="tagline">Outbrain Gaming News</p>
                    <h2 id="headline">Your Headline Here</h2>
                    <img id="cardLogo" src="images/logo_white.svg" alt="Card Logo">
                </div>
                <div id="emailContainer">
                    <input type="email" id="email" placeholder="Email" required>
                </div>
                <div id="buttonContainer">
                    <button id="downloadButton" data-translate="send"></button>
                </div>
            </div>

            <!-- On-Screen Keyboard -->
            <div id="keyboard" style="display: none;">
                <div class="keyboard-row">
                    <button class="key">Q</button>
                    <button class="key">W</button>
                    <button class="key">E</button>
                    <button class="key">R</button>
                    <button class="key">T</button>
                    <button class="key">Y</button>
                    <button class="key">U</button>
                    <button class="key">I</button>
                    <button class="key">O</button>
                    <button class="key">P</button>
                </div>
                <div class="keyboard-row">
                    <button class="key">A</button>
                    <button class="key">S</button>
                    <button class="key">D</button>
                    <button class="key">F</button>
                    <button class="key">G</button>
                    <button class="key">H</button>
                    <button class="key">J</button>
                    <button class="key">K</button>
                    <button class="key">L</button>
                </div>
                <div class="keyboard-row">
                    <button class="key">Z</button>
                    <button class="key">X</button>
                    <button class="key">C</button>
                    <button class="key">V</button>
                    <button class="key">B</button>
                    <button class="key">N</button>
                    <button class="key">M</button>
                    <button class="key">←</button>
                </div>
                <div class="keyboard-row">
                    <button class="key">-</button>
                    <button class="key" style="width: 50%;">Space</button>
                    <button class="key">@</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Link to the JavaScript files -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://unpkg.com/wanakana"></script> <!-- Add Wanakana CDN -->
    <script src="app.js?ver=1.0.1"></script>
    <script src="keyboard.js?ver=1.0.1"></script>
    <!-- <script src="api.js?ver=1.0.0"></script> -->

    <!-- English JSON data -->
    <script id="en-json" type="application/json">
        {
            "TnC": "Terms and\nConditions",
            "conditions": "The information you enter in this game will be used for the purpose of generating digital cards and sending it to you, as well as for Outbrain's marketing and sales activities. In addition, image data will not be saved and will not be used for any activities.",
            "conditionsDisclaimer": "For details, please see Outbrain's Privacy Policy (https://www.outbrain.com/privacy/)",
            "cbLabel": "Confirmed",
            "letsGo": "Let's go!",
            "permissionPhoto": "Can we take a photo?",
            "photoDisclaimer": "*Your photo won't be stored",
            "pose": "Pose for the camera!",
            "poseinstruction": "Get ready! You have 5 seconds and only one chance",
            "takePhoto": "Take Photo",
            "name": "Please enter your full name",
            "next": "Next",
            "gender": "Select Your Gender",
            "male": "Male",
            "female": "Female",
            "other": "Other",
            "Q3Prompt": "A place you like",
            "Q3A1": "The mountains",
            "Q3A2": "The ocean",
            "Q3A3": "The city",
            "Q3A4": "My room",
            "Q4Prompt": "Something you are \n good at",
            "Q5Prompt": "Where would you \n like to go?",
            "Q5A1": "Asia or Oceania",
            "Q5A2": "The Americas",
            "Q5A3": "Africa",
            "Q5A4": "Europe",
            "Q5A5": "Antartica",
            "Q6Prompt": "Something you like?",
            "Q6Placeholder": "Cats, maybe?",
            "Q7Prompt": "What do you like \n about yourself",
            "Q7A1": "I'm positive",
            "Q7A2": "I'm compassionate",
            "Q7A3": "I Never give up",
            "Q7A4": "All of the above",
            "Q8Prompt": "How often do you game?",
            "Q8A1": "Every day",
            "Q8A2": "Weekly",
            "Q8A3": "Monthly",
            "Q8A4": "I don't game much",
            "Q10Prompt": "Do you have a chance to use online advertising?",
            "Q10A1": "Yes",
            "Q10A2": "No",
            "lastQPrompt": "What's your company's name",
            "lastQPlaceholder": "Outbrain",
            "yes": "Yes",
            "no": "No",
            "generating": "Generating your personalized card...",
            "wait": "Please wait a moment ˖✧˖°☆",
            "send": "Send My Card"

        }
    </script>

    <!-- Japanese JSON data -->
    <script id="ja-json" type="application/json">
        {
            "permissionPhoto": "写真を撮りますか？",
            "TnC": "利用規約",
            "conditions": "このゲームで入力いただく情報は、デジタルカード生成/及びお客様ご自身へ送付する目的、及び、Outbrainのマーケティング・セールス活動のために使用させていただきます。尚、画像データは保存せず、いかなる活動にも利用いたしません。",
            "conditionsDisclaimer": "詳細はOutbrain プライバシーポリシー(https://www.outbrain.com/privacy/) をご覧下さい。",
            "cbLabel": " 確認しました",
            "letsGo": "次へ進む",
            "photoDisclaimer": "※画像は保存されません",
            "pose": "カメラに向かって\nポーズを取ってください！",
            "poseinstruction": "「写真を撮る」ボタンを押すと、\nカウントダウン（５秒）が始まります",
            "takePhoto": "写真を撮る",
            "name": "フルネーム（ひらがな）を\n入力してください",
            "next": "次へ",
            "gender": "性別を選択してください",
            "male": "男性",
            "female": "女性",
            "other": "その他",
            "Q3Prompt": "好きな場所を教えてください",
            "Q3A1": "山",
            "Q3A2": "海",
            "Q3A3": "都会",
            "Q3A4": "自分の家・部屋",
            "Q4Prompt": "得意なことを教えてください",
            "Q5Prompt": "行きたい場所はどこですか",
            "Q5A1": "アジアまたはオセアニア",
            "Q5A2": "アメリカ大陸",
            "Q5A3": "アフリカ",
            "Q5A4": "ヨーロッパ",
            "Q5A5": "南極",
            "Q6Prompt": "好きなもの（こと）は\nなんですか",
            "Q6Placeholder": "猫かな〜",
            "Q7Prompt": "自分の好きなところは\nどこですか",
            "Q7Placeholder": "Owning a unicorn",
            "Q7A1": "前向き",
            "Q7A2": "思いやりがある",
            "Q7A3": "決してあきらめない",
            "Q7A4": "全部！ ",
            "Q8Prompt": "どのくらいゲームをしますか",
            "Q8A1": "毎日",
            "Q8A2": "週に1−2回",
            "Q8A3": "月に1−2回",
            "Q8A4": "あまりゲームはしない",
            "Q10Prompt": "オンライン広告を利用する\n機会はありますか？",
            "Q10A1": "はい",
            "Q10A2": "いいえ",
            "lastQPrompt": "会社名を教えてください",
            "lastQPlaceholder": "Pixel architect",
            "submit": "送信",
            "like": "好きな物は？",
            "likePlaceholder": "猫かな〜",
            "yes": "はい",
            "no": "いいえ",
            "submit": "送信",
            "generating": "あなたのカードを\n生成中です...",
            "wait": "少々お待ちください ˖✧˖°☆",
            "send": "カードを送ってください"
        }
    </script>

</body>

</html>