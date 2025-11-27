# Bills App

A small Expo + React Native app for creating, editing, and sharing simple bills between users.

## Features

- Create, edit, and view bills
- Add and manage users
- Share bills via system share sheet
- Uses Expo Router with a lightweight context for user data

## Requirements

- Node.js (recommended >= 18)
- npm
- Expo CLI (optional but useful): `npm install -g expo-cli`

## Install

Clone the repo and install dependencies:

```powershell
git clone https://github.com/swapnasahoo/bills-app.git
cd bills-app
npm install
```

## Run (development)

This project uses Expo. Common scripts from `package.json`:

- `npm run start` — start Expo dev tools
- `npm run android` — open on Android emulator/device
- `npm run ios` — open on iOS simulator/device
- `npm run web` — run in a browser
- `npm run lint` — run ESLint

Run the app:

```powershell
npm run start
```

Then open it in the Expo Go app or a simulator.

## Project Structure (important files)

- `app/` — main app routes and screens
  - `app/_layout.tsx` — root layout and navigation
  - `app/index.tsx` — app entry route
  - `app/bills/` — screens for bill creation, editing, viewing
  - `app/user/` — user creation and editing
- `context/UserDataContext.tsx` — app context for user/bill data
- `utils/shareBill.ts` — helper to share bill content
- `package.json` — scripts & dependencies

## Notes

- This project leverages `expo-router` and `nativewind` for styling.
- If you see Metro bundler caching issues, try restarting with `expo start -c`.

## Contributing

PRs and issues are welcome. For small changes, open a branch and submit a pull request.

## License

This project is licensed under the MIT License — see `LICENSE` for details.
