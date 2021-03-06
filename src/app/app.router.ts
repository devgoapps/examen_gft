import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './services/auth-guard.service';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AccountsComponent } from './components/accounts/accounts.component';

const AppRoutes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'accounts', canActivate: [AuthGuardService], component: AccountsComponent },
	{ path: '**', pathMatch: 'full', redirectTo: 'login' }
];

export const AppRouter = RouterModule.forRoot(AppRoutes, { useHash: true });