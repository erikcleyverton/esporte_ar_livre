import { Component, OnInit, signal } from '@angular/core';
import { AtletaService } from '../../service/atleta-service';
import { Atleta } from '../../models/atleta';
import { Router } from '@angular/router';

@Component({
  selector: 'app-atleta-lista-component',
  imports: [],
  templateUrl: './atleta-lista-component.html',
  styleUrl: './atleta-lista-component.css',
})
export class AtletaListaComponent {

  // DECLARAÇÃO ARRAY DO TIPO PESSOA USANDO SIGNALS
  listaAtletas = signal<Atleta[]>([]);

  // DECLARAÇÃO CONSTRUTOR
  constructor(private router: Router, private http: AtletaService) { }

  // EXECUTAR INSTRUÇÕES AO CRIAR O COMPONENTE
  ngOnInit() {
    this.listarAtletas();
  }

 // LISTAR OS ATLETAS (Calcula Idade, IMC e Classificação no Map)
 listarAtletas() {
  this.http.listarAtletas()
    .subscribe({
      next: (dados) => {
        this.listaAtletas.set(
          dados.map(a => {
            // Garante altura em metros
            const altMetros = a.altura > 3 ? a.altura / 100 : a.altura;
            const calcImc = (a.peso > 0 && altMetros > 0) ? Number((a.peso / (altMetros * altMetros)).toFixed(2)) : 0;

            return {
              ...a,
              idade: a.data_nascimento ? String(new Date().getFullYear() - new Date(a.data_nascimento).getFullYear()) : '0',
              imc: calcImc,
              classificacaoImc: this.http.classificarIMC(a.peso, a.altura)
            };
          }).sort((a, b) => a.nome.localeCompare(b.nome))
        );
      },
      error: (msgErro) => {
        console.log("Erro ao listar os atletas: ", msgErro);
      }
    });
}
  // EXCLUIR ATLETA
  excluirAtleta(atleta: Atleta) {
    if (confirm(`Deseja excluir ${atleta.nome} da competição? `)) {
      this.http.exluirAtleta(atleta.id)
        .subscribe({
          next: (dados) => {
            // Remove o atleta excluído da Signal na tela
            this.listaAtletas.update(elem =>
              elem.filter(a => a.id !== atleta.id)
            );
            
            console.log('Atleta excluído com Sucesso ', dados);
          },
          error: (msgErro) => {
            console.log("Erro ao Excluir o atleta ", msgErro);
          }
        });
    }
  }

  /// ALTERAR DADOS
  buscarPessoa(idAtleta: number) {
    
    this.router.navigate(['/cadastroatleta', idAtleta]);
  }
}