import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidUsers } from 'src/app/shared/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  getEmployeeId(employeeId){
    employeeId = +employeeId
    let isEmplyeeExist = !!employeeId && ValidUsers.USERS.indexOf(employeeId)>-1
    if(isEmplyeeExist){
      localStorage.setItem('employeeId',employeeId)
      this.router.navigate(['/dashboard'])
    }
    else{
      alert(`Only valid users are ${[...ValidUsers.USERS].toString()}`)
    }
  }

}
