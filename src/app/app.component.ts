import { Component, OnInit } from '@angular/core';
import { RestService } from './rest.service';
import {employees} from './employees';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'jsonServerExAngular';
  employees:employees[]=[];
  columns = ["Employee Id", "First Name","Last Name","Email"];
  index = ["id","first_name","last_name","email"];
  constructor(private rs : RestService){
    
  }
  ngOnInit(){
    this.rs.getUsers().subscribe((response)=>{
      this.employees = response;
    });
  }
  saveUser() { 
    const emp = { id: '4', first_name: 'amperayani', last_name: 'durga', email: 'ampdurga@gmail.com'};
    this.rs.saveUser(emp).subscribe((result) => { 
    console.log(result); 
    }, (err) => { 
    console.log(err); 
    }); 
    }
}
