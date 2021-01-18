import { Component } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { VERSION } from '@angular/material';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  version: any;
  separatorKeysCodes = [ENTER, COMMA];
  availableColors = [
    { id: 3, name: 'yelow', color: 'accent', selected: true },
    { id: 4, name: 'Green', color: 'warn', selected: true }
  ];
  colors = [
    { id: 1, name: 'Red', color: '', selected: false },
    { id: 2, name: 'Blue', color: 'primary', selected: true }
  ]

  constructor() {
    this.version = VERSION;
  }

  add(event: any): void {
    if (event) {
      let newChip: any;
      if (event.option) {
        newChip = event.option.value;
      }
      //Add our color
      if (event.value) {
        this.availableColors.forEach((c, i) => {
          if (c.name.toLowerCase() === event.value.toLowerCase()) {
            newChip = c;
          }
          // If empty reset the input value
          if (event.input) {
            event.input.value = '';
          }
        });
      }
      if (newChip) {
        this.colors.push(newChip);
        this.availableColors.forEach((c, i) => {
          if (c.id === newChip.id) {
            this.availableColors.splice(i, 1);
          }
        });
      }
    }
  }
  //Allows for programmatic removal of the chip. Called by the MatChipList when the DELETE or BACKSPACE keys are pressed.

  remove(chip: any): void {
    this.colors.forEach((c, i) => {
      if (c.id === chip.id) {
        this.colors.splice(i,1);
      }
    });
    this.availableColors.push(chip);
  }
}
