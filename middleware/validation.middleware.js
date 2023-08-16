import Ajv from 'ajv'
import { CustomError } from '../error/custom.error.js'

const ajv = new Ajv({ allErrors: true, coerceTypes: true, $data: true })

const getPriceQueryValidationSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', pattern: '^[A-Fa-f0-9]{24}$' },
    time_range_max: {
      type: 'integer',
      minimum: 1,
      maximum: 30,
    },
  },
  additionalProperties: false,
}

export const getPriceQueryValidation = (req, res, next) => {
  try {
    const queryParser = ajv.compile(getPriceQueryValidationSchema)
    const validationResult = queryParser(req.query)
    if (!validationResult) throw queryParser.errors
    next()
  } catch (e) {
    let message = []
    e.forEach((error) => {
      message.push(`${error.instancePath.split('/')[1]} ${error.message}`)
    })
    res.status(400).send({ message: message.join(' and ') })
  }
}

export const goldPriceQueryValidation = (req, res, next) => {
  try {
    const queryMap = ['generate', 'time_range_max', 'current', 'token']
    for (let query in req.query) {
      if (!queryMap.includes(query))
        throw CustomError.badRequest(
          `Invalid query parameter included - ${query}`
        )
    }
    next()
  } catch (e) {
    res.status(400).send({ message: e.message })
  }
}
