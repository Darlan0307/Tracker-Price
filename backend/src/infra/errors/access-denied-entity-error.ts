export class AccessDeniedEntityError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "AccessDeniedEntityError"
  }
}
