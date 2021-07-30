import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
  empleados:any[] = [];
  loading = false;
  // items:Observable<any[]>;
  constructor(private _empleadoService:EmpleadoService,
            private toastr:ToastrService) {
    // this.items = firestore.collection('items').valueChanges();
  }

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados(){
    this.loading = true;
    this._empleadoService.getEmpleados().subscribe(data => {
      this.empleados=[];
      
      data.forEach((element:any) => {
        // console.log(element.payload.doc.data());
        this.empleados.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
        });
        
      });
      // console.log(this.empleados);
      this.loading=false;
    });
  }

  eliminarEmpleado(id:string){
    this._empleadoService.eliminarEmpleado(id)
    .then(() => {
      this.toastr.error('El empleado fue eliminado con exito','Registro eliminado');
    })
    .catch(error => {
      console.log(error);
    })
  }

}
