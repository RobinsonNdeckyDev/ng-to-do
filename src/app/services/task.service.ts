import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly storageKey = 'tasks';

  constructor() {}

  // Récupérer toutes les tâches
  getTasks(): string[] {
    const tasks = localStorage.getItem(this.storageKey);
    if (!tasks) {
      // Si la clé n'existe pas, on la crée avec un tableau vide
      localStorage.setItem(this.storageKey, JSON.stringify([]));
      return [];
    }
    return JSON.parse(tasks);
  }

  // Ajouter une tâche
  addTask(task: string): void {
    const tasks = this.getTasks();
    tasks.push(task);
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  // Mettre à jour une tâche
  updateTask(index: number, newTask: string): void {
    const tasks = this.getTasks();
    if (index >= 0 && index < tasks.length) {
      tasks[index] = newTask;
      localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    }
  }

  // Supprimer une tâche
  deleteTask(index: number): void {
    const tasks = this.getTasks();
    if (index >= 0 && index < tasks.length) {
      tasks.splice(index, 1);
      localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    }
  }
}
