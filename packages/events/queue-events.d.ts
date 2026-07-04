export interface QueueStatusEvent {
    queueName: string;
    activeCount: number;
    waitingCount: number;
    timestamp: number;
}
