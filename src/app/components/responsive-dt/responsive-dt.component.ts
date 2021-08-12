import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';


@Component({
  selector: 'app-responsive-dt',
  templateUrl: './responsive-dt.component.html',
  styleUrls: ['./responsive-dt.component.css']
})
export class ResponsiveDtComponent implements OnInit {
//   dtOptions: DataTables.Settings = {};
dtOptions: any = {};
//   @ViewChild(DataTableDirective, {static: false})
//   dtElement: DataTableDirective | undefined ;

//   dtTrigger: Subject<any> = new Subject();
  data:any = 
    [
      {
        "id": "MIfG2KSSv0Tx9lV2E4JL",
        "nombre": "asdasda",
        "salario": 22333
      },
      {
        "id": "MIfG2KSSv0Tx9lV2E4JL",
        "nombre": "asdasda",
        "salario": 22333
      }
      
    ]
      
  ;

  constructor() {
    
   }

  
   

  ngOnInit(): void {
    console.log(this.data);
    this.dtOptions = {
    data: this.data,
      columns: [{
        title: 'ID',
        data: 'id'
      }, {
        title: 'Name',
        data: 'nombre'
      }, {
        title: 'Salario',
        data: 'salario',
        class: 'none'
      }],
      // Use this attribute to enable the responsive extension
      responsive: true
    //   pagingType: 'full_numbers',
    //   pageLength: 10,
    //   responsive: true
    }
  }

//   ngAfterViewInit(): void {
//     this.dtTrigger.next();
//   }

//   ngOnDestroy(): void {
//     // Do not forget to unsubscribe the event
//     this.dtTrigger.unsubscribe();
//   }

//   rerender(): void {
//     if(this.dtElement !== undefined){
//       this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
//         // Destroy the table first
//         dtInstance.destroy();
//         // Call the dtTrigger to rerender again
//         this.dtTrigger.next();
//       });
//     }
    
//   }

}
