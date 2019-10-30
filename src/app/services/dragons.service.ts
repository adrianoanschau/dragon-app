import {ToastsStore} from "react-toasts";
import {BehaviorSubject, Subject} from "rxjs";
import {map} from "rxjs/operators";

import HttpClient from './http/http.service';
import {Dragon} from "../models/dragon.model";
import {orderBy} from "../helpers";

export default class DragonsService {
    private baseUrl = 'dragon';
    private http = new HttpClient();
    public list$ = new BehaviorSubject<Dragon[]>([]);
    public selected$ = new Subject<Dragon>();

    private static formatDragon(dragon: Dragon) {
        dragon.createdAt = new Date(dragon.createdAt);
        return dragon;
    }

    getDragons() {
        return this.http.get(this.baseUrl)
            .pipe(
                map((result: Dragon[]) => result.sort(orderBy('name'))),
                map((result: Dragon[]) => result.map(DragonsService.formatDragon)),
            )
            .subscribe(dragons => this.list$.next(dragons));
    }

    getDragon(id: string) {
        return this.http.get(`${this.baseUrl}/${id}`)
            .pipe(map(DragonsService.formatDragon))
            .subscribe((dragon: Dragon) => {
                this.selected$.next(dragon);
            });
    }

    create(data: Dragon) {
        return this.http.post(this.baseUrl, data)
            .pipe(map(DragonsService.formatDragon))
            .subscribe(() => {
                ToastsStore.success("Novo Dragão criado com sucesso!");
            });
    }

    update(id: string, data: Dragon) {
        return this.http.put(`${this.baseUrl}/${id}`, data)
            .pipe(map(DragonsService.formatDragon))
            .subscribe((updated) => {
                ToastsStore.success("Dragão atualizado!");
                this.list$.next(this.list$.getValue().map(i => {
                    if (i.id === updated.id) {
                        return updated;
                    }
                    return i;
                }));
            });
    }

    delete(id: string) {
        return this.http.delete(`${this.baseUrl}/${id}`)
            .pipe(map(DragonsService.formatDragon))
            .subscribe((deleted) => {
                ToastsStore.success("Dragão removido!");
                this.list$.next(this.list$.getValue().filter(i => i.id !== deleted.id));
            });
    }
}
