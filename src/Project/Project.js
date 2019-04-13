import React from 'react';
import { Query } from "react-apollo";
import {Table} from 'react-bootstrap';
import gql from "graphql-tag";
import {QUERY_GET_PROJECTS} from '../GraphQL';

const Projects = (props) => (
    <Query
      query={gql`${QUERY_GET_PROJECTS}`}
      variables={{ accountId: props.account.id }}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        return (
          <div>
            <h4>Projects for Account {props.account.name}</h4>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Customer</th>
                  <th>Type</th>
                  <th>Start Date</th>
                  <th>Due Date</th>
                  <th>Completion Date</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.project_aggregate.nodes.map(project => (
                    <tr key={project.id} onClick={props.onClick(project)} >
                      <td>{project.name}</td>
                      <td>{project.project_customer.name}</td>
                      <td>{project.type}</td>
                      <td>{project.start_date}</td>
                      <td>{project.due_date}</td>
                      <td>{project.completion_date}</td>
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

export default Projects;
