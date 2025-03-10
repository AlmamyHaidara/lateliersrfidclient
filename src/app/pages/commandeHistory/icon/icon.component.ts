import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  standalone: true,
  styleUrl: './icon.component.css'
})
export class IconComponent {
  @Input() iconSrc: string = '';
  @Input() iconText: string = '';
}
