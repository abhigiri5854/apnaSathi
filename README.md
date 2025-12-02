# GharSaathi - Verified Workers Booking App

A React Native mobile application for hiring verified workers (cooks, maids, cleaners, electricians, plumbers, etc.).

## Features

- **Home Screen**: Browse service categories and view promotional offers
- **Book Screen**: Search and filter available workers with ratings and reviews
- **Profile Screen**: View detailed worker profiles with skills, availability, and verification status
- **Booking Flow**: Confirm and pay for services with multiple payment options

## Tech Stack

- React Native with Expo
- React Navigation (Stack & Bottom Tabs)
- Expo Vector Icons

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on your preferred platform:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your device

## Project Structure

```
├── App.js                 # Main app component with navigation
├── constants/
│   └── theme.js          # Color palette and styling constants
├── screens/
│   ├── HomeScreen.js     # Main landing page
│   ├── BookScreen.js     # Worker listings
│   ├── ProfileScreen.js  # Worker profile details
│   ├── BookingFlowScreen.js # Booking confirmation
│   ├── FavoritesScreen.js
│   └── ChatScreen.js
└── package.json
```

## Color Palette

- Primary Orange: `#FF7643`
- Light Orange/Peach: `#FF7643`
- Dark Blue: `#4A5568`
- White: `#FFFFFF`

## Navigation

- Bottom Tab Navigation for main screens (Home, Bookings, Favorites, Chat)
- Stack Navigation for detailed views (Book, Profile, Booking Flow)

