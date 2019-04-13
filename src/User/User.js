import React from 'react';
import { Query } from "react-apollo";
import {Table, Image} from 'react-bootstrap';
import gql from "graphql-tag";
import {QUERY_GET_USERS} from '../GraphQL';


const Users = ( props ) => (
  <Query
    query={gql`${QUERY_GET_USERS}`}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>User Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              data.user.map(user => (
                <tr key={user.id} onClick={props.onClick(user)} >
                  <td><Image src={user.image_url} thumbnail /></td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.status}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      )
    }}
  </Query>
);

export default Users;
