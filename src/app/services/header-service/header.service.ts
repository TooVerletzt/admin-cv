import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Header } from '../../models/header/header.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private headersRef: AngularFirestoreCollection<Header>;

  constructor(private firestore: AngularFirestore) {
    this.headersRef = this.firestore.collection<Header>('header');
  }

  getHeaders(): Observable<Header[]> {
    return this.headersRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Header;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  createHeader(header: Header) {
    return this.headersRef.add({ ...header });
  }

  updateHeader(header: Header) {
    return this.headersRef.doc(header.id).update({ ...header });
  }

  deleteHeader(id: string) {
    return this.headersRef.doc(id).delete();
  }
}