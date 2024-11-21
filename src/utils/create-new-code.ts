export function createNewCode(size = 15): string {
  const letters: string = "abcdefghijklmnopqrstuvwxyz1234567890";
  let code = "";

  for (let count = 1; count <= size; count++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    code += letters[randomIndex];
  }

  return code;
}
