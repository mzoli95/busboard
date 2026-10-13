export function formatPlate(value: string): string {
  let letters: string = "";
  let digits: string = "";

  for (const character of value.toUpperCase()) {
    if (!digits && /^[A-Z]$/.test(character) && letters.length < 4) {
      letters += character;
    } else if (
      letters.length >= 3 &&
      /^[0-9]$/.test(character) &&
      digits.length < 3
    ) {
      digits += character;
    }
  }

  return digits ? `${letters}-${digits}` : letters;
}

export function isValidPlate(value: string): boolean {
  return /^[A-Z]{3,4}-[0-9]{3}$/.test(value);
}
