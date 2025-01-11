import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  getMessages() {
    return {
      taskAdded: 'Tâche ajoutée avec succès !',
      taskUpdated: 'Tâche modifiée avec succès !',
      taskDeleted: 'Tâche supprimée avec succès !',
    };
  }
}
