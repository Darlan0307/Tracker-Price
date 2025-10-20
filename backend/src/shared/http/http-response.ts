/* eslint-disable @typescript-eslint/no-explicit-any */

import { User } from "@app/users"

export interface HttpResponse {
  statusCode: number
  body: any
}

export interface HttpRequest {
  headers?: any
  params?: any
  query?: any
  body?: any
  userId?: string
  user?: User
}
