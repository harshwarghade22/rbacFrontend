import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { authGuard } from './core/guards/auth.guards';
import { roleGuard } from './core/guards/role.guards';
import { UserDashboardComponent } from './features/user/dashboard/dashboard.component';
import { AdminDashboardComponent } from './features/admin/dashboard/dashboard.component';
import { TransactionsComponent } from './features/transactions/transactions.component';
import { AccountsComponent } from './features/accounts/accounts.component';
import { AccountTransactionsComponent } from './features/account-transactions/account-transactions.component';
import { CreateUserComponent } from './features/admin/create-user/create-user.component';
// import { AdminUsersComponent } from './features/admin/users/users.component';
import { AdminUsersComponent } from './features/admin/users/users.component';
// import { CreateUserComponent } from './features/admin/create-user/create-user.component';
// import { AccountTransactionsComponent } from './features/account-transactions/account-transactions.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'admin/dashboard',
        component: AdminDashboardComponent,
        canActivate: [authGuard, roleGuard('ROLE_ADMIN')]
    },
    {
        path: 'user/dashboard',
        component: UserDashboardComponent,
        canActivate: [authGuard, roleGuard('ROLE_USER')]
    },
    {
        path: 'admin/transactions',
        component: TransactionsComponent,
        canActivate: [authGuard]
    },
    {
        path: 'accounts',
        component: AccountsComponent,
        canActivate: [authGuard]
    },
    {
        path: 'accounts/:accountId/transactions',
        component: AccountTransactionsComponent,
        canActivate: [authGuard]
    },
    {
        path: 'admin/create-user',
        component: CreateUserComponent,
        canActivate: [authGuard, roleGuard('ROLE_ADMIN')]
    },
    {
        path: 'admin/users',
        component: AdminUsersComponent,
        canActivate: [authGuard, roleGuard('ROLE_ADMIN')]
    }

];
