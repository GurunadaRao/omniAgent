export interface ReportGeneratedEvent {
  reportId: string;
  format: string;
  url?: string;
  timestamp: number;
}
