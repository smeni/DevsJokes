import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { JokesPageComponent } from "./jokes-page/jokes-page.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "Jokes", component: JokesPageComponent },
  { path: "**", redirectTo: "/login", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
