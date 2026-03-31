"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Flame, Sparkles, Hash, Activity } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAppLayout } from "@/context/AppLayoutContext";

interface Message {
  id: string;
  room: string;
  alias: string;
  content: string;
  created_at: string;
}

const CHANNELS = [
  { id: "section", name: "Primary Node", description: "Your class sector broadcast" },
  { id: "campus", name: "Campus Hub", description: "Global frequency stream" },
  { id: "casual", name: "General", description: "Casual interactions" },
  { id: "alerts", name: "Critical", description: "Urgent notifications" },
  { id: "archive", name: "Archive", description: "Study & exam discussions" }
];

export default function CommunityPage() {
  const { userData } = useAppLayout();
  const [activeChannel, setActiveChannel] = useState(CHANNELS[0].id);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [alias, setAlias] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const section = userData?.profile?.section || "GEN";
  const regNo = userData?.profile?.regNo || "ANON";

  useEffect(() => {
    // Generate Anonymous Alias (SHA1)
    const generateAlias = async () => {
      const msgUint8 = new TextEncoder().encode(regNo);
      const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase().slice(0, 4);
      setAlias(`${section} · ${hashHex}`);
    };
    generateAlias();
  }, [regNo, section]);

  const currentRoom = activeChannel === "section" ? `section_${section.replace(/\s+/g, '_')}` : activeChannel;

  useEffect(() => {
    // Initial fetch
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('room', currentRoom)
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (data) setMessages(data.reverse());
    };

    fetchMessages();

    // Realtime subscription
    const channel = supabase.channel(`room_${currentRoom}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages',
        filter: `room=eq.${currentRoom}`
      }, (payload) => {
        setMessages(prev => [...prev, payload.new as Message]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentRoom]);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = {
      room: currentRoom,
      alias: alias,
      content: input.trim()
    };

    const { error } = await supabase.from('messages').insert([newMessage]);
    if (error) console.error("Send Error:", error);
    setInput("");
  };

  return (
    <div className="flex h-full w-full bg-[#09090b] overflow-hidden">
      {/* Sidebar - Frequencies */}
      <div className="w-80 border-r border-white/5 bg-[#0A0A0A] p-8 hidden xl:flex flex-col gap-10">
        <div className="space-y-4">
           <div className="flex items-center gap-3">
              <Sparkles className="text-primary" size={24} />
              <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase font-mono">Frequencies</h2>
           </div>
           <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black text-white/60 tracking-widest uppercase">Stream Active</span>
           </div>
        </div>

        <div className="space-y-3 flex-1 overflow-y-auto no-scrollbar">
           {CHANNELS.map((ch) => (
             <button
                key={ch.id}
                onClick={() => setActiveChannel(ch.id)}
                className={`w-full text-left p-6 rounded-3xl transition-all border group ${
                  activeChannel === ch.id 
                    ? "bg-primary text-black border-primary shadow-[0_10px_20px_rgba(34,211,238,0.2)]" 
                    : "bg-white/5 text-white/40 border-white/5 hover:bg-white/10"
                }`}
             >
                <div className="flex items-center gap-3 mb-1">
                   <Hash size={16} className={activeChannel === ch.id ? "text-black" : "text-primary"} />
                   <h3 className="font-black text-xs uppercase tracking-widest">{ch.name}</h3>
                </div>
                <p className={`text-[10px] font-bold ${activeChannel === ch.id ? "text-black/60" : "text-white/20"}`}>
                   {ch.description}
                </p>
             </button>
           ))}
        </div>

        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5">
           <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-3">Your Identity</p>
           <div className="flex items-center gap-3 font-mono">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                 <Activity size={14} className="text-primary" />
              </div>
              <span className="text-sm font-bold text-white tracking-widest">{alias}</span>
           </div>
        </div>
      </div>

      {/* Main Stream Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Header (Mobile) */}
        <div className="xl:hidden p-6 border-b border-white/5 bg-[#0A0A0A] flex items-center justify-between">
           <h3 className="font-black text-white italic tracking-tighter uppercase">{CHANNELS.find(c => c.id === activeChannel)?.name}</h3>
           <span className="text-[10px] font-black text-primary uppercase tracking-widest">Live Node</span>
        </div>

        {/* Message Stream */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 md:p-12 space-y-8 scrollbar-hide"
        >
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-20 space-y-4">
               <Activity size={64} strokeWidth={1} />
               <p className="text-sm font-black uppercase tracking-[0.4em]">Listening for Data Stream...</p>
            </div>
          )}
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col gap-2 max-w-[80%] ${msg.alias === alias ? "ml-auto items-end" : "mr-auto items-start"}`}
            >
               <div className="flex items-center gap-3 px-1">
                  <span className="text-[9px] font-black text-white/20 uppercase tracking-widest font-mono">{msg.alias}</span>
                  <span className="text-[8px] text-white/10 font-bold uppercase tracking-widest">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
               </div>
               <div className={`p-6 rounded-[2rem] text-sm md:text-base font-bold italic ${
                 msg.alias === alias 
                   ? "bg-primary text-black rounded-tr-lg" 
                   : "bg-white/5 text-white/80 border border-white/10 rounded-tl-lg"
               }`}>
                  "{msg.content}"
               </div>
            </motion.div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-6 md:p-12 bg-[#09090b] border-t border-white/5 relative z-10">
           <div className="relative max-w-5xl mx-auto flex items-center">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Deploy message to sector..."
                className="w-full h-20 bg-white/5 border border-white/10 rounded-[2.5rem] px-10 text-xl font-bold italic text-white outline-none focus:border-primary/50 transition-all placeholder:text-white/10"
              />
              <button 
                onClick={handleSendMessage}
                disabled={!input.trim()}
                className="absolute right-4 w-12 h-12 bg-primary text-black rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all disabled:opacity-50 shadow-xl shadow-primary/20"
              >
                <Send size={20} />
              </button>
           </div>
           <p className="max-w-5xl mx-auto mt-4 text-[10px] text-center font-black text-white/10 uppercase tracking-[0.4em]">
              Data persists via Supabase Grid // Node {section} Node Active
           </p>
        </div>

        {/* Ambient Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[#09090b] opacity-60 z-0" />
      </div>
    </div>
  );
}
