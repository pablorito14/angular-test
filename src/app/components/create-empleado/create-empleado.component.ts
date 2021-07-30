import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpleadoService } from '../../services/empleado.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})
export class CreateEmpleadoComponent implements OnInit {
  createEmpleado:FormGroup;
  id:string | null;

  submitted = false;
  loading = false;
  titulo:string = 'Agregar empleado'; 

  constructor(private fb:FormBuilder,
              private _empleadoService:EmpleadoService,
              private router:Router,
              private toastr:ToastrService,
              private aRoute:ActivatedRoute) { 
    this.createEmpleado = this.fb.group({
      nombre: ['',[Validators.required,Validators.minLength(4)]],
      apellido: ['',Validators.required],
      documento: ['',Validators.required],
      salario: ['',Validators.required]
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
    // this.toastr.success('Hello world!', 'Toastr fun!');
    console.log(this.id);
   }

  ngOnInit(): void {
    this.editar();
  }

  agregarEditarEmpleado(){
    this.submitted=true;
    if(this.createEmpleado.invalid){
      return;
    }

    if(this.id === null){
      this.agregarEmpleado();
    } else {
      this.editarEmpleado(this.id);
    }
    
  }

  agregarEmpleado(){
    const empleado:any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._empleadoService
        .agregarEmpleado(empleado)
        .then(() => {
          this.toastr.success('Empleado agregado con exito','',{
            positionClass:'toast-top-right'
          });
          this.loading = false;
          this.router.navigate(['/list-empleados']);
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
  }

  editarEmpleado(id:string){
    const empleado:any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._empleadoService.actualizarEmpleado(id,empleado)
      .then(() => {
        this.loading = false;
        this.toastr.info('Empleado modificado');
        this.router.navigate(['/list-empleados']);
      })
      .catch(error => { console.log(error)});
      
  }

  editar(){
    if(this.id !== null){
      this.titulo = "Editar empleado";
      this._empleadoService.getEmpleado(this.id).subscribe(data =>{
        this.createEmpleado.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          documento: data.payload.data()['documento'],
          salario: data.payload.data()['salario'],
        })
      })
    }
  }

}
