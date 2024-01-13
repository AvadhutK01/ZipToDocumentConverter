import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewDownloads = () => {
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_HOST_NAME}/pdf/ViewPdfLinks`, {
            headers: {
                "Authorization": token
            }
        })
            .then(response => {
                setData(response.data.data);
            })
            .catch(() => {
                toast.error('Something went wrong. Please try again.', {
                    autoClose: 3000,
                });
            });
    }, [token]);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">PDF Downloads</h2>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">File Name</th>
                            <th scope="col">Download Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.PdfName}</td>
                                <td>
                                    <a href={item.PdfLink} rel="noopener noreferrer" className="btn btn-primary btn-sm">
                                        Download
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewDownloads;
