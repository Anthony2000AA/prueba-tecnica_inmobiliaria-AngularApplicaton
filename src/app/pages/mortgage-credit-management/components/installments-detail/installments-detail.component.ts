import { Component, OnInit, Input,SimpleChanges  } from '@angular/core';
import { InstallmentService } from '../../service/installment.service';
import { Installment } from '../../models/installment.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-installments-detail',
  templateUrl: './installments-detail.component.html',
  styleUrls: ['./installments-detail.component.css'],
  providers: [MessageService]
})
export class InstallmentsDetailComponent implements OnInit{

  @Input() mortgageCreditId: number =0;
  @Input() monthsRequired: number = 0;


  installmentList: Installment[] = [];

  currentPage: number = 1;
  pageSize: number = 4;
  totalRecords: number = 0;
  totalPages: number = 0;

  loading: boolean = false;

  constructor(
    private installmentService: InstallmentService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.loading = true;
  }

  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['mortgageCreditId'] && changes['mortgageCreditId'].currentValue) {
      this.getInstallmentListByMortgageCreditId();
    }
  }

  getInstallmentListByMortgageCreditId() {
    this.loading = true;
    this.installmentService.getInstallmentListByMortgageCreditId(this.mortgageCreditId,this.currentPage-1,this.pageSize).subscribe({
      next: (response) => {
        this.installmentList = response.data.content;
        this.totalRecords = response.data.totalElements;
        this.totalPages = response.data.totalPages;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.showError('Error loading installment list');
      }
    });
  }

  onFileSelected(event: any, installmentId: number) {
    const file: File = event.target.files[0];
    if (file) {

      this.loading = true;

      this.installmentService.uploadFile(installmentId, file).subscribe({
        next: (response) => {
          // Actualizar la lista de cuotas si es necesario
          this.getInstallmentListByMortgageCreditId();
          this.showSuccess('File uploaded successfully');
          this.loading = false;
        },
        error: (error) => {
          this.showError('Error uploading file');
          this.loading = false;
        }
      });
    }
  }

 

  downloadFile(id:number){

    this.installmentService.getPReviewFile(id).subscribe({
      next: (response) => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'archivo.pdf'; 
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        this.showSuccess('File downloaded successfully');
      },
      error: (error) => {
        this.showError('Error downloading file');
      }
    });


  }

  getFileName(archivePath: string): string {
    const splitPath = archivePath.split('/');
    return splitPath[splitPath.length - 1];
  }


  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getInstallmentListByMortgageCreditId();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getInstallmentListByMortgageCreditId();
    }
  }

  isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  isLastPage(): boolean {
    return this.currentPage === this.totalPages;
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }
  showError(message:string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
  getGlobalIndex(i: number): number {
    return (this.currentPage - 1) * this.pageSize + i + 1;
  }
}
