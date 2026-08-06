import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { adminGuard } from './core/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/public/home/home').then(m => m.Home)
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
  },
  {
    path: 'faq',
    loadComponent: () => import('./features/public/faq/faq').then(m => m.FaqComponent)
  },
  {
    path: 'contacto',
    loadComponent: () => import('./features/public/contacto/contacto').then(m => m.Contacto)
  },
  {
    path: 'solicitar-acceso',
    loadComponent: () => import('./features/public/solicitar-acceso/solicitar-acceso').then(m => m.SolicitarAcceso)
  },
  {
    path: 'cliente/perfil',
    canActivate: [authGuard],
    loadComponent: () => import('./features/cliente/perfil/perfil').then(m => m.Perfil)
  },
  {
    path: 'documentacion',
    canActivate: [authGuard],
    loadComponent: () => import('./features/cliente/documentacion/documentacion').then(m => m.DocumentacionComponent)
  },
  {
  path: 'producto',
  loadComponent: () => import('./features/public/producto/producto').then(m => m.ProductoComponent)
  },
  {
  path: 'testimonios',
  loadComponent: () => import('./features/public/testimonios/testimonios').then(m => m.Testimonios)
  },
  {
  path: 'cotizar',
  loadComponent: () => import('./features/public/cotizar/cotizar').then(m => m.Cotizar)
  },
  {
  path: 'cliente/comprar',
  canActivate: [authGuard],
  loadComponent: () => import('./features/cliente/comprar/comprar').then(m => m.Comprar)
  },
  {
  path: 'cliente/mis-compras',
  canActivate: [authGuard],
  loadComponent: () => import('./features/cliente/mis-compras/mis-compras').then(m => m.MisCompras)
  },
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./features/admin/dashboard/dashboard').then(m => m.Dashboard)
      },
      {
        path: 'solicitudes',
        loadComponent: () => import('./features/admin/solicitudes/solicitudes').then(m => m.SolicitudesComponent)
      },
      {
        path: 'usuarios',
        loadComponent: () => import('./features/admin/usuarios/usuarios').then(m => m.Usuarios)
      },
      {
        path: 'usuarios/nuevo',
        loadComponent: () => import('./features/admin/usuario-form/usuario-form').then(m => m.UsuarioForm)
      },
      {
        path: 'usuarios/:id/editar',
        loadComponent: () => import('./features/admin/usuario-form/usuario-form').then(m => m.UsuarioForm)
      },
      {
      path: 'comentarios',
      loadComponent: () => import('./features/admin/comentarios/comentarios').then(m => m.ComentariosAdmin)
      },
      {
  path: 'proveedores',
  loadComponent: () => import('./features/admin/proveedores/proveedores').then(m => m.Proveedores)
    },
    {
    path: 'proveedores/nuevo',
    loadComponent: () => import('./features/admin/proveedor-form/proveedor-form').then(m => m.ProveedorForm)
    },
    {
    path: 'proveedores/:id/editar',
    loadComponent: () => import('./features/admin/proveedor-form/proveedor-form').then(m => m.ProveedorForm)
    },
    {
  path: 'materia-prima',
  loadComponent: () => import('./features/admin/materia-prima/materia-prima').then(m => m.MateriaPrimaComponent)
    },
    {
    path: 'materia-prima/nueva',
    loadComponent: () => import('./features/admin/materia-prima-form/materia-prima-form').then(m => m.MateriaPrimaForm)
    },
    {
    path: 'materia-prima/:id/editar',
    loadComponent: () => import('./features/admin/materia-prima-form/materia-prima-form').then(m => m.MateriaPrimaForm)
    },
    {
  path: 'compras',
  loadComponent: () => import('./features/admin/compras/compras').then(m => m.Compras)
    },
    {
    path: 'compras/nueva',
    loadComponent: () => import('./features/admin/compra-form/compra-form').then(m => m.CompraForm)
    },
    {
    path: 'receta',
    loadComponent: () => import('./features/admin/receta/receta').then(m => m.RecetaComponent)
    },
    {
    path: 'inventario',
    loadComponent: () => import('./features/admin/inventario/inventario').then(m => m.Inventario)
    },
    {
    path: 'produccion',
    loadComponent: () => import('./features/admin/produccion/produccion').then(m => m.Produccion)
    },
    {
    path: 'pedidos',
    loadComponent: () => import('./features/admin/pedidos/pedidos').then(m => m.PedidosAdmin)
    }
    ]
  }
];
