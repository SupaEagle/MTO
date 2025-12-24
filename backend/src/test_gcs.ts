
import { Storage } from '@google-cloud/storage';
import * as path from 'path';

// Mimic what we think server.ts might do or what's missing
const keyFile = path.join(__dirname, '../service-account-key.json');

async function testUpload() {
    try {
        console.log('Testing GCS Upload...');
        // Try with explicit key file first, to see if that's the fix
        const storage = new Storage({
            projectId: 'mansa-tina-ops',
            keyFilename: keyFile
        });

        const bucketName = 'mansa-tina-vault';
        const filename = 'test-upload-debug.txt';
        const file = storage.bucket(bucketName).file(filename);

        await file.save('Hello Cloud Storage!', { resumable: false });

        console.log(`✅ Upload success: gs://${bucketName}/${filename}`);

    } catch (error) {
        console.error('❌ Upload failed:', error);

        // Try without keyfile (ADC)
        try {
            console.log('Retrying with Application Default Credentials...');
            const storage = new Storage({ projectId: 'mansa-tina-ops' });
            await storage.bucket('mansa-tina-vault').file('test-upload-adc.txt').save('Hello ADC');
            console.log('✅ ADC Upload success');
        } catch (e2) {
            console.error('❌ ADC failed too:', e2);
        }
    }
}

testUpload();
