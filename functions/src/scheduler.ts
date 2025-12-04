import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { postToSocialMedia } from './social';

// Runs every minute to check for posts that need to be published
// Note: Requires Blaze plan for scheduled functions
export const checkScheduledPosts = functions.pubsub.schedule('every 1 minutes').onRun(async (context) => {
    const now = admin.firestore.Timestamp.now();

    const snapshot = await admin.firestore()
        .collection('scheduled_posts')
        .where('status', '==', 'pending')
        .where('scheduledAt', '<=', now)
        .get();

    if (snapshot.empty) {
        return null;
    }

    const batch = admin.firestore().batch();
    const promises = [];

    for (const doc of snapshot.docs) {
        const post = doc.data();

        // Optimistically update status to 'publishing'
        batch.update(doc.ref, { status: 'publishing' });

        promises.push(
            postToSocialMedia(post.platform, post.content, post.image)
                .then(result => {
                    return doc.ref.update({
                        status: 'published',
                        publishedAt: admin.firestore.Timestamp.now(),
                        externalId: result.postId
                    });
                })
                .catch(err => {
                    console.error(`Failed to publish post ${doc.id}:`, err);
                    return doc.ref.update({
                        status: 'failed',
                        error: err.message
                    });
                })
        );
    }

    await batch.commit();
    await Promise.all(promises);

    return null;
});
