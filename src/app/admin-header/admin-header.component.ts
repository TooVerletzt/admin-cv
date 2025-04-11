import { Component } from '@angular/core';
import { HeaderService } from '../services/header-service/header.service';
import { Header } from '../models/header/header.model';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
  btntxt: string = "Agregar"; // Texto del botón, inicialmente 'Agregar'
  headerList: Header[] = [];
  myHeader: Header = new Header(); // Se inicializa vacío para nuevos registros

  constructor(public headerService: HeaderService) {
    this.loadHeaders(); // Cargar los datos iniciales de los headers
  }

  // Cargar los datos de los headers
  loadHeaders() {
    this.headerService.getHeaders().subscribe(data => {
      this.headerList = data;
    });
  }

  // Función para agregar o actualizar el header
  AgregarHeader() {
    if (this.myHeader.id) {
      // Si existe id, actualizamos
      this.headerService.updateHeader(this.myHeader).then(() => {
        console.log('Header actualizado');
        this.loadHeaders(); // Recargamos los headers después de la actualización
        this.resetForm(); // Limpiamos el formulario
      });
    } else {
      // Si no hay id, creamos un nuevo header
      this.headerService.createHeader(this.myHeader).then(() => {
        console.log('Header creado');
        this.loadHeaders(); // Recargamos los headers después de crear
        this.resetForm(); // Limpiamos el formulario
      });
    }
  }

  // Función para confirmar la edición
  confirmEdit(header: Header): void {
    if (confirm("¿Estás seguro de que quieres editar este elemento?")) {
      this.editarHeader(header); // Llamamos a la función de edición si el usuario confirma
    }
  }

  // Función para editar el header
  editarHeader(header: Header) {
    this.myHeader = { ...header }; // Cargamos los valores en el formulario
    this.btntxt = "Actualizar"; // Cambiamos el texto del botón a "Actualizar"
  }

  // Función para eliminar un header
  confirmDelete(id?: string) {
    if (confirm("¿Estás seguro de que quieres eliminar este elemento?")) {
      this.deleteHeader(id); // Llamamos a la función de eliminar si el usuario confirma
    }
  }

  deleteHeader(id?: string) {
    if (id) {
      this.headerService.deleteHeader(id).then(() => {
        console.log('Header eliminado');
        this.loadHeaders(); // Recargamos la lista después de eliminar
      }).catch(error => {
        console.log('Error eliminando header:', error);
      });
    }
  }

  // Función para actualizar el header
  ActualizarHeader() {
    if (this.myHeader.id) {
      this.headerService.updateHeader(this.myHeader).then(() => {
        console.log('Header actualizado');
        this.loadHeaders(); // Recargamos los headers después de la actualización
        this.resetForm(); 
      });
    }
  }

  // Función para resetear el formulario
  resetForm() {
    this.myHeader = new Header();
    this.btntxt = "Agregar";
  }
}
