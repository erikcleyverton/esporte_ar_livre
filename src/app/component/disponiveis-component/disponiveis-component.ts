import { Component, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { Corrida } from '../../models/corrida';
import { CorridaService } from '../../service/corrida/corrida-service';

@Component({
  selector: 'app-disponiveis-component',
  imports: [FormsModule],
  templateUrl: './disponiveis-component.html',
  styleUrl: './disponiveis-component.css',
})
export class DisponiveisComponent {

listaCorridas = signal<Corrida[]>([])

constructor(private CorridaService: CorridaService){}

ngOnInit(){
  this.listar()
}
//listar
listar() {
  this.corridaService.listarCorridas()
    .subscribe({
      next: (dadosCorrida) => {
        this.listaCorridas.set([
          ...dadosCorrida
        ])
      },
      error: (msgErro) => {
        console.log(msgErro)
      }
    })
}

excluir(objCorrida: Corrida){
  if(confirm(`Deseja excluir a corrida ${objCorrida.descricao_corrida}`)){
    this.corridaService.excluirCorrida(objCorrida.id)
  }
}