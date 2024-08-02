/* eslint-disable import/extensions */
export * from './api_response'
export * from './api_token'
export * from './app'
export * from './auth'
export * from './oauth'
export * from './user'
export * from './workspace'
export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? ObjectType[Key] extends { pop: any; push: any }
      ? `${Key}`
      : `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`
}[keyof ObjectType & (string | number)]
