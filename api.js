(function () {
    const OPENAI_API_KEY = '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'; 

async function generateHeadlineWithAI(gender, interest, advice, language) {
    let prompt;

    if (language === 'ja') {
        prompt = `カード用に、楽しくキャッチーな見出しを作成してください。クリックベイト風で、ユーザーがこの見出しの主人公です。ユーザーは${interest}に興味があり、ビジネスアドバイスは ${advice} です。エンゲージメントを高め、クリエイティブなものにしてください。`;
    } else {
        prompt = `Create a fun and catchy headline for a card, clickbait style. The user is the hero of this headline, is interested in ${interest}, and their business advice is ${advice}. Make it engaging and creative.`;
    }

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: prompt }
                ],
                max_tokens: 50,
                temperature: 0.7
            })
        });

        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
            return data.choices[0].message.content.trim();
        } else {
            console.error("No valid response received from API:", data);
            return "Your Headline Here"; // Fallback headline
        }
    } catch (error) {
        console.error("Error generating headline:", error);
        return "Your Headline Here"; // Fallback headline
    }
}


    async function generateAnimePrompt(gender, advice, interest) {
    let prompt;

    if (gender === 'otherButton') {
        // Generate a mythical creature instead of a human
        const mythicalCreatures = ['phoenix', 'unicorn', 'dragon', 'griffin', 'wolf'];
        const selectedCreature = mythicalCreatures[Math.floor(Math.random() * mythicalCreatures.length)];
        prompt = `
        Create an anime-style image description. The character is a ${selectedCreature}. and their wisdom is "${advice}". The image should be vibrant and in modern anime style.The background should be related to ${interest}`;
    } else {
        // Generate a human character
        prompt = `
        Create an anime-style image description. The character is a ${gender} who is interested in ${interest} and their wisdom is "${advice}". The image should be vibrant and in modern anime style.The background should be related to ${interest}`;
    }

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [{ role: "user", content: prompt }],
                max_tokens: 100,
                temperature: 0.7
            })
        });

        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
            return data.choices[0].message.content.trim();
        } else {
            console.error("GPT Response Error:", data);
            return "An anime-style character description."; // Fallback description
        }
    } catch (error) {
        console.error("Error generating anime prompt:", error);
        return "An anime-style character description."; // Fallback description
    }
}

    async function generateAnimeImage(animePrompt) {
        try {
            const response = await fetch("https://api.openai.com/v1/images/generations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: "dall-e-3",
                    prompt: animePrompt,
                    size: "1024x1024",
                    response_format: "url"
                })
            });

            const data = await response.json();
            if (data.error) {
                console.error("Image Generation Error:", data.error.message);
                return null;
            }

            if (data.data && data.data.length > 0) {
                return data.data[0].url;
            } else {
                console.error("Unexpected Image Generation Response:", data);
                return null;
            }
        } catch (error) {
            console.error("Error generating anime image:", error);
            return null;
        }
    }

    window.generateHeadlineWithAI = generateHeadlineWithAI;
    window.generateAnimePrompt = generateAnimePrompt;
    window.generateAnimeImage = generateAnimeImage;
})();
