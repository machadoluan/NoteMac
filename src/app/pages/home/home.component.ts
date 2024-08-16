import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDrag, CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { DialogCardComponent } from '../../components/dialog-card/dialog-card.component';
import { Tarefa } from '../../interface/tarefa';
import { DialogLoginComponent } from '../../components/dialog-login/dialog-login.component';
import { DialogEditComponent } from '../../components/dialog-edit/dialog-edit.component';

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
  itensFavorites: any


  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getTarefas()

    this.itensFavorites = this.tarefas.filter(fav => fav.favorites)

    console.log(this.itensFavorites)

  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tarefas, event.previousIndex, event.currentIndex);

    this.tarefas.forEach((tarefa, index) => {
      tarefa.dropPoint = index;
    });
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


    dialogRef.componentInstance.notaCriada.subscribe((novaTarefa: Tarefa) => {
      this.tarefas.unshift(novaTarefa)
      localStorage.setItem('lista', JSON.stringify(this.tarefas));
    })
  }


  addCor1() {
    this.openColorDialog("#FF8D8D")
  }

  addCor2() {
    this.openColorDialog("#FFBE8E")
  }
  addCor3() {

    this.openColorDialog("#FFFA8C")
  }
  addCor4() {

    this.openColorDialog("#A3FF8C")
  }
  addCor5() {
    this.openColorDialog("#8EFFF1")
  }
  addCor6() {
    this.openColorDialog("#FF95E8")
  }
  addCor7() {
    this.openColorDialog("#85AEFF")
  }
  addCor8() {
    this.openColorDialog("#C08FFF")
  }
  addCor9() {
    this.openColorDialog("#FFFFFF")
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

  editItem(item: Tarefa) {
    this.dialog.open(DialogEditComponent, {
      width: '500px',
      data: {
        nome: item.nome,
        cor: item.color
      }
    })

    console.log('Item a ser editado', item)
  }

  openColor() {
    this.cores = !this.cores
  }

  favorites(item: Tarefa) {
    item.favorites = true
    console.log(item)
    localStorage.setItem('lista', JSON.stringify(this.tarefas));

  }

  openItem() {
    this.dialog.open(DialogCardComponent)
  }

}
