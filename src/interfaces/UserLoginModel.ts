export interface UserLoginModel {
  token: string;
  IDNHANVIEN: number;
  MANHANVIEN: string;
  HOTEN: string;
  SDT: number;
  NGAYSINH: null;
  DIACHI: string;
  USERNAME: string;
  PASSWORD: string;
  CHITIETPHANQUYENs: Chitietphanquyen[];
}

export interface Chitietphanquyen {
  IDCHITIETPHANQUYEN: number;
  IDNHANVIEN: number;
  IDQUYEN: number;
  NHANVIEN: null;
  QUYEN: Quyen;
}

export interface Quyen {
  IDQUYEN: number;
  TENQUYEN: string;
  CHITIETPHANQUYENs: any[];
}
