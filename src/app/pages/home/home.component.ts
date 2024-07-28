import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDrag, CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { DialogCardComponent } from '../../components/dialog-card/dialog-card.component';
import { Tarefa } from '../../interface/tarefa';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    FormsModule,
    DragDropModule,
    CdkDropList,
    CdkDrag
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  @ViewChild('areaInform') areaInform!: ElementRef


  tarefas: Tarefa[] = [];
  itemConcluido: boolean = false;
  cores: boolean = false;
  dropPoint: { x: number, y: number }[] = [];

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getTarefas()
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tarefas, event.previousIndex, event.currentIndex);
  }

  getTarefas() {
    const itens = localStorage.getItem('lista')

    if (itens) {
      this.tarefas = JSON.parse(itens)
      console.log('itens', this.tarefas)
    }

  }


  addCor1() {
    const novaTarefa: Tarefa = {
      nome: 'Essa é a cor 1',
      color: '#FFC972',
      dropPoint: 0
    }

    this.tarefas.unshift(novaTarefa);
    localStorage.setItem('lista', JSON.stringify(this.tarefas))

    console.log('itens', this.tarefas)
  }

  addCor2() {
    const novaTarefa: Tarefa = {
      nome: 'Essa é a cor 2',
      color: '#FF9B73',
      dropPoint: 0
    }

    this.tarefas.unshift(novaTarefa);
    localStorage.setItem('lista', JSON.stringify(this.tarefas))

    console.log('itens', this.tarefas)
  }
  addCor3() {
    const novaTarefa: Tarefa = {
      nome: 'Essa é a cor 3',
      color: '#AE96FC',
      dropPoint: 0
    }

    this.tarefas.unshift(novaTarefa);
    localStorage.setItem('lista', JSON.stringify(this.tarefas))

    console.log('itens', this.tarefas)
  }
  addCor4() {
    const novaTarefa: Tarefa = {
      nome: 'Essa é a cor 4',
      color: '#01D4FF',
      dropPoint: 0
    }

    this.tarefas.unshift(novaTarefa);
    localStorage.setItem('lista', JSON.stringify(this.tarefas))

    console.log('itens', this.tarefas)
  }
  addCor5() {
    const novaTarefa: Tarefa = {
      nome: 'Essa é a cor 5',
      color: '#E4EE90',
      dropPoint: 0
    }

    this.tarefas.unshift(novaTarefa);
    localStorage.setItem('lista', JSON.stringify(this.tarefas))

    console.log('itens', this.tarefas)
  }
  addCor6() {
    const novaTarefa: Tarefa = {
      nome: 'Essa é a cor 6',
      color: '#5AB0FF',
      dropPoint: 0
    }

    this.tarefas.unshift(novaTarefa);
    localStorage.setItem('lista', JSON.stringify(this.tarefas))

    console.log('itens', this.tarefas)
  }
  addCor7() {
    const novaTarefa: Tarefa = {
      nome: 'Essa é a cor 7',
      color: '#98FC96',
      dropPoint: 0
    }

    this.tarefas.unshift(novaTarefa);
    localStorage.setItem('lista', JSON.stringify(this.tarefas))

    console.log('itens', this.tarefas)
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

  openColor() {
    this.cores = !this.cores
  }

  openItem() {
    this.dialog.open(DialogCardComponent)
  }

}
