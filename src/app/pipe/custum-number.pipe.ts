import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customNumber',
  standalone: true  
})
export class CustomNumberPipe implements PipeTransform {
  transform(value: any, decimalPlaces: string = '1.2-2'): string {
    // Si la valeur est null ou undefined, retourner une chaîne vide
    if (value == null || value === '') {
      return '';
    }

    // Si la valeur est une chaîne, enlever les caractères non numériques
    if (typeof value === 'string') {
      value = value.replace(/\D/g, ''); // Garde seulement les chiffres
    }

    // Convertir en nombre (si possible)
    const numericValue = Number(value);

    // Si la conversion échoue ou donne NaN, retourner une chaîne vide
    if (isNaN(numericValue)) {
      return '';
    }

    // Formater le nombre
    const options = {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: false
    };
    return new Intl.NumberFormat('en-US', options).format(numericValue);
  }
}

