import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Languages } from '../../models/languages/languages.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  private languagesCollection: AngularFirestoreCollection<Languages>;

  constructor(private firestore: AngularFirestore) {
    this.languagesCollection = this.firestore.collection<Languages>('languages');
  }

  getLanguages(): Observable<Languages[]> {
    return this.languagesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Languages;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  createLanguage(language: Languages) {
    return this.languagesCollection.add({ ...language });
  }

  updateLanguage(language: Languages) {
    return this.languagesCollection.doc(language.id).update({ ...language });
  }

  deleteLanguage(id: string) {
    return this.languagesCollection.doc(id).delete();
  }
}
