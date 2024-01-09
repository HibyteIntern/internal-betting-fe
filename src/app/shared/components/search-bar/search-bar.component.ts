import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Output() valueChange = new EventEmitter<string>();
  @Output() onEnterPressed = new EventEmitter<string>()
  value = ''
}
