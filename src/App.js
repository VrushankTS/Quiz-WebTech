import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth/Auth.js'
import Dashboard from './components/Dashboard/Dashboard.js';
import CreateQuiz from './components/CreateQuiz/CreateQuiz.js';
import CommunityQuizzes from './components/CommunityQuizzes/CommunityQuizzes.js';
import MyQuizzes from './components/MyQuizzes/MyQuizzes.js';
import ViewQuiz from './components/ViewQuiz/ViewQuiz.js';
import TakeQuiz from './components/TakeQuiz/TakeQuiz.js';
import Profile from './components/Profile/Profile.js';
import ViewResults from './components/ViewResults/ViewResults.js';
import axios from 'axios';
import store from './store/index.js';

class App extends React.Component{

  componentDidMount() {
    if(localStorage.getItem('_ID')) {
      axios.get(`/api/users/${localStorage.getItem('_ID')}`).then(res => {
        store.dispatch({
          type: 'set_user',
          user: res.data.user
        })
      }).catch(er => {
        console.log(er);
      })
    }
  } 

  render() {
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-quiz" element={<CreateQuiz />} />
            <Route path="/community-quizzes" element={<CommunityQuizzes />} />
            <Route path="/my-quizzes" element={<MyQuizzes />} />
            <Route path="/view-quiz" element={<ViewQuiz />} />
            <Route path="/take-quiz" element={<TakeQuiz />} />
            <Route path="/view-results" component={<ViewResults />} />
            <Route path="/account" component={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
