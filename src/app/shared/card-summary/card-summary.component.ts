import { Component, OnInit, Input } from '@angular/core';
import { CardModel } from 'src/app/models/card-model';

@Component({
  selector: 'app-card-summary',
  templateUrl: './card-summary.component.html',
  styleUrls: ['./card-summary.component.scss']
})
export class CardSummaryComponent implements OnInit {

  @Input() cardObject: CardModel;


  constructor() { }

  ngOnInit(): void {
  }

}
