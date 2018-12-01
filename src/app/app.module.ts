import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Anguar Modules
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AccountsComponent } from './components/accounts/accounts.component';

// Services
import { HttpService } from './services/http.service';
import { SweetAlertService } from './services/sweet-alert.service';

// Router
import { AppRouter } from './app.router';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AccountsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRouter
  ],
  providers: [
    HttpService,
    SweetAlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
