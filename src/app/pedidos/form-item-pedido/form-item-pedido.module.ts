import { SharedModule } from './../../core/shared/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { FormItemPedidoPage } from './form-item-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: FormItemPedidoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FormItemPedidoPage]
})
export class FormItemPedidoPageModule {}
