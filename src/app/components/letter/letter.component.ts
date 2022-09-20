import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LetterColor } from 'src/app/models/Board';

const Animations = [
  trigger('flip', [
    state('true', style({
      backgroundColor: '{{color}}',
      border: 'none'
    }), {params: {color: ''}}),
    transition('* => true', [
      animate('0.5s {{delay}}s', keyframes([
        style({ backgroundColor: 'transparent', border: '4px solid #FFF', boxSizing: 'border-box', transform: 'perspective(200px) rotateY(0deg)', offset: 0}),
        style({ backgroundColor: 'transparent', border: '4px solid #FFF', boxSizing: 'border-box', transform: 'perspective(200px) rotateY(90deg)', offset: 0.49999}),
        style({ backgroundColor: '{{color}}', border: 'none', transform: 'perspective(200px) rotateY(-90deg)', offset: 0.5}),
        style({ backgroundColor: '{{color}}', border: 'none', boxSizing: 'border-box', offset: 0.50001}),
        style({ backgroundColor: '{{color}}', border: 'none', boxSizing: 'border-box', transform: 'perspective(200px) rotateY(0deg)', offset: 1}),
      ])),
    ]),
  ])
]

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss'],
  animations: Animations
})
export class LetterComponent implements OnInit {
  @Input()
  isKeyboardKey!: boolean;

  @Input()
  isEnter!: boolean;

  @Input()
  index!: number;

  @Input()
  value!: string;
  
  @Input()
  active: boolean = false;

  @Input()
  disabled!: boolean;

  @Output()
  onClickEvent = new EventEmitter<number>();

  @Input()
  color!: LetterColor;

  @Input()
  flipped?: boolean;

  @Input()
  animationDisabled?: boolean;


  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    if(!this.disabled)
      this.onClickEvent.emit(this.index);
  }
}
