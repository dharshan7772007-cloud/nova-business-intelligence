import React, { useState } from 'react';
import {
  Sparkles,
  Lock,
  User,
  Mail,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import { useBusinessData } from '../context/BusinessDataContext';

export const AuthPage: React.FC = () => {
  const { loginDemoUser, setActiveView, currentUser } = useBusinessData();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (password.length < 4) {
      setErrorMsg('Password must be at least 4 characters.');
      return;
    }

    loginDemoUser(email, name || 'Executive User');
    setActiveView('overview');
  };

  const handleQuickDemoAccess = () => {
    loginDemoUser('alex.rivera@novabi.io', 'Alex Rivera');
    setActiveView('overview');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl bg-[#151C2C] border border-[#8B5CF6]/30 shadow-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#8B5CF6]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#22D3EE]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 rounded-2xl bg-gradient-to-tr from-[#8B5CF6] to-[#22D3EE] p-[1.5px] shadow-lg shadow-[#8B5CF6]/25 mx-auto">
            <div className="h-full w-full bg-[#080B14] rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#22D3EE]" />
            </div>
          </div>
          <h2 className="font-heading text-2xl font-bold text-white tracking-tight">
            {isRegister ? 'Create NOVA Account' : 'Welcome to NOVA'}
          </h2>
          <p className="text-xs text-[#94A3B8]">
            {isRegister ? 'Experience next-generation business intelligence' : 'Sign in to access your business analytics'}
          </p>
        </div>

        {/* Demo Notice Banner */}
        <div className="p-3 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-[11px] text-[#C084FC] flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
          <div>
            <strong className="text-white">Demonstration Environment: </strong>
            <span>Authentication simulates protected session routing. Click below for instant one-click demo access.</span>
          </div>
        </div>

        {/* One-Click Demo Access Button */}
        <button
          type="button"
          onClick={handleQuickDemoAccess}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-xs font-semibold text-white shadow-lg shadow-[#8B5CF6]/20 hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
        >
          <UserCheck className="w-4 h-4" />
          <span>Instant One-Click Demo Access</span>
        </button>

        <div className="flex items-center gap-3 text-xs text-[#94A3B8]/60 my-2">
          <div className="h-px flex-1 bg-white/[0.08]" />
          <span>OR CONTINUE WITH FORM</span>
          <div className="h-px flex-1 bg-white/[0.08]" />
        </div>

        {errorMsg && (
          <div className="p-2.5 rounded-lg bg-[#EF4444]/15 border border-[#EF4444]/30 text-xs text-[#EF4444] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-medium text-[#94A3B8] mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Alex Rivera"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#111827] border border-white/[0.1] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#22D3EE]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-[#94A3B8] mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="alex.rivera@novabi.io"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#111827] border border-white/[0.1] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#22D3EE]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#94A3B8] mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#111827] border border-white/[0.1] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#22D3EE]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-xs font-semibold text-white transition-colors"
          >
            {isRegister ? 'Register Demo Account' : 'Sign In'}
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setErrorMsg('');
            }}
            className="text-xs text-[#22D3EE] hover:underline"
          >
            {isRegister ? 'Already have credentials? Sign in' : "Don't have an account? Register demo"}
          </button>
        </div>
      </div>
    </div>
  );
};
