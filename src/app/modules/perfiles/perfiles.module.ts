import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilesCRUDComponent } from './pages/perfiles-crud/perfiles-crud.component';
import { PerfilesFormularioComponent } from './modals/perfiles-formulario/perfiles-formulario.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfilesRoutingModuleModule } from './perfiles-routing-module.module';



@NgModule({
  declarations: [
    PerfilesCRUDComponent,
    PerfilesFormularioComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    PerfilesRoutingModuleModule
  ]
})
export class PerfilesModule { }
