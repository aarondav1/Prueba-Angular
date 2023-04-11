import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PerfilesCRUDComponent } from './pages/perfiles-crud/perfiles-crud.component';



const rutas: Routes = [
  {
      path: '',
      children: [
          { path: 'crud', component: PerfilesCRUDComponent },
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
export class PerfilesRoutingModuleModule { }
