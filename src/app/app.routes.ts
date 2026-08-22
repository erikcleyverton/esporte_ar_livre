import { Routes } from '@angular/router';
import { HomeComponent } from './component/home-component/home-component';
import { AtletaComponent } from './component/atleta-component/atleta-component';
import { CorridaComponent } from './component/corrida-component/corrida-component';
import { DisponiveisComponent } from './component/disponiveis-component/disponiveis-component';
import { AtletaListaComponent } from './component/atleta-lista-component/atleta-lista-component';
import { InscricaoComponent } from './component/inscricao-component/inscricao-component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: "home",
    pathMatch: 'full',
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "cadastroatleta",
    component: AtletaComponent
  },
  

  {
    path: "cadastroatleta/:id",
    component: AtletaComponent
  },
  {
    path: "corrida-component",
    component: CorridaComponent
  },

  {
    path: "alterarcorrida/:id",
    component: CorridaComponent
  },

  {
    path: "disponiveis-component",
    component: DisponiveisComponent
  },
  
  {
    path: "listaatleta",
    component: AtletaListaComponent
  },

  {
   
    path: "inscrição",
    component: InscricaoComponent

  },
];