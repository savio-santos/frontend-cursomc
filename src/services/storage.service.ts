import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storege_keys.config";
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
}