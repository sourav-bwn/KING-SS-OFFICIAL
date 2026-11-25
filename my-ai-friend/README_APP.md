# AutoInsta (formerly My AI Friend)

A comprehensive Instagram Automation App powered by **Jarvis AI**. This application allows you to generate and manage Instagram accounts, automate interactions, and monitor progress through a futuristic "hands-free" interface.

## Features

- **Automated Account Creation**:
  - Support for Gmail and Mobile number verification.
  - Automated OTP reading (Mock).
  - Customizable profile generation (Bio, Profile Pic).

- **Jarvis AI Integration**:
  - **Hands-Free Operation**: Auto-activates on launch.
  - **Voice Feedback**: Simulated voice interaction.
  - **Edge Lighting**: Visual feedback with customizable neon animations.
  - **Problem Solving**: Automated issue logging and resolution attempts.

- **Automation Tools**:
  - **Target Account Automation**: Auto-follow, like, comment, and share.
  - **Auto-Posting**: Schedule random photo posts to keep accounts active.
  - **Manage Mobile Numbers**: Add and track mobile numbers for verification.

- **Dashboard**:
  - Real-time progress monitoring.
  - Status updates from Jarvis.
  - Detailed list of generated accounts and their status.

## Setup Instructions

1.  **Install Node.js**: Ensure you have Node.js installed.
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Start the App**:
    ```bash
    npx expo start
    ```
    - Scan the QR code with the Expo Go app on your phone.
    - Or press `w` to run in the web browser.

## Screens Overview

- **Welcome Screen**: Introduction to the app.
- **Setup**: Configure your account generation settings (Gmail/Mobile, Password).
- **Dashboard**: Monitor the generation process and Jarvis status.
- **Account Details**: View credentials and status of created accounts.
- **Settings**: Configure Jarvis (Voice, Edge Lighting) and Automation rules.
- **Target Automation**: Set up actions against specific Instagram users.
- **Jarvis Log**: View a history of problems solved by the AI.

## Notes

- This is a UI/UX implementation in React Native.
- The actual backend logic for Instagram interaction, OTP reading, and advanced AI is simulated for demonstration purposes.
