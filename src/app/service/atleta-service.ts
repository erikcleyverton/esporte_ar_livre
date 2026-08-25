
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Atleta } from '../models/atleta';

@Injectable({
  providedIn: 'root',
})
export class AtletaService {
  //DECLARAÇÃO CONSTRUTOR
  constructor(private http: HttpClient) { }

  //ADICIONAR NA API
  adicionarAtleta(atleta: Atleta): Observable<Atleta> {
    const urlApi = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/atleta`

    return this.http.post<Atleta>(urlApi, atleta)
  }

  //LISTAR ATLETAS NA API
  listarAtletas(): Observable<Atleta[]> {
    const urlApi = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/atleta`

    return this.http.get<Atleta[]>(urlApi)
  }

  //LISTAR ATLETA
  listarAtleta(idAtleta: number):Observable<Atleta>{
    const urlApi = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/atleta/${idAtleta}`

    return this.http.get<Atleta>(urlApi)
  }

  //EXCLUIR NA API
  exluirAtleta(atleta: Atleta): Observable<Atleta> {
    const urlApi = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/atleta/${atleta.id}`

    return this.http.delete<Atleta>(urlApi)
  }

  //ALTERAR NA API
  alterarAtleta(atleta: Atleta):Observable<Atleta>{
    const urlApi = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/atleta/${atleta.id}`

    return this.http.put<Atleta>(urlApi, atleta)
  }


//CALCULAR A IDADE
//aaaa-MMM-dd - 2026-08-24
calcularIdade(data_nascimento: string): number {
  const dt_nascimento = new Date(data_nascimento + "T00:00:00")
  const hoje = new Date()

  let idade = hoje.getFullYear() - dt_nascimento.getFullYear()
  const resp_calc_mes = hoje.getMonth() - dt_nascimento.getMonth()

  if (resp_calc_mes < 0 || (resp_calc_mes === 0 && hoje.getDate() < dt_nascimento.getDate())) {
    idade--
  }

  return idade
}

}