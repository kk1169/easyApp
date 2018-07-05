import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';

import { Route } from '@angular/compiler/src/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UploadComponent } from './component/upload/upload.component';

import { appRoutes } from './routesConfig';
import { RouterModule } from '@angular/router';
import { MessageComponent } from './component/message/message.component';
import { LoginComponent } from './component/login/login.component';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

import { WelcomeComponent } from './component/welcome/welcome.component';
import { HeaderComponent } from './component/header/header.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';


// SERVICES
import { MessageService } from './services/message/message.service';
import { LoginService } from './services/login/login.service';
import { HeaderService } from './services/header/header.service';

import { AuthGuard } from './_guards/auth.guard';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { ChatComponent } from './component/chat/chat.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective,
    UploadComponent,
    MessageComponent,
    LoginComponent,
    WelcomeComponent,
    HeaderComponent,
    SidebarComponent,
    PageNotFoundComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    SocketIoModule.forRoot(config),
    FormsModule
  ],
  providers: [
    MessageService,
    LoginService,
    HeaderService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
