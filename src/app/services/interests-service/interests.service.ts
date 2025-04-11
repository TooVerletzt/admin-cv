import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Interests } from '../../models/interests/interests.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterestsService {

  private interestsRef = this.firestore.collection<Interests>('interests'); // Referencia a la colección

  constructor(private firestore: AngularFirestore) { }

  // Obtener los intereses
  getInterests(): Observable<Interests[]> {
    return this.interestsRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Interests;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  // Crear un nuevo interés
  createInterest(interest: Interests) {
    return this.interestsRef.add({ ...interest });
  }

  // Actualizar un interés
  updateInterest(interest: Interests) {
    return this.interestsRef.doc(interest.id).update({ ...interest });
  }

  // Eliminar un interés
  deleteInterest(id: string) {
    return this.interestsRef.doc(id).delete();
  }
}
