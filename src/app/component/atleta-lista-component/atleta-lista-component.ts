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

 // LISTAR OS ATLETAS
 listarAtletas() {
  this.http.listarAtletas()
    .subscribe({
      next: (dados) => {
        this.listaAtletas.set(
          dados.map(a => ({
            ...a,
            idade: a.data_nascimento ? String(new Date().getFullYear() - new Date(a.data_nascimento).getFullYear()) : '0'
          })).sort((a, b) => a.nome.localeCompare(b.nome))
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
      this.http.exluirAtleta(atleta)
        .subscribe({
          next: (dados) => {
            // Remove o atleta excluído diretamente da Signal sem precisar recarregar a lista do servidor
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

  // ALTERAR DADOS
  buscarPessoa(idAtleta: Atleta) {
    this.router.navigate(['/cadastroatleta', idAtleta]);
  }
}