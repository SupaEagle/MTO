import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { generateCreativeContent } from "./ai";
import { schedulePost } from "./social";
import { checkScheduledPosts } from "./scheduler";
import { receiveMessageWebhook, sendMessage } from "./inbox";
import { aggregateDailyAnalytics } from "./analytics";

admin.initializeApp();

// Example Strategy Engine Function
export const generateStrategy = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError(
            "unauthenticated",
            "The function must be called while authenticated."
        );
    }

    const { businessName, industry, goals } = data;

    // Placeholder for AI Strategy Generation Logic
    // In a real implementation, this would call OpenAI/Anthropic

    return {
        strategy: {
            pillars: ["Education", "Behind the Scenes", "Social Proof"],
            recommendedPlatforms: ["LinkedIn", "Instagram"],
            summary: `Strategy generated for ${businessName} in ${industry}. Focusing on ${goals}.`
        }
    };
});

export const generateContent = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError(
            "unauthenticated",
            "The function must be called while authenticated."
        );
    }

    const { platform, topic, tone, additionalInstructions } = data;

    const content = await generateCreativeContent(platform, topic, tone, additionalInstructions);

    return { content };
});

export const scheduleSocialPost = schedulePost;
export const runScheduler = checkScheduledPosts;
export const incomingMessageHook = receiveMessageWebhook;
export const sendReply = sendMessage;
export const runAnalyticsAggregation = aggregateDailyAnalytics;
