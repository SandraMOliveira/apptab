import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ValorComponent } from '../valor/valor.component';
import { ListaEnderecoPage } from './../../../enderecos/lista-endereco/lista-endereco.page';

@NgModule({
  declarations: [ValorComponent, ListaEnderecoPage ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule,
    ValorComponent,
    ListaEnderecoPage
  ],
  entryComponents: [ValorComponent, ListaEnderecoPage]
})
export class SharedModule { }
