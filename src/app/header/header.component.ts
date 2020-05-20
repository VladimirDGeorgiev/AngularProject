import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription
  isAuth = false;
  error: string = null;

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuth = !!user
    })
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  // onFetch() {
  //   this.recipeService.fetchRecipe().subscribe(
  //     () => (this.recipeService.emitChanges())
  //   );

  // }

  // onSave() {
  //   this.recipeService.storeRecipe();
  // }

  onLogout() {
    this.error = environment.logoutMessage;

  }

  onCancalLogout() {
    this.error = null;
  }

  onConfirmLogout() {
    this.error = null;
    this.authService.logout();
  }


}
