import { Injectable } from '@angular/core';
import { Employee } from './employee.model';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Injectable()
export class EmployeeService {

employeeList: AngularFireList<any>;
selectedEmployee: Employee = new Employee;


  constructor(private db: AngularFireDatabase) { }


  getData()
{
  this.employeeList = this.db.list('/employee');
  return this.employeeList;
}


insertEmployee(employee: Employee)
{
  const itemsRef = this.db.list('employee');

  itemsRef.push({
  name: employee.name,
  position: employee.position,
  salary: employee.salary,
  office: employee.office
  })
}


updateEmployee(employee: Employee)
{
  this.employeeList.update(employee.$key, {
  name: employee.name,
  position: employee.position,
  salary: employee.salary,
  office: employee.office
  })
}


deleteEmployee($key: string)
{
  this.employeeList.remove($key);
}

}


