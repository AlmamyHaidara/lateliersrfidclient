

export function isValidEmail(email: string): boolean {
  // Expression régulière pour valider le format de l'email
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
  // Expression régulière pour valider le format du mot de passe (au moins 8 caractères et au moins un chiffre)
  const passwordRegex = /^(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
}
export function isValidTelephone(telephone: string): boolean {
  // Expression régulière pour valider le format du numéro de téléphone (10 chiffres)
  const telephoneRegex = /^\d{10}$/;
  return telephoneRegex.test(telephone);
}

