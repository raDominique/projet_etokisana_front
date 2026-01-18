import { Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ClientAreaComponent } from './components/pages/client-area/client-area.component';
import { ClientProfileComponent } from './components/pages/client-profile/client-profile.component';
import { UserProductsComponent } from './components/pages/user-products/user-products.component';
import { AddProductComponent } from './components/pages/add-product/add-product.component';
import { ForgotPasswordComponent } from './components/pages/forgot-password/forgot-password.component';
import { PasswordResetComponent } from './components/pages/password-reset/password-reset.component';
import { EmailVerificationComponent } from './components/pages/email-verification/email-verification.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { AchatComponent } from './components/pages/achat/achat.component';
import { PanierComponent } from './components/pages/panier/panier.component';
import { ProductPageComponent } from './components/pages/product-page/product-page.component';
import { UpdateProductComponent } from './components/pages/update-product/update-product.component';
import { TransactionComponent } from './components/pages/transaction/transaction.component';
import { UserSitesComponent } from './components/pages/user-sites/user-sites.component';
import { BoLoginComponent } from './components/pages/bo/bo-login/bo-login.component';
import { DashboardComponent } from './components/pages/bo/dashboard/dashboard.component';
import { UsersComponent } from './components/pages/bo/users/users.component';
import { ProductsComponent } from './components/pages/bo/products/products.component';
import { CategoriesComponent } from './components/pages/bo/categories/categories.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { CategoryAddComponent } from './components/pages/bo/category-add/category-add.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { DepositComponent } from './components/pages/deposit/deposit.component';
import { ChoixDepotComponent } from './components/pages/choix-depot/choix-depot.component';
import { ChoixProduitComponent } from './components/pages/choix-produit/choix-produit.component';
import { DepotSitesComponent } from './components/pages/depot-sites/depot-sites.component';
import { RetraitComponent } from './components/pages/retrait/retrait.component';
import { RequestResetPasswordComponent } from './components/pages/request-reset-password/request-reset-password.component';
import { UsersDetailsComponent } from './components/pages/bo/users-details/users-details.component';
import { StockComponent } from './components/pages/stock/stock.component';
import { ProductDetailsComponent } from './components/pages/bo/product-details/product-details.component';
import { TransactionDetailsComponent } from './components/pages/transaction-details/transaction-details.component';
import { NotificationsComponent } from './components/pages/notifications/notifications.component';
import { MyProductsComponent } from './components/pages/my-products/my-products.component';

const routes: Routes = [
    {path : '', component: LoginComponent},
    {path : 'home', component: HomeComponent},
    {path : 'achat', component: AchatComponent},
    {path : 'login', component: LoginComponent},
    {path : 'users', component: UsersComponent},
    {path : 'my-products', component: MyProductsComponent},
    {path : 'admin', component: BoLoginComponent},
    {path : 'panier', component: PanierComponent},
    {path : 'contact', component: ContactComponent},
    {path : 'stock/:id', component: StockComponent},
    {path : 'products', component: ProductsComponent},
    {path : 'register', component: RegisterComponent},
    {path : 'cart-page', component: CartPageComponent},
    {path : 'user-site', component: UserSitesComponent},
    {path : 'dashboard', component: DashboardComponent},
    {path : 'categories', component: CategoriesComponent},
    {path : 'client-area', component: ClientAreaComponent},
    {path : 'category-add', component: CategoryAddComponent},
    {path : 'transactions', component: TransactionComponent},
    {path : 'user-products', component: UserProductsComponent},
    {path : 'notifications', component: NotificationsComponent},
    {path : 'userDetails/:id', component: UsersDetailsComponent},
    {path : 'client-profile', component: ClientProfileComponent},
    {path : 'product-page/:id', component: ProductPageComponent},
    {path : 'user-products/add', component: AddProductComponent},
    {path : 'forgot-password', component: ForgotPasswordComponent},
    {path : 'depot/:depotId/:productId', component: DepositComponent},
    {path : 'retrait/:depotId/:productId', component: RetraitComponent},
    {path : 'email-verification', component: EmailVerificationComponent},
    {path : 'user-products/update/:id',component: UpdateProductComponent},
    {path : 'passwordReset/:token/:id', component: PasswordResetComponent},
    {path : 'transaction-details/:id' , component:TransactionDetailsComponent},
    {path : 'user-confirmation/:token', component: EmailVerificationComponent},
    {path : 'request-reset-password', component: RequestResetPasswordComponent},
    {path : 'depot-sites/:typeES/:id/:productId' , component:DepotSitesComponent},
    {path : 'choix-site/:typeES/:id/:productId' , component:ChoixDepotComponent},
    {path : 'product-details/:id/:depotItemId', component: ProductDetailsComponent},
    {path : 'choix-produit/:typeES/:id/:productId' , component:ChoixProduitComponent},
    {path : '**', component: NotFoundComponent},
];

export default routes;
