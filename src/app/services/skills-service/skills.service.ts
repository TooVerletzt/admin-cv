import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Skills } from '../../models/skills/skills.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  private skillsRef = this.firestore.collection<Skills>('skills');

  constructor(private firestore: AngularFirestore) {}

  getSkills(): Observable<Skills[]> {
    return this.skillsRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Skills;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  createSkill(skill: Skills) {
    return this.skillsRef.add({ ...skill });
  }

  updateSkill(skill: Skills) {
    return this.skillsRef.doc(skill.id).update({ ...skill });
  }

  deleteSkill(id: string) {
    return this.skillsRef.doc(id).delete();
  }
}