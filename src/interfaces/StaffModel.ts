export interface StaffModel {
  IDNHANVIEN: number;
  MANHANVIEN: string;
  HOTEN: string;
  SDT: number;
  NGAYSINH: null;
  DIACHI: string;
  USERNAME: string;
  PASSWORD: string;
  CHITIETPHANQUYENs: Chitietphanquyen[];
  PHANQUYENTUYENTHUs: any[];
  PHIEUTHUs: any[];
}

export interface Chitietphanquyen {
  IDCHITIETPHANQUYEN: number;
  IDNHANVIEN: number;
  IDQUYEN: number;
  QUYEN: Quyen;
}

export interface Quyen {
  IDQUYEN: number;
  TENQUYEN: string;
  CHITIETPHANQUYENs: null;
}