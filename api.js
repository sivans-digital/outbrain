(function () {
    const OPENAI_API_KEY = 'disabled. Replace with new API key'; //REPLACE

    // Generalized function to generate prompts based on type (headline/anime)
    // Generalized function to generate prompts based on type (headline/anime)
    async function generatePrompt(type, gender, Q3Prompt, Q4Prompt, Q5Prompt, Q6Prompt, Q7Prompt, language) {
        let prompt;

        if (type === 'headline') {
            if (language === 'ja') {
                prompt = `カードのために、短くて楽しくキャッチーな見出しを作成してください。見出しの主人公であるユーザーは、${Q3Prompt}に行くのが好きです。ユーザーは${Q4Prompt}が得意で、${Q6Prompt}が好きです。ユーザーの夢は${Q7Prompt}と${Q5Prompt}を訪れることです。魅力的でクリエイティブにしてください。`;
            } else {
                prompt = `Create a short, fun and catchy headline for a card. The user, the hero of this headline, likes to go to ${Q3Prompt}. The user is good at ${Q4Prompt}, likes ${Q6Prompt}, and their dream is to visit ${Q7Prompt} and ${Q5Prompt}. Make it engaging and creative.`;
            }
        } else if (type === 'anime') {
            if (gender === 'other') {
                // Generate a mythical creature instead of a human
                const mythicalCreatures = ['phoenix', 'unicorn', 'dragon', 'griffin', 'wolf'];
                const selectedCreature = mythicalCreatures[Math.floor(Math.random() * mythicalCreatures.length)];
                prompt = `Create an anime-style image description. The character is a ${selectedCreature} who likes to go to ${Q3Prompt}, is good at ${Q4Prompt}, likes ${Q6Prompt}, and dreams of visiting ${Q7Prompt} and ${Q5Prompt}. Make it fun in anime style art.`;
            } else {
                // Generate a human character
                prompt = `Create an anime-style image description. The character is a ${gender} who likes to go to ${Q3Prompt}, is good at ${Q4Prompt}, likes ${Q6Prompt}, and dreams of visiting ${Q7Prompt} and ${Q5Prompt}. Make it fun in anime style art.`;
            }
        }

        return prompt;
    }


    // Generalized function to call OpenAI API
    async function callOpenAIAPI(type, gender, Q4Prompt, Q5Prompt, advice, language) {
        const prompt = await generatePrompt(type, gender, Q4Prompt, Q5Prompt, advice, language);

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
                    max_tokens: (type === 'headline') ? 50 : 100, // Adjust token limit based on type
                    temperature: 0.7
                })
            });

            const data = await response.json();
            if (data.choices && data.choices.length > 0) {
                return data.choices[0].message.content.trim();
            } else {
                console.error("No valid response received from API:", data);
                return type === 'headline' ? "Your Headline Here" : "An anime-style character description."; // Fallbacks
            }
        } catch (error) {
            console.error("Error generating response:", error);
            return type === 'headline' ? "Your Headline Here" : "An anime-style character description."; // Fallbacks
        }
    }

    // Anime image generation
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

    // Exposing the necessary functions to the global scope
    window.callOpenAIAPI = callOpenAIAPI;
    window.generateAnimeImage = generateAnimeImage;
})();
