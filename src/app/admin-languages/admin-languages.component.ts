import { Component } from '@angular/core';
import { LanguagesService } from '../services/languages-service/languages.service';
import { Languages } from '../models/languages/languages.model';

@Component({
  selector: 'app-admin-languages',
  templateUrl: './admin-languages.component.html',
  styleUrls: ['./admin-languages.component.css']
})
export class AdminLanguagesComponent {
  btntxt: string = 'Agregar';
  languagesList: Languages[] = [];
  myLanguages: Languages = new Languages(); // propiedad necesaria

  constructor(private languagesService: LanguagesService) {
    this.languagesService.getLanguages().subscribe(data => {
      this.languagesList = data;
    });
  }

  // Método para agregar o actualizar un idioma
  AgregarLanguage() {
    if (this.myLanguages.id) {
      this.languagesService.updateLanguage(this.myLanguages).then(() => this.resetForm());
    } else {
      this.languagesService.createLanguage(this.myLanguages).then(() => this.resetForm());
    }
  }

  // Confirmar eliminación de idioma
  confirmDelete(id?: string) {
    if (confirm("¿Estás seguro de que quieres eliminar este idioma?")) {
      this.deleteLanguage(id); // Llamar al método de eliminación si el usuario confirma
    }
  }

  // Método para eliminar un idioma
  deleteLanguage(id?: string) {
    if (id) {
      this.languagesService.deleteLanguage(id).then(() => {
        console.log('Deleted language successfully!');
      }).catch(error => {
        console.log('Error deleting language:', error);
      });
    }
  }

  // Confirmar edición de idioma
  confirmEdit(language: Languages) {
    if (confirm("¿Estás seguro de que quieres editar este idioma?")) {
      this.editarLanguage(language); // Llamar al método de edición si el usuario confirma
    }
  }

  // Método para editar un idioma
  editarLanguage(item: Languages) {
    this.myLanguages = { ...item };  // Copiar los valores del idioma seleccionado al formulario
    this.btntxt = 'Actualizar'; // Cambiar el texto del botón
  }

  // Método para resetear el formulario
  resetForm() {
    this.myLanguages = new Languages();  // Limpiar el formulario
    this.btntxt = 'Agregar';  // Restaurar el texto del botón
  }
}
