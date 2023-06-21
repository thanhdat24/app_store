export interface StatisticsModel {
  tenkythu: string;
  tentuyenthu: string;
  nhanvienthu: string;
  idnhanvien: number;
  soluongtong: number;
  soluongdathu: number;
  soluongchuathu: number;
  soluongphieuhuy: number;
  tongtien: number;
  phantramdathu: number;
  phantramchuathu: number;
  lpq: Lpq[];
}

export interface Lpq {
  IDPHANQUYENTUYENTHU: number;
  IDNHANVIEN: number;
  IDTUYENTHU: number;
  NHANVIEN: Nhanvien;
  TUYENTHU: null;
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
  PHANQUYENTUYENTHUs: null;
  PHIEUTHUs: any[];
}
