import * as React from 'react';
import { Ribbon } from './components/Ribbon';
import { FormulaBar } from './components/FormulaBar';
import { SheetGrid } from './components/SheetGrid';
import { useSpreadsheet } from './hooks/useSpreadsheet';
import { Plus, Search, HelpCircle, Share2, MessageSquare, History } from 'lucide-react';

export default function App() {
  const { 
    state, 
    activeSheet, 
    updateCell, 
    updateCellStyle, 
    selectCell, 
    addSheet,
    rows,
    cols
  } = useSpreadsheet();

  const selectedCellData = activeSheet.data[state.selectedCell];
  const [formulaValue, setFormulaValue] = React.useState('');

  // Sync formula bar with selection
  React.useEffect(() => {
    setFormulaValue(selectedCellData?.formula || selectedCellData?.value || '');
  }, [state.selectedCell, selectedCellData]);

  const handleFormulaSubmit = () => {
    updateCell(state.selectedCell, formulaValue);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#f3f2f1] font-sans text-[#323130] overflow-hidden">
      {/* Top Bar (Title & Tools) */}
      <header className="bg-[#107c10] text-white h-10 flex items-center px-4 justify-between shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <div className="font-bold text-lg">Excel</div>
          <nav className="flex gap-4 text-sm font-medium opacity-90">
            <span className="border-b-2 border-white">File</span>
            <span>Home</span>
            <span>Insert</span>
            <span>Draw</span>
            <span>Page Layout</span>
            <span>Formulas</span>
            <span>Data</span>
          </nav>
        </div>

        <div className="flex items-center gap-3 text-sm font-medium">
          <div className="bg-[#0d640d] px-3 py-1 rounded cursor-pointer hover:bg-[#0a4f0a] transition-colors">Share</div>
          <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-xs font-bold">JD</div>
        </div>
      </header>

      {/* Ribbon Menu */}
      <Ribbon 
        onStyleChange={(s) => updateCellStyle(state.selectedCell, s)} 
        activeStyle={selectedCellData?.style}
      />

      {/* Formula Bar */}
      <FormulaBar 
        selectedCell={state.selectedCell}
        value={formulaValue}
        onChange={setFormulaValue}
        onEnter={handleFormulaSubmit}
      />

      {/* Main Grid Area + Sidebar */}
      <main className="flex-1 flex overflow-hidden bg-white">
        <SheetGrid 
          rows={rows}
          cols={cols}
          data={activeSheet.data}
          selectedCell={state.selectedCell}
          onCellSelect={selectCell}
          onCellChange={updateCell}
        />
        
        {/* Bento Sidebar: Data Insights */}
        <aside className="w-[240px] border-l border-[#d1d1d1] bg-white p-4 flex flex-col gap-4 hidden lg:flex shrink-0">
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <h3 className="text-xs font-bold text-[#107c10] uppercase tracking-wider mb-2">Data Insights</h3>
            <div className="h-24 w-full bg-white border border-green-100 rounded flex items-end justify-around p-2">
              <div className="w-3 bg-[#107c10] h-full opacity-30 rounded-t"></div>
              <div className="w-3 bg-[#107c10] h-2/3 opacity-50 rounded-t"></div>
              <div className="w-3 bg-[#107c10] h-3/4 rounded-t"></div>
              <div className="w-3 bg-[#107c10] h-1/2 rounded-t"></div>
            </div>
            <p className="text-[10px] text-gray-500 mt-2">Trend analysis suggests a 14% increase in the next quarter based on row data.</p>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <h3 className="text-xs font-bold text-gray-700 uppercase mb-2">Pivot Table Fields</h3>
            <div className="flex flex-col gap-2">
              {['Department', 'Budget Q3', 'Status'].map(field => (
                <div key={field} className="flex items-center gap-2">
                  <div className={`w-3 h-3 border bg-white ${field === 'Budget Q3' ? 'bg-[#107c10]' : ''}`}></div>
                  <span className="text-[11px]">{field}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>

      {/* Bottom Status Bar */}
      <footer className="h-8 bg-white border-t border-[#d1d1d1] flex items-center justify-between px-2 text-[11px] text-gray-600 shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-0.5">
            {state.sheets.map(sheet => (
              <button
                key={sheet.id}
                className={`flex items-center h-8 gap-1 border-r pr-4 transition-colors ${
                  state.activeSheetId === sheet.id 
                    ? 'text-[#107c10] font-bold' 
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                {state.activeSheetId === sheet.id && <div className="bg-[#107c10] w-1.5 h-4 mx-1" />}
                {sheet.name}
              </button>
            ))}
          </div>
          <button 
            onClick={addSheet}
            className="text-lg leading-none hover:text-[#107c10] transition-colors"
          >
            +
          </button>
        </div>

        <div className="flex items-center gap-4 px-4">
          <span>Ready</span>
          <span className="text-[#107c10] font-bold">100%</span>
        </div>
      </footer>
    </div>
  );
}
