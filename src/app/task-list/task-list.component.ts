import { Component } from '@angular/core';
import {TaskService} from "../services/task.service";
import {FormGroup, FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {LoaderComponent} from "../components/loader/loader.component";
import {MessageService} from "../services/message.service";
import { ToastService } from '../services/toast.service'; // Importer ToastService

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    LoaderComponent,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  taskForm: FormGroup;
  tasks : any = [];
  editIndex: number | null = null; // Pour gérer l'édition d'une tâche
  selectedTask: string | null = null; // Pour afficher les détails
  isLoading: boolean = false; // Pour afficher le loader


  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private messageService: MessageService, // Injecter MessageService
    private toastService: ToastService // Injecter ToastService
  ) {
    // Initialisation du formulaire
    this.taskForm = this.fb.group({
      taskName: ['', Validators.required], // Champ obligatoire
    });
  }

  ngOnInit() {
    this.loadTasks();
  }

  // Charger les tâches
  loadTasks(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.tasks = this.taskService.getTasks();
      console.log("Liste des taches", this.tasks);
      this.isLoading = false;
    }, 1000);
  }

  // Ajouter une tâche ou la modifier
  saveTask(): void {
    if (this.taskForm.valid) {
      this.isLoading = true;
      setTimeout(() => {
        const taskName = this.taskForm.value.taskName;
        if (this.editIndex === null) {
          this.taskService.addTask(taskName);
          this.toastService.showSuccess(
            this.messageService.getMessages().taskAdded,
            'Succès'
          );
        } else {
          this.taskService.updateTask(this.editIndex, taskName);
          this.editIndex = null;
          this.toastService.showSuccess(
            this.messageService.getMessages().taskUpdated,
            'Succès'
          );
        }
        this.tasks = this.taskService.getTasks();
        this.taskForm.reset();
        this.isLoading = false;
      }, 1000);
    }
  }

  // Démarrer l'édition d'une tâche
  startEdit(index: number): void {
    this.editIndex = index;
    this.taskForm.patchValue({
      taskName: this.tasks[index],
    });
  }

  // Annuler l'édition
  cancelEdit(): void {
    this.editIndex = null;
    this.taskForm.reset();
  }

  // Afficher les détails d'une tâche
  showDetails(task: string): void {
    this.selectedTask = task;
  }

  deleteTask(index: number): void {
    this.isLoading = true;
    setTimeout(() => {
      this.taskService.deleteTask(index);
      this.tasks = this.taskService.getTasks();
      this.isLoading = false;
      this.toastService.showSuccess(
        this.messageService.getMessages().taskDeleted,
        'Succès'
      );
    }, 1000);
  }
}
