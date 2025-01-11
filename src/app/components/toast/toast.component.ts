import { Component, Input } from '@angular/core';
import {CommonModule} from "@angular/common";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  constructor(private toastr: ToastrService) {}

  showSuccess(message: string, title: string): void {
    this.toastr.success(message, title);
  }

  showError(message: string, title: string): void {
    this.toastr.error(message, title);
  }
}
