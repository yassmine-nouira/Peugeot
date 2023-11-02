import { Injectable } from "@angular/core";

export interface Menu {

    state: String;
    name: String;
    type: String;
    icon: String;
    role: String;

}

const MENUITEMS = [
    { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'dashboard', role: '' },
    { state: 'contrat', name: 'Gérer Contrat', type: 'link', icon: 'category', role: 'ADMIN' },
    { state: 'demande', name: 'Gérer demande', type: 'link', icon: 'people', role: 'ADMIN' }
    //{ state: 'user', name: 'Manage User', type: 'link', icon: 'people', role: 'ADMIN' }
]

@Injectable()
export class MenuItems {

    getMenuitem(): Menu[] {
        return MENUITEMS;
    }


}