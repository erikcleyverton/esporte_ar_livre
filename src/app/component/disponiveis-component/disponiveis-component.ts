import { Component, signal } from '@angular/core'; 
import { Corrida } from '../../models/corrida';
import { CorridaService } from '../../service/corrida/corrida-service';
import { Router} from '@angular/router';


@Component({
  selector: 'app-disponiveis-component',
  imports: [],
  templateUrl: './disponiveis-component.html',
  styleUrl: './disponiveis-component.css',
})
export class DisponiveisComponent {

  listaCorridas = signal<Corrida[]>([])

  constructor(
     private corridaService: CorridaService,
     private router: Router
    ) { }

  ngOnInit() {
    this.listar()
  }


  //listar
  listar() {
    this.corridaService.listarCorridas()
      .subscribe({
        next: (dadosCorrida) => {
          this.listaCorridas.set([...dadosCorrida])
        },
        error: (msgErro) => {
          console.log(msgErro)
        }
      })
  }

  excluir(objCorrida: Corrida) {
    if (confirm(`Deseja excluir a corrida ${objCorrida.descricao_corrida}`)) {
      this.corridaService.excluirCorrida(objCorrida.id)
        .subscribe({
          next: (repostaAPI) => {
            this.listaCorridas.update(elem =>
              elem.filter(a => a.id !== objCorrida.id)            )
            console.log('Atleta excluído com Sucesso ', repostaAPI)
          },
          error: (msgErro) => {
            return msgErro
          }
        })
    }

    this.ngOnInit()

  }

  carregandoDadosForm(ObjCorrida: Corrida){

    this.router.navigate(["/alterarcorrida", ObjCorrida.id])
    
  }


}