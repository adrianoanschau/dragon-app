import {BehaviorSubject} from "rxjs";
import { ToastsStore } from "react-toasts";

import env from "../../environment/development.json";

export default class AuthService {
    public authenticated$ = new BehaviorSubject<boolean>(false);

    load() {
        const store = JSON.parse(sessionStorage.getItem('store') || '{}');
        if (!!store.authenticated) {
            this.authenticated$.next(true);
            ToastsStore.success("Sessão iniciada!");
        }
    }

    signIn(username: string, password: string) {
        if (username === env.username && password === env.password) {
            const store = {
                authenticated: true
            };
            sessionStorage.setItem('store', JSON.stringify(store));
            window.location.reload();
        }
    }

    signOut() {
        sessionStorage.clear();
        this.authenticated$.next(false);
        ToastsStore.info("Sua sessão foi encerrada!");
    }
}
