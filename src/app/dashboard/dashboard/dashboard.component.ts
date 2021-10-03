import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddChallengeComponent } from 'src/app/shared/shared-material/modal/add-challenge.modal';
import {DeviceDetectorService} from 'ngx-device-detector';
import { SortingComponent } from 'src/app/shared/shared-material/modal/sorting.component';
import { Router } from '@angular/router';
import { challenge } from 'src/app/shared/shared-material/Model/challenge.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isMobile:boolean = false
  allTasks:challenge[] = []
  currentEmployee:number
  currentSorting:string = "0"
  constructor(private dialog: MatDialog, private deviceService: DeviceDetectorService, private router:Router) { }

  ngOnInit(): void {
    this.getLocalStorageData()
    this.isMobile = this.deviceService.isMobile()
    this.currentEmployee = JSON.parse(localStorage.getItem('employeeId'))
  }

  getLocalStorageData(){
    let item = localStorage.getItem('task')
    this.allTasks = item ? JSON.parse(item) : []
  }

  sortTask(){
    let dialogRef = this.dialog.open(SortingComponent,{
      data:this.currentSorting
    })
    dialogRef.afterClosed()
    .subscribe(result=>{
      if(result){
        if(result == "1"){
          this.currentSorting = "1"
          this.getLocalStorageData()
          this.allTasks.sort((a,b)=>b.time-a.time)
        }
        else if(result == "2") {
          this.currentSorting = "2"
          this.getLocalStorageData()
          this.allTasks.sort((a,b)=>b.upvoteBy.length-a.upvoteBy.length)
        }
        else{
          this.getLocalStorageData()
        }
      }
    })
  }

  AddChallenge(){
    let dialogRef = this.dialog.open(AddChallengeComponent)
    dialogRef.afterClosed()
    .subscribe(result=>{
      if(result){
        this.allTasks.push(result)
        localStorage.setItem('task',JSON.stringify(this.allTasks))
      }
    })

  }
  
  upvote(i){
    
    let upvoteInd = this.allTasks[i]['upvoteBy'].length>0? this.allTasks[i]['upvoteBy'] : []
    let createdBy = this.allTasks[i]['createdBy']
    if(upvoteInd.indexOf(this.currentEmployee)===-1 && createdBy!==this.currentEmployee){
      upvoteInd.push(this.currentEmployee)
      upvoteInd = upvoteInd
      this.allTasks[i]['upvoteBy'] = upvoteInd
      localStorage.setItem('task',JSON.stringify(this.allTasks))
    }
    
  }

  logout(){
    localStorage.removeItem('employeeId')
    this.router.navigate([''])
  }

}
