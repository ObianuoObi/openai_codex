import express from 'express'; 
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config(); // Load .env file

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
}); // Load OpenAI API key from .env file

const openai = new OpenAIApi(configuration); // Create OpenAI API object

const app = express(); // Create Express app
app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON parsing from backend to frontend

app.get('/', async (req, res) => {
    res.status.send({ 
        message: 'Hello from Codex'
    })

}); // Create GET route

app.post('/', async (res, req) => {
    try{
        const prompt = req.body.prompt; // Get prompt from request body

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        }) // Create completion using OpenAI API

    res.status(200).send({
        bot: response.data.choices[0].text // Send response from OpenAI API to frontend
    })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error }) 
    }
}) // Create POST route

app.listen(5000, () => console.log('Server running on port http://localhost:5000'));
