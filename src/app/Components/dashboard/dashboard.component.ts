import { AfterViewInit, Component,ElementRef } from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js/auto';
import { OnInit } from '@angular/core';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ExpenseData } from 'src/app/expense-data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChartDetail } from 'src/app/chartdetail';


interface Expense {
  name: string;
  monthlyAmount: number;
  yearlyAmount: number;
}

interface TotalBudget {
  monthly: number;
  yearly: number;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  constructor(private elementRef: ElementRef,private expensedata : ExpenseData,private http: HttpClient,private chartdetail:ChartDetail) {
    Chart.register(ChartDataLabels);
  }
  
  private piChart1Ref: HTMLCanvasElement = document.getElementById('pichart1') as HTMLCanvasElement;
  private piChart2Ref: HTMLCanvasElement =document.getElementById('pichart2') as HTMLCanvasElement;
  baseURL='https://txnapi.azurewebsites.net/';
  isLoading = true;
  

  monthly_expenses :[{name:"string",amount:2000}];
  early_expense :[{name:"string",amount:2000}] ;

  totalBudget = [2500,30000];
  timePeriod = 0;

  



  ngOnInit(){

    



    
      this.updateCharts();

  
  }
  updateCharts() {
    this.getMonthlyExpenseData().subscribe((data: any) => {
      this.monthly_expenses = data;
      this.createPieChart();
    });
    
    this.getYearlyExpenseData().subscribe((data: any) => {
      this.early_expense = data;
      this.createBarChart();
      this.isLoading = false;
    });
    this.destroyCharts();
    this.createPieChart();
    this.createBarChart();
  }
  onTimePeriodChange() {
    this.updateCharts();
  }

  getMonthlyExpenseData(): Observable<any> {
    return this.http.get<ExpenseData>(`${this.baseURL}/GetTotalCategoryAmountofMonth`);
  }

  getYearlyExpenseData(): Observable<any> {
    return this.http.get<ExpenseData>(`${this.baseURL}/GetTotalCategoryAmountofMYear`);
  }

  
  destroyCharts() {
    const piChartCanvas = document.getElementById('pichart') as HTMLCanvasElement;
    const barChartCanvas = document.getElementById('barchart') as HTMLCanvasElement;
  
    if (piChartCanvas && barChartCanvas) {
      const piChartInstance = Chart.getChart(piChartCanvas);
      const barChartInstance = Chart.getChart(barChartCanvas);
  
      if (piChartInstance) {
        piChartInstance.destroy();
      }
  
      if (barChartInstance) {
        barChartInstance.destroy();
      }
    }
  }
  createPieChart() {
    const ctx = document.getElementById('expense-pie-chart') as HTMLCanvasElement;
    const totalExpense = this.monthly_expenses.reduce((sum, monthly_expense) => sum + monthly_expense.amount, 0);
    const remainingBudget = this.totalBudget[this.timePeriod] - totalExpense;

    const data: ChartData<'pie'> = {
      labels: ['Total Spent', 'Remaining Budget'],
      datasets: [
        {
          data: [totalExpense, remainingBudget],
          backgroundColor: ['#FF6384', '#36A2EB']
        }
      ]
    };

    const options: ChartOptions<'pie'> = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Expense vs. Budget'
        },
        datalabels: {
          
          color: '#fff',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      }
    };

    new Chart("pichart", {
      type: 'pie',
      data: data,
      options: options
    });
  }

  createBarChart() {
    // const ctx = this.piChart2Ref.getContext('2d');
    const data: ChartData<'pie'> = {
      labels: this.early_expense.map(expense => expense.name),
      datasets: [
        {
          data: this.early_expense.map(expense => expense.amount),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
        }
      ]
    };

    const options: ChartOptions<'pie'> = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Expense Breakdown'
        },
        datalabels: {
          
          color: '#fff',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
        
      }
    };

    new Chart("barchart", {
      type: 'pie',
      data: data,
      options: options
    });

  }
}




  

  

