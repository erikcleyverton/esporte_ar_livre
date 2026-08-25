import { TestBed } from '@angular/core/testing';
import { AtletaService } from '../../service/atleta-service';
import { provideHttpClient } from '@angular/common/http';

describe('AtletaListaComponent', () => {

  let service : AtletaService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        AtletaService,
        provideHttpClient
      ]
    }).compileComponents();

    service = TestBed.inject(AtletaService);
  });

  it('Resultado esperado é calcular corretamente a idade', () => {
    const resultado = service.calcularIdade('1976-02-28');
    expect(resultado).toBe(50);
  });

});