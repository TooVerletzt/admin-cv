import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Certificates } from '../../models/certificates/certificates.model';

@Injectable({
  providedIn: 'root'
})
export class CertificatesService {
  private dbPath = '/certificates';
  certificatesRef: AngularFirestoreCollection<Certificates>;

  constructor(private db: AngularFirestore) {
    this.certificatesRef = db.collection(this.dbPath);
  }

  // Obtener todos los certificados de la base de datos
  getCertificates() {
    return this.certificatesRef;
  }

  // Crear un nuevo certificado
  createCertificate(cert: Certificates) {
    return this.certificatesRef.add({ ...cert });
  }

  // Eliminar un certificado
  deleteCertificate(id?: string) {
    return this.certificatesRef.doc(id).delete();
  }

  // Actualizar un certificado existente
  updateCertificate(cert: Certificates) {
    return this.certificatesRef.doc(cert.id).update({
      title: cert.title,
      year: cert.year
    });
  }
}
