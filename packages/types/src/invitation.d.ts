/* eslint-disable prettier/prettier */
export interface InvitationDetails {
  id: string
  email: string
  status: string
  role: string
  expiresAt: Date
  workspace: {
    id: string | number
    name: string
    slug: string
  }
  inviter: {
    id: string | number
    name: string | null
    email: string
  }
}
