"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAnalyticsAggregation = exports.sendReply = exports.incomingMessageHook = exports.runScheduler = exports.scheduleSocialPost = exports.generateContent = exports.generateStrategy = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const ai_1 = require("./ai");
const social_1 = require("./social");
const scheduler_1 = require("./scheduler");
const inbox_1 = require("./inbox");
const analytics_1 = require("./analytics");
admin.initializeApp();
// Example Strategy Engine Function
exports.generateStrategy = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError("unauthenticated", "The function must be called while authenticated.");
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
exports.generateContent = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError("unauthenticated", "The function must be called while authenticated.");
    }
    const { platform, topic, tone, additionalInstructions } = data;
    const content = await (0, ai_1.generateCreativeContent)(platform, topic, tone, additionalInstructions);
    return { content };
});
exports.scheduleSocialPost = social_1.schedulePost;
exports.runScheduler = scheduler_1.checkScheduledPosts;
exports.incomingMessageHook = inbox_1.receiveMessageWebhook;
exports.sendReply = inbox_1.sendMessage;
exports.runAnalyticsAggregation = analytics_1.aggregateDailyAnalytics;
//# sourceMappingURL=index.js.map