import HttpClient from './http/http.service';

export default class DragonsService {
    private http = new HttpClient();
    private baseUrl = 'dragon';

    getDragons() {
        return this.http.get(this.baseUrl);
    }
}
