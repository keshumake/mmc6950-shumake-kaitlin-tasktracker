export type Tasks = {
    id: number,
  createdAt: Date,
  updatedAt: Date,
  description: string,
  priority: Priority,
  duration: number,
  taskListId: number,
  }

  export type TaskList = {
    id: number,
  name: string,
  tasks: Tasks[],
  userId: number,
  }
  export enum Priority {
    HIGH = 'HIGH',
    MEDIUM = 'MEDIUM',
    LOW = 'LOW',
    NONE = 'NONE'
  }
  