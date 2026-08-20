import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Corrida } from '../../models/corrida';
import { CorridaService } from '../../service/corrida/corrida-service';

@Component({
  selector: 'app-corrida-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './corrida-component.html',
  styleUrl: './corrida-component.css',
})
export class CorridaComponent {
  
  id = 0;
  descricao_corrida = '';
  data_corrida = '';
  distancia5km = false;
  distancia10km = false;
  distancia25km = false;

  constructor(private corridaService: CorridaService) {}

  dadosFormulario() {
    const corrida = new Corrida();
    corrida.id = this.id;
    corrida.descricao_corrida = this.descricao_corrida;
    corrida.data_corrida = this.data_corrida;

    this.corridaService.salvarCorrida(corrida);
    this.LimparAtributos();
  }

  LimparAtributos() {
    this.id = 0;
    this.descricao_corrida = '';
    this.data_corrida = '';
    this.distancia5km = false;
    this.distancia10km = false;
    this.distancia25km = false;
  }
}