import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Tarefa } from '../../interface/tarefa';

@Component({
  selector: 'app-dialog-card',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, CommonModule, MatDialogClose, MatDialogActions, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './dialog-card.component.html',
  styleUrl: './dialog-card.component.scss'
})
export class DialogCardComponent implements OnInit {

  @Output() notaCriada = new EventEmitter<Tarefa>();

  tarefas: Tarefa[] = [];
  text: string = '';


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

  }

  criarNota() {
    const novaTarefa: Tarefa = {
      nome: this.text,
      color: this.data.cor,
      dropPoint: 0
    }

    this.notaCriada.emit(novaTarefa)
  }

  autoAjuste(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Reseta o height para auto
    textarea.style.height = `${textarea.scrollHeight}px`; // Ajusta o height para o scrollHeight
  }
}
