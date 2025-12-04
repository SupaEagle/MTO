"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aggregateDailyAnalytics = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
// Runs every night to aggregate daily analytics
exports.aggregateDailyAnalytics = functions.pubsub.schedule('every 24 hours').onRun(async (context) => {
    const today = new Date().toISOString().split('T')[0];
    // Mock aggregation logic
    // In reality, this would query social APIs or internal logs
    const dailyStats = {
        date: today,
        revenue: Math.floor(Math.random() * 1000) + 500,
        activeClients: 42,
        contentPieces: Math.floor(Math.random() * 10) + 1,
        avgRoi: 3.2 + (Math.random() * 0.5 - 0.25)
    };
    await admin.firestore()
        .collection('analytics_daily')
        .doc(today)
        .set(dailyStats);
    console.log(`Aggregated analytics for ${today}`);
    return null;
});
//# sourceMappingURL=analytics.js.map