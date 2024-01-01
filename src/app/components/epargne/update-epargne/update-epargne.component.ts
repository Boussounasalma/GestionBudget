import { Component } from '@angular/core';
import { Epargne } from '../../../modules/epargne.model';
import { Objectif } from '../../../modules/objectif.model';
import { EpargneService } from '../../../services/epargne.service';
import { ObjectifService } from '../../../services/objectif.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Compte } from '../../../modules/compte.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { CompteService } from '../../../services/compte.service';

@Component({
  selector: 'app-update-epargne',
  templateUrl: './update-epargne.component.html',
  styleUrl: './update-epargne.component.scss',
})
export class UpdateEpargneComponent {
  epargneForm: FormGroup = this.formBuilder.group({
    id: [''],
    date: ['', Validators.required],
    montant: ['', Validators.required],
    compte: [null, Validators.required],
    objectif: [null, Validators.required],
  });

  comptes: Compte[] = [];
  objectifs: Objectif[] = [];
  datepickerConfig: Partial<BsDatepickerConfig>;

  constructor(
    private formBuilder: FormBuilder,
    private compteService: CompteService,
    private objectifService: ObjectifService,
    private epargneService: EpargneService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.datepickerConfig = Object.assign(
      {},
      {
        containerClass: 'theme-dark-blue',
        dateInputFormat: 'YYYY-MM-DD',
      }
    );
  }

  ngOnInit() {
    this.loadUserObjectifs();
    this.loadUserAccounts();
    const epargneId = this.route.snapshot.params['id'];
    if (epargneId) {
      this.loadEpargneDetails(epargneId);
    }
  }

  private getUserIdFromLocalStorage(): number {
    const userString = sessionStorage.getItem('auth-user');
    let user;
    if (userString) {
      user = JSON.parse(userString);
    }
    return parseInt(user.id, 10);
  }

  loadUserObjectifs() {
    const userId = this.getUserIdFromLocalStorage();

    this.objectifService.getObjectifsByUser(userId).subscribe((objectifs) => {
      this.objectifs = objectifs;
    });
    console.log(this.objectifs);
  }

  loadUserAccounts() {
    const userId = this.getUserIdFromLocalStorage();

    if (!isNaN(userId)) {
      this.compteService.getComptesByUserId(userId).subscribe((comptes) => {
        this.comptes = comptes;
      });
    } else {
      console.error('User ID not available or not logged in');
    }
  }

  loadEpargneDetails(epargneId: number) {
    this.epargneService.getEpargneById(epargneId).subscribe(
      (epargne) => {
        this.epargneForm.patchValue({
          id: epargne.id,
          date: epargne.date,
          montant: epargne.montant,
          compte: epargne.compte,
          objectif: epargne.objectif,
        });
      },
      (error) => {
        console.error('Error loading epargne details:', error);
      }
    );
  }

  onSubmit() {
    if (this.epargneForm.valid) {
      const newEpargne: Epargne = {
        id: this.epargneForm.value.id,
        date: this.epargneForm.value.date,
        montant: this.epargneForm.value.montant,
        compte: this.epargneForm.value.compte,
        objectif: this.epargneForm.value.objectif,
      };
      console.log(newEpargne);

      this.epargneService.updateEpargne(newEpargne).subscribe(
        (addedEpargne) => {
          console.log('Epargne added successfully:', addedEpargne);
          this.router.navigate(['/epargne']);
        },
        (error) => {
          console.error('Error adding epargne:', error);
        }
      );
    }
  }
}
