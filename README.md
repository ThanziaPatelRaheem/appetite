# 🍽️ Appetite – React Recipe App

**Appetite** is a dynamic and interactive recipe application built using **React** and **Firebase**, designed to showcase key React concepts such as routing, state management, and Firebase integration.

---

## 🚀 Live Demo

👉 [Click here to view the live app](https://thanziapatelraheem.github.io/appetite/#/)

---

## 🛠️ Technologies Used

- **HTML**
- **CSS**
- **JavaScript**
- **React** (with React Router)
- **Vite** (for development & build)
- **Firebase**:
  - Firestore (for storing recipes)
  - Firebase Auth (for login)
  - Firebase Storage (for image upload)

---

## 🔐 Login Credentials

Only login is enabled (no sign-up). Use the following test credentials:

- **Email**: `testuser@example.com`
- **Password**: `123456`

All user-specific features are tied to this test account.

---

## 🧾 Features

- 🔎 Filter recipes based on **meal type** (e.g., breakfast, lunch, smoothie)
- 🔐 Login with Firebase Auth (no signup – login-only mode)
- 🧠 **Add your own recipes** after logging in
- 🖼️ Upload recipe images (Firebase Storage)
- 💾 User-submitted recipes are stored in Firestore under the test user account (login required)
- ✏️ **Delete ingredients or steps** from the recipe form before submitting
- 🗑️ **Delete your saved recipes** from the **My Recipes** page
- 🔁 Built using **React Router** for client-side routing and protected routes
- 📱 Fully responsive design for **tablet (≥768px)** and **mobile (≤425px)** devices

---

## 📂 Pages in Appetite

- **Home** – Main landing page
- **Recipes** – View all public recipes
- **Add Recipe** – (Login required) Create and save your own custom recipes
- **My Recipes** – (Login required) View your submitted recipes

---

## 📦 Installation & Running Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/appetite.git
   cd appetite
   ```

2. 📦 Install Dependencies  
   Run the following command to install all project dependencies:

   ```bash
   npm install
   ```

3. 🚀 Start the Development Server  
   To run the app in development mode, use:
   ```bash
   npm run dev
   ```

## 🔐 Environment Variables

Create a `.env` file in the root of your project and add the following Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🧠 Purpose of This Project

**Appetite** was created to demonstrate real-world use of **React**, including:

- 🧭 Routing & navigation with React Router
- 🔒 Protected routes using Firebase Auth
- ⚡ Dynamic UI updates with state management
- 🔗 Integration with Firebase Firestore & Storage

## 🌟 Future Features

- User **sign-up** functionality
- **Edit** saved recipes (currently only delete is supported)
- Recipe ratings and user comments
- Dark mode support

## 🤝 Contributing

Contributions are welcome!  
Feel free to fork the repository, make improvements, and open a pull request.

If you're submitting a feature or bug fix, please include a clear description and relevant screenshots or code references if possible.
