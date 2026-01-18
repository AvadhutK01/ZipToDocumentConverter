# Zip to Document Converter - Backend API

This directory contains the server-side code for the Zip to Document Converter application. It provides a robust REST API for handling file uploads, managing user authentication, processing ZIP archives, and generating PDF documents.

## 🛠️ Technology Stack

*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Database**: MongoDB with Mongoose
*   **Authentication**: JSON Web Tokens (JWT)
*   **File Handling**: Multer (uploads), Adm-Zip (extraction)
*   **PDF Generation**: PDFKit, PDFMake

## ⚙️ Configuration

1.  Create a `.env` file in the `backend` directory.
2.  Add the following environment variables:

    ```env
    PORT=8000
    DB_URl=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
    # Add JWT_SECRET if used in userRoute, otherwise these are the main ones from server.js and ConnectDb.js
    ```

    *Note: Replace the placeholder values with your actual MongoDB connection string.*

## 🚀 Getting Started

### Prerequisites

*   Node.js installed
*   MongoDB instance ready

### Installation

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the server:
    ```bash
    # For development (requires nodemon)
    npm run server
    
    # Standard start
    npm start
    ```

    The server will run on `http://localhost:8000` (or the port specified in your `.env`).

## 📡 API Endpoints

### Zip Operations (`/zip`)
*   **POST** `/zip/upload`: Upload a ZIP file for processing.
*   **GET** `/zip/status/:id`: Check the status of a ZIP conversion.

### PDF Operations (`/pdf`)
*   **POST** `/pdf/generate`: Trigger PDF generation from processed files.
*   **GET** `/pdf/download/:id`: Download the generated PDF.

### User Operations (`/user`)
*   **POST** `/user/register`: Register a new user.
*   **POST** `/user/login`: Authenticate a user.

## 📂 Directory Structure

*   `Controllers/`: Logic for handling API requests.
*   `Models/`: Mongoose schemas for MongoDB.
*   `Routes/`: API route definitions.
*   `MiddleWares/`: Custom middleware (e.g., authentication, file validation).
*   `ConnectDb.js`: Database connection setup.
*   `server.js`: Main application entry point.
