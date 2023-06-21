export interface CustomerModel {
  IDKHACHHANG: number;
  IDTUYENTHU: number;
  IDLOAIKH: number;
  IDXAPHUONG: number;
  MAKHACHHANG: string;
  HOTEN: string;
  DIACHI: string;
  CMT: string;
  NGAYCAP: null;
  NGAYTAO: null;
  NGAYCHINHSUA: null;
  TRANGTHAI: string;
  LOAIKH: Loaikh;
  TUYENTHU: Tuyenthu;
  PHIEUTHUs: any[];
  KHACHHANG?: null;
}

export interface Loaikh {
  IDLOAIKH: number;
  TENLOAI: string;
  TENLOAIPHI: string;
  GIA: number;
  KHACHHANGs: null;
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
