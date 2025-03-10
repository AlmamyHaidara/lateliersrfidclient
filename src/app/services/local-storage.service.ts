import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Méthode pour sauvegarder une valeur dans le localStorage
  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Méthode pour récupérer une valeur depuis le localStorage
  get(key: string): any {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  // Méthode pour supprimer une valeur du localStorage
  remove(key: string): void {
    localStorage.removeItem(key);
  }

  // Méthode pour effacer toutes les valeurs du localStorage
  clear(): void {
    localStorage.clear();
  }
}
