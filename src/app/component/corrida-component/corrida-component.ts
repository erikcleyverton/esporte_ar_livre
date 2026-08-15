import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-corrida-component',
  imports: [FormsModule],
  templateUrl: './corrida-component.html',
  styleUrl: './corrida-component.css',
})
export class CorridaComponent {

    corrida: string = '';
    dataCorrida: string = '';
    distancia: string = '';
  
    
    exibeDados(): void {
      console.log({
        corrida: this.corrida,
        dataCorrida: this.dataCorrida,
        distancia: this.distancia
      });
    }
  }



