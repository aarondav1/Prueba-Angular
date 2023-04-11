import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosCRUDComponent } from './pages/usuarios-crud/usuarios-crud.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariosFormularioComponent } from './modals/usuarios-formulario/usuarios-formulario.component';
import { UsuariosRoutingModuleModule } from './usuarios-routing-module.module';



@NgModule({
  declarations: [
    UsuariosCRUDComponent,
    UsuariosFormularioComponent
  ],
  exports:[
    UsuariosCRUDComponent,
    UsuariosFormularioComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    UsuariosRoutingModuleModule
  ]
})
export class UsuariosModule { }
