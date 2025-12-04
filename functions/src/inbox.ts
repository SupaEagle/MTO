import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Mock Webhook for receiving messages from Social Platforms
export const receiveMessageWebhook = functions.https.onRequest(async (req, res) => {
    const { platform, senderId, senderName, content, timestamp } = req.body;

    // Validate webhook signature (mock)
    if (!platform || !content) {
        res.status(400).send('Invalid payload');
        return;
    }

    try {
        // Save to Firestore 'conversations' and 'messages'
        // 1. Find or create conversation
        const conversationsRef = admin.firestore().collection('conversations');
        const query = await conversationsRef
            .where('platform', '==', platform)
            .where('senderId', '==', senderId)
            .limit(1)
            .get();

        let conversationId;

        if (query.empty) {
            const newConv = await conversationsRef.add({
                platform,
                senderId,
                user: senderName || 'Unknown User',
                lastMessage: content,
                time: timestamp || new Date().toISOString(),
                unread: true,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                updatedAt: admin.firestore.FieldValue.serverTimestamp()
            });
            conversationId = newConv.id;
        } else {
            const doc = query.docs[0];
            conversationId = doc.id;
            await doc.ref.update({
                lastMessage: content,
                time: timestamp || new Date().toISOString(),
                unread: true,
                updatedAt: admin.firestore.FieldValue.serverTimestamp()
            });
        }

        // 2. Add message to subcollection
        await conversationsRef.doc(conversationId).collection('messages').add({
            sender: 'user',
            text: content,
            time: timestamp || new Date().toISOString(),
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        res.status(200).send('Message received');
    } catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).send('Internal Server Error');
    }
});

export const sendMessage = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'Auth required');
    }

    const { conversationId, text } = data;

    // 1. Save to Firestore
    await admin.firestore()
        .collection('conversations')
        .doc(conversationId)
        .collection('messages')
        .add({
            sender: 'me',
            text,
            time: new Date().toISOString(),
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

    // 2. Call Social API to send reply (Mock)
    console.log(`Sending reply to conv ${conversationId}: ${text}`);

    return { success: true };
});
