import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-lexico',
  templateUrl: './lexico.component.html',
  styles: [],
})
export class LexicoComponent implements OnInit {
  public termino: string;
  public cadena: string;
  public historial: string[];
  public inputChar: string;
  public expresionRegular: string;

  private estadoActual: string;
  private estadosAceptacion: string[];
  private error: boolean;
  private tablaTransicion = [
    { col: 'A', row: '0', val: 'B' },
    { col: 'A', row: '1', val: 'C' },

    { col: 'B', row: '0', val: 'D' },
    { col: 'B', row: '1', val: 'C' },

    { col: 'C', row: '0', val: 'D' },
    { col: 'C', row: '1', val: 'C' },

    { col: 'D', row: '0', val: 'D' },
    { col: 'D', row: '1', val: 'E' },

    { col: 'E', row: '0', val: 'D' },
    { col: 'E', row: '1', val: 'C' },
  ];

  private alfabeto: string[];

  constructor() {
    this.expresionRegular = '( 0 | ( 0* 1)* ) 1';
    this.inicializar();
  }

  inicializar() {
    this.inputChar = '';
    this.cadena = '';
    this.termino = '';
    this.estadoActual = 'A';
    this.estadosAceptacion = ['C'];
    this.alfabeto = ['0', '1'];
    this.error = false;
    this.historial = new Array();
  }

  analizarCaracter(termino: string) {
    if (termino.length > 0) {
      termino = termino.toLowerCase();
      let tmpHistorial = 'd(' + this.estadoActual + ',' + termino + ')=';

      this.cadena += termino;
      if (this.error) {
      } else {
        let tmp = this.tablaTransicion.filter((val) => {
          if (this.estadoActual === val.col && termino === val.row) {
            return true;
          }
        });

        if (tmp.length > 0) {
          this.estadoActual = tmp[0].val;
          tmpHistorial += this.estadoActual;
          if (this.estadosAceptacion.indexOf(this.estadoActual) >= 0) {
            tmpHistorial += ' - Aceptación';
          }
        } else {
          this.error = true;
          if (this.alfabeto.indexOf(termino) >= 0) {
            tmpHistorial += ' No hay transición con ' + termino;
          } else {
            tmpHistorial += ' No existe ' + termino + ' en el alfabeto. ';
          }
        }

        this.historial.push(tmpHistorial);
        console.log(tmp);
        console.log(this.estadoActual);
        tmp = null;
      }
    }
    this.inputChar = '';
  }

  ngOnInit(): void {}
}
