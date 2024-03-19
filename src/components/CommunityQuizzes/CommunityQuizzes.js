import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './CommunityQuizzes.css';
import Toast from '../Toast/Toast';

function CommunityQuizzes() {
    const [quizzes, setQuizzes] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        axios.get('/api/quizzes/all-quizzes')
            .then(res => {
                setQuizzes(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    const likeQuiz = (quizId) => {
        axios.post('/api/quizzes/like-quiz', {quizId: quizId, userId: localStorage.getItem('_ID')})
            .then(res => {
                if (res.data) {
                    setShowToast(true);
                    setMessage(res.data.message);
                    axios.get('/api/quizzes/all-quizzes')
                        .then(res => {
                            setQuizzes(res.data);
                        })
                        .catch(err => {
                            console.error(err);
                        });
                    setTimeout(() => {
                        setShowToast(false);
                        setMessage('');
                    }, 3000);
                }
            })
            .catch(err => {
                console.error(err);
            });
    };

    const takeQuiz = (quizId) => {
        navigate('/view-quiz?id=' + quizId); // Use navigate to redirect
    };

    return (
        <div className="community-quizzes-wrapper">
            <Toast model={showToast} message={message} />
            <div>
                <Sidebar />
            </div>
            <div className="body">
                <div className="header-top">Community Quizzes</div>
                <div className="quizzes-wrapper">
                    {quizzes.map((quiz, idx) => (
                        <div key={idx} className="quiz-card card">
                            <img src={quiz.imgUrl || 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dGVjaG5vbG9neXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'} alt='img1' />
                            <div className="quiz-name">{quiz.name}</div>
                            <div className="category">{quiz.category}</div>
                            <div className="questions">{quiz.questions.length} Questions</div>
                            <div className="take-quiz btn" onClick={() => takeQuiz(quiz._id)}>Take Quiz</div>

                            <div className="top-section">
                                <div className="likes">
                                    {quiz.likes} 
                                    <img
                                        style={{cursor: 'pointer', padding: '5px'}}
                                        onClick={() => likeQuiz(quiz._id)}
                                        src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-512.png"
                                        alt='img2'
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CommunityQuizzes;
