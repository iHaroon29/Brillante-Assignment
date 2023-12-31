export class CustomError extends Error {
  constructor(status, message, errType) {
    super(constructor)
    this.status = status
    this.message = message
    this.errType = errType
  }
  static badRequest(msg) {
    return new CustomError(400, msg, 'BAD_REQUEST_CLIENT')
  }
  static invalidRoute(msg) {
    return new CustomError(404, msg, 'ROUTE_NOT_FOUND_CLIENT')
  }
  static internalServerError(msg) {
    return new CustomError(500, msg, 'SERVER_ERROR')
  }
  static requestFailedError(msg) {
    return new CustomError(500, msg, 'NETWORK_ERROR')
  }
  static externalResponseError(msg, status) {
    return new CustomError(status, msg, 'EXTERNAL_API_ERROR')
  }
}
