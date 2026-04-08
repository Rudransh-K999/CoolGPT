/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Terminal, 
  Shield, 
  Cpu, 
  Zap, 
  Send, 
  Menu, 
  Plus, 
  MessageSquare, 
  User, 
  Settings, 
  Download,
  ChevronRight,
  Activity,
  Trash2,
  X,
  Save
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [customName, setCustomName] = useState('CoolGPT');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'SYSTEM ONLINE. ALL MODULES OPERATIONAL. HOW CAN I ASSIST YOU TODAY?' },
    { role: 'user', content: 'Analyze the latest market trends.' },
    { role: 'assistant', content: 'ANALYSIS COMPLETE. MARKET VOLATILITY IS WITHIN EXPECTED PARAMETERS. RECOMMEND CONTINUED MONITORING OF TECH SECTOR.' }
  ]);
  const [input, setInput] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [tempName, setTempName] = useState(customName);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `PROCESSING: "${input.toUpperCase()}"... DATA RETRIEVED FROM SECURE SERVERS.` 
      }]);
    }, 1000);
  };

  const handleBulkDelete = () => {
    if (confirm('Delete all chats?')) {
      alert('Bulk delete initiated...');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b0e] text-[#e0e6ed] font-mono selection:bg-[#00f2ff]/30 selection:text-[#00f2ff] relative overflow-hidden">
      {/* HUD Scanlines Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      
      {/* Vignette */}
      <div className="fixed inset-0 pointer-events-none z-40 bg-[radial-gradient(circle,transparent_60%,rgba(0,0,0,0.6)_100%)]" />

      {/* Main Layout */}
      <div className="flex h-screen relative z-10">
        
        {/* Sidebar */}
        <motion.aside 
          initial={false}
          animate={{ width: isSidebarOpen ? 260 : 0 }}
          className="bg-[#151921] border-r border-[#2a313d] flex flex-col overflow-hidden"
        >
          <div className="p-4 border-bottom border-[#2a313d] flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#00f2ff]">
              <Terminal size={20} />
              <span className="font-bold tracking-tighter uppercase">{customName}</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="hover:text-[#00f2ff] transition-colors">
              <ChevronRight className="rotate-180" size={18} />
            </button>
          </div>

          <div className="p-3 space-y-2">
            <button className="w-full flex items-center gap-2 p-3 rounded border border-[#00f2ff]/30 text-[#00f2ff] hover:bg-[#00f2ff]/10 transition-all group">
              <Plus size={18} className="group-hover:rotate-90 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">New Chat</span>
            </button>
            <button 
              onClick={handleBulkDelete}
              className="w-full flex items-center gap-2 p-2 rounded bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500/20 transition-all text-[10px] font-bold uppercase tracking-widest"
            >
              <Trash2 size={14} />
              Bulk Delete
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            <div className="text-[10px] text-[#8b9bb4] px-2 mb-2 uppercase tracking-[0.2em]">Recent History</div>
            {[
              "Market Trends",
              "System Logs",
              "Security Audit",
              "Data Export",
              "API Config"
            ].map((log, i) => (
              <button key={i} className="w-full text-left p-2 rounded hover:bg-[#1c222d] text-xs text-[#8b9bb4] hover:text-[#e0e6ed] flex items-center gap-2 transition-colors">
                <MessageSquare size={14} />
                <span className="truncate">{log}</span>
              </button>
            ))}
          </div>

          <div className="p-4 border-t border-[#2a313d] space-y-3">
            <div className="flex items-center justify-between text-[10px] text-[#00f2ff]/60">
              <span>CORE: ACTIVE</span>
              <Activity size={12} />
            </div>
          </div>
        </motion.aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col relative">
          
          {/* Top Bar */}
          <header className="h-14 border-b border-[#2a313d] flex items-center justify-between px-4 bg-[#0a0b0e]/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              {!isSidebarOpen && (
                <button onClick={() => setIsSidebarOpen(true)} className="text-[#00f2ff] hover:scale-110 transition-transform">
                  <Menu size={20} />
                </button>
              )}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00f2ff] animate-pulse shadow-[0_0_8px_#00f2ff]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#00f2ff]">{customName} Interface</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[#8b9bb4]">
              <Shield size={18} className="hover:text-[#00f2ff] cursor-pointer" />
              <Cpu size={18} className="hover:text-[#00f2ff] cursor-pointer" />
              <Zap size={18} className="hover:text-[#ff9d00] cursor-pointer" />
              <div className="w-8 h-8 rounded border border-[#2a313d] bg-[#151921] flex items-center justify-center text-[#00f2ff]">
                <User size={16} />
              </div>
            </div>
          </header>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <div className="max-w-3xl mx-auto space-y-6">
              <AnimatePresence mode="popLayout">
                {messages.map((msg, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded flex-shrink-0 flex items-center justify-center border ${
                      msg.role === 'user' 
                        ? 'bg-[#1c222d] border-[#ff9d00] text-[#ff9d00]' 
                        : 'bg-[#151921] border-[#00f2ff] text-[#00f2ff]'
                    }`}>
                      {msg.role === 'user' ? <User size={16} /> : <Terminal size={16} />}
                    </div>
                    <div className={`flex-1 p-4 rounded border ${
                      msg.role === 'user'
                        ? 'bg-[#1c222d] border-[#2a313d] border-r-4 border-r-[#ff9d00]'
                        : 'bg-[#151921] border-[#2a313d] border-l-4 border-l-[#00f2ff]'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {msg.content}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 bg-gradient-to-t from-[#0a0b0e] to-transparent">
            <div className="max-w-3xl mx-auto relative">
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                placeholder="Enter command..."
                className="w-full bg-[#0d1117] border border-[#2a313d] rounded-lg p-4 pr-12 text-sm focus:outline-none focus:border-[#00f2ff] focus:ring-1 focus:ring-[#00f2ff]/20 transition-all resize-none min-h-[60px] text-[#00f2ff] placeholder-[#8b9bb4]/50"
              />
              <button 
                onClick={handleSend}
                className="absolute right-3 bottom-3 p-2 text-[#00f2ff] hover:bg-[#00f2ff]/10 rounded-md transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </div>

          {/* Settings Button */}
          <button 
            onClick={() => { setTempName(customName); setShowSettings(true); }}
            className="fixed bottom-6 right-6 flex items-center gap-2 bg-[#151921] border border-[#00f2ff] text-[#00f2ff] px-4 py-2 rounded-md text-xs font-bold hover:bg-[#00f2ff]/10 transition-all shadow-2xl z-50"
          >
            <Settings size={16} />
            SETTINGS
          </button>
        </main>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-[#151921] border-2 border-[#00f2ff] p-6 rounded-lg shadow-[0_0_50px_rgba(0,242,255,0.2)] w-full max-w-sm"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[#00f2ff] font-bold tracking-widest uppercase">CoolGPT Settings</h3>
                <button onClick={() => setShowSettings(false)} className="text-[#8b9bb4] hover:text-white">
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] text-[#8b9bb4] uppercase tracking-widest block mb-2">Custom Brand Name</label>
                  <input 
                    type="text" 
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#2a313d] rounded p-2 text-sm text-[#00f2ff] focus:border-[#00f2ff] outline-none"
                  />
                </div>
                
                <div className="flex gap-2 pt-4">
                  <button 
                    onClick={() => { setCustomName(tempName); setShowSettings(false); }}
                    className="flex-1 bg-[#00f2ff] text-black font-bold py-2 rounded flex items-center justify-center gap-2 hover:bg-[#00f2ff]/80 transition-all"
                  >
                    <Save size={16} />
                    SAVE
                  </button>
                  <button 
                    onClick={() => setShowSettings(false)}
                    className="flex-1 bg-[#2a313d] text-white font-bold py-2 rounded hover:bg-[#3a4455] transition-all"
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Extension Info */}
      <div className="fixed bottom-20 left-8 max-w-xs pointer-events-none opacity-50">
        <div className="bg-[#151921] border border-[#2a313d] p-3 rounded text-[10px] text-[#8b9bb4]">
          <div className="flex items-center gap-2 text-[#00f2ff] mb-1">
            <Download size={12} />
            INSTALL EXTENSION
          </div>
          Load unpacked <code className="text-[#00f2ff]">/extension</code> folder in Chrome.
        </div>
      </div>
    </div>
  );
}
