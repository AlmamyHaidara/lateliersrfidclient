import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  
  private apiUrl = `${environment.apiUrl}/Commande`;


  private commandeArticlesSubject = new BehaviorSubject<any[]>([]);
  private totalHTSubject = new BehaviorSubject<number>(0);

  commandeArticles$ = this.commandeArticlesSubject.asObservable();
  totalHT$ = this.totalHTSubject.asObservable();

  constructor(private http: HttpClient) { }


  removeArticle(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/DeleteArticle/${id}`);

  }



  getCommandeByIdNormal(id: number): Observable<any> {
    console.log("Appel API pour obtenir la commande avec ID :", id);
    return this.http.get<any>(`${this.apiUrl}/ByIdCommandeNormal/${id}`);
  }

  updateCommandeNormal(id: number, commandeRequest: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/UpdateNormal/${id}`, commandeRequest);
  }

  //suppression articles d'une commande 
  supprimerArticle(commandeId: number, articleId: number) {
    return this.http.delete(`${this.apiUrl}/${commandeId}/article/${articleId}`);
  }
  

  getCommandes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCommande(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addCommande_cde(request: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, request);
  }

  updateCommande(id: number, commandeRequest: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, commandeRequest);
  }

  deleteCommande(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getCommandesByClientAndDay(clientId: number, date: Date): Observable<any[]> {
    const params = new HttpParams()
      .set('clientId', clientId.toString())
      .set('date', date.toISOString()); 
    return this.http.get<any[]>(`${this.apiUrl}/ByClientAndDay`, { params });
  }

    // Nouvelle méthode pour récupérer les 7 dernières commandes par client
    getLastSevenCommandesByClient(clientId: number): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/LastSevenByClient/${clientId}`);
    }


    getLastSevenBothWithArticlesByClient(clientId: number): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/LastSevenBothWithArticlesByClient/${clientId}`);
    }



    getLastSevenWithArticlesByClient(clientId: number): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/LastSevenWithArticlesByClient/${clientId}`);
    }


    getCommandesByMonthAndYear(clientId: number, month: number, year: number): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/ByMonthWithArticlesByClient/${clientId}/${month}/${year}`);
    }

    //recuperation du mois:
    CommandeGetByYearWithArticles(
      clientId: number,
      year: number,
      pageIndex: number
    ): Observable<{ commandes: any[]; totalCount: number }> {
      return this.http.get<{ commandes: any[]; totalCount: number }>(
        `${this.apiUrl}/CommandeGetByYearWithArticles/${clientId}/${year}/${pageIndex}`
      );
    }

    //getter tout les commandes par mois et année , table te_commandes_cde
    GetByMonthAndYearWithArticlesByClient(
      clientId: number,
      month: number,
      year: number,
      pageIndex: number
    ): Observable<{ commandes: any[]; totalCount: number; pageIndex: number; pageSize: number }> {
      return this.http.get<{ commandes: any[]; totalCount: number; pageIndex: number; pageSize: number }>(
        `${this.apiUrl}/GetByMonthAndYearWithArticlesByClient/${clientId}/${month}/${year}/${pageIndex}`
      );
    }
    

    getCommandeById(id: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/${id}`);
    }
    getCommandeArticles(id: number): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/${id}/articles`);
    } 


    getCurrentMonthWithArticlesByClient(clientId: number): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/Commande_GetCurrentMonthWithArticlesByClient/${clientId}`);
    }
    
    getAllWithArticlesByClient(clientId: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/Commande_GetAllWithArticlesByClient/${clientId}`);
    }
    



  updateCommandePortal(id: number, commandeRequest: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/UpdatePortal/${id}`, commandeRequest);
  }

  updateCommandeArticlePortal(articleId: number, article: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/UpdateArticlePortal/${articleId}`, article);
  }

  // Suppression de la commande dans commandeportal
  deleteCommandePortal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/DeletePortal/${id}`);
  }

//recherche

  searchCommandesByCriteria(
    clientId: number,
    numCommande?: number,
    reference?: string
  ): Observable<any[]> {
    let params = new HttpParams().set('clientId', clientId.toString());

    if (numCommande !== undefined) {
      params = params.set('numCommande', numCommande.toString());
    }

    if (reference) {
      params = params.set('reference', reference);
    }

  
    return this.http.get<any[]>(`${this.apiUrl}/SearchCommandes`, { params });
  }



  // Création d'une commande légère dans commandeportal
  createCommandeLegerPortal(request: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/CreatePortal`, request);
  } 
  getCommandeByIdPortal(id: number): Observable<any> {
    console.log("Appel API pour obtenir la commande avec ID :", id);
    return this.http.get<any>(`${this.apiUrl}/ByIdPortal/${id}`);
  }

  validerCommande(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/ValiderCommande/${id}`,{});
  }

  getNombreDeCommandeEnAttente(clientId: number): Observable<number> {
    const url = `${this.apiUrl}/${clientId}/NombreDeCommandeEnAttente`;
    return this.http.get<number>(url);
  }

  getNombreDeCommandeValider(clientId: number): Observable<number> {
    const url = `${this.apiUrl}/NombreDeCommandeValider/${clientId}`;
    return this.http.get<number>(url);
  }
  getNombreDeCommandeDuJour(clientId: number): Observable<number> {
    const url = `${this.apiUrl}/GetNombreDeCommandesDuJour/${clientId}`;
    return this.http.get<number>(url);
  }
  getNombreDeCommandeDuMois(clientId: number): Observable<number> {
    const url = `${this.apiUrl}/GetNombreDeCommandesDuMois/${clientId}`;
    return this.http.get<number>(url);
  }








  setCommandeArticles(articles: any[]) {
    this.commandeArticlesSubject.next(articles);

    this.commandeArticlesSubject.getValue().forEach(article => {
      console.log('Après next dans setCommandeArticles:', article.cda_PrixTotalRemiseHT);
    });
  }

 getCurrentCommandeArticles(): any[] {
  return this.commandeArticlesSubject.value;
}

addCommandeArticle(article: any) {
  const previousQuantity = article.cda_Quantite || 1; 
  this.calculateDiscountedTotal(article, previousQuantity);   
  const currentArticles = this.commandeArticlesSubject.value;
  this.commandeArticlesSubject.next([...currentArticles, article]);
  this.updateTotalHT();
}




  deleteCommandeArticle(article: any) {
    const updatedArticles = this.commandeArticlesSubject.value.filter(a => a !== article);
    this.commandeArticlesSubject.next(updatedArticles);
    this.updateTotalHT();
  }

  updateArticleQuantity(article: any, newQuantity: number) {
    const updatedArticles = this.commandeArticlesSubject.value.map(a =>
      a === article ? { ...a, cda_Quantite: newQuantity } : a
    );
    this.commandeArticlesSubject.next(updatedArticles);
    this.updateTotalHT();

  }

  calculateDiscountedTotal(article: any, previousQuantity: number) {
    const prixUnitaireRemise = (article.cda_PrixTotalRemiseHT / previousQuantity) || 0; // Prix remisé unitaire
    const quantiteDifference = article.cda_Quantite - previousQuantity; // Différence de quantité

    // Calcul de la nouvelle remise totale
    article.cda_PrixTotalRemiseHT = Math.round(
        (article.cda_PrixTotalRemiseHT + (quantiteDifference * prixUnitaireRemise)) * 100
    ) / 100;

    console.log(`Nouveau total remisé pour l'article ${article.cda_Id}:`, article.cda_PrixTotalRemiseHT);
}


private updateTotalHT() {
  const totalHT = this.commandeArticlesSubject.value.reduce((total, article) => {
      const previousQuantity = article.cda_Quantite || 1;
      this.calculateDiscountedTotal(article, previousQuantity);
      return total + (article.cda_PrixTotalRemiseHT || 0);
  }, 0);
  this.totalHTSubject.next(totalHT);
}

updateArticleQuantityAndRecalculate(articleId: number, newQuantity: number) {
  const updatedArticles = this.commandeArticlesSubject.value.map(article => {
      if (article.cda_Id === articleId) {
          const previousQuantity = article.cda_Quantite;
          article.cda_Quantite = newQuantity;
          this.calculateDiscountedTotal(article, previousQuantity);
      }
      console.log(article);

      return article;
      
  });


  this.setCommandeArticles(updatedArticles);
  this.updateTotalHT();
}

//recherche dans liste commande 
searchCommandesWithArticles(clientId: number, searchCriteria: string | null): Observable<any[]> {
  const params = new HttpParams()
    .set('clientId', clientId.toString())
    .set('searchCriteria', searchCriteria ?? '');
  return this.http.get<any[]>(`${this.apiUrl}/SearchCommandesWithArticles`, { params });
}

}
