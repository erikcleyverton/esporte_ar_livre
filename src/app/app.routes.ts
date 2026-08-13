import { Routes } from '@angular/router';

import { HomeComponent } from './component/home-component/home-component';
import { AtletaComponent } from './component/atleta-component/atleta-component';

export const routes: Routes = [
    
    {
      path:'',
      redirecto:"/home"
      pathMath:'full'


    }


    
    {
        path:"home",
        component:HomeComponent
    },
    {
        path:"cadastroatleta",
        component:AtletaComponent
    }
];