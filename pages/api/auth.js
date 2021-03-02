import { Login, Signup } from 'lib/graph/Mutations/User'
import request from 'lib/graph/Utils/request'

const login = async (req, res) => {
  const type = req.body.type
  try {
    const { email, password } = req.body
    const { [type === 'login' ? 'login' : 'signup']: { user, token } = {} } = await request({
      query: type === 'login' ? Login : Signup,
      vars: { email, password }
    })

    /**
     * set cookie if user & token are found
     * else return error to client
     */
    if (user && token) {
      res.setHeader('Set-Cookie', `userToken=${token}; Path=/`)
      res.setHeader('Authorization', token)
      res.status(200).send(user)
    } else {
      res.status(400).end('not authorized')
    }
  } catch (err) {
    console.log('err:', err)
    res.status(err.status || 400).end(err.error)
  }
}

export default login
