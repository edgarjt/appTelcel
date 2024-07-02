export interface RequestCheckInInterface {
  usuarioId: number;
  tipo: number;
  fechaHora: string;
}

export interface ResponseCheckInInterface {
  id: number;
  usuarioId: number;
  usuario: Usuario;
  tipo: number;
  fechaHora: Date;
}

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
}
