export interface ResponseBody<T> {
  status: "success" | "error" | "warning";
  message: string;
  data: T[];
}
