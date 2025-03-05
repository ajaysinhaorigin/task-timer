# Task Timer

This React Native app allows users to create, manage, and interact with multiple customizable timers. It includes features such as categories, progress visualization, grouped actions, and user feedback, while maintaining a clean UI/UX and minimal third-party dependencies.

# 🛠 Features
✅ Core Features

 1. Add Timer: Users can create timers with:
 - 📝 Name: A descriptive title (e.g., "Workout Timer").
 - ⏳ Duration: Timer duration in seconds.
 - 📂 Category: Assignable to categories (e.g., "Workout," "Study," "Break").

Timers are saved locally using AsyncStorage.


2. 📌 Timer List with Grouping:
 - Displays all timers grouped by categories in expandable/collapsible sections.
 - Each timer shows: Name, Remaining time, Status (Running, Paused, or Completed)

3. ⏯ Timer Management:
- Controls available for each timer:
- ▶ Start: Begin countdown.
- ⏸ Pause: Pause countdown.
- 🔄 Reset: Restore to original duration.
- Timers are marked as "Completed" upon reaching zero.

3. 📊 Progress Visualization:
- Displays a progress bar or percentage to indicate remaining time.

4. ⚡ Bulk Actions:
- Buttons at the category level allow:
- Start all timers in a category.
- Pause all timers in a category.
- Reset all timers in a category.

5. 🎉 User Feedback:
- Displays an on-screen modal when a timer completes, showing a congratulatory message.

🚀 Enhanced Functionality

6. 📜 Timer History:
- Logs completed timers with:
- Timer name
- Completion time
- Displays logs in a separate "History" screen.

7. 🔔 Customizable Alerts:
- Users can set an optional halfway alert (e.g., at 50% of the total duration).
- Shows a notification or message when the alert triggers.

🎁 Bonus Features
- 📌 Category Filtering: Users can filter timers by specific categories.

# 🚀 Setup Instructions
📋 Prerequisites
- Ensure you have the following installed:
- Node.js (latest LTS version recommended)
- npm or yarn
- React Native CLI
- Android Studio (for Android development) or Xcode (for iOS development)

## Installation  

1. Clone the repository:  
   ```bash  
   git clone https://github.com/ajaysinhaorigin/task-timer.git
   cd task-timer

2. Install dependencies:
   ```bash  
   npm install or yarn install

3. Start the development server:
   ```bash  
   npx react-native start

4. Run the app on an emulator or physical device:
   - For Android:
   ```bash  
   npx react-native run-android
  - For iOS:
   ```bash  
    npx react-native run-ios
