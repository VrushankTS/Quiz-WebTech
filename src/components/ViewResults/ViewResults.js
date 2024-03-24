import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../Sidebar/Sidebar';
import './ViewResults.css';

const ViewResults = () => {
    const navigate = useNavigate();
    const [result, setResult] = useState(null);
    const [quiz, setQuiz] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const id = qs.parse(window.location.search, { ignoreQueryPrefix: true }).id;
            if (!id || !localStorage.getItem("_ID")) {
                navigate('/');
                localStorage.clear();
            } else {
                try {
                    const res = await axios.get('/api/quizzes/results/' + id);
                    setResult(res.data.score);
                    setQuiz(res.data.quiz);
                } catch (error) {
                    console.error(error);
                }
            }
        };
        fetchData();
    }, [navigate]);

    const getBorderLeft = idx => {
        if (result && result.answers[idx]) {
            return '5px solid green';
        } else {
            return '5px solid red';
        }
    };

    const getScore = () => {
        if (result) {
            const len = result.answers.length;
            const right = result.answers.filter(ans => ans === true);
            return (100 * (right.length / len)) + '%';
        }
        return '';
    };
    
    return (
        <div className="view-results-wrapper">
            <div>
                <Sidebar />
            </div>
            {(quiz && result) && 
                <div className="body">
                    <div className="header">
                        Quiz Results 
                    </div>
                    <div className="quiz-data">
                        <div className="left">
                            <div className="header">{quiz.name}</div>
                            <div className="category">{quiz.category}</div>
                            <div className="comments">{quiz.comments.length} Comments</div>
                        </div>
                        <div className="right">
                            <div className="likes">{quiz.likes} Likes</div>
                            <div className="others">{quiz.scores.length} Other people have taken this quiz</div>
                        </div>
                    </div>

                    <div className="score">
                        Score: {getScore()}
                    </div>

                    <div className="answers"> 
                        {quiz.questions.map((q, idx) => (
                            <div key={idx} className="answer" style={{borderLeft: getBorderLeft(idx)}}>
                                <div>{q.questionName}</div>
                            </div> 
                        ))}
                    </div>

                    <div className="img">
                        <img src={quiz.imgUrl ? quiz.imgUrl : 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dGVjaG5vbG9neXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'} alt="Quiz" />
                    </div>
                </div>
            }
        </div>
    );
};

export default ViewResults;
