import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Vérifiez si les clés existent dans le localStorage
    const empId = localStorage.getItem('emp_Id');
    const empSocId = localStorage.getItem('emp_Soc_Id');

    if (!empId || !empSocId) {
      this.router.navigate(['/not-found']);
    }
  }
}
