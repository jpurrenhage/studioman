import React from 'react';
import { Query } from "react-apollo";
import {Table} from 'react-bootstrap';
import gql from "graphql-tag";
import {QUERY_GET_ACCOUNTS} from '../GraphQL';

const Accounts = (props) => (
    <Query
      query={gql`${QUERY_GET_ACCOUNTS}`}
      variables={{ userId: props.user.id }}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        return (
          <div>
            <h4>Accounts for {props.user.name}</h4>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Account Name</th>
                  <th>Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.account_aggregate.nodes.map(account => (
                    <tr key={account.id} onClick={props.onClick(account)} >
                      <td>{account.name}</td>
                      <td>{account.type}</td>
                      <td>{account.status}</td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </div>
        )
      }}
    </Query>
);

export default Accounts;
