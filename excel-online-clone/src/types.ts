export type CellStyle = {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  align?: 'left' | 'center' | 'right';
  fontSize?: number;
  fontColor?: string;
  backgroundColor?: string;
};

export type CellData = {
  value: string;
  formula?: string;
  style?: CellStyle;
};

export type SheetData = {
  [key: string]: CellData;
};

export type Sheet = {
  id: string;
  name: string;
  data: SheetData;
};

export type SpreadsheetState = {
  sheets: Sheet[];
  activeSheetId: string;
  selectedCell: string; // e.g., "A1"
  selectionRange: string[] | null; // ["A1", "C3"]
};
