# Legal Navigator (LexAI) ⚖️

A "vibe-coded", AI-powered legal assistant that translates complex user scenarios into actionable legal requirements. This application uses **Google's Gemini AI** to identify applicable laws, specific sections, and compliance steps for any given situation in plain English.

## 🚀 Features

* **AI Analysis Engine:** Powered by Google Gemini (Auto-detects best available model) to map user queries to specific Acts and Sections.
* **Structured Legal Cards:** Displays results as actionable cards (Act, Section, Summary, Action) rather than dense paragraphs.
* **"Vibe Coded" UI:** Modern **Glassmorphism** design with fluid animations using **Framer Motion**, glowing backgrounds, and a dark-mode aesthetic.
* **Demo Authentication:** A realistic login flow with a "Restricted Access" modal and demo credentials.
* **Smart Context:** Displays the user's original query alongside results for verification.
* **Robust Backend:** Auto-detects available AI models to prevent `404` errors and handles API failures gracefully.

## 🛠️ Tech Stack

* **Frontend:** React, TypeScript, Tailwind CSS, Framer Motion
* **Backend:** Node.js, Express
* **AI:** Google Gemini API
* **Icons:** Lucide React

## 📸 Screenshots

## 📦 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/aam2k6/Legal-Navigator.git](https://github.com/aam2k6/Legal-Navigator.git)
    cd Legal-Navigator
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables**
    Create a `.env` file in the root directory and add your Google Gemini API Key:
    ```env
    GEMINI_API_KEY=your_google_api_key_here
    ```

4.  **Run the Application**
    This command starts both the Express backend (Port 5000) and Vite frontend (Port 5173) concurrently:
    ```bash
    npm run dev
    ```

5.  **Access the App**
    Open your browser and navigate to: `http://localhost:5173`

## 🔑 Demo Credentials

To access the dashboard, use the built-in demo account:

* **Email:** `demo@lexai.com`
* **Password:** `demo123`

## 📝 Usage

1.  **Landing Page:** Read about the features and click "Sign In".
2.  **Login:** Enter the demo credentials provided in the modal.
3.  **Dashboard:** Enter a legal scenario (e.g., *"I want to purchase an aeroplane from the US"*).
4.  **Analysis:** View the generated cards detailing the relevant Acts, Sections, and Actionable Steps.

## 👤 Author

**Akul Anhith**
* GitHub: [aam2k6](https://github.com/aam2k6)
