import {Observable, of} from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import env from '../../../environment/development.json';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface Request {
    method: RequestMethod;
    url: string;
    queryString?: string;
    params?: any;
    headers?: any;
    body?: any;
}

export default class HttpClient {

    private createRequest(req: Request): Request {
        if (!/^(http|https):/i.test(req.url)) {
            req.url = `${env.apiUrl.replace(/[/]$/, '')}/${req.url.replace(/^[/]/, '')}`;
        }
        if (req.params) {
            req.queryString = this.makeQueryString(req.params);
        }
        return req;
    }

    private request(req: Request): Observable<any> {
        const request = this.createRequest(req);
        return ajax({
            method: request.method,
            url: `${request.url}?${request.queryString}`,
        }).pipe(
            map(response => response.response),
            catchError(of)
        );
    }

    private makeQueryString(params: any): string {
        return Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&');
    }

    get(url = '', params = {}): Observable<any> {
        return this.request({ method: 'GET', url, params });
    }
}
