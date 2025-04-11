import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { WorkExperience } from '../../models/work-experience/work-experience.model';

@Injectable({
  providedIn: 'root'
})
export class WorkExperienceService {
  private dbPath = '/work-experience';
  workExperienceRef: AngularFirestoreCollection<WorkExperience>;

  constructor(private db: AngularFirestore) {
    this.workExperienceRef = db.collection(this.dbPath);
  }

  // Obtener todos los trabajos de la base de datos
  getWorkExperience(): AngularFirestoreCollection<WorkExperience> {
    return this.workExperienceRef;
  }

  // Crear un nuevo trabajo
  createWorkExperience(myJob: WorkExperience): any {
    return this.workExperienceRef.add({ ...myJob });
  }

  // Eliminar un trabajo
  deleteWorkExperience(id?: string): Promise<void> {
    return this.workExperienceRef.doc(id).delete();
  }

  // Actualizar un trabajo existente
  updateWorkExperience(myJob: WorkExperience): Promise<void> {
    return this.workExperienceRef.doc(myJob.id).update({
      startDate: myJob.startDate,
      endDate: myJob.endDate,
      location: myJob.location,
      position: myJob.position,
      company: myJob.company,
      accomplishments: myJob.accomplishments
    });
  }
}
