import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Installment } from '../models/installment.model';
import { ApiResponse, PageResponse } from 'src/app/shared/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class InstallmentService {


  BASE_URL: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  getInstallmentListByMortgageCreditId(mortgageCreditId: number, page: number, size: number) {
    return this.http.get<ApiResponse<PageResponse<Installment[]>>>(`${this.BASE_URL}installment/findByMortgageCreditId/${mortgageCreditId}`,
    
    {
      params: {
        page: page.toString(),
        size: size.toString()
      }
    });
    
  }

  uploadFile(installmentId: number,file: File ) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.BASE_URL}installment/${installmentId}/upload-voucher`, formData);
  }

  getPReviewFile(installmentId: number) {
    const headers = new HttpHeaders().set('Accept', 'application/octet-stream');

    return this.http.get(`${this.BASE_URL}installment/${installmentId}/download-voucher`, { headers: headers, responseType: 'blob' });

  }
}
