export interface WorkerResult<T = any> {
  success: boolean;
  output: T;
  metadata: Record<string, any>;
  executionTime: number;
  citations: string[];
}

export abstract class BaseWorker<TInput = any, TOutput = any> {
  abstract readonly workerType: string;

  abstract execute(input: TInput): Promise<WorkerResult<TOutput>>;

  protected createSuccessResult(
    output: TOutput,
    startTime: number,
    citations: string[] = [],
    metadata: Record<string, any> = {}
  ): WorkerResult<TOutput> {
    return {
      success: true,
      output,
      metadata,
      executionTime: Date.now() - startTime,
      citations,
    };
  }

  protected createFailureResult(
    error: Error | string,
    startTime: number,
    metadata: Record<string, any> = {}
  ): WorkerResult<null> {
    return {
      success: false,
      output: null,
      metadata: {
        ...metadata,
        error: typeof error === "string" ? error : error.message,
      },
      executionTime: Date.now() - startTime,
      citations: [],
    };
  }
}
