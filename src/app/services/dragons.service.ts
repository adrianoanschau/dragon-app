import HttpClient from './http/http.service';

export default class DragonsService {
    private http = new HttpClient();

    getDragons() {
        return this.http.request('http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon');
    }
}
