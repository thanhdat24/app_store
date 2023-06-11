import { format } from "date-fns";

export function fDate(date: Date | string): string {
  return format(new Date(date), "dd/MM/yyyy");
}

export function fMonthYear(date: Date | string): string {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    // Xử lý trường hợp giá trị ngày tháng không hợp lệ
    return "";
  }

  return format(parsedDate, "MM/yyyy");
}

export function fDateTime(date: Date | string): string {
  return format(new Date(date), "dd/MM/yyyy, h:mm a");
}
