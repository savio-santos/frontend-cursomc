import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CategoriaDTO } from "../../models/categoria.dto";
import { Observable } from "rxjs/Rx"; // Importacao correta do Observable com demais metodos

@Injectable()//tranforma a class em um servico injetavel
export class CategoriaService{

    constructor(public http: HttpClient){

    }

    findAll() :Observable<CategoriaDTO[]> {
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
    }

}

/*Observable=> incapsula o mecanimo de requisação assinc 
possibilando fazer a requição e aguardar resposta */