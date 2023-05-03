export default class InvalidParam extends Error {
    constructor(message = 'This is not a valid parameter') {
      super(message)
      this.name = this.constructor.name
      Error.captureStackTrace(this, this.constructor)
    }
  }
