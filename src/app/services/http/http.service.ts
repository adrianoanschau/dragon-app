import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';

export default class HttpClient {
    request(url = '') {
        return ajax.get(url).pipe(
            map(response => response.response),
            catchError(of)
        );
    }
}
