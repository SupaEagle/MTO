# Mansa Tina Marketing - Architecture Documentation

## Overview
Mansa Tina Marketing is a comprehensive marketing platform designed for agencies and individual companies. It features a dual-mode interface (Agency vs. Client) and integrates strategy, content creation, scheduling, community management, and analytics.

## Technology Stack
- **Frontend**: React (TypeScript) + Vite
- **Styling**: TailwindCSS v4
- **Backend**: Firebase Functions (Node.js)
- **Database**: Firestore (NoSQL)
- **Authentication**: Firebase Auth
- **Hosting**: Firebase Hosting
- **CI/CD**: GitHub Actions

## System Components

### 1. Frontend (`/web`)
The frontend is a Single Page Application (SPA) built with React.
- **Routing**: `react-router-dom` handles navigation.
    - `/agency/*`: Protected routes for Agency Admins.
    - `/client/*`: Protected routes for Clients.
- **State Management**: React Context (`AuthContext`) for global auth state. Local state for component-level data.
- **Design System**: Custom TailwindCSS configuration with a "warm and creative" aesthetic.
    - **Agency Theme**: Dark mode with Purple/Pink gradients.
    - **Client Theme**: Dark mode with Teal/Emerald gradients.

### 2. Backend (`/functions`)
Serverless backend logic using Firebase Cloud Functions.
- **Strategy Engine**:
    - `generateStrategy`: Generates marketing strategies based on business goals.
- **Content Factory**:
    - `generateContent`: Uses OpenAI to generate social media posts.
- **Logistics Hub**:
    - `scheduleSocialPost`: Queues posts for publication.
    - `runScheduler`: Pub/Sub function running every minute to publish pending posts.
- **Community Engine**:
    - `incomingMessageHook`: Webhook for receiving DMs from social platforms.
    - `sendReply`: Sends replies to DMs.
- **Analytics Core**:
    - `runAnalyticsAggregation`: Nightly job to aggregate performance metrics.

### 3. Database (Firestore)
Data is structured to ensure isolation between Agencies and Clients.
- **Collections**:
    - `agencies`: Stores agency profiles.
        - `clients` (Subcollection): Stores client profiles belonging to the agency.
    - `users`: Stores user profiles and role mapping.
    - `scheduled_posts`: Queue for posts waiting to be published.
    - `conversations`: Stores unified inbox threads.
        - `messages` (Subcollection): Individual messages.
    - `analytics_daily`: Aggregated daily stats.

### 4. Security
- **Firestore Rules**: Enforce strict access control.
    - Agencies can only access their own data and their clients' data.
    - Clients can only access their own data.
- **Environment Variables**: API keys (OpenAI, Social Platforms) are stored in Firebase Functions config.

## Deployment Pipeline
- **GitHub Actions**: Triggered on push to `main`.
    - Installs dependencies for web and functions.
    - Builds both projects.
    - Deploys to Firebase Hosting and Cloud Functions using `firebase-tools`.
