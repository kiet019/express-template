export interface ResponseBody<T> {
  status: "success" | "error" | "warning";
  message: string;
  data: T[];
}

export const errorResponse = (error: any) => {
  const response: ResponseBody<string> = {
    data: [],
    message: error.message,
    status: "error",
  };
  return response
}