import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import { ProgressBar } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadFiles = () => {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = async () => {
        try {
            if (!file) {
                toast.warn('No file selected. Please choose a file.', {
                    autoClose: 3000,
                });
                return;
            }

            const formData = new FormData();
            formData.append('file', file);
            const token = localStorage.getItem('Z2Dtoken');

            const response = await Axios.post(`${process.env.REACT_APP_BACKEND_HOST_NAME}/zip/ExtractZip`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': token
                },
                onUploadProgress: () => {
                    setProgress(65);
                }
            });
            setProgress(100);

            const downloadLink = document.createElement('a');
            downloadLink.href = response.data.fileUrl;
            downloadLink.download = file.name;

            downloadLink.style.display = 'none';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            toast.success(`File uploaded successfully!`, {
                autoClose: 5000,
            });
            setFile(null);
            setProgress(0);
            const fileInput = document.getElementById('input-file-now');
            if (fileInput) {
                fileInput.value = null;
            }
        } catch (error) {
            toast.error('Error uploading file. Please try again.', {
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center my-2">
            <div className="col-md-5 ">
                <div className="card">
                    <div className="card-body text-center ">
                        <div>
                            <h2 className="card-title mb-4">Upload Your Zip File</h2>
                            <img
                                src="https://img.freepik.com/premium-vector/file-management-administration-data-filing-concept-folder-gallery-records-database-flat-illustration-vector-template_128772-1923.jpg?w=740"
                                className="img-fluid mb-4"
                                alt="Sample"
                            />
                            <div className="input-group mb-3">
                                <input
                                    type="file"
                                    className="form-control"
                                    id="input-file-now"
                                    accept=".zip"
                                    onChange={handleFileChange}
                                />
                                <div className="input-group-append">
                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={handleFileUpload}
                                        disabled={progress > 0}
                                    >
                                        Upload
                                    </button>
                                </div>
                            </div>
                            {file && (
                                <p className="text-success text-center">Selected File: {file.name}</p>
                            )}
                            {progress > 0 && (
                                <ProgressBar now={progress} label={`${progress}%`} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadFiles;
