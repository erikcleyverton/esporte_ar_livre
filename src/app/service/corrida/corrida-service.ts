import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Corrida } from '../../models/corrida';

@Injectable({
  providedIn: 'root',
})
export class CorridaService {
  constructor(private http: HttpClient) {}

  salvarCorrida(corrida: Corrida) {
    const urlApi = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/corrida`;

    this.http.post<Corrida>(urlApi, corrida)
      .subscribe({
        next: (respostaAPI) => {
          return respostaAPI
        },
        error: (msgErro) => {
          return msgErro
        }
      })
  }

 //LISTAR TODAS AS CORRIDAS
 listarCorridas(): Observable<Corrida[]> {
    const urlAPI = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/corrida`

    return this.http.get<Corrida[]>(urlAPI)
  }

  //LISTAR UMA CORRIDA
  listarCorrida(idCorrida: Number): Observable<Corrida> {
    const urlAPI = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/corrida/${idCorrida}`

    return this.http.get<Corrida>(urlAPI)
  }


  excluirCorrida(idCorrida: Number){
    const urlApi = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/corrida/${idCorrida}`;

    this.http.delete<Corrida>(urlApi)
      .subscribe({
        next: (repostaAPI) => {
          return repostaAPI
        },
        error: (msgErro) => {
          return msgErro
        }
      })
  }

  alterarCorrida(corrida: Corrida){
    const urlApi = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/corrida/${corrida.id}`;

    this.http.put<Corrida>(urlApi, corrida)
      .subscribe({
        next: (repostaAPI) => {
          return repostaAPI
        },
        error: (msgErro) => {
          return msgErro
        }
      })
  }
}