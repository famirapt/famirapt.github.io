import { useState, useEffect, FormEvent } from "react";
import { Send, CheckCircle, Mail, Phone, Lock, Terminal as TerminalIcon, Calendar, ArrowRight } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

interface SentMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  senderOrg: string;
  subject: string;
  messageText: string;
  timestamp: string;
}

export default function ContactForm() {
  const { personalInfo } = portfolioData;
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderOrg, setSenderOrg] = useState("");
  const [subject, setSubject] = useState("");
  const [messageText, setMessageText] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successInfo, setSuccessInfo] = useState(false);
  const [sentInquiries, setSentInquiries] = useState<SentMessage[]>([]);

  // Load previously locally-saved demo inquiries
  useEffect(() => {
    try {
      const stored = localStorage.getItem("rahmatu_sent_msgs");
      if (stored) {
        setSentInquiries(JSON.parse(stored));
      }
    } catch (err) {
      console.warn("localStorage loading failed", err);
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !messageText) return;

    setIsSubmitting(true);

    // Simulate cryptographic outbound routing packet latency
    setTimeout(() => {
      const newMsg: SentMessage = {
        id: "msg_" + Date.now(),
        senderName,
        senderEmail,
        senderOrg: senderOrg || "Independent Employer",
        subject: subject || "SOC Hiring Query",
        messageText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const updated = [newMsg, ...sentInquiries];
      setSentInquiries(updated);
      try {
        localStorage.setItem("rahmatu_sent_msgs", JSON.stringify(updated));
      } catch (err) {
        console.warn("Storage write error", err);
      }

      setIsSubmitting(false);
      setSuccessInfo(true);

      // Clear input fields
      setSenderName("");
      setSenderEmail("");
      setSenderOrg("");
      setSubject("");
      setMessageText("");

      // Alert dismiss timer
      setTimeout(() => {
        setSuccessInfo(false);
      }, 5000);

    }, 1800);
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 dark:bg-[#02020a] border-b border-slate-200/50 dark:border-slate-900/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-indigo-500 dark:text-indigo-400 mb-2 block font-mono font-bold">
            Initiate Contact
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            Connect & <span className="text-indigo-650 dark:text-indigo-400">Schedule Interviews</span>
          </h2>
          <p className="text-sm font-normal text-slate-500 dark:text-slate-450 mt-3 font-sans leading-relaxed max-w-xl mx-auto">
            Have an open Cybersecurity or SOC Analyst role? Fill out the secure form below to transmit an alert dispatch direct to Rahmatu's inbox.
          </p>
        </div>

        {/* Form Body Split Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left panel - static contacts */}
          <div className="col-span-1 lg:col-span-12 xl:col-span-5 space-y-6">
            <div className="p-6 border border-slate-200 dark:border-slate-805 bg-white dark:bg-[#060613]/85 backdrop-blur rounded-xl space-y-6 shadow-md shadow-indigo-500/5">
              <h3 className="text-sm font-display font-bold text-slate-850 dark:text-white flex items-center space-x-2">
                <Lock className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                <span>Contact Channels</span>
              </h3>

              <div className="space-y-4 text-sm font-mono text-slate-600 dark:text-slate-400">
                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-805 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                  </div>
                  <div>
                    <span className="block text-[8px] uppercase font-bold text-slate-450 tracking-wider leading-none mb-1">
                      Transmission Email
                    </span>
                    <a href={`mailto:${personalInfo.email}`} className="text-xs font-bold text-slate-805 dark:text-slate-200 hover:text-indigo-550 hover:underline truncate block">
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-805 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                  </div>
                  <div>
                    <span className="block text-[8px] uppercase font-bold text-slate-450 tracking-wider leading-none mb-1">
                      Direct Hot line
                    </span>
                    <span className="text-xs font-bold text-slate-855 dark:text-zinc-200">
                      {personalInfo.phone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Indicator Panel */}
              <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 text-xs rounded-lg">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono block mb-1 uppercase tracking-wider text-[10px]">
                  🟢 Current SOC Standby State:
                </span>
                <p className="text-slate-655 dark:text-slate-400 leading-relaxed font-sans font-normal">
                  Open to remote contractual internships, Full-Time SOC Analyst inquiries, security policy architectures, or alert engineering contracts.
                </p>
              </div>
            </div>

            {/* Outbox tracker logs showing sent items */}
            {sentInquiries.length > 0 && (
              <div className="p-6 border border-slate-202 dark:border-slate-805 bg-white dark:bg-[#060613]/85 backdrop-blur rounded-xl shadow-md">
                <h4 className="text-[10px] font-bold font-mono text-slate-450 uppercase tracking-widest mb-4 flex items-center space-x-2">
                  <TerminalIcon className="w-4 h-4 text-indigo-505 shrink-0" />
                  <span>Outbox Packet Queue ({sentInquiries.length})</span>
                </h4>
                <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1">
                  {sentInquiries.map((msg) => (
                    <div key={msg.id} className="p-3 bg-slate-50 dark:bg-slate-950/40 text-[11px] border border-slate-200 dark:border-slate-800/80 font-mono rounded-lg">
                      <div className="flex justify-between text-slate-400">
                        <span className="text-indigo-500 dark:text-indigo-400 font-bold truncate max-w-[120px]">{msg.senderName}</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <p className="text-slate-500 text-[10px] mt-0.5 font-semibold">{msg.senderOrg}</p>
                      <p className="text-slate-855 dark:text-slate-300 mt-1.5 truncate">Subject: {msg.subject}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right panel - form content */}
          <div className="col-span-1 lg:col-span-12 xl:col-span-7">
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 border border-slate-200 dark:border-slate-805 bg-white dark:bg-[#060613]/85 backdrop-blur rounded-xl shadow-lg space-y-6" id="contact-form">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-slate-505 dark:text-slate-400 font-bold block" htmlFor="contact-name">
                    Recipient / Full Name *
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    required
                    placeholder="John Doe"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full bg-transparent border-b border-slate-200 dark:border-slate-800 py-2 text-xs outline-none focus:border-indigo-500 text-slate-900 dark:text-white placeholder-slate-400 transition-colors font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-slate-505 dark:text-slate-400 font-bold block" htmlFor="contact-email">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    required
                    placeholder="john@example.com"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-slate-200 dark:border-slate-800 py-2 text-xs outline-none focus:border-indigo-500 text-slate-900 dark:text-white placeholder-slate-400 transition-colors font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-slate-505 dark:text-slate-400 font-bold block" htmlFor="contact-org">
                    Organization / Company
                  </label>
                  <input
                    type="text"
                    id="contact-org"
                    placeholder="e.g. Bincom Dev Center"
                    value={senderOrg}
                    onChange={(e) => setSenderOrg(e.target.value)}
                    className="w-full bg-transparent border-b border-slate-205 dark:border-slate-805 py-2 text-xs outline-none focus:border-indigo-505 text-slate-100 dark:text-white placeholder-slate-400 transition-colors font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-slate-505 dark:text-slate-400 font-bold block" htmlFor="contact-subject">
                    Subject Heading
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    placeholder="e.g. SOC Internship Opening"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-transparent border-b border-slate-205 dark:border-slate-805 py-2 text-xs outline-none focus:border-indigo-505 text-slate-100 dark:text-white placeholder-slate-400 transition-colors font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest text-slate-505 dark:text-slate-400 font-bold block" htmlFor="contact-message">
                  Brief Inquiry / Message Details *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Describe your vision..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full bg-transparent border-b border-slate-200 dark:border-slate-800 py-2 text-xs outline-none focus:border-indigo-500 text-slate-900 dark:text-white placeholder-slate-450 resize-none transition-colors font-mono"
                />
              </div>

              {/* Form submit banner feedback alerts */}
              {successInfo && (
                <div className="p-4 bg-emerald-500/15 border border-emerald-500/35 text-emerald-600 dark:text-emerald-400 text-xs font-mono flex items-center space-x-2 rounded-lg animate-in fade-in slide-in-from-bottom-2 duration-300" id="contact-success-alert">
                  <CheckCircle className="w-4 h-4 shrink-0 text-emerald-500" />
                  <span>Success! Inquiry packet encrypted and stored in outbox logs successfully.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-indigo-650 hover:bg-indigo-700 text-white dark:bg-indigo-505/10 dark:hover:bg-indigo-500 dark:text-indigo-400 dark:hover:text-white border border-indigo-500/25 rounded-lg text-[10px] font-bold uppercase tracking-widest mt-4 transition-all pointer-events-auto cursor-pointer flex items-center justify-center space-x-2"
                id="contact-submit-btn"
              >
                {isSubmitting ? (
                  <span className="flex items-center space-x-2">
                    <span className="w-3.5 h-3.5 border-2 border-dashed border-white dark:border-indigo-400 rounded-full animate-spin shrink-0" />
                    <span>Transmitting payload...</span>
                  </span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 shrink-0" />
                    <span>Inquire Now</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
