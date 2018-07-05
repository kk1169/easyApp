
import { Routes } from '@angular/router';
import { UploadComponent } from './component/upload/upload.component';
import { MessageComponent } from './component/message/message.component';
import { LoginComponent } from './component/login/login.component';
import { WelcomeComponent } from './component/welcome/welcome.component';

import { AuthGuard } from './_guards/auth.guard';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';


export const appRoutes:Routes = [
    { path:'upload', component:UploadComponent},
    { path:'message', component:MessageComponent},
    { path:'login', component:LoginComponent},
    { path:'welcome', component:WelcomeComponent, canActivate:[AuthGuard]},
    { path:'', component:LoginComponent },
    { path:'**', component:PageNotFoundComponent }
];