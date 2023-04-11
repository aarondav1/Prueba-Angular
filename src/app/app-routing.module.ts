import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { SidenavComponent } from './shared/sidenav/sidenav.component';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
  },

  {
    path: '', component: SidenavComponent,
    //canLoad: [AuthGuard],
    //canActivate: [AuthGuard],
    children: [{
      path: 'usuarios',
      loadChildren: () => import('./modules/usuarios/usuarios.module').then( m => m.UsuariosModule ),
    },
    {
      path: 'perfiles',
      loadChildren: () => import('./modules/perfiles/perfiles.module').then( m => m.PerfilesModule ),
    }]
  }
  ,
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }