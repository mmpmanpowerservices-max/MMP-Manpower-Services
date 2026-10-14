import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CreditCard,
  QrCode,
  Building2,
  CheckCircle2,
  FileText,
  Printer,
  Lock,
  AlertTriangle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { PaymentTransaction } from '../../types';
import { MmpLogo } from './MmpLogo';

interface Props {
  userType: 'Candidate' | 'Employer';
  userId: string;
  userName: string;
  serviceType: PaymentTransaction['serviceType'];
  planName: string;
  amount: number;
  durationDays?: number;
  features?: string[];
  onClose: () => void;
  onSuccess?: (payment: PaymentTransaction) => void;
}

export const PaymentModal: React.FC<Props> = ({
  userType,
  userId,
  userName,
  serviceType,
  planName,
  amount,
  durationDays = 90,
  features = [],
  onClose,
  onSuccess,
}) => {
  const { purchaseMembershipOrService } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<PaymentTransaction['paymentMethod']>('UPI');
  const [selectedBank, setSelectedBank] = useState('State Bank of India');
  const [upiId, setUpiId] = useState('user@okhdfcbank');
  const [cardDetails, setCardDetails] = useState({
    number: '4532 •••• •••• 8821',
    expiry: '12/28',
    cvv: '•••',
    nameOnCard: userName,
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedPayment, setCompletedPayment] = useState<PaymentTransaction | null>(null);

  // Tax calculations
  const gstAmount = Math.round(amount * 0.18);
  const totalPayable = amount + gstAmount;

  const handlePay = () => {
    if (!acceptedTerms) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);

      const txn = purchaseMembershipOrService({
        userId,
        userName,
        userType,
        serviceType,
        planName,
        amount: totalPayable,
        paymentMethod,
        durationDays,
      });

      setCompletedPayment(txn);

      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // canvas-confetti fallback
      }

      if (onSuccess) onSuccess(txn);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden my-6">
        {/* Header with Official Logo */}
        <div className="bg-gradient-to-r from-[#030a1c] via-[#091a3e] to-[#040d24] text-white p-5 flex items-center justify-between border-b border-[#d4af37]/30">
          <div className="flex items-center gap-3">
            <div className="p-1 bg-[#0a142f] border border-[#d4af37]/40 rounded-xl">
              <MmpLogo size="sm" showText={false} />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#f5d061] font-mono">
                MMP MANPOWER SERVICES • SECURE GATEWAY
              </span>
              <h3 className="text-base font-black text-white font-heading">{planName}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!completedPayment ? (
          <div className="p-6">
            {/* Beneficiary Banner */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl mb-5 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-500 block">Subscribing Entity</span>
                <strong className="text-slate-900 text-sm font-bold">{userName}</strong>
                <span className="text-slate-500 block text-[11px]">ID: {userId}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block">Service Category</span>
                <span className="font-semibold text-blue-700">{serviceType}</span>
              </div>
            </div>

            {/* Fee summary */}
            <div className="border border-slate-200 rounded-xl p-4 bg-white mb-5 space-y-2">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Base Plan Price ({planName})</span>
                <span className="font-semibold text-slate-900">₹{amount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Applicable GST (18% Statutory CGST + SGST)</span>
                <span>₹{gstAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="border-t border-slate-100 pt-2 flex justify-between text-base font-bold text-slate-900">
                <span>Total Amount Payable</span>
                <span className="text-blue-700 text-lg">₹{totalPayable.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Select Payment Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'UPI'
                      ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-2 ring-blue-600/20 font-bold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <QrCode className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                  <span className="text-xs block">UPI / QR Code</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('NetBanking')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'NetBanking'
                      ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-2 ring-blue-600/20 font-bold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <Building2 className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                  <span className="text-xs block">NetBanking</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Debit/Credit Card')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'Debit/Credit Card'
                      ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-2 ring-blue-600/20 font-bold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1 text-purple-600" />
                  <span className="text-xs block">Debit/Card</span>
                </button>
              </div>
            </div>

            {/* Payment Mode Detail */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-5">
              {paymentMethod === 'UPI' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 bg-white border border-slate-300 rounded-lg p-1.5 flex items-center justify-center shrink-0">
                      {/* Simulated QR Pattern */}
                      <div className="w-full h-full bg-slate-900 rounded flex flex-col items-center justify-center text-[9px] text-white font-mono p-1 text-center">
                        <QrCode className="w-8 h-8 text-white mb-0.5" />
                        <span>BHIM / UPI</span>
                      </div>
                    </div>
                    <div className="text-xs space-y-1">
                      <p className="font-bold text-slate-800">Scan & Pay using any UPI App</p>
                      <p className="text-slate-500">Google Pay, PhonePe, Paytm, BHIM</p>
                      <div className="mt-1 bg-white px-2 py-1 rounded border border-slate-200 font-mono text-[11px] text-slate-700">
                        VPA: <strong>mmpmanpower@upi</strong>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Or enter your Virtual Payment Address (VPA)
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="mobile@upi / username@okhdfcbank"
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'NetBanking' && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 block">Select Corporate or Retail Bank</label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="State Bank of India">State Bank of India (SBI)</option>
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                    <option value="Canara Bank">Canara Bank (Karnataka Lead)</option>
                    <option value="Axis Bank">Axis Bank</option>
                  </select>
                  <p className="text-[11px] text-slate-500">
                    You will be securely routed through 256-bit encrypted gateway for bank authorization.
                  </p>
                </div>
              )}

              {paymentMethod === 'Debit/Credit Card' && (
                <div className="space-y-2.5 text-xs">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-600 font-medium mb-1">Valid Thru</label>
                      <input
                        type="text"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                        className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-medium mb-1">CVV</label>
                      <input
                        type="password"
                        maxLength={3}
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                        className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mandatory Disclaimer Checkbox */}
            <div className="mb-5 p-3 rounded-xl bg-amber-50/80 border border-amber-200">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs text-amber-950 leading-relaxed">
                  {userType === 'Candidate' ? (
                    <>
                      I understand that <strong>MMP Membership provides access to MMP recruitment services, opportunities and support</strong>. Job placement, interview and selection depend on employer requirements and candidate suitability (no guaranteed employment).
                    </>
                  ) : (
                    <>
                      I confirm that <strong>employer registration/membership fees are non-refundable</strong> subject to MMP terms. We agree that MMP-introduced candidates shall not be bypassed for direct hiring outside the agreed recruitment process.
                    </>
                  )}
                </span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!acceptedTerms || isProcessing}
                onClick={handlePay}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay ₹{totalPayable.toLocaleString('en-IN')} Securely</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Payment Success & Invoice */
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-xl font-black text-slate-900 font-heading">Payment Successful!</h3>
              <p className="text-xs text-slate-600 mt-1">
                Your service has been activated on the MMP Manpower ERP system.
              </p>
            </div>

            {/* Official Tax Invoice Card with Official Logo */}
            <div className="border-2 border-[#d4af37]/40 rounded-2xl p-4.5 bg-slate-50 text-xs font-mono space-y-2 mb-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="p-1 bg-[#0a1228] border border-[#d4af37]/40 rounded-xl">
                    <MmpLogo size="xs" showText={false} />
                  </div>
                  <div>
                    <span className="font-black text-[#0a1128] font-heading block">MMP MANPOWER SERVICES</span>
                    <span className="block text-[10px] text-slate-500">GSTIN: 29AABCM9900M1Z3 • DAVANGERE</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[10px]">✓ PAID & VERIFIED</span>
                  <span className="block text-[10px] text-slate-500 font-bold mt-0.5">{completedPayment.invoiceNumber}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] py-1">
                <div>
                  <span className="text-slate-500 block">Billed To:</span>
                  <strong>{completedPayment.userName}</strong>
                  <span className="text-slate-500 block">ID: {completedPayment.userId}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block">Date & Ref:</span>
                  <span>{completedPayment.date}</span>
                  <span className="text-slate-500 block text-[10px]">{completedPayment.id}</span>
                </div>
              </div>
              <div className="border-t border-slate-200 pt-2 space-y-1">
                <div className="flex justify-between font-sans">
                  <span>{completedPayment.serviceType} - {completedPayment.planName}</span>
                  <strong>₹{completedPayment.amount.toLocaleString('en-IN')}</strong>
                </div>
                <div className="flex justify-between text-slate-500 text-[10px] font-sans">
                  <span>Method: {completedPayment.paymentMethod}</span>
                  <span>Status: Verified & Activated</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
              >
                Go to Portal Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
