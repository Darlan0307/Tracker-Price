export type User = {
  id: string
  providerId: string | null
  providerName: string | null
  email: string
  name: string | null
  image: string | null
  isPremium: boolean
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}
