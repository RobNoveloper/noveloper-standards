// Simple in-memory storage implementation
export class MemStorage {
  constructor() {
    this.users = new Map();
    this.currentId = 1;
  }

  async getUser(id) {
    return this.users.get(id);
  }

  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(u => u.username === username);
  }

  async createUser(insertUser) {
    const user = {
      id: this.currentId++,
      ...insertUser,
    };
    this.users.set(user.id, user);
    return user;
  }
}

// Export the memory storage for simplicity
export const storage = new MemStorage();