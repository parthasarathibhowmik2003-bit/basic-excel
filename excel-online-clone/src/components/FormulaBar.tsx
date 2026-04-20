import * as React from 'react';
import { X, Check } from 'lucide-react';

interface FormulaBarProps {
  selectedCell: string;
  value: string;
  onChange: (value: string) => void;
  onEnter: () => void;
}

export const FormulaBar: React.FC<FormulaBarProps> = ({ selectedCell, value, onChange, onEnter }) => {
  return (
    <div className="flex items-center bg-white border-b border-[#d1d1d1] h-9 px-2 gap-2">
      <div className="w-16 text-center text-sm font-medium text-[#323130] border-r border-[#d1d1d1]">
        {selectedCell}
      </div>
      
      <div className="flex items-center gap-1 border-r border-[#d1d1d1] pr-2">
        <button className="p-1 hover:bg-[#edebe9] rounded-sm text-[#a19f9d]">
          <X size={14} />
        </button>
        <button 
          onClick={onEnter}
          className="p-1 hover:bg-[#edebe9] rounded-sm text-[#217346]"
        >
          <Check size={14} />
        </button>
        <div className="text-sm font-serif italic text-gray-400 px-2 select-none">fx</div>
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onEnter();
        }}
        className="flex-1 h-full outline-none text-sm px-2 font-mono text-[#323130]"
        spellCheck={false}
      />
    </div>
  );
};
