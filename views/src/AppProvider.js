import React from 'react';
import axios from 'axios';

export const AppContext = React.createContext();

export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '' && document.cookie.split(';').find(item => item.includes('token')),
      user: '',
      getEmailAndPassword: this.getEmailAndPassword,
      sendEmailAndPasswordToServer: this.sendEmailAndPasswordToServer
    }
  };

  getEmailAndPassword = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  sendEmailAndPasswordToServer = () => {
    console.log(this.state.email, this.state.password);
    axios.post('http://localhost:5000/api/users/login', {
      email: this.state.email,
      password: this.state.password
    }).then(res => {
      console.log(res);
      this.setState({
        token: res.data.token,
        user: res.data.user.name
      });
      window
    }).catch(error => {
      console.log('error', error)
    })
  };



  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
};
