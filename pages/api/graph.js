import { Login, Signup } from 'lib/graph/Mutations/User'
import { AllPeople, Character } from 'lib/graph/Queries'
import request from 'lib/graph/Utils/request'
import Cookies from 'universal-cookie'

const graph = async (req, res) => {
  const { type, id } = req.query

  if (id === 'abort') {
    res.status(404).end()
    return
  }

  try {

    let query
    switch (type) {
      case 'allPeople':
        query = AllPeople
        break
      case 'person':
        query = Character
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
      token: userToken,
      vars: {
        id: `${id}`
      }
    })

    res.json(data)
  } catch (err) {
    console.log('err:', err)
    res.status(err.status || 400).end(err.error)
  }
}

export default graph
