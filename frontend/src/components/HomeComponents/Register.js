import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
const hintQuestions = [
    "What is your mother's maiden name?",
    "What was the name of your first pet?",
    "In what city were you born?",
    "What is your favorite book?",
];
const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [selectedHintQuestion, setSelectedHintQuestion] = useState('');
    const [hintAnswer, setHintAnswer] = useState('');
    const history = useNavigate();
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRepeatPasswordChange = (e) => {
        setRepeatPassword(e.target.value);
    };

    const handleHintQuestionChange = (e) => {
        setSelectedHintQuestion(e.target.value);
    };

    const handleHintAnswerChange = (e) => {
        setHintAnswer(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== repeatPassword) {
            alert("Password do not match");
        }

        try {
            const response = await Axios.post('http://localhost:5000/user/register', {
                username,
                password,
                hintQuestion: selectedHintQuestion,
                hintAnswer,
            });
            if (response.data == "exist") {
                alert("User already exist");
            }
            else if (response.data == "success") {
                history("/login")
            }
            else {
                alert("Error in registration");
            }

        } catch (error) {
            alert("Something went wrong");
        }
    };


    return (
        <div className="card-body p-md-5">
            <div className="row justify-content-center">
                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mt-4">Sign up</p>
                    <form>
                        <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                                <label className="form-label" htmlFor="regusername" style={{ marginLeft: '0px' }}>Username: </label>
                                <input type="text" id="regusername" className="form-control" value={username} onChange={handleUsernameChange} />
                                <div className="form-notch">
                                    <div className="form-notch-leading" style={{ width: '9px' }}></div>
                                    <div className="form-notch-middle" style={{ width: '71.2px' }}></div>
                                    <div className="form-notch-trailing"></div>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                                <label className="form-label" htmlFor="regpass" style={{ marginLeft: '0px' }}>Password:</label>
                                <input type="password" id="regpass" className="form-control" value={password} onChange={handlePasswordChange} />
                                <div className="form-notch">
                                    <div className="form-notch-leading" style={{ width: '9px' }}></div>
                                    <div className="form-notch-middle" style={{ width: '64.8px' }}></div>
                                    <div className="form-notch-trailing"></div>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                                <label className="form-label" htmlFor="reregpass" style={{ marginLeft: '0px' }}>Repeat your password:</label>
                                <input type="password" id="reregpass" className="form-control" value={repeatPassword} onChange={handleRepeatPasswordChange} />
                                <div className="form-notch">
                                    <div className="form-notch-leading" style={{ width: '9px' }}></div>
                                    <div className="form-notch-middle" style={{ width: '134.4px' }}></div>
                                    <div className="form-notch-trailing"></div>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                                <label className="form-label" htmlFor="questionsdown" style={{ marginLeft: '0px' }}>Select hint question:</label>
                                <select id="questionsdown" className="form-select" value={selectedHintQuestion} onChange={handleHintQuestionChange}>
                                    <option value="">Select a hint question</option>
                                    {hintQuestions.map((question, index) => (
                                        <option key={index} value={question}>{question}</option>
                                    ))}
                                </select>
                                <div className="form-notch">
                                    <div className="form-notch-leading" style={{ width: '9px' }}></div>
                                    <div className="form-notch-middle" style={{ width: '68.8px' }}></div>
                                    <div className="form-notch-trailing"></div>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                                <label className="form-label" htmlFor="hintAnswer" style={{ marginLeft: '0px' }}>Answer to hint question:</label>
                                <input type="text" id="hintAnswer" className="form-control" value={hintAnswer} onChange={handleHintAnswerChange} />
                                <div className="form-notch">
                                    <div className="form-notch-leading" style={{ width: '9px' }}></div>
                                    <div className="form-notch-middle" style={{ width: '134.4px' }}></div>
                                    <div className="form-notch-trailing"></div>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-lg">Register</button>
                        </div>
                    </form>
                </div>
                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample image" />
                </div>
            </div>
        </div>
    )
}

export default Register