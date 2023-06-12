export interface CashierModel {
  IDKHACHHANG: number;
  IDTUYENTHU: number;
  IDLOAIKH: number;
  IDXAPHUONG: number;
  MAKHACHHANG: string;
  HOTEN: string;
  DIACHI: string;
  CMT: string;
  NGAYCAP: Date;
  NGAYTAO: null;
  NGAYCHINHSUA: null;
  TRANGTHAI: boolean;
  LOAIKH: {};
  TUYENTHU: Tuyenthu;
  PHIEUTHUs: any[];
}

export interface Tuyenthu {
  IDTUYENTHU: number;
  IDXAPHUONG: number;
  MATUYENTHU: string;
  TENTUYENTHU: string;
  KHACHHANGs: null;
  PHANQUYENTUYENTHUs: any[];
  XAPHUONG: Xaphuong;
}

export interface Xaphuong {
  IDXAPHUONG: number;
  IDQUANHUYEN: number;
  TENXAPHUONG: string;
  QUANHUYEN: Quanhuyen;
  TUYENTHUs: any[];
}

export interface Quanhuyen {
  IDQUANHUYEN: number;
  TENQUANHUYEN: string;
  XAPHUONGs: null;
}
