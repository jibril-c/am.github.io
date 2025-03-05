const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

// API endpoint to call OpenAI API from the server
app.post('/get-ai-explanation', async (req, res) => {
    const { verse, tafseer } = req.body;

    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'text-davinci-003',
            prompt: `Explain the following Quran verse and its tafseer:\n\nVerse: ${verse}\nTafseer: ${tafseer}`,
            max_tokens: 100,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        res.json({ explanation: response.data.choices[0].text.trim() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
