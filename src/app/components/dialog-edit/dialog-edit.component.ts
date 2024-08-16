import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Tarefa } from '../../interface/tarefa';

@Component({
  selector: 'app-dialog-edit',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    CommonModule,
    MatDialogClose,
    MatDialogActions,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './dialog-edit.component.html',
  styleUrl: './dialog-edit.component.scss'
})
export class DialogEditComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  @Output() notaCriada = new EventEmitter<Tarefa>();

  text: string = this.data.nome;

  editar() {
    if (this.text === '') {
      alert('Você precisa digitar algo primeiro.')
    } else {
      const novaTarefa: Tarefa = {
        nome: this.text,
        color: this.data.cor,
        dropPoint: 0,
        favorites: false
      }
      this.notaCriada.emit(novaTarefa)
    }

  }



  autoAjuste(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Reseta o height para auto
    textarea.style.height = `${textarea.scrollHeight}px`; // Ajusta o height para o scrollHeight
  }

}
