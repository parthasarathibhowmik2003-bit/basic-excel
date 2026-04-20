import { SheetData } from '../types';

export const colIndexToLabel = (index: number): string => {
  let label = '';
  while (index >= 0) {
    label = String.fromCharCode((index % 26) + 65) + label;
    index = Math.floor(index / 26) - 1;
  }
  return label;
};

export const labelToColIndex = (label: string): number => {
  let index = 0;
  for (let i = 0; i < label.length; i++) {
    index = index * 26 + (label.charCodeAt(i) - 64);
  }
  return index - 1;
};

export const parseCoordinate = (coord: string): { col: string; row: number } => {
  const match = coord.match(/^([A-Z]+)(\d+)$/);
  if (!match) return { col: 'A', row: 1 };
  return { col: match[1], row: parseInt(match[2], 10) };
};

export const evaluateFormula = (formula: string, data: SheetData): string => {
  if (!formula.startsWith('=')) return formula;

  try {
    const expression = formula.substring(1).toUpperCase();
    
    // Simple SUM support: SUM(A1:B2)
    if (expression.startsWith('SUM(')) {
      const range = expression.match(/SUM\((.+):(.+)\)/);
      if (range) {
        const start = parseCoordinate(range[1]);
        const end = parseCoordinate(range[2]);
        
        const startCol = labelToColIndex(start.col);
        const endCol = labelToColIndex(end.col);
        const startRow = start.row;
        const endRow = end.row;

        let sum = 0;
        for (let r = Math.min(startRow, endRow); r <= Math.max(startRow, endRow); r++) {
          for (let c = Math.min(startCol, endCol); c <= Math.max(startCol, endCol); c++) {
            const val = parseFloat(data[`${colIndexToLabel(c)}${r}`]?.value || '0');
            if (!isNaN(val)) sum += val;
          }
        }
        return sum.toString();
      }
    }

    // Basic arithmetic and cell references
    // This is a very primitive parser. For a real excel clone, we'd use a library.
    // Replace cell refs with values
    let evalStr = expression.replace(/([A-Z]+\d+)/g, (match) => {
      const val = parseFloat(data[match]?.value || '0');
      return isNaN(val) ? '0' : val.toString();
    });

    // Use a safer eval or math parser. For this demo, we'll use a simple Function constructor.
    // eslint-disable-next-line no-new-func
    const result = new Function(`return ${evalStr}`)();
    return result.toString();
  } catch (e) {
    return '#ERROR!';
  }
};
