import { Component, OnInit } from '@angular/core';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';
import { forEach } from '@firebase/util';
import { ToastsManager  } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

employeeList: Employee[];

  constructor(private employeeService: EmployeeService, private toastService: ToastsManager ) { }

  ngOnInit() {
    let em = this.employeeService.getData();
    console.log(em);
    em.snapshotChanges().subscribe(result => {
      this.employeeList = [];
      result.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.employeeList.push(x as Employee)
      });
    });
  }

  onEdit(employee: Employee)
  {
    this.employeeService.selectedEmployee = employee;
  }

  onDelete(key: string)
  {
    this.employeeService.deleteEmployee(key);
    this.toastService.warning("Emplyee has been deleted")
  }

}
