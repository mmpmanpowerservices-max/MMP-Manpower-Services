import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageCircle,
  Building,
  Shield,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MmpLogo } from '../components/common/MmpLogo';

interface Props {
  setActivePage: (page: string) => void;
}

export const ContactPage: React.FC<Props> = ({ setActivePage }) => {
  const [form, setForm] = useState({
    name: '',
    phone: '+91 ',
    email: '',
    userType: 'Candidate',
    location: 'Davanagere',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 flex flex-col items-center">
        <div className="p-3 bg-gradient-to-b from-[#0c183d] via-[#050c20] to-[#020510] rounded-2xl border border-[#d4af37]/60 shadow-lg shadow-amber-950/30">
          <MmpLogo size="md" showText={false} />
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0a1432] border border-[#d4af37]/40 text-[#f5d061] text-xs font-bold font-mono">
          <span>OFFICIAL MMP MANPOWER HELPDESK & OFFICES</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-heading">
          Contact MMP Manpower Services
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Reach our recruitment desk, employer relations managers, or grievance support team in Davanagere and Raichur, Karnataka.
        </p>
      </div>

      {/* Contact Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3 text-center flex flex-col items-center">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-1">
            <Phone className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900">Direct Phone Support</h3>
          <p className="text-xs text-slate-500">Available Monday to Saturday, 9:00 AM - 7:00 PM</p>
          <div className="pt-2 text-sm font-mono font-bold space-y-1">
            <a href="tel:+919900872399" className="block text-blue-700 hover:underline">
              +91 99008 72399
            </a>
            <a href="tel:+919449940097" className="block text-emerald-700 hover:underline">
              +91 94499 40097
            </a>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3 text-center flex flex-col items-center">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-1">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900">Email Inquiries</h3>
          <p className="text-xs text-slate-500">Responses dispatched within 24 business hours</p>
          <div className="pt-2 text-xs font-semibold">
            <a href="mailto:mmpmanpowerservices@gmail.com" className="text-slate-800 hover:underline">
              mmpmanpowerservices@gmail.com
            </a>
            <span className="block text-slate-400 text-[11px] mt-1 font-mono">
              www.mmpmanpowerservices.com
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3 text-center flex flex-col items-center">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-1">
            <MessageCircle className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900">Official WhatsApp</h3>
          <p className="text-xs text-slate-500">Instant job alert queries & vacancy postings</p>
          <div className="pt-2">
            <a
              href="https://wa.me/919900872399?text=Hello%20MMP%20Manpower%20Services%2C%20I%20would%20like%20to%20inquire%20about..."
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Office Locations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Building className="w-5 h-5" />
            <span>Davanagere Operational Hub</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Davanagere Branch Office<br />
            Industrial & Technical Recruitment Operations<br />
            Davanagere, Karnataka - 577002, India
          </p>
          <div className="pt-2 text-xs text-slate-400 space-y-1">
            <div>Helpline: +91 99008 72399</div>
            <div>Focus: Electronics Assembly, IT, Telecom, Retail Banking</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
            <Building className="w-5 h-5" />
            <span>Raichur Operating Center</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Raichur Regional Office<br />
            Agro-Logistics, Industrial & Staffing Services<br />
            Raichur, Karnataka - 584101, India
          </p>
          <div className="pt-2 text-xs text-slate-400 space-y-1">
            <div>Helpline: +91 94499 40097</div>
            <div>Focus: Agro-Warehousing, Factory Labor, Skilled Trades</div>
          </div>
        </div>
      </div>

      {/* Inquiry Form */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 max-w-3xl mx-auto">
        <h3 className="text-xl font-black text-slate-900 font-heading mb-1 text-center">
          Send an Online Message to MMP Helpdesk
        </h3>
        <p className="text-xs text-slate-500 mb-6 text-center">
          Whether you are seeking employment or looking to hire 100 workers, we are ready to assist.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Ramesh Patil"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Contact Phone *</label>
                <input
                  type="text"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-hidden font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">I am a</label>
                <select
                  value={form.userType}
                  onChange={(e) => setForm({ ...form, userType: e.target.value })}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-hidden bg-white"
                >
                  <option value="Candidate">Job Seeker / Candidate</option>
                  <option value="Employer">Employer / Corporate HR</option>
                  <option value="Franchise">Prospective Franchise Partner</option>
                  <option value="Vendor">Vendor / General Inquiry</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">Your Message or Requisition *</label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Write your recruitment query or hiring requirements..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:border-blue-600 outline-hidden"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1.5 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Send Message to MMP Desk</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-9 h-9 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-base text-slate-900">Message Received!</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Thank you, {form.name}. Our recruitment coordinator in {form.location} will contact you shortly on {form.phone}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
