import { format } from "date-fns";

export function fDate(date: Date | string): string {
  return format(new Date(date), "dd/MM/yyyy");
}

export function fDateTime(date: Date | string): string {
  return format(new Date(date), "dd/MM/yyyy, h:mm a");
}
