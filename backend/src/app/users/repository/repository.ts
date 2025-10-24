import { UpdateConfigNotification, User } from "../types"

export interface UserRepository {
  get(id: string): Promise<User | null>
  updateConfigNotification(
    id: string,
    updateConfigNotification: UpdateConfigNotification
  ): Promise<void>
  increaseMonitoredProducts(id: string): Promise<void>
  decreaseMonitoredProducts(id: string): Promise<void>
}
