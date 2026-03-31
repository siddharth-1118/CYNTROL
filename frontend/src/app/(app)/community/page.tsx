"use client";
import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Heart, Share2, Send, Flame, Sparkles } from "lucide-react";

const mockPosts = [
  { 
    user: "Deepak S.", 
    tag: "Exam Prep", 
    content: "Has anyone started studying for the Discrete Math CLA? The unit 3 proofs are absolutely wild. Any good resources?", 
    likes: 24, 
    comments: 15,
    timestamp: "24m ago",
    hot: true 
  },
  { 
    user: "Arnav K.", 
    tag: "Event", 
    content: "The Hackathon registrations are officially open! Check out the Projects tab to build your squad. Let's cook! 🚀", 
    likes: 89, 
    comments: 42,
    timestamp: "1h ago",
    hot: false 
  },
  { 
    user: "Priya M.", 
    tag: "General", 
    content: "The new Nordic Cyan update for CYNTROL is looking extremely premium. Kudos to the design team! 🔥", 
    likes: 156, 
    comments: 12,
    timestamp: "3h ago",
    hot: true 
  },
];

export default function CommunityPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-24">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="text-[4rem] font-black tracking-tighter leading-none text-white italic" style={{ fontFamily: 'var(--font-epilogue)' }}>
          COMMUNITY
        </h1>
        <p className="text-white/40 font-bold tracking-widest text-sm uppercase mt-2">
          Decentralized Peer Network
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-8">
           {/* Create Post */}
           <div className="tectonic-plate p-6 bg-primary/5 border border-primary/20">
              <div className="flex gap-4">
                 <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40 shrink-0" />
                 <textarea 
                   placeholder="Deploy message to sector..." 
                   className="w-full bg-transparent border-none text-white placeholder:text-white/20 resize-none py-2 focus:ring-0 text-lg italic font-bold h-24 outline-none"
                 />
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                 <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-xl bg-white/5 text-white/40 text-[10px] font-black uppercase hover:bg-white/10 transition-all">Add Media</button>
                    <button className="px-4 py-2 rounded-xl bg-white/5 text-white/40 text-[10px] font-black uppercase hover:bg-white/10 transition-all">Tag Sector</button>
                 </div>
                 <button className="p-3 bg-primary text-background rounded-xl font-black flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-primary/20">
                    <Send size={18} />
                    <span className="text-xs uppercase">Broadcast</span>
                 </button>
              </div>
           </div>

           {/* Feed */}
           <div className="space-y-8">
              {mockPosts.map((post, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="tectonic-plate p-8 bg-white/5 border-b-4 border-white/5 group hover:border-primary/20 transition-all"
                >
                   <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-surface-container-high border border-white/5" />
                         <div>
                            <p className="text-white font-black italic">{post.user}</p>
                            <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">{post.timestamp}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-2">
                         {post.hot && <Flame size={16} className="text-orange-500" />}
                         <span className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">#{post.tag}</span>
                      </div>
                   </div>

                   <p className="text-white/80 text-lg font-bold leading-relaxed italic mb-8">
                      "{post.content}"
                   </p>

                   <div className="flex items-center gap-8 pt-6 border-t border-white/5">
                      <button className="flex items-center gap-2 text-white/20 hover:text-primary transition-colors group">
                         <Heart size={20} className="group-hover:fill-primary" />
                         <span className="text-[10px] font-black">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-white/20 hover:text-indigo-400 transition-colors">
                         <MessageSquare size={20} />
                         <span className="text-[10px] font-black">{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 text-white/20 hover:text-white transition-colors ml-auto">
                         <Share2 size={20} />
                      </button>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Sidebar / Trending */}
        <div className="space-y-8">
           <div className="tectonic-plate p-8 bg-surface-container-lowest border-r-4 border-primary/30">
              <div className="flex items-center gap-3 mb-8">
                 <Sparkles className="text-primary" size={24} />
                 <h3 className="text-2xl font-black text-white italic">TRENDING NODES</h3>
              </div>
              <div className="space-y-6">
                 {["#CLA2Stress", "#HackSRM2026", "#NordicCyan", "#MessPaneerTikka"].map(tag => (
                   <div key={tag} className="flex flex-col cursor-pointer group">
                      <span className="text-primary font-black text-lg group-hover:underline italic leading-none">{tag}</span>
                      <span className="text-white/20 text-[10px] font-bold uppercase tracking-widest mt-1">1.2k Interactions</span>
                   </div>
                 ))}
              </div>
              <button className="mt-10 w-full py-4 rounded-2xl bg-primary text-background font-black uppercase tracking-wider text-sm hover:scale-[0.98] transition-all">
                 Explore Directory
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

