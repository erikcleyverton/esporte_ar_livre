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
export class AtletaListaComponent implements OnInit {

  listaAtletas = signal<Atleta[]>([]);

  constructor(private router: Router, public http: AtletaService) { }

  ngOnInit() {
    this.listarAtletas();
  }

  listarAtletas() {
    this.http.listarAtletas().subscribe({
      next: (dados) => {
        this.listaAtletas.set(
          dados.map(a => ({ ...a,
            idade: a.data_nascimento ? String(this.http.calcularIdade(a.data_nascimento)) : '0',
            imc: this.http.calcularIMC(a.peso, a.altura),
            classificacaoImc: this.http.classificarIMC(a.peso, a.altura)
          })).sort((a, b) => a.nome.localeCompare(b.nome))
        );
      },
      error: (msgErro) => console.log("Erro ao listar atletas: ", msgErro)
    });
  }

  excluirAtleta(atleta: Atleta) {
    if (confirm(`Deseja excluir ${atleta.nome} da competição?`)) {

      this.http.exluirAtleta(atleta.id).subscribe({
        next: () => this.listaAtletas.update(lista => lista.filter(a => a.id !== atleta.id)),
        error: (msgErro) => console.log("Erro ao excluir atleta: ", msgErro)
      });
    }
  }

  buscarPessoa(idAtleta: number) {
    this.router.navigate(['/cadastroatleta', idAtleta]);
  }
}