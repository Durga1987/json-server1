import { Component, OnInit } from '@angular/core';
import { RestService } from './rest.service';
import {employees} from './employees';
import * as _ from 'lodash'
import { saveAs } from 'file-saver';
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
  isFileSave:boolean = false;
  constructor(private rs : RestService){
    
  }
  ngOnInit(){
  this.getUsers();
  }
    saveUser(values) { 
    const emp = { id: this.employees.length+1, first_name: values.first_name,
       last_name: values.last_name, email: values.email};
       let message = "";
       if(!values.first_name){
          if(!values.last_name){
            message += "first and last name is required";
          }else if(!values.email){
            message += "first and email is required";
          } else if (!values.last_name && !values.email) {
            message += "first name,last name and email is required";
          }
       } else if(!values.last_name){
        if(!values.first_name){
          message += "first and last name is required";
        }else if(!values.email){
          message += "first and email is required";
        } else if (!values.first_name && !values.email) {
          message += "first name,last name and email is required";
        }
       }
       else if(!values.email){
        if(!values.first_name){
          message += "first and last name is required";
        }else if(!values.last_name){
          message += "first and email is required";
        } else if (!values.last_name && !values.first_name) {
          message += "first name,last name and email is required";
        }
       }
       if(_.isEmpty(message)){
    const objValue =  _.find(this.employees, { 'first_name': values.first_name, 'last_name': values.last_name,
        'email' : values.email });
       if(!objValue.id) {
            this.rs.saveUser(emp).subscribe((result) => { 
                console.log(result); 
                this.getUsers();
            }, (err) => { 
                console.log(err); 
                this.CreateErrorLog(err);

            }); 
       }
       else{
         this.CreateErrorLog("id: "+objValue.id + " already Exists");
       }
      } else{
        this.CreateErrorLog(message);
      }
    }
    getUsers(){
      this.rs.getUsers().subscribe((response)=>{
        this.employees = response;
      });
    }

    public CreateErrorLog(log){
          this.rs.saveError(log).subscribe((result) => { 
            console.log(result); 
        }, (err) => { 
            console.log(err); 
            this.saveToFileSystem(err);
        }); 
    }
    private saveToFileSystem(response) {
      const filename = "errorlog";
      const blob = new Blob([response], { type: 'text/plain' });
      saveAs(blob, filename);
    }
}
