import React from 'react';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    render() {
        return (
            <div className='sign-in-wrapper'>
                <div className='form'>
                    <div className='input-wrapper'>
                        <input className='input' type='text' placeholder='Email Address' value={this.state.email} onChange={e => this.setState({email: e.target.value})}></input>
                    </div>
                    <div className='input-wrapper'>
                        <input className='input' type='password' placeholder='Password' value={this.state.password} onChange={e => this.setState({password: e.target.value})}></input>
                    </div>
                    <div className='btn' onClick={() => this.props.logIn(this.state.email, this.state.password)}>Login</div>
                </div>
            </div>
        )
    }
}

export default Login;