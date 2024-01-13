import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ForgetPasswordReset = () => {
    const hintQuestions = [
        "What is your mother's maiden name?",
        "What was the name of your first pet?",
        "In what city were you born?",
        "What is your favorite book?",
    ];

    const [selectedQuestion, setSelectedQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate()

    const handleQuestionChange = (e) => {
        setSelectedQuestion(e.target.value);
    };

    const handleAnswerChange = (e) => {
        setAnswer(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async () => {
        const Data = {
            question: selectedQuestion,
            answer: answer,
        };

        try {
            const response = await axios.post('zip-to-document-converter.vercel.app/user/resetPasswordAuth', Data);
            setIsValid(true);
            setUserId(response.data.userId);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                toast.error("User not found. Please check your question or answer.");
            } else {
                toast.error("Authentication failed. Please try again.");
            }
        }
    };
    const handleResetSubmit = async () => {
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match. Please enter matching passwords.");
            return;
        }

        const Data = {
            password: newPassword,
            userId: userId,
        };

        try {
            await axios.put(`${process.env.REACT_APP_BACKEND_HOST_NAME}/user/resetPassword`, Data);
            setIsValid(false);
            setUserId('');
            navigate('/login');
            toast.success("Password changed successfully!");
        } catch (error) {
            if (error.response && error.response.status === 404) {
                toast.error("User not found or password not changed. Please try again.");
            } else {
                toast.error("Password change failed. Please try again.");
            }
        }
    };


    return (
        <div className="container mt-5">
            <h2 className="mb-4">Forget Password Reset</h2>
            {!isValid ? (
                <>
                    <div className="form-group">
                        <label htmlFor="question">Select a hint question:</label>
                        <select
                            className="form-control"
                            id="question"
                            value={selectedQuestion}
                            onChange={handleQuestionChange}
                        >
                            <option value="" disabled>
                                Select a question
                            </option>
                            {hintQuestions.map((question, index) => (
                                <option key={index} value={question}>
                                    {question}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="answer">Enter your answer:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="answer"
                            value={answer}
                            onChange={handleAnswerChange}
                            placeholder="Your answer"
                        />
                    </div>
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        Submit
                    </button>
                </>
            ) : (
                <>
                    <div className="form-group">
                        <label htmlFor="newPassword">New Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="newPassword"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            placeholder="New password"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            placeholder="Confirm password"
                        />
                    </div>
                    <button className="btn btn-primary" onClick={handleResetSubmit}>
                        Change Password
                    </button>
                </>
            )}
        </div>
    );
};

export default ForgetPasswordReset;
