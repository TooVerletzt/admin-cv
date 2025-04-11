import { Component } from '@angular/core';
import { EducationService } from '../services/education-service/education.service';
import { Education } from '../models/education/education.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-education',
  templateUrl: './admin-education.component.html',
  styleUrls: ['./admin-education.component.css']
})
export class AdminEducationComponent {
  btntxt: string = 'Agregar';
  educationList: Education[] = [];
  myEducation: Education = new Education();

  constructor(public educationService: EducationService) {
    this.educationService.getEducation().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.educationList = data;
      console.log(this.educationList);
    });
  }

  // Método para agregar o actualizar educación
  AgregarEducation() {
    if (this.myEducation.id) {
      this.educationService.updateEducation(this.myEducation).then(() => {
        console.log('Updated education successfully!');
        this.resetForm();
      });
    } else {
      this.educationService.createEducation(this.myEducation).then(() => {
        console.log('Created new education successfully!');
        this.resetForm();
      });
    }
  }

  // Función para confirmar la eliminación
  confirmDelete(id?: string) {
    if (confirm("¿Estás seguro de que quieres eliminar esta educación?")) {
      this.deleteEducation(id); // Llamar al método de eliminación si el usuario confirma
    }
  }

  // Método para eliminar educación
  deleteEducation(id?: string) {
    if (id) {
      this.educationService.deleteEducation(id).then(() => {
        console.log('Deleted education successfully!');
      }).catch(error => {
        console.log('Error deleting education:', error);
      });
    }
  }

  // Función para confirmar la edición
  confirmEdit(item: Education) {
    if (confirm("¿Estás seguro de que quieres editar esta educación?")) {
      this.editarEducation(item); // Llamar al método de edición si el usuario confirma
    }
  }

  // Método para editar educación
  editarEducation(item: Education) {
    this.myEducation = { ...item }; // Copiar los valores de la educación seleccionada al formulario
    this.btntxt = 'Actualizar'; // Cambiar el texto del botón
  }

  // Método para resetear el formulario
  resetForm() {
    this.myEducation = new Education(); // Limpiar el formulario
    this.btntxt = 'Agregar'; // Restaurar el texto del botón
  }
}
