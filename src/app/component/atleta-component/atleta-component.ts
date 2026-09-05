import { Component, ChangeDetectorRef, OnInit } from '@angular/core'; 
import { FormsModule } from '@angular/forms'; 
import { ActivatedRoute, Router } from '@angular/router'; 
import { AtletaService } from '../../service/atleta-service';
import { Atleta } from '../../models/atleta';

@Component({
  selector: 'app-atleta-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './atleta-component.html',
  styleUrl: './atleta-component.css'
})
export class AtletaComponent implements OnInit {

  id = 0;
  nome = '';
  cpf = 0;
  sexo = '';
  cep = 0;
  rua_logradouro = '';
  bairro = '';
  cidade = '';
  uf = '';
  data_nascimento = '';
  altura = 0;
  peso = 0;
  classificacaoImc = ''

  editar = false;
  idAtleta = 0;

  constructor(
    private atletaService: AtletaService, 
    private route: ActivatedRoute,
    private router: Router, 
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      const id = Number(params['id']);

      if (id && id > 0) {
        this.idAtleta = id;
        this.editar = true;
        this.carregaCampo(this.idAtleta); 
      } else {
        this.editar = false;
        this.limparAtributos();
      }
    });
  }

  carregaCampo(idAtleta: number) {
    this.atletaService.listarAtleta(idAtleta)
      .subscribe({
        next: (objAtleta) => {
          this.id = objAtleta.id;
          this.nome = objAtleta.nome;
          this.cpf = objAtleta.cpf;
          this.sexo = objAtleta.sexo;
          this.cep = objAtleta.cep;
          this.rua_logradouro = objAtleta.rua_logradouro;
          this.bairro = objAtleta.bairro;
          this.cidade = objAtleta.cidade;
          this.uf = objAtleta.uf;
          this.data_nascimento = objAtleta.data_nascimento;
          this.altura = objAtleta.altura;
          this.peso = objAtleta.peso;

          this.cdr.detectChanges();
        }, 
        error: (msgErro) => {
          console.log("Erro ao Listar o atleta", msgErro);
        }
      });
  }

  enviaDadosAtleta() {
    const pessoaAtleta = new Atleta();
    pessoaAtleta.id = this.idAtleta > 0 ? this.idAtleta : this.id;
    pessoaAtleta.nome = this.nome;
    pessoaAtleta.cpf = this.cpf;
    pessoaAtleta.sexo = this.sexo;
    pessoaAtleta.cep = this.cep;
    pessoaAtleta.rua_logradouro = this.rua_logradouro;
    pessoaAtleta.bairro = this.bairro;
    pessoaAtleta.cidade = this.cidade;
    pessoaAtleta.uf = this.uf;
    pessoaAtleta.data_nascimento = this.data_nascimento;
    pessoaAtleta.peso = this.peso;
    pessoaAtleta.altura = this.altura;

    if (!this.editar) {
      // CADASTRAR NOVO ATLETA
      this.atletaService.adicionarAtleta(pessoaAtleta)
        .subscribe({
          next: (resposta) => {
            console.log("Atleta cadastrado com sucesso: ", resposta);
            this.limparAtributos();
            this.router.navigate(['/listaatleta']);
          },
          error: (msgErro) => {
            console.log("Erro ao cadastrar o atleta ", msgErro);
          }
        });
    } else {
      // ATUALIZAR ATLETA EXISTENTE
      this.atletaService.alterarAtleta(pessoaAtleta)
        .subscribe({
          next: (resposta) => {
            console.log("Atleta alterado com sucesso: ", resposta);
            this.limparAtributos();
            this.router.navigate(['/listaatleta']);
          },
          error: (msgErro) => {
            console.log("Erro ao alterar o atleta ", msgErro);
          }
        });
    }
  }

  limparAtributos() {
    this.id = 0;
    this.idAtleta = 0;
    this.editar = false;
    this.nome = '';
    this.cpf = 0;
    this.sexo = '';
    this.cep = 0;
    this.rua_logradouro = '';
    this.bairro = '';
    this.cidade = '';
    this.uf = '';
    this.data_nascimento = '';
    this.peso = 0;
    this.altura = 0;
  }
}