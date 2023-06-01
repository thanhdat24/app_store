export interface WardModel {
  IDXAPHUONG: number;
  IDQUANHUYEN: number;
  TENXAPHUONG: string;
  QUANHUYEN: QuanHuyen[];
  TUYENTHUs: any[];
}

export interface QuanHuyen {
  IDQUANHUYEN: number;
  TENQUANHUYEN: string;
  XAPHUONGs: null;
}
