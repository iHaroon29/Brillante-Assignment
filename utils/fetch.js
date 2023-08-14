import { CustomError } from '../error/custom.error.js'

export const httpRequest = async function (url, options = {}) {
  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw CustomError.externalResponseError('API_ERROR', 404)
    }
    return await response.json()
  } catch (e) {
    return e
  }
}
