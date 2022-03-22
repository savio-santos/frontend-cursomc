import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storege_keys.config";
import { Cart } from "../models/cart";
import { LocalUser } from "../models/local_user";

@Injectable()
export class StorageService {
    getlocaluser(): LocalUser {
        let usr = localStorage.getItem(STORAGE_KEYS.localuser)
        if (usr == null) {
            return null;
        }
        else {
            return JSON.parse(usr);
        }
    }
    setlocalUser(obj: LocalUser) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localuser);
        }
        else {
            localStorage.setItem(STORAGE_KEYS.localuser, JSON.stringify(obj));
        }
    }


    getCart(): Cart {
        let cart = localStorage.getItem(STORAGE_KEYS.cart)
        if (cart != null) {
            return JSON.parse(cart);            
        }
        else {
            return null;
        }
    }
    setCart(obj: Cart) {
        if (obj != null) {
            localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
            console.log('setando item no carrinho')
        }
        else {
            localStorage.removeItem(STORAGE_KEYS.cart);
        }
    }

}