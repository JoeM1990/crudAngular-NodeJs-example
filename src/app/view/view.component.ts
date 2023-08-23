import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  livre:any;

  livreForm:FormGroup;
  livreUpdateForm:FormGroup;

  idUpdate:any;


  constructor(public formBuilder: FormBuilder, 
    public crud:CrudService,public router:Router) {
      this.livreForm = this.formBuilder.group({
        titre: ['',{validators: [Validators.required], }],
        auteur: ['',{validators: [Validators.required],}],
      })
  
      this.livreUpdateForm = this.formBuilder.group({
        titre: ['',{validators: [Validators.required], }],
        auteur: ['',{validators: [Validators.required],}],
      })
     }

  ngOnInit(): void {

    this.crud.getData()
    .subscribe(
      response => {
        this.livre=response;
       
      },
      error => {
        //console.log(error)
      });


  }

  addLivre(){

    if(confirm("Voulez-vous ajouter ce livre")){

      this.crud.addData(this.livreForm.value)
      .subscribe(
        response =>{
          if(response){
            window.location.reload();
            alert("Livre ajouter avec success");
          }
        },
        error =>{
          //alert(error['message']);
        }
      );

    }

    
  }

  getLivreById(id:any){
    this.crud.getDataById(id)
    .subscribe(
      response => {
        this.idUpdate=response['id']

        this.livreUpdateForm = this.formBuilder.group({
          titre: response['titre'],
          auteur: response['auteur'],
        })
      },
      error => {
        //console.log(error)
      });
  }

  updateLivreById(id:any){

    if(confirm("Voulez-vous modifier ce livre")){
      this.crud.updateData(id,this.livreUpdateForm.value)
        .subscribe(
            response => {
              if(response){
                window.location.reload();
              }
        
            },
              error => {
          //      console.log(error)
              });
    }

    
      
  }


  deleteLivreById(id:any){

    if(confirm("Voulez-vous supprimer ce livre")){
      this.crud.deleteData(id)
      .subscribe(
        response => {
          if(response){
           window.location.reload();
          }
          
        },
        error => {
          //console.log(error)
        });
    }

   


  }


}
