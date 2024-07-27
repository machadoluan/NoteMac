import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, CdkDragEnd, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    FormsModule,
    DragDropModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  @ViewChild('areaInform') areaInform!: ElementRef


  tarefas: { nome: string, concluida: boolean }[] = [];
  inputValue: string = '';
  itemConcluido: boolean = false;
  originalPositions: { [key: number]: { top: string, left: string } } = {};


  constructor() { }

  ngOnInit(): void {
    this.getTarefas()
  }

  onDragEnded(event: CdkDragEnd, index: number): void {
    const cardElement = event.source.element.nativeElement;

    // Salvar a posição original se não estiver salva
    if (!this.originalPositions[index]) {
      this.originalPositions[index] = {
        top: cardElement.style.top,
        left: cardElement.style.left
      };
    }

    // Resetar a posição do card para sua posição original
    cardElement.style.transform = 'none';
    cardElement.style.top = this.originalPositions[index].top;
    cardElement.style.left = this.originalPositions[index].left;

    event.source.reset();
  }

  getTarefas() {
    const itens = localStorage.getItem('lista')

    if (itens) {
      this.tarefas = JSON.parse(itens)
      console.log('itens', this.tarefas)
    }

  }


  addList() {
    if (this.inputValue.trim()) {
      this.tarefas.unshift({ nome: this.inputValue.trim(), concluida: false });
      this.inputValue = ''; // Limpa o campo de entrada
      localStorage.setItem('lista', JSON.stringify(this.tarefas))

      console.log('itens', this.tarefas)

    }
  }

  remItem(index: number): void {
    if (index > -1) {
      this.tarefas.splice(index, 1); // Remove a tarefa do array
      localStorage.setItem('lista', JSON.stringify(this.tarefas)); // Atualiza o localStorage
      // this.getTarefas()
    }
  }

  remAllItens() {
    this.tarefas = []
    localStorage.removeItem('lista')
  }

  editItem() {
    this.areaInform.nativeElement.disabled = false
  }

  concluir(index: number) {
    this.tarefas[index].concluida = !this.tarefas[index].concluida;
    localStorage.setItem('lista', JSON.stringify(this.tarefas));
  }

}
