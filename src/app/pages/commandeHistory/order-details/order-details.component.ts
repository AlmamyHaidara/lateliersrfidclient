import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CommandeService } from '../../../services/commande.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  standalone: true,
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {
  @Input() order: any; // On suppose que les détails de la commande sont passés via @Input()

  constructor(private orderService: CommandeService) {}
}
