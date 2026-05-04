function formatString(str) {
  // Split before uppercase letters, but keep consecutive uppercase together
  const formatted = str
    .replace(/([a-z])([A-Z]+)/g, "$1 $2") // add space before uppercase sequence after lowercase
    .replace(/^./, (s) => s.toUpperCase()); // capitalize first letter

  return formatted;
}

export { formatString };
