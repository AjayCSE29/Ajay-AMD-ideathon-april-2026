# OtakuCart AI 🌌

**OtakuCart AI** is a premium, dark-themed e-commerce platform designed for anime enthusiasts. It integrates a smart AI-inspired assistant to provide a seamless, personalized shopping experience.

---

## 🎥 Preview
Explore our curated collection of high-quality anime hoodies, figures, and collectibles with real-time AI assistance.

## ✨ Features

- **🛍️ Smart Product Grid**: Responsive grid with premium hover animations and real-time inventory preview.
- **🤖 AI-Powered Assistant**: A floating smart panel that filters products based on natural language (e.g., "Naruto hoodies under 100").
- **🎯 Personalized Recommendations**: The assistant tracks your interests based on your cart and browsing history to suggest the perfect loot.
- **🛒 Dynamic Shopping Cart**: Real-time quantity controls and subtotal calculation with pop-in animations.
- **💳 Secure Checkout**: A cohesive multi-step checkout experience including shipping details and order verification.
- **🕯️ Premium Aesthetics**: Custom-built glassmorphism design system with professional AI-generated assets.

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/) (Vite)
- **Styling**: Vanilla CSS (Global Design Tokens, Responsive Layouts)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend / Database**: [Google Firebase Firestore](https://firebase.google.com/) (For product catalog and order management)
- **Image Intelligence**: DALL-E (AI-generated product photography)

## 🧠 How It Works: Assistant Logic

The **Smart Assistant** operates on a multi-layer filtering and recommendation engine:

1.  **Natural Language Processing**: Uses regex and keyword matching to parse user intent from the floating chat panel (e.g., extracting price bounds like "under 500").
2.  **Interest Tracking**: The application maintains a frequency map of "Tags" (like `cyberpunk`, `ninja`, `figure`) based on user interactions (Add to Cart, Search).
3.  **Recommendation Engine**: When the panel is opened, it compares the user's top-frequency tags against the product database to offer "Recommended for you" suggestions with a specific reasoning label.

## 🚀 Setup Instructions

### Prerequisites
- Node.js (LTS version recommended)
- Firebase Account (for database features)

### Installation
1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/otakucart-ai.git
    cd otakucart-ai
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Firebase**:
    Create a `src/firebase.js` file and add your configuration:
    ```javascript
    export const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_PROJECT.firebaseapp.com",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_PROJECT.appspot.com",
      messagingSenderId: "YOUR_SENDER_ID",
      appId: "YOUR_APP_ID"
    };
    ```

4.  **Start Development Server**:
    ```bash
    npm run dev
    ```

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*Built with ❤️ for the Anime Community.*
