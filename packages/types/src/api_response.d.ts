export type ErrorResponse<T = Record<string, unknown> | Record<string, unknown>[]> = {
  data: T
  message: string
  statusCode: number | string
  success: boolean
}

export interface IApiResponse<T = Record<string, unknown> | Record<string, unknown>[]> {
  statusCode: string
  message: string
  data: T
}
