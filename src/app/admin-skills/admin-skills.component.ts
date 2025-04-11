import { Component } from '@angular/core';
import { SkillsService } from '../services/skills-service/skills.service';
import { Skills } from '../models/skills/skills.model';

@Component({
  selector: 'app-admin-skills',
  templateUrl: './admin-skills.component.html',
  styleUrls: ['./admin-skills.component.css']
})
export class AdminSkillsComponent {
  btntxt: string = "Agregar";
  skillsList: Skills[] = [];
  mySkills: Skills = new Skills();

  constructor(private skillsService: SkillsService) {
    this.skillsService.getSkills().subscribe((data: Skills[]) => {
      this.skillsList = data;
    });
  }

  // Método para agregar o actualizar una habilidad
  AgregarSkill() {
    if (this.mySkills.id) {
      this.skillsService.updateSkill(this.mySkills).then(() => {
        this.resetForm();
      });
    } else {
      this.skillsService.createSkill(this.mySkills).then(() => {
        this.resetForm();
      });
    }
  }

  // Función para confirmar la eliminación
  confirmDelete(id?: string) {
    if (confirm("¿Estás seguro de que quieres eliminar esta habilidad?")) {
      this.deleteSkill(id); // Llamar al método de eliminación si el usuario confirma
    }
  }

  // Método para eliminar una habilidad
  deleteSkill(id?: string) {
    if (id) {
      this.skillsService.deleteSkill(id).then(() => {
        console.log('Deleted skill successfully!');
      }).catch(error => {
        console.log('Error deleting skill:', error);
      });
    }
  }

  // Función para confirmar la edición
  confirmEdit(skill: Skills) {
    if (confirm("¿Estás seguro de que quieres editar esta habilidad?")) {
      this.editarSkill(skill); // Llamar al método de edición si el usuario confirma
    }
  }

  // Método para editar una habilidad
  editarSkill(skill: Skills) {
    this.mySkills = { ...skill };
    this.btntxt = "Actualizar"; // Cambiar el texto del botón
  }

  // Método para resetear el formulario
  resetForm() {
    this.mySkills = new Skills();
    this.btntxt = "Agregar"; // Restaurar el texto del botón
  }
}
