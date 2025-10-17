declare global {
  namespace Express {
    interface Request {
      userId: string
      user: User
    }

    interface User {
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
  }
}

export {}
