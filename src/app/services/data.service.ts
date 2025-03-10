import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private commandeArticlesSubject = new BehaviorSubject<any[]>([]);
  commandeArticles$ = this.commandeArticlesSubject.asObservable();

  // Méthode pour initialiser les articles de commande
  setCommandeArticles(articles: any[]) {
    this.commandeArticlesSubject.next(articles);
  }

  // Méthode pour mettre à jour un article spécifique
  updateArticleQuantity(articleId: number, newQuantity: number) {
    const articles = this.commandeArticlesSubject.getValue();
    const articleIndex = articles.findIndex(article => article.id === articleId);
    if (articleIndex !== -1) {
      articles[articleIndex].cda_Quantite = newQuantity;
      articles[articleIndex].cda_PrixTotalRemiseHT = this.calculateTotalRemiseHT(articles[articleIndex]);
      this.commandeArticlesSubject.next(articles);
    }
  }

  // Méthode pour calculer le prix total remisé
  private calculateTotalRemiseHT(article: any): number {
    const prixVente = article.cda_Art_PrixVente || 0; 
    const remise = article.cda_Remise || 0;
    const quantite = article.cda_Quantite || 1;
    return Math.round(quantite * prixVente * (1 - remise / 100) * 100) / 100;
  }
}
