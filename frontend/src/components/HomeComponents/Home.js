import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    return (
        <div className="container ">
            <div className="row justify-content-center">
                <div className="col-md-8 text-center mb-4">
                    <h1 className="display-4 mb-2">Welcome to Zip to Document Converter</h1>
                    <p className="lead">Simplify your file management tasks with our easy-to-use zip file extraction and PDF generation tool.</p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-1">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title">Key Features:</h2>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Extract files from zip archives with just a few clicks.</li>
                                <li className="list-group-item">Organize and manage your extracted files efficiently.</li>
                                <li className="list-group-item">Generate a PDF document listing all extracted file locations.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 mb-1">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title">How It Works:</h2>
                            <ol className="list-group list-group-flush">
                                <li className="list-group-item">Click on the "Upload" button to select a zip file from your device.</li>
                                <li className="list-group-item">Hit the "Extract and Generate PDF" button to process the uploaded zip file.</li>
                                <li className="list-group-item">Download the PDF document containing the extracted file locations.</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <p className="lead mb-4">Ready to get started? Login now and experience the convenience of Zip to Document Converter.</p>
            </div>
        </div>
    );
};

export default Home;
