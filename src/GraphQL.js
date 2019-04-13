const QUERY_GET_USERS = `
query {
  user {
    id
    email
    name
    status
    image_url
  }
}`;


const QUERY_GET_ACCOUNTS = `
query fetch_accountsForUser($userId: Int!) {
  account_aggregate(
    where: {user_id: {_eq: $userId} }
  ) {
    nodes {
      id
      name
      type
      status
    }
  }
}`;


const QUERY_GET_PROJECTS = `
query fetch_projectsForAccount($accountId: Int!) {
  project_aggregate(
    where: {owner_id: {_eq: $accountId}}
  ) {
    nodes {
      id
      name
      project_customer {
        name
      }
      type
      start_date
      due_date
      completion_date
      description
    }
  }
}`;


export {
  QUERY_GET_USERS,
  QUERY_GET_ACCOUNTS,
  QUERY_GET_PROJECTS
};
