const formatResultText = (text: string) => {
  // Remove .\n\n from the beginning
  text = text.replace(/^\.\n\n/, "");

  // Ensure the text starts with an alphanumeric character
  text = text.replace(/^[^a-zA-Z0-9]+/, "");

  return text;
};

export { formatResultText };
