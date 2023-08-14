import Ajv from 'ajv'

const ajv = new Ajv({ allErrors: true, coerceTypes: true })

const queryInputValidation = {
  type: 'object',
  properties: {
    time_range_min: { type: 'number', minimum: 0, maximum: 29 },
    time_range_max: { type: 'number', minimum: 1, maximum: 30 },
  },
}

const paramInputValidation = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      pattern: '^[A-Fa-f0-9]{24}$',
    },
  },
}

export const queryValidation = (req, res, next) => {
  try {
    const queryParser = ajv.compile(queryInputValidation)
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

export const inputValidation = (req, res, next) => {}
