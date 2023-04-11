import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosCRUDComponent } from './pages/usuarios-crud/usuarios-crud.component';
import { RouterModule, Routes } from '@angular/router';


const rutas: Routes = [
  {
      path: '',
      children: [
          { path: 'crud', component: UsuariosCRUDComponent },
          { path: '**', redirectTo: 'crud' }
      ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(rutas)
  ],
  exports: [
    RouterModule
]
})
export class UsuariosRoutingModuleModule { }
