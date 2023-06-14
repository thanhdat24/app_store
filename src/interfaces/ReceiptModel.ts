export interface ReceiptModel {
  IDPHIEU: number;
  IDKHACHHANG: number;
  IDKYTHU: number;
  IDNHANVIEN: number;
  MAUSOPHIEU: string;
  MASOPHIEU: string;
  KYHIEU: string;
  TRANGTHAIPHIEU: boolean;
  TRANGTHAIHUY: boolean;
  NGAYTAO: null;
  NGAYCAPNHAT: null;
  NGUOICAPNHAT: string;
  NGUOITHU: null;
  CHITIETPHIEUTHUs: CHITIETPHIEUTHUs[];
  KHACHHANG: Khachhang;
  KYTHU: Kythu;
  NHANVIEN: Nhanvien;
}

export interface CHITIETPHIEUTHUs {
  IDCHITIETPHIEUTHU: number;
  IDPHIEU: number;
  NOIDUNG: string;
  SOTIEN: number;
}

export interface Khachhang {
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
  TRANGTHAI: boolean;
  LOAIKH: null;
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

export interface Kythu {
  IDKYTHU: number;
  TENKYTHU: string;
  TRANGTHAIKYTHU: boolean;
  PHIEUTHUs: null;
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
  PHIEUTHUs: null;
}
