# Firebase Studio

This is a NextJS starter in Firebase Studio.

## Running the Project Locally

This project is configured to run in two modes: **mock** and **firebase**.

### Mock Mode (Default)

By default, the project runs in **mock mode**. This means it uses in-memory data and does not require a Firebase backend. This is the quickest way to get started and is ideal for UI development and testing.

1.  **Install Dependencies:**
    *   Open a terminal in the project directory.
    *   Run `npm install` to install all the required packages.

2.  **Run the Development Server:**
    *   Run `npm run dev` to start the local development server.
    *   Open your browser and go to `http://localhost:9002` to see your app running.

### Firebase Mode (Production & Local)

To run the project with a full Firebase backend (for production or for local development connected to Firebase), you need to configure your Firebase project credentials.

1.  **Create a Firebase Project:**
    *   Go to the [Firebase Console](https://console.firebase.google.com/).
    *   Create a new project.
    *   In your new project, create a new **Web App**.

2.  **Get Firebase Config:**
    *   After creating the web app, Firebase will provide you with a `firebaseConfig` object. Keep this object handy.

3.  **Create Environment File:**
    *   In the root of your project directory, create a new file named `.env.local`.
    *   Add the following environment variables to this file, replacing the placeholder values with the ones from your `firebaseConfig` object.

    ```
    NEXT_PUBLIC_USE_FIREBASE=true

    NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
    NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
    ```

4.  **Enable Firestore and Storage:**
    *   In the Firebase Console, go to the **Firestore Database** section and create a database. Start in **test mode** for easy setup.
    *   Go to the **Storage** section and enable it.

5.  **Run the Development Server:**
    *   Run `npm run dev`. The app will now connect to your Firebase project.

## Admin Access

To access the admin panel, navigate to `/admin` and use the PIN `230498`.
