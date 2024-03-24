import React, { useState, useEffect } from 'react';
import './TakeQuiz.css';
import $ from 'jquery';
import { useLocation, useNavigate } from 'react-router-dom';
import ProgressBar from '../ProgressBar/ProgressBar';
import axios from 'axios';

function TakeQuiz() {
    const [quiz, setQuiz] = useState({});
    const [authorized, setAuthorized] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [percentage, setPercentage] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    console.log('Location state:', location.state);
    const { quizId } = location.state || {}; // Destructure quizId from location state

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (quizId) {
                    const { data } = await axios.get(`/api/quizzes/get-quiz/${quizId}`);
                    // Assuming the API returns information about user authorization
                    if (data && data.authorized) {
                        setQuiz(data.quiz);
                        setAuthorized(true);
                        setAnswers(Array(data.quiz.questions.length).fill(0));
                        setIsLoading(false);
                    } else {
                        console.log("User not authorized to take this quiz.");
                    }
                } else {
                    console.log('No quiz ID found in location state.');
                }
            } catch (error) {
                console.error('Error fetching quiz:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [quizId]);

    const prevQuestion = () => {
        if (activeQuestionIdx > 0) {
            setActiveQuestionIdx(activeQuestionIdx - 1);
        }
    };

    const nextQuestion = () => {
        if (activeQuestionIdx < quiz.questions.length - 1) {
            setActiveQuestionIdx(activeQuestionIdx + 1);
        }
    };

    const getPercentage = (ans) => {
        let total = 0;
        ans.forEach((answer) => {
            if (answer !== 0) {
                total += 1 / answers.length;
            }
        });
        setPercentage(total);
    };

    const selectAnswer = (ans, idx) => {
        const updatedQuiz = { ...quiz };
        updatedQuiz.questions[activeQuestionIdx].answers.forEach((answer) => {
            answer.selected = false;
        });
        updatedQuiz.questions[activeQuestionIdx].answers[idx].selected = true;

        const updatedAnswers = [...answers];
        updatedAnswers[activeQuestionIdx] =
            ans.name === quiz.questions[activeQuestionIdx].correctAnswer;

        setQuiz(updatedQuiz);
        setAnswers(updatedAnswers);
        getPercentage(updatedAnswers);
    };

    const showModal = () => {
        $('#modal-wrapper-quiz').fadeIn(300);
    };

    const hideModal = () => {
        $('#modal-wrapper-quiz').fadeOut(300);
    };

    const finishQuiz = () => {
        axios.post("/api/quizzes/save-results", {
            currentUser: localStorage.getItem('_ID'),
            answers: answers,
            quizId: quiz._id
        }).then(res => {
            if (res.data) {
                navigate('/api/quizzes/view-results?id=' + res.data.scoreId);
            }
        }).catch(error => {
            console.log(error);
        });
    };

    return (
        <>
            <div id="modal-wrapper-quiz" className="modal-wrapper-quiz">
                <div className="content">
                    <div className="header">Are you sure you wish to submit your answers</div>
                    <div className="buttons-wrapper">
                        <button onClick={hideModal}>Cancel</button>
                        <button onClick={finishQuiz}>Yes</button>
                    </div>
                </div>
            </div>
            <div className="take-quiz-wrapper">
                {authorized ? (
                    <div className="content">
                        <div className="header">
                            <div className="left">{quiz.quizName}</div>
                            <ProgressBar
                                className="center"
                                progress={Number((percentage * 100).toFixed(0))}
                                size={160}
                                strokeWidth={15}
                                circleOneStroke='#dadfea'
                                circleTwoStroke={'#00aaf1'}
                            />
                        </div>
                        <div className="body">
                            <div className="left">
                                <div className="question-name">{quiz.questions[activeQuestionIdx].questionName}</div>
                                <div className="question-bubble-wrapper">
                                    {quiz.questions.map((ans, idx) => (
                                        <span
                                            onClick={() => setActiveQuestionIdx(idx)}
                                            key={idx}
                                            className={activeQuestionIdx === idx ? 'question-bubble selected-bubble' : answers[idx] === 0 ? 'question-bubble' : 'question-bubble bubble-correct'}>
                                            {idx + 1}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="right">
                                <div className="answers-wrapper">
                                    {quiz.questions[activeQuestionIdx].answers.map((ans, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => selectAnswer(ans, idx)}
                                            className={ans.selected === true ? 'selected' : 'answer'}
                                        >
                                            {ans.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="footer">
                            <div className="buttons-wrapper">
                                <button onClick={prevQuestion}>Previous</button>
                                {activeQuestionIdx + 1 < quiz.questions.length ? (
                                    <button onClick={nextQuestion}>Next</button>
                                ) : (
                                    <button onClick={showModal}>Submit Quiz</button>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>Not authorized</div>
                )}
            </div>
        </>
    );
}

export default TakeQuiz;
