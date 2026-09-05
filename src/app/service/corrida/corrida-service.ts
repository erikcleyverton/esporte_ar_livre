import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Corrida } from '../../models/corrida';

@Injectable({
  providedIn: 'root',
})
export class CorridaService {
  constructor(private http: HttpClient) {}

  // CORRIGIDO: Retorna o Observable direto para o componente fazer o .subscribe()
  salvarCorrida(corrida: Corrida): Observable<Corrida> {
    const urlApi = `http://127.0.0.1:8000/corrida/`

    return this.http.post<Corrida>(urlApi, corrida);
  }

  // LISTAR TODAS AS CORRIDAS
  listarCorridas(): Observable<Corrida[]> {
    const urlAPI = `http://127.0.0.1:8000/corrida/`;
    return this.http.get<Corrida[]>(urlAPI);
  }

  // LISTAR UMA CORRIDA
  listarCorrida(idCorrida: number): Observable<Corrida> {
    const urlAPI = `http://127.0.0.1:8000/corrida/${idCorrida}/`;
    return this.http.get<Corrida>(urlAPI);
  }

  // EXCLUIR UMA CORRIDA
  excluirCorrida(idCorrida: number): Observable<Corrida> {
    const urlAPI = `http://127.0.0.1:8000/corrida/${idCorrida}/`;
    return this.http.delete<Corrida>(urlAPI);
  }

  // ALTERAR CORRIDA
  alterarCorrida(corrida: Corrida): Observable<Corrida> {
    const urlAPI = `http://127.0.0.1:8000/corrida/${corrida.id}/`;
    return this.http.put<Corrida>(urlAPI, corrida);
  }
}