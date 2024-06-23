import { PageResponse } from './../../../shared/models/api-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/shared/models/api-response.model';
import { environment } from 'src/environments/environment.development';
import { MortgageCredit } from '../models/mortgage-credit.model';

@Injectable({
  providedIn: 'root'
})
export class MortgageCreditService {

  BASE_URL: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  getMortgageCreditList(page: number, size: number) {
    return this.http.get<ApiResponse<PageResponse<MortgageCredit[]>>>(`${this.BASE_URL}mortgage-credit/findAll`,{
      params: {
        page: page.toString(),
        size: size.toString()
      }
    });
  }

  getMortgageCreditListByProjectNameAndDate(projectName: string, startDate: string, endDate: string, page: number, size: number) {
    return this.http.get<ApiResponse<PageResponse<MortgageCredit[]>>>(`${this.BASE_URL}mortgage-credit/findByDateAndProjectName`, {
      params: {
        projectName: projectName,
        startDate: startDate,
        endDate: endDate,
        page: page.toString(),
        size: size.toString()
      }
    });
  }
  
  

}
