import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    // tabs/1produtos/2/3perfil
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'produtos',
        children: [
          {
            path: '',
            loadChildren: '../produtos/lista-produtos/lista-produtos.module#ListaProdutosPageModule'
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab2/tab2.module').then(m => m.Tab2PageModule)
          }
        ]
      },
      {
        path: 'perfil',
        children: [
          {
            path: '',
            loadChildren: '../usuarios/perfil/perfil.module#PerfilPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/produtos',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'usuarios',
    children: [
      {
        path: 'enderecos',
        loadChildren: '../enderecos/lista-endereco/lista-endereco.module#ListaEnderecoPageModule'
      },
      {
        path: 'enderecos/novo',
        loadChildren: '../enderecos/form-endereco/form-endereco.module#FormEnderecoPageModule'
      },
      {
        path: 'enderecos/editar/:key',
        loadChildren: '../enderecos/form-endereco/form-endereco.module#FormEnderecoPageModule'
      }
    ]
  },
  // criando rota para carrinho
  {
    path: 'pedido',
    children: [
      {
        path: 'carrinho/novo-item/:key',
        loadChildren: '../pedidos/form-item-pedido/form-item-pedido.module#FormItemPedidoPageModule'
      },
      // rota para lista de produtos no carrinho
      {
        path: 'carrinho',
        loadChildren: '../pedidos/lista-item-pedido/lista-item-pedido.module#ListaItemPedidoPageModule'
      },
      // rota para 
      {
        path: 'forma-pagamento',
        loadChildren: '../pedidos/form-pagamento/form-pagamento.module#FormPagamentoPageModule'
      }
    ]
  },
  // se for vazio cai na primeira rota (tabs)
  {
    path: '',
    redirectTo: '/tabs/produtos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
