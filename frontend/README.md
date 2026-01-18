# Zip to Document Converter - Frontend

This directory contains the client-side React application for the Zip to Document Converter. It provides an intuitive interface for users to upload files, view conversion status, and download the resulting PDFs.

## 🛠️ Technology Stack

*   **Framework**: React.js 18
*   **Routing**: React Router DOM (v6)
*   **Styling**: Bootstrap 5 & React Bootstrap
*   **HTTP Client**: Axios
*   **File Upload**: React Dropzone
*   **Utilities**: JSZip, FontAwesome

## 🚀 Getting Started

### Prerequisites

*   Node.js installed
*   Backend server running (see `backend/README.md`)

### Installation

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm start
    ```

    The application will run on `http://localhost:3000` and proxy API requests to the backend.

## 📦 Key Libraries

*   **react-dropzone**: Provides the drag-and-drop area for uploading ZIP files.
*   **axios**: Handles asynchronous HTTP requests to the backend API.
*   **react-bootstrap**: Implements responsive layout and UI components like Modals and Buttons.
*   **jszip**: Used for potentially inspecting ZIP files on the client side before upload.
*   **react-toastify**: Displays notifications for success and error messages.

## 📁 Directory Structure

*   `src/components/`: Reusable UI components (e.g., FileUpload, Navbar).
*   `src/pages/`: Main application views/pages.
*   `public/`: Static assets (images, favicon, etc.).
*   `package.json`: Dependency list and scripts.

## 🔧 Building for Production

To create an optimized production build:

```bash
npm run build
```

This generates a `build` folder containing static files that can be served by any web server.
