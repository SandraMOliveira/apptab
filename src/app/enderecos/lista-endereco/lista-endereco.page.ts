import { AlertService } from './../../core/shared/alert.service';
import { EnderecoService } from './../shared/endereco.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastService } from 'src/app/core/shared/toast.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-lista-endereco',
  templateUrl: './lista-endereco.page.html',
  styleUrls: ['./lista-endereco.page.scss'],
})
export class ListaEnderecoPage implements OnInit {
  enderecos: Observable<any[]>;
  @Input()
  selecionarEndereço: boolean = false;

  constructor(private enderecoService: EnderecoService,
              private alert: AlertService,
              private toast: ToastService,
              private router: Router,
              private modalController: ModalController) { }

// recebe a consulta do banco, guarda todos os dados na variável enderecos
  ngOnInit() {
    this.enderecos = this.enderecoService.getAll();
  }

  // concactena tudo o quem do banco
  // return volta o endereço completo
  // como o completo é opcional, usa-se o if
  getEnderecoText(endereco:any){
    let enderecoText: '';
    enderecoText = endereco.logradouro;
    enderecoText += ' , ' + endereco.numero;
    if (endereco.complemento)  {
      enderecoText += ', ' + endereco.complemento;
    }
    enderecoText += ' - ' + endereco.bairro;
    enderecoText += ' - ' + endereco.cep;
    return enderecoText;
  }

  editar(key: string) {
    this.router.navigate(['/usuarios/enderecos/editar', key]);    
  }

  remover(endereco: any) {
    this.alert.ShowConfirmaExclusao(endereco.logradouro + ',' + endereco.numero, () => {
      this.enderecoService.remove(endereco.key)
        .then( () => {
          this.toast.show('Endereço removido com sucesso.!!! ');
        })
    })
  }

  setEnderecoSelecionado(endereco: any) {
    if (this.selecionarEndereço) {
      const enderecoText = this.getEnderecoText(endereco);
      this.modalController.dismiss({ endereco: enderecoText });
    }
  }

}
