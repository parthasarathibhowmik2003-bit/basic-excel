import { useState, useCallback, useMemo } from 'react';
import { SpreadsheetState, CellStyle } from '../types';
import { evaluateFormula } from '../lib/spreadsheetUtils';

const INITIAL_ROWS = 50;
const INITIAL_COLS = 26;

const createEmptySheet = (id: string, name: string) => ({
  id,
  name,
  data: {},
});

export const useSpreadsheet = () => {
  const [state, setState] = useState<SpreadsheetState>({
    sheets: [createEmptySheet('sheet1', 'Sheet1')],
    activeSheetId: 'sheet1',
    selectedCell: 'A1',
    selectionRange: null,
  });

  const activeSheet = useMemo(() => 
    state.sheets.find(s => s.id === state.activeSheetId) || state.sheets[0],
    [state.sheets, state.activeSheetId]
  );

  const updateCell = useCallback((id: string, value: string, formula?: string) => {
    setState(prev => {
      const newSheets = prev.sheets.map(sheet => {
        if (sheet.id === prev.activeSheetId) {
          const newData = { ...sheet.data };
          const cell = newData[id] || { value: '', style: {} };
          
          let finalValue = value;
          if (formula) {
            finalValue = evaluateFormula(formula, newData);
          } else if (value.startsWith('=')) {
            finalValue = evaluateFormula(value, newData);
          }

          newData[id] = { ...cell, value: finalValue, formula: formula || (value.startsWith('=') ? value : undefined) };
          
          // Re-evaluate cells that might depend on this one
          // In a real app, we'd build a dependency graph. 
          // For now, we'll re-eval all formulas in the sheet.
          Object.keys(newData).forEach(key => {
            if (newData[key].formula) {
              newData[key].value = evaluateFormula(newData[key].formula!, newData);
            }
          });

          return { ...sheet, data: newData };
        }
        return sheet;
      });
      return { ...prev, sheets: newSheets };
    });
  }, []);

  const updateCellStyle = useCallback((id: string, style: Partial<CellStyle>) => {
    setState(prev => {
      const newSheets = prev.sheets.map(sheet => {
        if (sheet.id === prev.activeSheetId) {
          const newData = { ...sheet.data };
          const cell = newData[id] || { value: '', style: {} };
          newData[id] = { ...cell, style: { ...cell.style, ...style } };
          return { ...sheet, data: newData };
        }
        return sheet;
      });
      return { ...prev, sheets: newSheets };
    });
  }, []);

  const selectCell = useCallback((id: string) => {
    setState(prev => ({ ...prev, selectedCell: id, selectionRange: null }));
  }, []);

  const addSheet = useCallback(() => {
    setState(prev => {
      const id = `sheet${prev.sheets.length + 1}`;
      const name = `Sheet${prev.sheets.length + 1}`;
      const newSheet = createEmptySheet(id, name);
      return { ...prev, sheets: [...prev.sheets, newSheet], activeSheetId: id };
    });
  }, []);

  return {
    state,
    activeSheet,
    updateCell,
    updateCellStyle,
    selectCell,
    addSheet,
    rows: INITIAL_ROWS,
    cols: INITIAL_COLS,
  };
};
