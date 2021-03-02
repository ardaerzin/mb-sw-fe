export const Login = /* GraphQL */ `
  mutation (
    $email: String!
    $password: String!
  ) {
    login(email: $email, password: $password) {
      user {
        id
        email
      }
      token
    }
  }
`

export const Signup = /* GraphQL */ `
  mutation (
    $email: String!
    $password: String!
  ) {
    signup(email: $email, password: $password) {
      user {
        id
        email
      }
      token
    }
  }
`
