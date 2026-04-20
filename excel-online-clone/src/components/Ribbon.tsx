import * as React from 'react';
import { 
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, 
  Type, Palette, ChevronDown, Table, BarChart2, Save, FileText,
  Copy, Scissors, Clipboard, Search, Grid3X3
} from 'lucide-react';
import { CellStyle } from '../types';

interface RibbonProps {
  onStyleChange: (style: Partial<CellStyle>) => void;
  activeStyle?: CellStyle;
}

export const Ribbon: React.FC<RibbonProps> = ({ onStyleChange, activeStyle }) => {
  const [activeTab, setActiveTab] = React.useState('Home');

  const tabs = ['File', 'Home', 'Insert', 'Draw', 'Page Layout', 'Formulas', 'Data', 'Review', 'View', 'Help'];

  return (
    <div className="bg-[#f3f2f1] border-b border-[#d1d1d1] flex flex-col select-none">
      {/* Tab Selectors */}
      <div className="flex px-4 pt-1 gap-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1 text-xs font-medium cursor-pointer transition-colors ${
              activeTab === tab 
                ? 'bg-white border-t border-x border-[#d1d1d1] text-[#217346] rounded-t-sm -mb-[1px] z-10' 
                : 'hover:bg-[#edebe9] text-[#323130]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Ribbon Content */}
      <div className="bg-[#f3f2f1] h-[100px] border-t border-[#d1d1d1] flex items-center px-2 gap-2 pt-1">
        {activeTab === 'Home' && (
          <>
            {/* Clipboard Group */}
            <div className="bento-tool-group">
              <div className="flex gap-2">
                <button className="p-1 hover:bg-[#edebe9] rounded-sm flex flex-col items-center">
                  <Clipboard size={16} className="text-[#323130]" />
                  <span className="text-[9px] mt-0.5 text-[#605e5c]">Paste</span>
                </button>
                <div className="flex flex-col justify-center">
                  <button className="p-0.5 hover:bg-[#edebe9] rounded-sm flex items-center gap-1.5">
                    <Scissors size={12} className="text-[#323130]" />
                    <span className="text-[9px] text-[#605e5c]">Cut</span>
                  </button>
                  <button className="p-0.5 hover:bg-[#edebe9] rounded-sm flex items-center gap-1.5">
                    <Copy size={12} className="text-[#323130]" />
                    <span className="text-[9px] text-[#605e5c]">Copy</span>
                  </button>
                </div>
              </div>
              <span className="text-[9px] text-center text-gray-500 uppercase tracking-tighter font-bold">Clipboard</span>
            </div>

            {/* Font Group */}
            <div className="bento-tool-group w-48">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="flex bg-white px-1.5 py-0.5 rounded-sm items-center gap-1.5 border border-[#d1d1d1] flex-1">
                    <span className="text-[11px] text-[#323130]">Calibri</span>
                    <ChevronDown size={10} className="ml-auto" />
                  </div>
                  <div className="flex bg-white px-1.5 py-0.5 rounded-sm items-center gap-1.5 border border-[#d1d1d1] w-12">
                    <span className="text-[11px] text-[#323130]">11</span>
                    <ChevronDown size={10} className="ml-auto" />
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => onStyleChange({ bold: !activeStyle?.bold })}
                    className={`p-1 hover:bg-[#edebe9] rounded-sm border border-gray-100 ${activeStyle?.bold ? 'bg-[#c7e0f4]' : 'bg-gray-50'}`}
                  >
                    <Bold size={14} />
                  </button>
                  <button 
                    onClick={() => onStyleChange({ italic: !activeStyle?.italic })}
                    className={`p-1 hover:bg-[#edebe9] rounded-sm border border-gray-100 ${activeStyle?.italic ? 'bg-[#c7e0f4]' : 'bg-gray-50'}`}
                  >
                    <Italic size={14} />
                  </button>
                  <button 
                    onClick={() => onStyleChange({ underline: !activeStyle?.underline })}
                    className={`p-1 hover:bg-[#edebe9] rounded-sm border border-gray-100 ${activeStyle?.underline ? 'bg-[#c7e0f4]' : 'bg-gray-50'}`}
                  >
                    <Underline size={14} />
                  </button>
                  <div className="w-[1px] h-4 bg-[#d1d1d1] mx-0.5" />
                  <button className="p-1 hover:bg-[#edebe9] rounded-sm relative">
                    <Palette size={14} />
                    <div className="absolute bottom-0.5 right-0.5 w-1.5 h-0.5 bg-red-500" />
                  </button>
                  <button className="p-1 hover:bg-[#edebe9] rounded-sm relative">
                    <Grid3X3 size={14} />
                  </button>
                </div>
              </div>
              <span className="text-[9px] text-center text-gray-500 uppercase tracking-tighter font-bold">Font</span>
            </div>

            {/* Alignment Group */}
            <div className="bento-tool-group w-40">
              <div className="flex flex-col gap-1.5">
                <div className="flex gap-1 justify-center">
                   <button 
                    onClick={() => onStyleChange({ align: 'left' })}
                    className={`p-1 hover:bg-[#edebe9] rounded-sm ${activeStyle?.align === 'left' ? 'bg-[#c7e0f4]' : ''}`}
                  >
                    <AlignLeft size={14} />
                  </button>
                  <button 
                    onClick={() => onStyleChange({ align: 'center' })}
                    className={`p-1 hover:bg-[#edebe9] rounded-sm ${activeStyle?.align === 'center' ? 'bg-[#c7e0f4]' : ''}`}
                  >
                    <AlignCenter size={14} />
                  </button>
                  <button 
                    onClick={() => onStyleChange({ align: 'right' })}
                    className={`p-1 hover:bg-[#edebe9] rounded-sm ${activeStyle?.align === 'right' ? 'bg-[#c7e0f4]' : ''}`}
                  >
                    <AlignRight size={14} />
                  </button>
                </div>
                <div className="flex gap-1 justify-center">
                  <button className="px-2 py-0.5 hover:bg-[#edebe9] rounded-sm text-[10px] font-medium text-[#323130] border bg-gray-50 w-full">
                    Merge & Center
                  </button>
                </div>
              </div>
              <span className="text-[9px] text-center text-gray-500 uppercase tracking-tighter font-bold">Alignment</span>
            </div>

            {/* Number Group */}
            <div className="bento-tool-group">
              <div className="flex flex-col gap-1.5">
                <div className="flex bg-white px-1.5 py-0.5 rounded-sm items-center justify-between min-w-[80px] border border-[#d1d1d1]">
                  <span className="text-[11px] text-[#323130]">General</span>
                  <ChevronDown size={10} />
                </div>
                <div className="flex gap-1 justify-center">
                  <button className="w-6 h-6 hover:bg-[#edebe9] rounded-sm flex items-center justify-center text-[11px] font-bold border bg-gray-50">$</button>
                  <button className="w-6 h-6 hover:bg-[#edebe9] rounded-sm flex items-center justify-center text-[11px] font-bold border bg-gray-50">%</button>
                </div>
              </div>
              <span className="text-[9px] text-center text-gray-500 uppercase tracking-tighter font-bold">Number</span>
            </div>
          </>
        )}

        {activeTab === 'Insert' && (
          <>
            <div className="flex flex-col items-center gap-1">
              <Table size={24} className="text-[#323130]" />
              <span className="text-[10px] text-[#605e5c]">Table</span>
              <span className="text-[10px] text-[#a19f9d] uppercase mt-auto">Tables</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <BarChart2 size={24} className="text-[#323130]" />
              <span className="text-[10px] text-[#605e5c]">Charts</span>
              <span className="text-[10px] text-[#a19f9d] uppercase mt-auto">Charts</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
