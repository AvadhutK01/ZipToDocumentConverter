# Zip to Document Converter

A powerful web application designed to streamline the process of converting ZIP archives into organized PDF documents. Built with the MERN stack (MongoDB, Express, React, Node.js), this tool offers a seamless experience for managing and converting file archives.

## 🚀 Features

*   **ZIP File Upload**: Drag and drop support for uploading ZIP archives.
*   **Automatic Extraction**: Server-side processing to extract ZIP contents.
*   **PDF Generation**: Converts extracted text and images into a single, formatted PDF document.
*   **User-Friendly Interface**: Modern, responsive UI built with React and Bootstrap.

## 🛠️ Technology Stack

### Frontend
*   **React.js**: Component-based UI library.
*   **Bootstrap 5**: Responsive styling and layout.
*   **React Dropzone**: Drag-and-drop file uploads.
*   **Axios**: HTTP client for API requests.

### Backend
*   **Node.js & Express.js**: Server-side runtime and framework.
*   **MongoDB & Mongoose**: NoSQL database for flexible data storage.
*   **Multer**: Middleware for handling multipart/form-data (file uploads).
*   **ADM-ZIP**: Javascript implementation of zip for nodejs.
*   **PDFKit**: PDF generation library.

## 📂 Project Structure

```bash
ZipToDocumentConverter/
├── backend/            # Express.js server and API routes
├── frontend/           # React.js client application
└── package.json        # Root configuration for concurrent execution
```

## ⚡ Quick Start

### Prerequisites

*   Node.js (v14 or higher)
*   MongoDB (Local instance or Atlas connection string)

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

### Running the Application

To run both the backend server and the frontend client simultaneously:

```bash
npm run dev
```

*   **Frontend**: http://localhost:3000
*   **Backend**: http://localhost:8000 (or your configured port)

## 📜 License

This project is licensed under the ISC License.
