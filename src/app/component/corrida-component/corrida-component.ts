import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Corrida } from '../../models/corrida';
import { CorridaService } from '../../service/corrida/corrida-service';

@Component({
  selector: 'app-corrida-component',
  imports: [FormsModule],
  templateUrl: './corrida-component.html',
  styleUrl: './corrida-component.css',
})
export class CorridaComponent implements OnInit {
  id = 0
  descricao_corrida = ''
  data_corrida = ''
  distancia_5km = false
  distancia_10km = false
  distancia_25km = false

  idCorrida = 0
  editar = false

  constructor(
    private corridaService: CorridaService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.idCorrida = Number(this.activeRoute.snapshot.paramMap.get('id'))

    if (this.idCorrida > 0) {
      this.editar = true
      this.carregaDados(this.idCorrida)
    }
  }

  dadosFormulario() {
    const corrida = new Corrida()
    corrida.descricao_corrida = this.descricao_corrida
    corrida.data_corrida = this.data_corrida
    corrida.distancia_5km = this.distancia_5km
    corrida.distancia_10km = this.distancia_10km
    corrida.distancia_25km = this.distancia_25km

    if (this.editar) {
      corrida.id = this.idCorrida

      this.corridaService.alterarCorrida(corrida)
        .subscribe({
          next: (respostaAPI) => {
            this.limparAtributos()
            this.router.navigate(['/listacorrida'])
            return respostaAPI
          },
          error: (msgErro) => {
            console.error(msgErro)
            return msgErro
          }
        })

    } else {
      delete (corrida as any).id

      this.corridaService.salvarCorrida(corrida)
        .subscribe({
          next: (respostaAPI) => {
            this.limparAtributos()
            this.router.navigate(['/listacorrida'])
            return respostaAPI
          },
          error: (msgErro) => {
            console.error(msgErro)
            return msgErro
          }
        })
    }
  }

  carregaDados(idCorrida: number) {
    this.corridaService.listarCorrida(idCorrida)
      .subscribe({
        next: (dadosCorrida) => {
          this.descricao_corrida = dadosCorrida.descricao_corrida
          this.data_corrida = dadosCorrida.data_corrida
          this.distancia_5km = dadosCorrida.distancia_5km
          this.distancia_10km = dadosCorrida.distancia_10km
          this.distancia_25km = dadosCorrida.distancia_25km

          this.cdr.detectChanges()
        },
        error: (msgErro) => {
          console.error(msgErro)
          return msgErro
        }
      })
  }

  limparAtributos() {
    this.id = 0
    this.idCorrida = 0
    this.editar = false
    this.descricao_corrida = ''
    this.data_corrida = ''
    this.distancia_5km = false
    this.distancia_10km = false
    this.distancia_25km = false
  }
}