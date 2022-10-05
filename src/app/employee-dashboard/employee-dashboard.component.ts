import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashbord bord.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
formValue !:FormGroup;
employeeModelobj:EmployeeModel= new EmployeeModel();
  constructor(private formbuilder:FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
     firstName:[''],
     lastName:[''],
      email:[''],
    mobile:[''],
     salary:['']

    })
  }
postEmployeeDetails(){
  this.employeeModelobj.firstName=this.formValue.value.firstName;
  this.employeeModelobj.lastName=this.formValue.value.lastName;
  this.employeeModelobj.emali=this.formValue.value.email;
  this.employeeModelobj.mobile=this.formValue.value.mobile;
  this.employeeModelobj.salary=this.formValue.value.salary;

  this.api.postEmployee(this.employeeModelobj)
  .subscribe(
    res=>{
    console.log(res);
    alert("Employee Added Successfully")
    
  },
  err=>{
    alert("Something Went wrong")
  }
  
  )
}
}
