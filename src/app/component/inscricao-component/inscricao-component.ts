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
export class InscricaoComponent {

