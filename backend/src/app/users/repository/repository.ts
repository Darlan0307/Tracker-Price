import { User } from "../types"

export interface UserRepository {
  get(id: string): Promise<User | null>
}
