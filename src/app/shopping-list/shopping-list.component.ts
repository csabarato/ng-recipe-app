import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/indredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private ingredChangeSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredChangeSubscription = this.shoppingListService.ingredientsChange.subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
    );
  }

  ngOnDestroy(): void {
    this.ingredChangeSubscription.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
}
