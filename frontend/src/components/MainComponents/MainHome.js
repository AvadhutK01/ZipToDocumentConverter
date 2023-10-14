import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';


const MainHome = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = async () => {
        try {
            if (!file) {
                console.error('No file selected');
                return;
            }

            const formData = new FormData();
            formData.append('file', file);

            const response = await Axios.post('http://localhost:5000/zip/ExtractZip', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);
        } catch (error) {
            console.error('Error uploading file', error);
        }
    };
    return (
        <div className="row d-flex justify-content-center align-items-center">
            <div>
                <section className="hero is-primary">
                    <label className=' font-monospace d-flex justify-content-center text-info h4'>Upload Your zip file</label>
                </section>
            </div>
            <div className="col-md-9 col-lg-6 col-xl-6 my-lg-5 py-lg-5">
                <img src="https://img.freepik.com/premium-vector/file-management-administration-data-filing-concept-folder-gallery-records-database-flat-illustration-vector-template_128772-1923.jpg?w=740" className="img-fluid" alt="Sample image" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-5 offset-xl-1 my-lg-5 py-lg-5 d-flex justify-content-center">
                <div className="input-group ps-5 h-100">
                    <input
                        type="file"
                        className="custom-file-input h-100"
                        id="input-file-now"
                        accept=".zip"
                        onChange={handleFileChange}
                    />
                    <button onClick={handleFileUpload}>Upload</button>

                </div>
            </div>
        </div>
    );
};
const customCSS = `
  .custom-file-input {
    border: 2px solid #007BFF; /* Border color */
  }

  .custom-file-input:focus {
    border-color: #0056b3; /* Border color when focused */
  }

  .custom-file-label {
    background-color: #007BFF; /* Background color */
    color: #fff; /* Text color */
  }
`;

const styleTag = document.createElement('style');
styleTag.type = 'text/css';
styleTag.appendChild(document.createTextNode(customCSS));
document.head.appendChild(styleTag);

export default MainHome;
