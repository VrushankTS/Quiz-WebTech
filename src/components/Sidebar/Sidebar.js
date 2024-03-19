// import React from "react";
// import { NavLink } from "react-router-dom";
// import './Sidebar.css';

// class Sidebar extends React.Component {
//     componentDidMount() {
//         this.unsubscribe = this.props.store.subscribe(() => this.forceUpdate());
//     }

//     componentWillUnmount() {
//         this.unsubscribe();
//     }

//     render() {
//         const user = this.props.store.getState().user;

//         if(user){
//             return(
//                 <div className="sidebar-wrapper">
//                     <div className="header">Triviaplaza</div>

//                     <div className="user">
//                         <div className="avatar" style={{backgroundImage:'url(https://pasrc.princeton.edu/sites/g/files/toruqf431/files/styles/3x4_750w_1000h/public/2021-03/blank-profile-picture-973460_1280.jpg?itok=wWzzzj7Q)'}}></div>
//                         <div className="name">{user.firstName + ' ' + user.lastName}</div>
//                     </div>

//                     <div className="links">
//                         <div className="dashboardLink"><NavLink to="/dashboard">Dashboard</NavLink></div>
//                         <div className="accountLink"><NavLink to="/account">Account</NavLink></div>
//                         <div className="myQuizzesLink"><NavLink to="/my-quizzes">My Quizzes</NavLink></div>
//                         <div className="createQuizLink"><NavLink to="/create-quiz">Create Quiz</NavLink></div>
                        
//                     </div>
//                 </div>
//             )
//         } else {
//             return(
//                 <div>Loading</div>
//             )
//         }
//     }
// }

// export default Sidebar;


import React from 'react';
import store from '../../store/index';
import {NavLink} from 'react-router-dom';
import './Sidebar.css';

export default class Sidebar extends React.Component {

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    // bgImage = () => {
    //     if(store.getState().user.avatar && store.getState().user.avatar.url) {
    //         return `url(${store.getState().user.avatar.url})`;
            
    //     } else {
    //         return `url(https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg)`;
    //     }
    // }

    render() {
        if (store.getState().user) {
            return (
                <div className="sidebar-wrapper">
                    <div className="header">Triviaplaza</div>
    
                    <div className="user">
                        {/* <div className="avatar" style={{backgroundImage: this.bgImage()}}></div> */}
                        <div className="name">{store.getState().user.firstName + ' ' + store.getState().user.lastName}</div>
                    </div>

                    <div className="links">
                        <NavLink to="/dashboard"><div className="link">Dashboard</div></NavLink>
                        <NavLink to="/account"><div className="link">Account</div></NavLink>
                        <NavLink to="/create-quiz"><div className="link">Create Quiz</div></NavLink>
                        <NavLink to="/my-quizzes"><div className="link">My Quizzes</div></NavLink>
                        <NavLink to="/community-quizzes"><div className="link">Community quizzes</div></NavLink>
                    </div>
                </div>
            )
        } else {
            return (
                <div>Loading</div>
            )
        }
    }
}