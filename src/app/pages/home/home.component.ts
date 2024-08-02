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
    CdkDrag,
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
  selected: Tarefa[] = [];
  isSelected: boolean = false;


  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getTarefas()
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tarefas, event.previousIndex, event.currentIndex);
  }

  apenas() {
    console.log('opa')
  }

  getTarefas() {
    const itens = localStorage.getItem('lista')

    if (itens) {
      this.tarefas = JSON.parse(itens)
      console.log('itens', this.tarefas)
    }

  }

  selectItem(item: Tarefa) {
    const index = this.selected.indexOf(item)

    if (index === -1) {
      this.selected.push(item)
      this.isSelected = true;

    } else {
      this.selected.splice(index, 1)
      this.isSelected = false;
    }

    console.log('Itens selecionados: ', this.selected)
  }

  openColorDialog(color: string) {
    const dialogRef = this.dialog.open(DialogCardComponent, {
      width: '500px',
      data: {
        cor: color
      }
    })


    dialogRef.componentInstance.notaCriada.subscribe((novaTarefa: Tarefa) =>  {
      this.tarefas.unshift(novaTarefa)
      localStorage.setItem('lista', JSON.stringify(this.tarefas));
    })
  }


  addCor1() {
   this.openColorDialog("#FFC972")
  }

  addCor2() {
    this.openColorDialog("#FF9B73")
  }
  addCor3() {

    this.openColorDialog("#AE96FC")
  }
  addCor4() {

    this.openColorDialog("#01D4FF")
  }
  addCor5() {
    this.openColorDialog("#E4EE90")
  }
  addCor6() {
    this.openColorDialog("#5AB0FF")
  }
  addCor7() {
    this.openColorDialog("#98FC96")
  }

  remItem(): void {
    this.tarefas = this.tarefas.filter(item => !this.selected.includes(item))
    this.selected = []
    localStorage.setItem('lista', JSON.stringify(this.tarefas))
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
