import { Routes } from '@angular/router';
import { HomeComponent } from './component/home-component/home-component';
import { AtletaComponent } from './component/atleta-component/atleta-component';
import { CorridaComponent } from './component/corrida-component/corrida-component';

export const routes: Routes = [
    
    {
      path:'',
      redirectTo:"/home",
      pathMatch:'full',


    },
    
    {
        path:"home",
        component:HomeComponent
    },
    {
        path:"cadastroatleta",
        component:AtletaComponent
    },

    {
    path: "corrida-component",
    component:CorridaComponent


    }
];