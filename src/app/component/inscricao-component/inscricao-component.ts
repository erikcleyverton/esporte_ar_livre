import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Corrida } from '../../models/corrida';
import { Inscricao } from '../../models/inscricao';
import { CorridaService } from '../../service/corrida/corrida-service';

@Component({
  selector: 'app-inscricao-component',
  imports: [FormsModule],
  templateUrl: './inscricao-component.html',
  styleUrl: './inscricao-component.css',
})
export class InscricaoComponent  {

  idCorrida = signal<number>(0);
  corridaSelecionada = signal<Corrida | null>(null);

  // Instância do modelo Inscricao
  inscricao = signal<Inscricao>(new Inscricao());

  constructor(
    private corridaService: CorridaService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const idParam = Number(this.activeRoute.snapshot.paramMap.get('id'));

    if (idParam > 0) {
      this.idCorrida.set(idParam);
      this.carregarDadosCorrida(idParam);
    }
  }

  carregarDadosCorrida(id: number) {
    this.corridaService.listarCorrida(id).subscribe({
      next: (dadosAPI: Corrida) => {
        this.corridaSelecionada.set(dadosAPI);
      },
      error: (msgErro: any) => {
        console.log('Erro ao carregar dados da corrida:', msgErro);
      }
    });
  }

  finalizarInscricao() {
    const dadosForm = this.inscricao();

    if (!dadosForm.aceitouTermos) {
      alert('Você precisa aceitar os termos do regulamento para prosseguir!');
      return;
    }

    console.log('Inscrição realizada com sucesso:', dadosForm);
    alert('Inscrição realizada com sucesso!');
    this.router.navigate(['/disponiveis-component']);
  }
}