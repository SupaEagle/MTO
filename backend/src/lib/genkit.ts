
import { genkit } from 'genkit';
import { vertexAI } from '@genkit-ai/vertexai';
import { gemini25Pro } from '@genkit-ai/googleai';

export const ai = genkit({
    plugins: [
        vertexAI({
            projectId: 'mansa-tina-ops',
            location: 'us-central1',
        }),
    ],
    model: gemini25Pro // Set default model if desired, or assume calls specify it
});
