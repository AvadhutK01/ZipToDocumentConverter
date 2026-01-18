# Zip to Document Converter

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue.svg?style=for-the-badge)
![License](https://img.shields.io/badge/license-ISC-green.svg?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Development-orange.svg?style=for-the-badge)

Welcome to the **Zip to Document Converter**! A powerful web application designed to streamline the process of converting ZIP archives into organized PDF documents. Built with the MERN stack (MongoDB, Express, React, Node.js), this tool offers a seamless experience for managing and converting file archives.

---

## 🌟 Key Features

*   **📂 ZIP File Upload**: Seamless drag-and-drop support for uploading ZIP archives.
*   **⚡ Automatic Extraction**: Robust server-side processing to extract and organize ZIP contents.
*   **📄 PDF Generation**: intelligently converts extracted text and images into a single, well-formatted PDF document.
*   **💻 User-Friendly Interface**: Modern, responsive UI built with **React** and **Bootstrap 5**.

---

## 🏗️ Project Structure

```bash
ZipToDocumentConverter/
├── 📂 backend         # Express.js server and API routes
│   ├── 📂 Controllers # Logic for handling API requests
│   ├── 📂 Models      # Mongoose schemas
│   └── 📂 Routes      # API route definitions
├── 📂 frontend        # React.js client application
│   ├── 📂 public      # Static assets
│   └── 📂 src         # Components and Pages
└── 📄 package.json    # Root configuration for concurrent execution
```

---

## 🚀 Getting Started

### Prerequisites

*   **Node.js** (v14 or higher)
*   **MongoDB** (Local instance or Atlas connection string)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/AvadhutK01/ZipToDocumentConverter.git
    cd ZipToDocumentConverter
    ```

2.  **Install dependencies:**
    This project is set up to run both frontend and backend from the root using `concurrently`. However, you should install dependencies for each part first.

    ```bash
    # Install Root dependencies
    npm install

    # Install Backend dependencies
    cd backend
    npm install
    cd ..

    # Install Frontend dependencies
    cd frontend
    npm install
    cd ..
    ```

3.  **Environment Setup:**
    Navigate to the `backend` directory and create a `.env` file (see `backend/README.md` for details).

4.  **Running the Application:**

    To run both the backend server and the frontend client simultaneously:

    ```bash
    npm run dev
    ```

    *   **Frontend**: http://localhost:3000
    *   **Backend**: http://localhost:8000 (or your configured port)

---

## 🛠️ Technology Stack

| Frontend | Backend | Tools |
| :--- | :--- | :--- |
| ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) | ![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white) | ![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white) |
| ![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=flat&logo=bootstrap&logoColor=white) | ![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white) | ![NPM](https://img.shields.io/badge/npm-CB3837?style=flat&logo=npm&logoColor=white) |
| Axios | ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white) | VS Code |
| React Dropzone | Multer | Postman |
| | PDFKit | |

---

## 📜 License

This project is licensed under the ISC License.

---
Built with ❤️ by [AvadhutK01](https://github.com/AvadhutK01)
