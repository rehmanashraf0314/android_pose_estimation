# AI Fitness Trainer Android APP 🏋️‍♂️🤖

A real-time mobile app that acts as your personal AI fitness trainer. It watches your workout form using your phone's camera and talks to you in real-time to correct your posture or count your reps.

---

## 📱 How It Works

The app does all the heavy lifting locally on your phone, meaning you don't need an internet connection or a backend server to use it:

1. **Live Camera Feed:** The app uses React Native Vision Camera to capture live frames from your phone's camera at a high frame rate.
2. **Native Processing (Kotlin):** These frames are passed directly down to the Android native side (written in Kotlin). 
3. **AI Form Checking:** Inside the Kotlin layer, Google's MediaPipe automatically detects your body joints and landmarks. The app then checks your angles to see if your exercise form is good or bad.
4. **The Feedback Loop:** The native Android side passes this workout feedback and coordinates back up to the React Native front-end.
5. **UI & Voice Cues:** The app shows your skeleton tracking points on the screen and instantly speaks to you out loud (e.g., "Squat lower" or "Keep your back straight") using Text-to-Speech, so you can focus on your workout without staring at the screen.

---

## 🛠️ Tech Stack

* **Cross-Platform Framework:** React Native
* **Native Android Core:** Kotlin
* **Pose Tracking:** Google MediaPipe
* **Voice Synthesis:** Text-to-Speech (TTS)




This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
