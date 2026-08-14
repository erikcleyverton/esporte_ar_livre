import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { AtletaService } from '../../service/atleta-service';
import { Pessoa } from '../../models/pessoa'; 

@Component({
  selector: 'app-atleta-component',
  imports: [FormsModule],
  templateUrl: './atleta-component.html',
  styleUrl: './atleta-component.css'
})
export class AtletaComponent {
 
  nome: string = '';
  cpf: string = '';
  sexo: string = '';
  cep: string = '';
  ruaLogradouro: string = '';
  bairro: string = '';
  cidade: string = '';
  uf: string = '';


  constructor(private atletaService: AtletaService) {}

  exibeDados() {
    console.log(
      this.nome,
      this.cpf,
      this.sexo,
      this.ruaLogradouro,
      this.bairro,
      this.cidade,
      this.uf
    );
  }

  salvarAtleta() {
    const pessoaAtleta = new Pessoa();
    pessoaAtleta.nome = this.nome;
    pessoaAtleta.cpf = this.cpf;
    pessoaAtleta.sexo = this.sexo;
    pessoaAtleta.cep = this.cep;
    pessoaAtleta.ruaLogadouro = this.ruaLogradouro;
    pessoaAtleta.bairro = this.bairro;
    pessoaAtleta.cidade = this.cidade;
    pessoaAtleta.uf = this.uf;

    this.atletaService.adicionar(pessoaAtleta);
  }
} 