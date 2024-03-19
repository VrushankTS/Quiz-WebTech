// import React from "react";
// class Signup extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             email: '',
//             password: '',
//             firstName: '',
//             lastName: ''
//         }
//     }
//     render() {
//         return (
//             <div className="sign-up-wrapper">
//                 <div className='form'>
//                     <div className='input-wrapper'>
//                         <input className='input' type='text' placeholder='Email Address' value={this.state.email} onChange={e => this.setState({email: e.target.value})}></input>
//                     </div>
//                     <div className='input-wrapper'>
//                         <input className='input' type='password' placeholder='Password' value={this.state.password} onChange={e => this.setState({password: e.target.value})}></input>
//                     </div>
//                     <div className='input-wrapper'>
//                         <input className='input' type='text' placeholder='First Name' value={this.state.firstName} onChange={e => this.setState({firstName: e.target.value})}></input>
//                     </div>
//                     <div className='input-wrapper'>
//                         <input className='input' type='text' placeholder='Last Name' value={this.state.lastName} onChange={e => this.setState({lastName: e.target.value})}></input>
//                     </div>
//                     <div className='btn' onClick={() => this.props.signUp({...this.state})}>Sign Up</div>
//                 </div>
//             </div>
//         )
//     }
// }
// export default Signup;

import React from "react";

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            errors: {} // Add errors state to store validation errors
        };
    }

    // Function to handle form submission
    handleSubmit = () => {
        const { email, password, firstName, lastName } = this.state;
        // Call signUp function passed from parent component with signup data
        this.props.signUp(email, password, firstName, lastName);
    }

    // Function to handle input change and update state
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { email, password, firstName, lastName, errors } = this.state;

        return (
            <div className="sign-up-wrapper">
                <div className='form'>
                    <div className='input-wrapper'>
                        <input className='input' type='text' placeholder='Email Address' name="email" value={email} onChange={this.handleChange}></input>
                        {/* Display email error message */}
                        {errors.email && <div className="error">{errors.email}</div>}
                    </div>
                    <div className='input-wrapper'>
                        <input className='input' type='password' placeholder='Password' name="password" value={password} onChange={this.handleChange}></input>
                        {/* Display password error message */}
                        {errors.password && <div className="error">{errors.password}</div>}
                    </div>
                    <div className='input-wrapper'>
                        <input className='input' type='text' placeholder='First Name' name="firstName" value={firstName} onChange={this.handleChange}></input>
                        {/* Display first name error message */}
                        {errors.firstName && <div className="error">{errors.firstName}</div>}
                    </div>
                    <div className='input-wrapper'>
                        <input className='input' type='text' placeholder='Last Name' name="lastName" value={lastName} onChange={this.handleChange}></input>
                        {/* Display last name error message */}
                        {errors.lastName && <div className="error">{errors.lastName}</div>}
                    </div>
                    <div className='btn' onClick={this.handleSubmit}>Sign Up</div>
                </div>
            </div>
        );
    }
}

export default Signup;

