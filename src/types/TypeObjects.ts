export interface LoginData {
  data: {token: string};
  error: string;
  status: number;
}

export interface QRData {
  first_name: string,
  last_name: string,
  email: string
}