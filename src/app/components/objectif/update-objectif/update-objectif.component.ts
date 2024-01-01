import { Component } from '@angular/core';
import { Objectif } from '../../../modules/objectif.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectifService } from '../../../services/objectif.service';

@Component({
  selector: 'app-update-objectif',
  templateUrl: './update-objectif.component.html',
  styleUrl: './update-objectif.component.scss',
})
export class UpdateObjectifComponent {
  objectiveId!: number;
  newObjective!: Objectif;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private objectifService: ObjectifService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.objectiveId = +params['id'];
      this.objectifService.getObjectifById(this.objectiveId).subscribe(
        (data) => {
          this.newObjective = data;
        },
        (error) => {
          console.error('Error fetching objective:', error);
        }
      );
    });
  }

  onSubmit(): void {
    this.objectifService.updateObjectif(this.newObjective).subscribe(
      (data) => {
        console.log('Objective updated successfully:', data);
        this.router.navigate(['/objectif']);
      },
      (error) => {
        console.error('Error updating objective:', error);
      }
    );
  }
}
