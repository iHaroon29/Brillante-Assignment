import { CustomError } from '../error/custom.error.js'

export const httpRequest = async function (url, options = {}) {
  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      const { message } = await response.json()
      throw CustomError.externalResponseError(message, 404)
    }
    return await response.json()
  } catch (e) {
    return e
  }
}
