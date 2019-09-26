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

  getCarrinhoProdutoRef(){
    const path = `${FirebasePath.CARRINHO}${this.afAuth.auth.currentUser.uid}/${FirebasePath.PRODUTOS}`;
    return this.db.list(path);
  }

  insert(itemProduto:any) {
    return this.getCarrinhoProdutoRef().push(itemProduto);
  }

  carrinhoPossuiItens(){
    // faz no caminho com Id do usuário
    return this.getCarrinhoProdutoRef().snapshotChanges().pipe(
      map(changes => {
        // propriedade que volta um array
        return changes.length > 0
      })
    )
  }



}
