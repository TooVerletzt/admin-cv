import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Education } from '../../models/education/education.model';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private dbPath = '/education';
  educationRef: AngularFirestoreCollection<Education>;

  constructor(private db: AngularFirestore) {
    this.educationRef = db.collection(this.dbPath);
  }

  // Obtener todas las educaciones
  getEducation() {
    return this.educationRef;
  }

  // Crear una nueva educación
  createEducation(education: Education): any {
    return this.educationRef.add({ ...education });
  }

  // Eliminar una educación
  deleteEducation(id: string): Promise<void> {
    return this.educationRef.doc(id).delete();
  }

  // Actualizar una educación existente
  updateEducation(education: Education): Promise<void> {
    return this.educationRef.doc(education.id).update({
      degree: education.degree,
      institution: education.institution,
      startDate: education.startDate,
      endDate: education.endDate
    });
  }
}
