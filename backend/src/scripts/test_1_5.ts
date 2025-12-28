
import { VertexAI } from '@google-cloud/vertexai';

async function checkOneFivePro() {
    const projectId = 'mansa-tina-ops'; // 284915496002
    const location = 'us-central1';
    const modelId = 'gemini-1.5-pro-001';

    console.log(`Checking ${modelId} for ${projectId} in ${location}...`);

    const vertexAI = new VertexAI({ project: projectId, location: location });
    const generativeModel = vertexAI.getGenerativeModel({ model: modelId });

    try {
        const resp = await generativeModel.generateContent('Hello, verify connection.');
        console.log('✅ Success! Raw response:', JSON.stringify(resp, null, 2));
    } catch (err: any) {
        console.error('❌ Failed:', err.message);
    }
}

checkOneFivePro();
