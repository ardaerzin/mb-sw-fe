import { Login, Signup } from 'lib/graph/Mutations/User'
import { AllPeople } from 'lib/graph/Queries'
import request from 'lib/graph/Utils/request'
import Cookies from 'universal-cookie'

const graph = async (req, res) => {
  const { type } = req.query
  try {

    let query
    switch (type) {
      case 'allPeople':
        query = AllPeople
        break
      default:
        break
    }

    if (!query) throw new Error('no queries found')

    var header = req && req.headers && req.headers.cookie
    var uc = new Cookies(header)
    const { userToken } = uc.getAll()

    const data = await request({
      query,
      token: userToken
    })

    res.json(data)
  } catch (err) {
    console.log('err:', err)
    res.status(err.status || 400).end(err.error)
  }
}

export default graph
