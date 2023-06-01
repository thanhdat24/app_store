import { StaffModel } from "./StaffModel";

export interface RevenueRoutesModel {
  IDTUYENTHU: number;
  IDXAPHUONG: number;
  MATUYENTHU: string;
  TENTUYENTHU: string;
  KHACHHANGs: any[];
  PHANQUYENTUYENTHUs: Phanquyentuyenthu[];
  XAPHUONG: Xaphuong;
}

export interface Phanquyentuyenthu {
  IDPHANQUYENTUYENTHU: number;
  IDNHANVIEN: number;
  IDTUYENTHU: number;
  NHANVIEN: StaffModel;
}

export interface Xaphuong {
  IDXAPHUONG: number;
  IDQUANHUYEN: number;
  TENXAPHUONG: string;
  QUANHUYEN: Quanhuyen;
  TUYENTHUs: null;
}

export interface Quanhuyen {
  IDQUANHUYEN: number;
  TENQUANHUYEN: string;
  XAPHUONGs: null;
}
