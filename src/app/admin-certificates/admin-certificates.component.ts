import { Component } from '@angular/core';
import { CertificatesService } from '../services/certificates-service/certificates.service';
import { Certificates } from '../models/certificates/certificates.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-certificates',
  templateUrl: './admin-certificates.component.html',
  styleUrls: ['./admin-certificates.component.css']
})
export class AdminCertificatesComponent {
  btntxt: string = 'Agregar';
  certificatesList: Certificates[] = [];
  myCertificate: Certificates = { title: '', year: 0 };

  constructor(public certificatesService: CertificatesService) {
    this.certificatesService.getCertificates().snapshotChanges().pipe(
      map((changes: any) =>  // Especificamos el tipo de `changes`
        changes.map((c: any) => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      this.certificatesList = data;
    });
  }

  // Método para agregar o actualizar un certificado
  AgregarCertificate() {
    if (this.myCertificate.id) {
      this.certificatesService.updateCertificate(this.myCertificate).then(() => {
        console.log('Updated certificate successfully!');
        this.resetForm();
      });
    } else {
      this.certificatesService.createCertificate(this.myCertificate).then(() => {
        console.log('Created new certificate successfully!');
        this.resetForm();
      });
    }
  }

  // Función para confirmar la eliminación
  confirmDelete(id?: string) {
    if (confirm("¿Estás seguro de que quieres eliminar este certificado?")) {
      this.deleteCertificate(id); // Llamar al método de eliminación si el usuario confirma
    }
  }

  // Método para eliminar el certificado
  deleteCertificate(id?: string) {
    if (id) {
      this.certificatesService.deleteCertificate(id).then(() => {
        console.log('Deleted certificate successfully!');
      }).catch(error => {
        console.log('Error deleting certificate:', error);
      });
    }
  }

  // Función para confirmar la edición
  confirmEdit(item: Certificates) {
    if (confirm("¿Estás seguro de que quieres editar este certificado?")) {
      this.editarCertificate(item); // Llamar al método de edición si el usuario confirma
    }
  }

  // Método para editar el certificado
  editarCertificate(item: Certificates) {
    this.myCertificate = { ...item };
    this.btntxt = 'Actualizar'; // Cambiar el texto del botón
  }

  // Método para resetear el formulario
  resetForm() {
    this.myCertificate = { title: '', year: 0 };
    this.btntxt = 'Agregar'; // Restaurar el texto del botón
  }
}
