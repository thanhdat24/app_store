export interface RevenueStreamModel {
  IDTUYENTHU: number;
  IDXAPHUONG: number;
  MATUYENTHU: string;
  TENTUYENTHU: string;
  KHACHHANGs: any[];
  PHANQUYENTUYENTHUs: PHANQUYENTUYENTHUs[];
  XAPHUONG: Xaphuong;
}

export interface PHANQUYENTUYENTHUs {
  IDPHANQUYENTUYENTHU: number;
  IDNHANVIEN: number;
  IDTUYENTHU: number;
  NHANVIEN: Nhanvien;
}

export interface Nhanvien {
  IDNHANVIEN: number;
  MANHANVIEN: string;
  HOTEN: string;
  SDT: number;
  NGAYSINH: null;
  DIACHI: string;
  USERNAME: string;
  PASSWORD: string;
  CHITIETPHANQUYENs: any[];
  PHANQUYENTUYENTHUs: any[];
  PHIEUTHUs: any[];
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
