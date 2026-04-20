import * as React from 'react';
import { colIndexToLabel } from '../lib/spreadsheetUtils';
import { SheetData } from '../types';

interface SheetGridProps {
  rows: number;
  cols: number;
  data: SheetData;
  selectedCell: string;
  onCellSelect: (id: string) => void;
  onCellChange: (id: string, value: string) => void;
}

export const SheetGrid: React.FC<SheetGridProps> = ({ 
  rows, cols, data, selectedCell, onCellSelect, onCellChange 
}) => {
  const [editingCell, setEditingCell] = React.useState<string | null>(null);
  const [editValue, setEditValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDoubleClick = (id: string, value: string | undefined) => {
    setEditingCell(id);
    setEditValue(value || '');
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleBlur = () => {
    if (editingCell) {
      onCellChange(editingCell, editValue);
      setEditingCell(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter') {
      onCellChange(id, editValue);
      setEditingCell(null);
      // Move selection down
      const match = id.match(/^([A-Z]+)(\d+)$/);
      if (match) {
        onCellSelect(`${match[1]}${parseInt(match[2], 10) + 1}`);
      }
    } else if (e.key === 'Escape') {
      setEditingCell(null);
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-[#faf9f8] relative custom-scrollbar">
      <div className="inline-grid" style={{ 
        gridTemplateColumns: `40px repeat(${cols}, 100px)`,
        gridAutoRows: '22px'
      }}>
        {/* Top-left corner */}
        <div className="bg-[#f3f2f1] border-r border-b border-[#d1d1d1] sticky top-0 left-0 z-30 flex items-center justify-center">
            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-r-[8px] border-r-[#c8c8c8] border-b-[8px] border-b-transparent translate-x-[12px] translate-y-[4px] rotate-45" />
        </div>

        {/* Column Headers */}
        {Array.from({ length: cols }).map((_, i) => (
          <div 
            key={`col-${i}`} 
            className="bg-[#f8f9fa] border-r border-b border-[#d1d1d1] sticky top-0 z-20 flex items-center justify-center text-[11px] text-[#444] font-medium"
          >
            {colIndexToLabel(i)}
          </div>
        ))}

        {/* Rows */}
        {Array.from({ length: rows }).map((_, r) => {
          const rowNum = r + 1;
          return (
            <React.Fragment key={`row-${rowNum}`}>
              {/* Row Header */}
              <div className="bg-[#f8f9fa] border-r border-b border-[#d1d1d1] sticky left-0 z-10 flex items-center justify-center text-[11px] text-[#444] font-medium">
                {rowNum}
              </div>

              {/* Cells */}
              {Array.from({ length: cols }).map((_, c) => {
                const colLabel = colIndexToLabel(c);
                const cellId = `${colLabel}${rowNum}`;
                const isSelected = selectedCell === cellId;
                const cellData = data[cellId];
                const displayValue = cellData?.value || '';
                const style = cellData?.style || {};

                return (
                  <div
                    key={cellId}
                    onClick={() => onCellSelect(cellId)}
                    onDoubleClick={() => handleDoubleClick(cellId, cellData?.formula || cellData?.value)}
                    className={`border-r border-b border-[#e1dfdd] bg-white relative transition-colors ${
                      isSelected ? 'ring-2 ring-inset ring-[#107c10] z-10' : ''
                    }`}
                    style={{
                        fontWeight: style.bold ? 'bold' : 'normal',
                        fontStyle: style.italic ? 'italic' : 'normal',
                        textDecoration: style.underline ? 'underline' : 'none',
                        textAlign: style.align || 'left',
                        color: style.fontColor || 'inherit',
                        backgroundColor: style.backgroundColor || 'white'
                    }}
                  >
                    {editingCell === cellId ? (
                      <input
                        ref={inputRef}
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={(e) => handleKeyDown(e, cellId)}
                        className="absolute inset-0 w-full h-full px-1 outline-none text-xs font-mono bg-white z-20"
                      />
                    ) : (
                      <div className="px-1 truncate text-xs flex items-center h-full">
                        {displayValue}
                      </div>
                    )}
                    {isSelected && !editingCell && (
                        <div className="absolute bottom-[-3px] right-[-3px] w-[6px] h-[6px] bg-[#107c10] border border-white cursor-crosshair z-20" />
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
