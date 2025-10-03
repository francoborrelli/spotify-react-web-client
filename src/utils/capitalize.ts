export const capitalizeText = (text: string): string => {
  return text.charAt(0).toUpperCase() + text?.toLowerCase().slice(1);
};
