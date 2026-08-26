import { TestBed } from '@angular/core/testing';
import { CorridaService } from '../../service/corrida/corrida-service';
import { Corrida } from '../../models/corrida';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

describe('DisponiveisComponent', () => {
  let service: CorridaService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        CorridaService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    service = TestBed.inject(CorridaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Resultado é Salvar corridas', () => {
    const salvar: Corrida = {
      "id": 0,
      "descricao_corrida": '',
      "data_corrida": '',
      "distancia5km": false,
      "distancia10km": false,
      "distancia25km": false,
    };

    service.salvarCorrida(salvar).subscribe(result => {
      expect(result).toEqual(salvar);
    });

    const requisicao = httpMock.expectOne(`https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/corrida`);
    expect(requisicao.request.method).toBe('POST');
    requisicao.flush(salvar);
  }); 

  it('Resultado esperado listar corridas', () => {
    const listar: Corrida[] = [
      {
        "id": 0,
        "descricao_corrida": '',
        "data_corrida": '',
        "distancia5km": false,
        "distancia10km": false,
        "distancia25km": false,
      }
    ];

    service.listarCorridas().subscribe(result => {
      expect(result).toEqual(listar);
    });

    const requisicao = httpMock.expectOne(`https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/corrida`);
    expect(requisicao.request.method).toBe('GET');
    requisicao.flush(listar);
  });

  it('Resultado esperado excluir corrida', () => {
    const idCorrida = 0;
    const corridaExcluida: Corrida = {
      "id": idCorrida,
      "descricao_corrida": '',
      "data_corrida": '',
      "distancia5km": false,
      "distancia10km": false,
      "distancia25km": false,
    };

    service.excluirCorrida(idCorrida).subscribe(result => {
      expect(result).toEqual(corridaExcluida);
    });

    const requisicao = httpMock.expectOne(`https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/corrida/${idCorrida}`);
    expect(requisicao.request.method).toBe('DELETE');
    requisicao.flush(corridaExcluida);
  });

  it('Resultado esperado alterar corrida', () => {
    const corridaAlterada: Corrida = {
      "id": 0,
      "descricao_corrida": '',
      "data_corrida": '',
      "distancia5km": false,
      "distancia10km": false,
      "distancia25km": false,
    };

    service.alterarCorrida(corridaAlterada).subscribe(result => {
      expect(result).toEqual(corridaAlterada);
    });

    const requisicao = httpMock.expectOne(`https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/corrida/${corridaAlterada.id}`);
    expect(requisicao.request.method).toBe('PUT');
    expect(requisicao.request.body).toEqual(corridaAlterada);
    requisicao.flush(corridaAlterada);
  });

});