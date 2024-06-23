import { Component } from '@angular/core';
import { MortgageCreditService } from '../../service/mortgage-credit.service';
import { MortgageCredit } from '../../models/mortgage-credit.model';
import { formatDate } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-credit-report',
  templateUrl: './credit-report.component.html',
  styleUrls: ['./credit-report.component.css'],
  providers: [MessageService]
})
export class CreditReportComponent {

  startDate:Date = new Date();
  endDate: Date = new Date();
  searchOnPress: boolean = false;
  
  mortgageCreditList: MortgageCredit[] = [];
  
  selectMortgageCreditId: number = 0;
  monthsRequired: number = 0;
  
  projectName: string = '';
  
  currentPage: number = 1;
  pageSize: number = 6;
  totalRecords: number = 0;
  totalPages: number = 0;
  
  loading: boolean = false;
  showInstallmentsDetail: boolean = false;

  constructor(
    private mortgageCreditService: MortgageCreditService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    
    this.getMortgageCreditList();
  }

    
   

   getMortgageCreditList() {
    this.loading = true;
     this.mortgageCreditService.getMortgageCreditList( this.currentPage-1, this.pageSize).subscribe(
      {
       next: (response) => {
         this.mortgageCreditList = response.data.content;
         this.totalRecords = response.data.totalElements;
         this.totalPages = response.data.totalPages;
          this.loading = false;
       },
       error: (error) => {
         this.loading = false;
         this.showWarn('Error loading mortgage credit list');
       }
      }
     );
   }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;

      if(this.searchOnPress) {
        this.filterByDateAndNameProject();
      }else{
        this.getMortgageCreditList();
      
      }
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
     
      if(this.searchOnPress) {
        this.filterByDateAndNameProject();
      }else{
        this.getMortgageCreditList();
      
      }
    }
  }

  isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  isLastPage(): boolean {

    return this.currentPage === this.totalPages;
  }

  getMortgageCreditDetail(mortgageCreditId: number, monthsRequired: number) {
    this.selectMortgageCreditId = mortgageCreditId;
    this.monthsRequired = monthsRequired;
    this.showInstallmentsDetail = true;
  }
  closeModal() {
    this.showInstallmentsDetail = false;
  }
  filterByDateAndNameProject() {

    if(!this.projectName) {
      this.showWarn('El nombre del proyecto no puede estar vacio');
      return;
    }

    if(this.startDate > this.endDate) {
      this.showWarn('La fecha de inicio no puede ser mayor a la fecha de fin');
      return;
    }
    if (this.startDate && this.endDate && this.projectName) {
      const formattedStartDate = formatDate(this.startDate, 'yyyy-MM-dd', 'en-US');
      const formattedEndDate = formatDate(this.endDate, 'yyyy-MM-dd', 'en-US');
      this.searchOnPress = true;
      this.getMortgageCreditListByDate(formattedStartDate, formattedEndDate);
    }
      
  }

  
  

  getMortgageCreditListByDate(startDate: string, endDate: string) {
    this.loading = true;
    this.mortgageCreditService.getMortgageCreditListByProjectNameAndDate(this.projectName, startDate, endDate,this.currentPage -1  , this.pageSize).subscribe(
      {
        next: (response) => {

          this.mortgageCreditList = response.data.content;
          this.totalRecords = response.data.totalElements;
          this.totalPages = response.data.totalPages;
          this.loading = false;
      
          
        },
        error: (error) => {
          this.loading = false;
          this.showWarn('Error loading mortgage credit list');
        }
      }
    );
  }

  showWarn(message:string) {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: message });
  }

  //INPUT SEARCH
  toUppercase(event: any) {
    const input = event.target;
    input.value = input.value.toUpperCase().replace(/[^A-Z0-9\s]/g, ''); 
}

  clearInput(input: HTMLInputElement) {
    input.value = '';
    this.projectName = '';
    this.searchOnPress = false;
    this.currentPage = 1;
    this.getMortgageCreditList();
  }
}
