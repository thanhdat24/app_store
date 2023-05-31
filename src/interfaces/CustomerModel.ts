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
}

export interface Loaikh {
  IDLOAIKH: number;
  TENLOAI: string;
  TENLOAIPHI: string;
  GIA: number;
  KHACHHANGs: null;
}

export interface Quanhuyen {
  IDQUANHUYEN: number;
  TENQUANHUYEN: string;
  TUYENTHUs: Tuyenthu[];
  XAPHUONGs: any[];
}

export interface Tuyenthu {
  IDTUYENTHU: number;
  IDQUANHUYEN: number;
  MATUYENTHU: string;
  TENTUYENTHU: string;
  KHACHHANGs: null;
  PHANQUYENTUYENTHUs: any[];
  QUANHUYEN?: Quanhuyen;
}
