/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Rocket, 
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
  Info,
  ChevronRight,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'SYSTEM INITIALIZED. WELCOME COMMANDER. HOW CAN I ASSIST YOUR MISSION TODAY?' },
    { role: 'user', content: 'Plot a course to the Andromeda Galaxy.' },
    { role: 'assistant', content: 'COURSE PLOTTED. ESTIMATED TRAVEL TIME: 2.5 MILLION YEARS AT CURRENT WARP CAPACITY. WOULD YOU LIKE TO ENGAGE CRYOSLEEP PROTOCOLS?' }
  ]);
  const [input, setInput] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `PROCESSING REQUEST: "${input.toUpperCase()}"... DATA RETRIEVED FROM GALACTIC ARCHIVES.` 
      }]);
    }, 1000);
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
              <Rocket size={20} />
              <span className="font-bold tracking-tighter">STARSHIP-OS</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="hover:text-[#00f2ff] transition-colors">
              <ChevronRight className="rotate-180" size={18} />
            </button>
          </div>

          <div className="p-3">
            <button className="w-full flex items-center gap-2 p-3 rounded border border-[#00f2ff]/30 text-[#00f2ff] hover:bg-[#00f2ff]/10 transition-all group">
              <Plus size={18} className="group-hover:rotate-90 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">New Mission</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            <div className="text-[10px] text-[#8b9bb4] px-2 mb-2 uppercase tracking-[0.2em]">Recent Logs</div>
            {[
              "Andromeda Course",
              "Warp Drive Status",
              "Oxygen Levels",
              "Nebula Analysis",
              "Alien Signal Decoded"
            ].map((log, i) => (
              <button key={i} className="w-full text-left p-2 rounded hover:bg-[#1c222d] text-xs text-[#8b9bb4] hover:text-[#e0e6ed] flex items-center gap-2 transition-colors">
                <MessageSquare size={14} />
                <span className="truncate">{log}</span>
              </button>
            ))}
          </div>

          <div className="p-4 border-t border-[#2a313d] space-y-3">
            <div className="flex items-center justify-between text-[10px] text-[#00f2ff]/60">
              <span>REACTOR: STABLE</span>
              <Activity size={12} />
            </div>
            <div className="h-1 bg-[#2a313d] rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: ["80%", "85%", "82%"] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="h-full bg-[#00f2ff] shadow-[0_0_10px_#00f2ff]" 
              />
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
                <span className="text-xs font-bold uppercase tracking-widest text-[#00f2ff]">Cockpit Interface v1.0</span>
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
          <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-[#2a313d] scrollbar-track-transparent">
            <div className="max-w-3xl mx-auto space-y-6">
              <AnimatePresence mode="popLayout">
                {messages.map((msg, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10, x: msg.role === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
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
            <div className="max-w-3xl mx-auto mt-2 flex justify-between items-center text-[10px] text-[#8b9bb4] uppercase tracking-widest">
              <span>Comms: Encrypted</span>
              <span>Latency: 14ms</span>
              <span>Target: ChatGPT-4o</span>
            </div>
          </div>

          {/* Floating Instructions Toggle */}
          <div className="fixed bottom-24 right-8 flex flex-col gap-2">
             <motion.div 
               whileHover={{ scale: 1.05 }}
               className="bg-[#151921] border border-[#00f2ff] p-4 rounded-lg shadow-2xl max-w-xs"
             >
               <div className="flex items-center gap-2 text-[#00f2ff] mb-2">
                 <Download size={16} />
                 <span className="text-xs font-bold uppercase">Install Extension</span>
               </div>
               <p className="text-[10px] text-[#8b9bb4] leading-relaxed">
                 1. Download the <code className="text-[#00f2ff]">/extension</code> folder.<br/>
                 2. Open Chrome Extensions page.<br/>
                 3. Enable "Developer mode".<br/>
                 4. Click "Load unpacked" and select the folder.
               </p>
             </motion.div>
          </div>
        </main>
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed top-20 left-1/4 w-96 h-96 bg-[#00f2ff]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-20 right-1/4 w-96 h-96 bg-[#ff9d00]/5 rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
}
