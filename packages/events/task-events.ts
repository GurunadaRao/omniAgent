export interface TaskCreatedEvent {
  taskId: string;
  type: string;
  payload: any;
  timestamp: number;
}
