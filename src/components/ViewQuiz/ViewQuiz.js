import React, { useState, useEffect } from 'react';
import './ViewQuiz.css';
import qs from 'qs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function ViewQuiz() {
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [quiz, setQuiz] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [inputVal, setInputVal] = useState('');

    useEffect(() => {
        const id = qs.parse(window.location.search, { ignoreQueryPrefix: true }).id;
        setId(id);
        refreshQuiz(id);
    }, []);

    const checkAuth = () => {
        // Ensure quiz object is not empty
        if (Object.keys(quiz).length === 0) {
            setIsAuthenticated(false);
            return;
        }
    
        // Check if mustBeSignedIn is true and user is authenticated
        if (quiz.mustBeSignedIn && localStorage.getItem('JWT_PAYLOAD') && localStorage.getItem('_ID')) {
            setIsAuthenticated(true);
        } else if (quiz.mustBeSignedIn) {
            // If mustBeSignedIn is true but user is not authenticated
            setIsAuthenticated(false);
        }
        // If mustBeSignedIn is false, allow access
    };
    

    const refreshQuiz = (id) => {
        axios.get('/api/quizzes/get-quiz/' + id)
            .then(res => {
                if (res.data) {
                    setIsLoading(false);
                    setQuiz(res.data.quiz);
                    checkAuth();
                }
            })
            .catch(err => {
                console.error(err);
            });
    };

    const startQuiz = () => {
        console.log("Take Quiz clicked.")
        navigate(`/api/quizzes/take-quiz/${id}`, { state: { quizId: id, quiz } });
    };

    const addComment = () => {
        if (!inputVal.length) return;
        axios.post('/api/quizzes/add-comment', { quizId: id, message: inputVal, sentFromId: localStorage.getItem('_ID') })
            .then(res => {
                if (res.data) {
                    refreshQuiz(id);
                    setInputVal('');
                }
            })
            .catch(err => {
                console.error(err);
            });
    };

    return !isLoading ? (
        <div className="view-quiz">
            {!isAuthenticated ? (
                <div className="not-auth">You must be logged in to take this quiz</div>
            ) : (
                <div className="content">
                    <div className="header">{quiz.name}</div>
                    <div className="body">
                        <div className="left">
                            <div className="description">{quiz.description}</div>
                            <div className="comments">
                                {quiz.comments.map((com, idx) => (
                                    <div className="comment" key={idx}>
                                        <img style={{ borderRadius: '100%' }} className="img" src="https://img.pngio.com/png-avatar-108-images-in-collection-page-3-png-avatar-300_300.png" alt='pic' />
                                        <div>{com.message}</div>
                                        <div>{com.sentFromName}</div>
                                    </div>
                                ))}
                                <div className="input-field">
                                    <input value={inputVal} onChange={e => setInputVal(e.target.value)} type="text" placeholder="Add a new comment" />
                                    <button onClick={addComment}>Send</button>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <div className="questions-num">{quiz.questions.length} Questions</div>
                            <div className={quiz.createdBy === localStorage.getItem('_ID') ? 'questions-wrapper' : 'questions-wrapper no-scroll'}>
                                {quiz.questions.map((question, idx) => (
                                    <div className="question" key={idx}>
                                        <div>{quiz.createdBy === localStorage.getItem('_ID') ? question.questionName : 'question name'}</div>
                                        <div>{quiz.createdBy === localStorage.getItem('_ID') ? question.correctAnswer : 'answer'}</div>
                                    </div>
                                ))}
                                {quiz.createdBy !== localStorage.getItem('_ID') ? <div className="hidden"><div>Must be creator to look at questions</div></div> : ''}
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <div className="buttons-wrapper">
                            <button onClick={() => navigate(-1)}>Go Back</button>
                            <button onClick={startQuiz}>Take Quiz</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    ) : <h2>Loading</h2>;
}

export default ViewQuiz;
