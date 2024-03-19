import React from "react";
import Sidebar from '../Sidebar/Sidebar';
import store from "../../store/index";
import './Dashboard.css';

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if(!localStorage.getItem('JWT_PAYLOAD')) {
      this.props.history.push('/');
    }
  }

  render() {
      return (
          <div className="dashboard-wrapper">
            <div className="sidebar">
              <Sidebar store={store} />
            </div>
            
            <div className="main">

              <div className="top"></div>
                <div className="left">
                  <div className="header">Statistics</div>
                </div>
                <div className="right">
                  <div className="header">My Quizzes</div>
                </div>

              <div className="bottom">
                
              </div>
            </div>                
          </div>

          
      );        
  }
}

// DashboardWithSidebar.js
// import React from 'react';
// import Sidebar from '../Sidebar/Sidebar'; // Import your Sidebar component
// import Dashboard from './Dashboard'; // Import your Dashboard component

// function DashboardWithSidebar() {
//   return (
//     <div className="dashboard-wrapper">
//       <Sidebar /> {/* Render the Sidebar component */}
//       <Dashboard /> {/* Render the Dashboard component */}
//     </div>
//   );
// }

// export default DashboardWithSidebar;