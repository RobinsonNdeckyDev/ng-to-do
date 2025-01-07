import { Routes } from '@angular/router';
import {TaskListComponent} from "./task-list/task-list.component";
import {AboutComponent} from "./about/about.component";

export const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'about', component: AboutComponent }
];
