import { GraphQLClient } from 'graphql-request'

const Client = new GraphQLClient(
  `${process.env.API_URL}/graphql`,
  {
    credentials: 'include'
  }
)

async function request({ query, vars, token }) {
  try {
    if (token) {
      Client.setHeaders({
        Authorization: token
      })
    }
    const data = await Client.request(query, vars)
    return data
  } catch (e) {
    if ('response' in e) { // Use GQL error if we got a response.
      const error = e.response.errors ? e.response.errors[0] : e.response
      throw (error)
    } else { // No GQL response, could be network error.
      throw (e)
    }
  }
}

export default request
