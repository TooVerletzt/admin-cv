document.addEventListener('DOMContentLoaded', function () {
    // Función para mostrar la confirmación
    function showConfirmation(message) {
      return window.confirm(message);
    }
  
    // Función para confirmar eliminación
    window.confirmDelete = function (event) {
      const isConfirmed = showConfirmation('¿Estás seguro de que deseas eliminar este ítem?');
      if (isConfirmed) {
        const itemId = event.target.getAttribute('data-id');
        console.log('Eliminando el item con ID:', itemId);
        // Aquí llamas a la función de eliminación, usando el itemId
      } else {
        console.log('Eliminación cancelada');
      }
    };
  
    // Función para confirmar edición (si quieres)
    window.editItem = function (event) {
      const isConfirmed = showConfirmation('¿Estás seguro de que deseas editar este ítem?');
      if (isConfirmed) {
        const itemId = event.target.getAttribute('data-id');
        console.log('Editando el item con ID:', itemId);
        // Aquí iría la lógica para editar el item
      } else {
        console.log('Edición cancelada');
      }
    };
  });
  