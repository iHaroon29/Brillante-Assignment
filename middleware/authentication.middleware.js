import { credentials } from '../config/credential.js'
import { CustomError } from '../error/custom.error.js'

export const isAuthenticated = (req, res, next) => {
  try {
    const { token } = req.query
    if (!token) {
      throw CustomError.badRequest('Missing Secret Token!')
    }
    if (token !== credentials.secretToken)
      throw CustomError.badRequest('Invalid Secret Token!')
    next()
  } catch (e) {
    console.log('Error in Authentication Middle-ware')
    return next(e)
  }
}
