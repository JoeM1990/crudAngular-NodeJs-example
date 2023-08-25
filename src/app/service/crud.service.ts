import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Livre } from '../model/livre';
import { Observable, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  baseUrl="http://localhost:8000/api/"

  constructor(public client:HttpClient) { }


  addData(livre:Livre):Observable<any>{

    return this.client.post(this.baseUrl+'livre',livre)
    .pipe( finalize(()=>{
      window.location.reload();
    })
    )

  }

  updateData(id:any, livre:Livre):Observable<any>{

    return this.client.put(this.baseUrl+'livre/'+id,livre)
    .pipe( finalize(()=>{
      window.location.reload();
    })
    );

  }

  deleteData(id:any){

    return this.client.delete(this.baseUrl+'livre/'+id)
    .pipe( finalize(()=>{
      window.location.reload();
    })
    )

  }

  getData():Observable<any>{

    return this.client.get(this.baseUrl+'livre');

  }

  getDataById(id:any):Observable<any>{

    return this.client.get(this.baseUrl+'livre/'+id);
  }




}
