import {Ingredient} from '../shared/indredient.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class ShoppingListService {

    ingredientsChange = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[]  = [
        new Ingredient('Káposzta', 2),
        new Ingredient('Mák', 1)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    getIndredientByIndex(index: number) {
      return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChange.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChange.next(this.ingredients.slice());
    }

    updateIngredient(index: number, updatedIngredient: Ingredient) {
      this.ingredients[index] = updatedIngredient;
      this.ingredientsChange.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
      console.log(index);
      this.ingredients.splice(index, 1);
      this.ingredientsChange.next(this.ingredients.slice());
    }

}
