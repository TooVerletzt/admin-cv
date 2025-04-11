import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {



  // Función para confirmar si el usuario quiere eliminar
  confirmDelete() {
    const result = window.confirm('¿Estás seguro de que quieres eliminar este elemento?');
    if (result) {
      console.log('Elemento eliminado');
      // Aquí debes colocar la lógica de eliminación
    } else {
      console.log('Operación cancelada');
    }
  }

  // Método para editar un header
  editarHeader(item: any) {
    console.log('Editar el item: ', item);
    // Aquí puedes implementar la lógica de edición
  }
}
