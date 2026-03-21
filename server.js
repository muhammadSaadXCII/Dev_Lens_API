require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { default: ModelClient } = require('@azure-rest/ai-inference');
const { AzureKeyCredential } = require('@azure/core-auth');

const app = express();
const port = process.env.PORT;

const model = "gpt-4o-mini";
const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.github.ai/inference";

app.use(cors());
app.use(express.json());

app.post('/api/review', async (req, res) => {
    try {
        const { code } = req.body;

        const client = ModelClient(
            endpoint,
            new AzureKeyCredential(token),
        );

        const response = client.path("/chat/completions").post({
            body: {
                messages: [
                    {
                        role: "system", content: `You are a Senior Software Engineer. 
                        1. Detect the language. 
                        2. Point out bugs, performance issues, or security risks. 
                        3. Provide a 'Better Version' of the code. 
                        Format your response in clean Markdown.`
                    },
                    { role: "user", content: code }
                ],
                model: model
            }
        });

        res.status(201).json({ review: response.body.choices[0]["message"]["content"] });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on Port ${port}`);
});