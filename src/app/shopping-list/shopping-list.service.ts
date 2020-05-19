import {Ingredient} from '../shared/indredient.model';
import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class ShoppingListService {

    ingrediensChange = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[]  = [
        new Ingredient('Káposzta', 2),
        new Ingredient('Mák', 1)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingrediensChange.emit(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingrediensChange.emit(this.ingredients.slice());
    }

}
