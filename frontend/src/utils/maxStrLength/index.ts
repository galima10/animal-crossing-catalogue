export function maxStrLength(str: string) {
  const newStr = str.slice(0, 16);
  if (newStr.length >= str.length) return str;
  else return newStr + "..."
}
