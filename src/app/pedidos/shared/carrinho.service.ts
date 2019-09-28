import { FirebasePath } from 'src/app/core/shared/firebase-path';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  constructor(private db: AngularFireDatabase,
              private afAuth: AngularFireAuth) { }

  getCarrinhoProdutosRef(){
    const path = `${FirebasePath.CARRINHO}${this.afAuth.auth.currentUser.uid}/${FirebasePath.PRODUTOS}`;
    return this.db.list(path);
  }

  insert(itemProduto:any) {
    return this.getCarrinhoProdutosRef().push(itemProduto);
  }

  carrinhoPossuiItens(){
    // faz no caminho com Id do usuário
    return this.getCarrinhoProdutosRef().snapshotChanges().pipe(
      map(changes => {
        // propriedade que volta um array
        return changes.length > 0
      })
    )
  }

  calcularTotal(preco: number, quantidade: number){
    return preco * quantidade;

  }

  update(key: string, quantidade: number, total: number){
    // retorna (tem uma promisse cath ou )
    return this.getCarrinhoProdutosRef().update(key, { quantidade: quantidade, total: total});
  }

  remove(key: string){
    return this.getCarrinhoProdutosRef().remove(key);
  }
  
    // pipe é uma sequencia de comandos, dentro desse pipe pode ter mais de um comando
    // map para mapear os dados

  getAll(){
   return this.getCarrinhoProdutosRef().snapshotChanges().pipe(
     map(changes => {
       return changes.map(m => ({key: m.payload.key, ...m.payload.val() }) )
     })
   )
  }

    // reduce tem 2 parametros, vai navegar na outras posições e faz a soma
  getTotalPedido(){
    return this.getCarrinhoProdutosRef().snapshotChanges().pipe(
      map(changes => {
        return changes
        .map( (m: any) => (m.payload.val().total))
        .reduce( (prev: number, current: number) => {
          return prev + current;
        })
      })
    )
  }

  clear(){

  }

}
