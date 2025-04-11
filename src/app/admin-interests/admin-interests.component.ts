import { Component } from '@angular/core';
import { InterestsService } from '../services/interests-service/interests.service';
import { Interests } from '../models/interests/interests.model';

@Component({
  selector: 'app-admin-interests',
  templateUrl: './admin-interests.component.html',
  styleUrls: ['./admin-interests.component.css']
})
export class AdminInterestsComponent {
  btntxt: string = "Agregar";  // Texto del botón, inicialmente 'Agregar'
  interestsList: Interests[] = [];
  myInterests: Interests = { interests: "" };  // Inicializamos el string vacío

  constructor(public interestsService: InterestsService) {
    this.interestsService.getInterests().subscribe((data: Interests[]) => {
      this.interestsList = data;
    });
  }

  AgregarInterest() {
    if (this.myInterests.interests && this.myInterests.interests.trim() !== '') {
      // Verifica que no esté vacío y que no sea un duplicado
      if (!this.interestsList.some(interest => interest.interests === this.myInterests.interests)) {
        // Si el interés no existe, lo agregamos
        if (this.myInterests.id) {
          this.interestsService.updateInterest(this.myInterests).then(() => {
            console.log('Updated interest successfully!');
            this.resetForm();
          });
        } else {
          this.interestsService.createInterest(this.myInterests).then(() => {
            console.log('Created new interest successfully!');
            this.resetForm();
          });
        }
      } else {
        console.log('Este interés ya existe.');
      }
    } else {
      console.log('Por favor ingrese un interés válido.');
    }
  }

  // Confirmación de eliminación
  confirmDeleteInterest(interest: Interests) {
    const isConfirmed = window.confirm('¿Estás seguro de que quieres eliminar este interés?');
    if (isConfirmed) {
      this.deleteInterest(interest.id);
    }
  }

  deleteInterest(id?: string) {
    if (id) {
      this.interestsService.deleteInterest(id).then(() => {
        console.log('Deleted interest successfully!');
      }).catch(error => {
        console.log('Error deleting interest:', error);
      });
    }
  }

  // Confirmación de edición
  confirmEdit(interest: Interests) {
    const isConfirmed = window.confirm('¿Estás seguro de que quieres editar este interés?');
    if (isConfirmed) {
      this.editarInterest(interest);  // Llamamos a la función de edición si el usuario confirma
    }
  }

  editarInterest(item: Interests) {
    this.myInterests = { ...item };  // Cargamos los valores del interés en el formulario
    this.btntxt = "Actualizar";  // Cambiamos el texto del botón a "Actualizar"
  }

  resetForm() {
    this.myInterests = { interests: "" };  // Limpiar el formulario
    this.btntxt = "Agregar";  // Restaurar el texto del botón
  }
}
