function formatLocalDate(date: Date): string {
    // Créer une nouvelle date pour éviter les effets de bord
    const localDate = new Date(date);
    
    // Appliquer le décalage du fuseau horaire
    const localDateString = localDate.toLocaleString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false // Pour utiliser le format de 24 heures
    });
  
    // Réorganiser le format de la date pour correspondre à `dd/mm/yyyy`
    const [day, month, year, hour, minute, second] = localDateString.split(/[/, :]/);
    
    return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
  }
  