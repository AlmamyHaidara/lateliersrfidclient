import {Component, OnInit} from '@angular/core';
import { NzContentComponent, NzLayoutComponent } from "ng-zorro-antd/layout";
import { NzPaginationComponent } from "ng-zorro-antd/pagination";
import {Router, RouterLink} from "@angular/router";
import Swal from 'sweetalert2';
import {ScanTagsProcessedService} from "../../services/scan-tags-processed.service";
import {AssociationArtTagService} from "../../services/association-art-tag.service";
import {ZoneService} from "../../services/zone.service";
import {TagInfoService} from "../../services/tag-info.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {
  ColComponent,
  ProgressBarComponent,
  ProgressComponent,
  RowComponent,
  WidgetStatCComponent
} from "@coreui/angular";

@Component({
  selector: 'app-association',
  standalone: true,
  imports: [
    NzContentComponent,
    NzLayoutComponent,
    NzPaginationComponent,
    RouterLink,
    NgForOf,
    NgIf,
    ColComponent,
    WidgetStatCComponent,
    RowComponent,
    ProgressBarComponent,
    ProgressComponent,
    NgClass
  ],
  templateUrl: './association.component.html',
  styleUrl: './association.component.css'
})
export class AssociationComponent implements OnInit {
  showTag: boolean = false;

  idArticle: number = 0;
  maxId: number = 0;
  stpTagIds: any[] = [];
  collectionName: string = '';
  colorName: string = '';
  dimension: string = '';
  scanningInProgress: boolean = false;
  tagReferences: string[] = [];
  scannerClicked: boolean = false;





  constructor(
    private scanService: ScanTagsProcessedService,
    private associationService: AssociationArtTagService,
    private tagInfoService: TagInfoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.collectionName = localStorage.getItem('selectedCollectionName') || '';
    this.colorName = localStorage.getItem('selectedColorName') || '';
    this.dimension = localStorage.getItem('selectedDimension') || '';
    const selectedArtId = localStorage.getItem('selectedArtId');
    if (selectedArtId) {
      this.idArticle = +selectedArtId;
    } else {
      console.log('No selected article ID found');
    }
    this.getMaxId();

  }
  getMaxId(): void {
    this.scanService.getMaxScanProcessedId().subscribe(
      (maxId) => {
        this.maxId = maxId;
      },
      (error) => {
        console.error('Erreur lors de la récupération du maxId :', error);
        Swal.fire('Erreur', 'Une erreur est survenue lors de la récupération du maxId.', 'error');
      }
    );
  }
  onClickAssocier(): void {
    // Vérifier si des tags ont été scannés
    if (this.stpTagIds.length === 0) {
      Swal.fire('Aucun tag scanné', 'Veuillez d\'abord scanner des tags.', 'warning');
      return;
    }

    // Associer les tags aux articles
    this.stpTagIds.forEach(tagId => {
      const associationArticleTag = { Tta_Art_Id: this.idArticle, Tta_Tag_Id: tagId };
      this.associationService.createAssociationArticleTag(associationArticleTag).subscribe(
        () => {
          console.log('Nouveau tag ajouté avec succès');

          // Mettre à jour le statut du tag
          this.tagInfoService.getTagInfoById(tagId).subscribe(
            (tagInfo) => {
              tagInfo.tag_associer = true;
              this.tagInfoService.updateTagInfo(tagId, tagInfo).subscribe(
                () => {
                  console.log('TagInfo mis à jour avec succès');
                },
                (error) => {
                  console.error('Erreur lors de la mise à jour de TagInfo :', error);
                  Swal.fire('Erreur', 'Une erreur est survenue lors de la mise à jour de TagInfo.', 'error');
                }
              );
            },
            (error) => {
              console.error('Erreur lors de la récupération de TagInfo :', error);
              Swal.fire('Erreur', 'Une erreur est survenue lors de la récupération de TagInfo.', 'error');
            }
          );
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du tag :', error);
          Swal.fire('Erreur', 'Une erreur est survenue lors de l\'ajout du tag.', 'error');
        }
      );
    });
    this.getMaxId();

    Swal.fire('Succès', 'Association réussie !', 'success');
  }

  onClickScanner(): void {
    this.scannerClicked = true;

    Swal.fire({
      title: 'Veuillez scanner le tag',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Scan effectué',
      cancelButtonText: 'Annuler',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        // Mise à jour du statut du scan en cours
        this.scanningInProgress = true;

        // Appeler le service pour simuler le scan
        this.scanService.simulateScan().subscribe(
          () => {
            // Appeler le service pour récupérer les nouveaux scans
            this.scanService.getNewScansProcessedByIdZone(this.maxId, 15, this.idArticle).subscribe(
              (scans) => {
                // Mettre à jour la liste des tags scannés
                this.stpTagIds = scans.map(scan => scan.tta_Tag_Id);

                console.log('Stp_Tag_Id :', this.stpTagIds);

                // Mettre à jour le statut du scan
                this.scanningInProgress = false; // Réinitialisation de la variable

                // Afficher un message de réussite
                Swal.fire('Scan effectué', '', 'success');

                // Récupérer les informations de chaque tag scanné
                this.stpTagIds.forEach(tagId => {
                  this.tagInfoService.getTagInfoById(tagId).subscribe(
                    (tagInfo) => {
                      console.log('TagInfo pour le tag', tagId, ':', tagInfo);
                      this.tagReferences.push(tagInfo.tag_Reference); // Ajouter la référence du tag à la liste
                    },
                    (error) => {
                      console.error('Erreur lors de la récupération de TagInfo pour le tag', tagId, ':', error);
                      Swal.fire('Erreur', 'Une erreur est survenue lors de la récupération de TagInfo.', 'error');
                    }
                  );
                });

              },
              (error) => {
                console.error('Erreur lors de la récupération des scans :', error);
                Swal.fire('Erreur', 'Une erreur est survenue lors de la récupération des scans.', 'error');

                // Mettre à jour le statut du scan
                this.scanningInProgress = false; // Réinitialisation de la variable
              }
            );
          },
          (error) => {
            console.error('Erreur lors de la simulation du scan :', error);
            Swal.fire('Erreur', 'Une erreur est survenue lors de la simulation du scan.', 'error');

            // Mettre à jour le statut du scan
            this.scanningInProgress = false; // Réinitialisation de la variable
          }
        );
      } else {
        console.log("L'utilisateur a annulé le scan");
      }
      this.showTag = true;
    });
  }

  goBack(): void {
    const collectionId = localStorage.getItem('selectedCollectionId');
    const gammeId = localStorage.getItem('selectedGammeId');

    if (collectionId && gammeId) {
      this.router.navigateByUrl(`/list-dim/${collectionId}/${gammeId}`);
    } else {
      console.error('collectionId or gammeId is missing');
    }
  }
}
