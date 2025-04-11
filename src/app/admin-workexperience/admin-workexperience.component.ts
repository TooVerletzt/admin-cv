import { Component } from '@angular/core';
import { WorkExperienceService } from '../services/work-experience-service/work-experience.service';
import { WorkExperience } from '../models/work-experience/work-experience.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-workexperience',
  templateUrl: './admin-workexperience.component.html',
  styleUrls: ['./admin-workexperience.component.css']
})

export class AdminWorkexperienceComponent {
  itemCount: number = 0;
  btntxt: string = "Agregar";
  workExperience: WorkExperience[] = [];
  myWorkExperience: WorkExperience = new WorkExperience();

  constructor(public workExperienceService: WorkExperienceService) {
    this.workExperienceService.getWorkExperience().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.workExperience = data;
      console.log(this.workExperience);
    });
  }

  // Método para agregar o actualizar un trabajo
  AgregarJob() {
    console.log(this.myWorkExperience);
    if (this.myWorkExperience.id) {
      this.workExperienceService.updateWorkExperience(this.myWorkExperience).then(() => {
        console.log('Updated item successfully!');
        this.resetForm();
      });
    } else {
      this.workExperienceService.createWorkExperience(this.myWorkExperience).then(() => {
        console.log('Created new item successfully!');
        this.resetForm();
      });
    }
  }

  // Confirmación de eliminación
  confirmDelete(id?: string) {
    if (confirm("¿Estás seguro de que deseas eliminar este elemento?")) {
      this.deleteJob(id); // Procedemos a eliminar si el usuario confirma
    }
  }

  // Método para eliminar un trabajo
  deleteJob(id?: string) {
    if (id) {
      this.workExperienceService.deleteWorkExperience(id).then(() => {
        console.log('Delete item successfully!');
      }).catch(error => {
        console.log('Error deleting item:', error);
      });
    }
  }

  // Confirmación de edición
  confirmEdit(job: WorkExperience): void {
    if (confirm("¿Estás seguro de que deseas editar este elemento?")) {
      this.editarJob(job); // Procedemos a editar si el usuario confirma
    }
  }

  // Método para editar un trabajo
  editarJob(item: WorkExperience) {
    this.myWorkExperience = { ...item }; // Copiar los valores del trabajo seleccionado al formulario
    this.btntxt = "Actualizar"; // Cambiar el texto del botón a "Actualizar"
  }

  // Método para resetear el formulario
  resetForm() {
    this.myWorkExperience = new WorkExperience(); // Limpiar el formulario
    this.btntxt = "Agregar"; // Restaurar el texto del botón
  }
}
