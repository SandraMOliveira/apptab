import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './usuarios/auth.guard';

const routes: Routes = [
  // canActive ativar rota
  {
    path: '',
    loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard]
  },
  { path: 'criar-conta', loadChildren: './usuarios/criar-conta/criar-conta.module#CriarContaPageModule' },
  { path: 'login', loadChildren: './usuarios/login/login.module#LoginPageModule' },
  { path: 'esqueci-senha', loadChildren: './usuarios/esqueci-senha/esqueci-senha.module#EsqueciSenhaPageModule' },   { path: 'form-pagamento', loadChildren: './pedidos/form-pagamento/form-pagamento.module#FormPagamentoPageModule' },
  
  
   ];

@ NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
