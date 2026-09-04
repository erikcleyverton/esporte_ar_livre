import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Atleta } from '../models/atleta';

@Injectable({
  providedIn: 'root',
})
export class AtletaService {
  
  // DECLARAÇÃO CONSTRUTOR
  constructor(private http: HttpClient) { }

  
  adicionarAtleta(atleta: Atleta): Observable<Atleta> {
    const urlApi = `http://127.0.0.1:8000/pessoa/`;
    
    
    const dadosEnvio: any = { ...atleta };
    if (!dadosEnvio.id || dadosEnvio.id === 0) {
      delete dadosEnvio.id;
    }

    return this.http.post<Atleta>(urlApi, dadosEnvio);
  }

  // LISTAR ATLETAS NA API
  listarAtletas(): Observable<Atleta[]> {
    const urlApi = `http://127.0.0.1:8000/pessoa/`;

    return this.http.get<Atleta[]>(urlApi);
  }

  // LISTAR ATLETA
  listarAtleta(idAtleta: number): Observable<Atleta> {
   
    const urlApi = `http://127.0.0.1:8000/pessoa/${idAtleta}/`;

    return this.http.get<Atleta>(urlApi);
  }

  // EXCLUIR NA API
  exluirAtleta(idAtleta: number): Observable<void> {
    const urlApi = `http://127.0.0.1:8000/pessoa/${idAtleta}/`;

    return this.http.delete<void>(urlApi);
  }

  // ALTERAR NA API
  alterarAtleta(atleta: Atleta): Observable<Atleta> {
 
    const urlApi = `http://127.0.0.1:8000/pessoa/${atleta.id}/`;

    return this.http.put<Atleta>(urlApi, atleta);
  }

  // CALCULAR A IDADE
  calcularIdade(data_nascimento: string): number {
    const dt_nascimento = new Date(data_nascimento + "T00:00:00");
    const hoje = new Date();

    let idade = hoje.getFullYear() - dt_nascimento.getFullYear();
    const resp_calc_mes = hoje.getMonth() - dt_nascimento.getMonth();

    if (resp_calc_mes < 0 || (resp_calc_mes === 0 && hoje.getDate() < dt_nascimento.getDate())) {
      idade--;
    }

    return idade;
  }

// CALCULAR IMC
calcularIMC(peso: number, altura: number): number {
  if (peso > 0 && altura > 0) {
    const alturaMetros = altura > 3 ? altura / 100 : altura;
    const imc = peso / (alturaMetros * alturaMetros);
    return Number(imc.toFixed(2));
  }
  return 0;
}

// CLASSIFICAR IMC
classificarIMC(peso: number, altura: number): string {
  const imc = this.calcularIMC(peso, altura);

  if (imc === 0) return 'Dados inválidos';
  if (imc < 18.5) return 'Magreza';
  if (imc <= 24.9) return 'Peso Normal';
  if (imc <= 29.9) return 'Sobrepeso';
  if (imc <= 34.9) return 'Obesidade Grau I';
  if (imc <= 39.9) return 'Obesidade Grau II (Severa)';
  return 'Obesidade Grau III (Mórbida)';
}
}