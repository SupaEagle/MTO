import { VertexAI, GenerativeModel } from '@google-cloud/vertexai';

// Initialize Vertex AI once
const vertexAI = new VertexAI({ project: 'mansa-tina-ops', location: 'us-central1' });

export abstract class BaseAgent {
    protected model: any;

    constructor(systemInstruction: string) {
        // We use the Preview Flash model for maximum speed/cost ratio
        this.model = vertexAI.preview.getGenerativeModel({
            model: 'gemini-2.0-flash-exp', // <--- THE FLASH ENGINE
            systemInstruction: {
                role: 'system',
                parts: [{ text: `You are an expert Brand Strategist. ${systemInstruction}` }]
            },
            generationConfig: {
                responseMimeType: 'application/json', // Force JSON Output
                temperature: 0.7,
            }
        });
    }

    // The method every agent uses to "Think"
    async run(prompt: string): Promise<any> {
        try {
            const result = await this.model.generateContent({
                contents: [{ role: 'user', parts: [{ text: prompt }] }]
            });
            const text = result.response.candidates?.[0].content.parts[0].text;
            if (!text) throw new Error("No output generated");

            // Clean up markdown code blocks if the model includes them
            const cleanedText = text.replace(/```json|```/g, '').trim();
            return JSON.parse(cleanedText);
        } catch (error) {
            console.error("Agent Failure:", error);
            return {}; // Handle gracefully
        }
    }
}
