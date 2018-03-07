import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { NgForm } from '@angular/forms';
import { ToastsManager  } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {


  constructor(public employeeService: EmployeeService, private toastService: ToastsManager) {}

  ngOnInit() {

  }


  onSubmit(employeeForm: NgForm)
  {

    if(employeeForm.value.$key != null)
    {
      this.employeeService.updateEmployee(employeeForm.value);
      this.toastService.success('Employee has been updated', 'Success');  
    }else
    {
      this.employeeService.insertEmployee(employeeForm.value);
      this.resetForm(employeeForm);  
      this.toastService.success('Employee has been added', 'Success'); 
    }

 
  }

  resetForm(employeeForm?: NgForm)
  {
    if(employeeForm != null)
    {
      employeeForm.reset();
      
    }
  }

}
