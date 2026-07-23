export interface Usuario {
  idUsuario: number;
  nombre: string;
  email: string;
  rol: 'Administrador' | 'Cliente';
  activo: boolean;
}
