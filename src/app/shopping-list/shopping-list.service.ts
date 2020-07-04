import {Ingredient} from '../shared/indredient.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class ShoppingListService {

    ingredientsChange = new Subject<Ingredient[]>();

    private ingredients: Ingredient[]  = [
        new Ingredient('Káposzta', 2),
        new Ingredient('Mák', 1)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChange.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChange.next(this.ingredients.slice());
    }

}
