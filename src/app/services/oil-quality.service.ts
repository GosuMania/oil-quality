import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OilQualityService {
  urlApi = environment.urlApi;

  constructor(private http: HttpClient) {
  }


  public uploadFile(file: File): Observable<any> {
    const url = this.urlApi + environment.EVALUATE;
    console.log('#### API: ', url);
    const formData = new FormData();
    formData.append("file", file, file.name);
    return this.http.post<any>(url, formData );
  }
}
