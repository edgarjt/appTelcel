export interface RequestLoginInterface {
  email: string;
  password: string;
}

export interface ResponseLoginInterface {
  id: number;
  nombre: string;
  password: string;
  email: string;
  telefono: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
}

export interface ResponseLogoutInterface {
  error: string;
  message: string;
  code: number;
}
