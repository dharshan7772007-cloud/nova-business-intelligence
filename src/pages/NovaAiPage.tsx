import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  HelpCircle,
  Database,
  ArrowRight,
  TrendingUp,
  Activity,
  Layers,
  CheckCircle2,
  Cpu,
  RefreshCw,
  Lightbulb
} from 'lucide-react';
import { useBusinessData } from '../context/BusinessDataContext';
import { queryNovaLocalIntelligence } from '../services/analyticsEngine';
import { NovaSphereIndicator } from '../components/three/NovaSphereIndicator';

interface ChatMessage {
  id: string;
  sender: 'user' | 'nova';
  text: string;
  headline?: string;
  keyMetrics?: { label: string; value: string }[];
  actionRecommendation?: string;
  timestamp: string;
}

export const NovaAiPage: React.FC = () => {
  const {
    filteredTransactions,
    transactions,
    metrics,
    healthScore,
    userPreferences,
    formatCurrency
  } = useBusinessData();

  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'nova',
      headline: 'NOVA Autonomous Intelligence Initialized',
      text: `Greetings. I am connected directly to your active business dataset containing ${filteredTransactions.length} transaction records. Ask me anything regarding revenue drivers, product margins, customer loyalty, or operational bottlenecks.`,
      keyMetrics: [
        { label: 'Active Pipeline', value: formatCurrency(metrics.totalRevenue) },
        { label: 'Health Score', value: `${healthScore.totalScore}/100` },
        { label: 'Order Volume', value: `${metrics.totalOrders} Orders` }
      ],
      actionRecommendation: healthScore.recommendations[0] || 'Analyze predictive cash flow projections in the Forecasting tab.',
      timestamp: 'Just now'
    }
  ]);

  const suggestedQuestions = [
    'Why did revenue decrease this month?',
    'Which product performs best?',
    'Which month had the highest revenue?',
    'What is my customer retention trend?',
    'What actions could improve sales?',
    'Summarise my business performance.'
  ];

  const handleAsk = async (queryText: string) => {
    if (!queryText.trim() || isThinking) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: queryText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsThinking(true);

    // Compute answer using mathematical analytics engine
    setTimeout(async () => {
      // First, compute grounded math and facts
      const localResult = queryNovaLocalIntelligence(queryText, filteredTransactions);

      // Attempt server proxy if configured, otherwise use grounded analytical result
      let finalHeadline = localResult.headline;
      let finalAnswer = localResult.answer;
      let finalMetrics = localResult.keyMetrics;
      let finalAction = localResult.actionRecommendation;

      try {
        const response = await fetch('/api/ai-insights', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: queryText,
            metrics,
            healthScore,
            groundedData: localResult
          })
        });

        if (response.ok) {
          const aiData = await response.json();
          if (aiData.answer) {
            finalAnswer = aiData.answer;
            if (aiData.headline) finalHeadline = aiData.headline;
            if (aiData.actionRecommendation) finalAction = aiData.actionRecommendation;
          }
        }
      } catch {
        // Smoothly fall back to local mathematical engine with zero error
      }

      const novaReply: ChatMessage = {
        id: `nova-${Date.now()}`,
        sender: 'nova',
        headline: finalHeadline,
        text: finalAnswer,
        keyMetrics: finalMetrics,
        actionRecommendation: finalAction,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, novaReply]);
      setIsThinking(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl font-bold text-white tracking-tight">
              NOVA Intelligence
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#8B5CF6]/20 text-[#22D3EE] border border-[#8B5CF6]/30">
              Autonomous Analyst
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Grounded factual reasoning over your live business records. Zero hallucinated metrics.
          </p>
        </div>

        {/* Live Context Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#151C2C] border border-white/[0.08] text-xs text-[#94A3B8]">
          <Database className="w-3.5 h-3.5 text-[#22D3EE]" />
          <span>Context: <strong className="text-white">{filteredTransactions.length}</strong> records</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Chat Workspace (8 cols) */}
        <div className="lg:col-span-8 flex flex-col h-[680px] nova-card rounded-2xl p-5 overflow-hidden">
          {/* Header indicator */}
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <NovaSphereIndicator size={40} isThinking={isThinking} />
              <div>
                <h3 className="font-heading text-sm font-bold text-white">NOVA Assistant Model</h3>
                <p className="text-[11px] text-[#22D3EE]">
                  {isThinking ? 'Evaluating mathematical regression...' : 'Online & Synchronized'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setMessages([
                  {
                    id: 'msg-init-reset',
                    sender: 'nova',
                    headline: 'Intelligence Context Reloaded',
                    text: `Dataset context refreshed for ${userPreferences.businessName}. Ready for new inquiries.`,
                    timestamp: 'Just now'
                  }
                ]);
              }}
              className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/[0.05] transition-colors"
              title="Reset conversation"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {msg.sender === 'user' ? (
                  <div className="max-w-[85%] rounded-2xl bg-gradient-to-r from-[#8B5CF6]/30 to-[#6366F1]/30 border border-[#8B5CF6]/40 px-4 py-2.5 text-xs text-white shadow-md">
                    <p>{msg.text}</p>
                    <span className="text-[10px] text-[#94A3B8] block text-right mt-1">{msg.timestamp}</span>
                  </div>
                ) : (
                  <div className="max-w-[95%] rounded-2xl bg-[#111827] border border-white/[0.08] p-4 text-xs space-y-3 shadow-xl">
                    {msg.headline && (
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#22D3EE]" />
                        <h4 className="font-heading text-xs font-bold text-white">{msg.headline}</h4>
                      </div>
                    )}
                    <p className="text-[#F8FAFC] leading-relaxed">{msg.text}</p>

                    {/* Key Metrics Cards if present */}
                    {msg.keyMetrics && msg.keyMetrics.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 py-2 border-y border-white/[0.06]">
                        {msg.keyMetrics.map((km, i) => (
                          <div key={i} className="text-center p-2 rounded-lg bg-white/[0.02]">
                            <p className="text-[10px] text-[#94A3B8] truncate">{km.label}</p>
                            <p className="text-xs font-bold text-[#22D3EE] font-mono mt-0.5">{km.value}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Strategic Action Recommendation */}
                    {msg.actionRecommendation && (
                      <div className="p-2.5 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-start gap-2 text-[#C084FC]">
                        <Lightbulb className="w-4 h-4 shrink-0 text-[#22D3EE] mt-0.5" />
                        <div>
                          <span className="font-semibold text-white text-[11px]">Recommended Commercial Action: </span>
                          <span className="text-[11px] text-[#C084FC]">{msg.actionRecommendation}</span>
                        </div>
                      </div>
                    )}

                    <span className="text-[10px] text-[#94A3B8]/60 block">{msg.timestamp}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Suggested Quick Prompt Pills */}
          <div className="pt-2 pb-3 border-t border-white/[0.06] flex items-center gap-2 overflow-x-auto">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleAsk(q)}
                className="shrink-0 px-2.5 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-[11px] text-[#94A3B8] hover:text-white transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleAsk(inputQuery);
            }}
            className="flex items-center gap-2 pt-2"
          >
            <input
              type="text"
              placeholder="Ask a commercial question about your revenue, products, or customers..."
              value={inputQuery}
              onChange={e => setInputQuery(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#111827] border border-white/[0.1] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#22D3EE]"
            />
            <button
              type="submit"
              disabled={isThinking || !inputQuery.trim()}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] hover:opacity-90 disabled:opacity-40 text-xs font-semibold text-white shadow-lg shadow-[#8B5CF6]/20 transition-all flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ask</span>
            </button>
          </form>
        </div>

        {/* Right Data Context Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="nova-card rounded-2xl p-5 space-y-4">
            <h3 className="font-heading text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#22D3EE]" />
              <span>Data Foundation</span>
            </h3>
            <p className="text-xs text-[#94A3B8]">
              NOVA Intelligence calculates answers in real-time using deterministic math models:
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs">
                <div className="flex justify-between text-[#94A3B8]">
                  <span>Total Gross Pipeline</span>
                  <span className="text-white font-mono font-bold">{formatCurrency(metrics.totalRevenue)}</span>
                </div>
                <div className="flex justify-between text-[#94A3B8] mt-1.5">
                  <span>Period Trajectory</span>
                  <span className={metrics.revenueChange >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}>
                    {metrics.revenueChange >= 0 ? '+' : ''}{metrics.revenueChange}%
                  </span>
                </div>
                <div className="flex justify-between text-[#94A3B8] mt-1.5">
                  <span>Customer Base</span>
                  <span className="text-white">{metrics.totalCustomers} Accounts</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs">
                <p className="font-semibold text-white mb-1">Health Score Component</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#94A3B8]">Vitality Status:</span>
                  <span className="text-[#22D3EE] font-bold">{healthScore.grade} ({healthScore.totalScore}/100)</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-[11px] text-[#C084FC]">
                🛡️ <strong>Safety Guarantee:</strong> Keys remain on backend. Math computations run on your exact transaction arrays without arbitrary numbers.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
