import { Injectable } from "@angular/core";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class CartService {
    constructor(public storage: StorageService) {
    }

    createOrClearCart(): Cart {
        let cart: Cart = { items: [] };
        this.storage.setCart(cart);
        return cart;
    }

    getCart(): Cart {
        let cart: Cart = this.storage.getCart();
        if (cart == null) {
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addProduto(prod: ProdutoDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == prod.id);
        //retorna a posição do produto a partir da condição passada.Caso não exista, retorn -1
        if (position == -1) {
            cart.items.push({ quantidade: 1, produto: prod });
        }
        this.storage.setCart(cart);
        return cart;
    }


    removeProduto(prod: ProdutoDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == prod.id);
        //retorna a posição do produto a partir da condição passada.Caso não exista, retorn -1
        if (position != -1) {
            cart.items.splice(position, 1);
        }
        this.storage.setCart(cart);
        return cart;
    }

    increaseQuantity(prod: ProdutoDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == prod.id);
        //retorna a posição do produto a partir da condição passada.Caso não exista, retorn -1
        if (position != -1) {
            cart.items[position].quantidade++;
        }
        this.storage.setCart(cart);
        return cart;
    }

    decreaseQuantity(prod: ProdutoDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == prod.id);
        //retorna a posição do produto a partir da condição passada.Caso não exista, retorn -1
        if (position != -1) {
            cart.items[position].quantidade--;
            
            if(cart.items[position].quantidade < 1)
                cart=this.removeProduto(prod)
        
        }
        this.storage.setCart(cart);
        return cart;
    }

    total():number{
        let cart = this.getCart();
        let sum = 0;
       cart.items.forEach(item=>{
        sum+=item.produto.preco * item.quantidade;  
       })
       return sum;
    }

}