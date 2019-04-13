import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Users from '../User/User';
import Accounts from '../Account/Account';
import Projects from '../Project/Project';

const client = new ApolloClient({
  uri: "https://artemis.onlinebands.com/v1alpha1/graphql",
  fetchOptions: {
    credentials: 'include'
  },
  request: async (operation) => {
    const token = 'artemis-audio-database';
    operation.setContext({
      headers: {
        'X-Hasura-Admin-Secret': token
      }
    })
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {currentUser: null, currentAccount: null};
  }
  setCurrentUser(user) {
    this.setState({currentUser: user, currentAccount: null});
  }
  setCurrentAccount(account) {
    this.setState({currentAccount: account});
  }
  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {
          isAuthenticated() && (
              <div className="container">
                <ApolloProvider client={client}>
                  <div>
                    <h2>StudioMan</h2>
                    <Users onClick={(user) => (e) => this.setCurrentUser(user)} />
                    { this.state.currentUser && (
                      <Accounts
                        user={this.state.currentUser}
                        onClick={(account) => (e) => this.setCurrentAccount(account)}
                      />
                      )
                    }
                    { this.state.currentAccount && (
                      <Projects
                        account={this.state.currentAccount}
                        onClick={(project) => (e) => console.log('clicked project:', project)}
                      />
                      )
                    }
                  </div>
                </ApolloProvider>
              </div>
          )
        }
        {
          !isAuthenticated() && (
              <h4>
                You are not logged in! Please{' '}
                <button
                  style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}
                >
                  Log In
                </button>
                {' '}to continue.
              </h4>
            )
        }
      </div>
    );
  }
}


export default Home;
