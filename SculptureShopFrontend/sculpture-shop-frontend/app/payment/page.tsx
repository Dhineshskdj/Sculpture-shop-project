"use client";

// ============================================
// Payment Information Page
// ============================================

import React from "react";
import Image from "next/image";
import { FiCopy, FiCheck, FiPhone, FiInfo } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components";
import { SHOP_INFO } from "@/utils/constants";
import { getWhatsAppUrl } from "@/utils/helpers";
import toast from "react-hot-toast";

const PAYMENT_INFO = {
  upiId: "selvaraj2031974@okicici",
  gpayNumber: "9159948127",
  accountHolder: "Selvaraj",
};

export default function PaymentPage() {
  const [copied, setCopied] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast.success(`${label} copied to clipboard!`);
    setTimeout(() => setCopied(null), 2000);
  };

  const paymentConfirmMessage = `Hello! I have made a payment for my sculpture order.

*Payment Details:*
- Amount: ₹______
- Transaction ID: ______
- Date: ${new Date().toLocaleDateString("en-IN")}

Please confirm the receipt.`;

  const whatsappUrl = getWhatsAppUrl(SHOP_INFO.whatsappNumber, paymentConfirmMessage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-rose-100 rounded-full text-sm text-rose-600 mb-4 font-medium">
            💳 Secure Payment
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Payment Information</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Use any of the payment methods below. After payment, please share the transaction details with us on
            WhatsApp for confirmation.
          </p>
        </div>

        {/* Important Notice */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 flex gap-3">
            <FiInfo className="text-orange-500 flex-shrink-0 mt-0.5 text-xl" />
            <div className="text-amber-900">
              <p className="font-semibold mb-2">Important:</p>
              <ul className="text-sm space-y-1">
                <li>• This is NOT an online payment gateway</li>
                <li>• Make payment using GPay/UPI and share screenshot with us</li>
                <li>• We will confirm your order after payment verification</li>
                <li>• For large orders, advance payment terms will be discussed</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* GPay / UPI Section */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-6 py-4">
              <h2 className="text-xl font-bold text-white">GPay / UPI Payment</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* QR Code */}
                <div className="text-center">
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-4 inline-block">
                    {/* Placeholder for QR Code */}
                    <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
                      <div className="text-center">
                        <svg
                          className="w-16 h-16 text-gray-400 mx-auto mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h2M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                          />
                        </svg>
                        <p className="text-sm text-gray-500">Scan QR Code</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Scan with any UPI app</p>
                </div>

                {/* Payment Details */}
                <div className="space-y-4">
                  {/* UPI ID */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={PAYMENT_INFO.upiId}
                        readOnly
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 font-medium"
                      />
                      <button
                        onClick={() => copyToClipboard(PAYMENT_INFO.upiId, "UPI ID")}
                        className="p-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        {copied === "UPI ID" ? <FiCheck className="text-green-600" /> : <FiCopy />}
                      </button>
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GPay Number</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={PAYMENT_INFO.gpayNumber}
                        readOnly
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 font-medium"
                      />
                      <button
                        onClick={() => copyToClipboard(PAYMENT_INFO.gpayNumber, "GPay Number")}
                        className="p-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        {copied === "GPay Number" ? <FiCheck className="text-green-600" /> : <FiCopy />}
                      </button>
                    </div>
                  </div>

                  {/* Account Holder */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Holder Name</label>
                    <p className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 font-medium">
                      {PAYMENT_INFO.accountHolder}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phone Pay Section */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white">PhonePe / Paytm</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                You can also pay using PhonePe or Paytm using the same UPI ID or mobile number.
              </p>
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
                <FiPhone className="text-purple-600 text-xl" />
                <div>
                  <p className="font-semibold text-gray-800">{PAYMENT_INFO.gpayNumber}</p>
                  <p className="text-sm text-gray-500">Linked to all UPI apps</p>
                </div>
              </div>
            </div>
          </div>

          {/* After Payment Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">After Making Payment</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-rose-500/30">
                  <span className="text-white font-medium">1</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Take a screenshot</p>
                  <p className="text-sm text-gray-600">Capture the payment confirmation screen</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/30">
                  <span className="text-white font-medium">2</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Send us the details</p>
                  <p className="text-sm text-gray-600">Share screenshot and transaction ID on WhatsApp</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/30">
                  <span className="text-white font-medium">3</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Receive confirmation</p>
                  <p className="text-sm text-gray-600">We&apos;ll verify and confirm your order</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <Button href={whatsappUrl} external variant="whatsapp" size="lg" fullWidth leftIcon={<FaWhatsapp />}>
                Confirm Payment on WhatsApp
              </Button>
            </div>
          </div>

          {/* Contact for Queries */}
          <div className="text-center py-6">
            <p className="text-gray-600 mb-4">Have questions about payment? Feel free to contact us.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`tel:${SHOP_INFO.phone1}`}
                className="flex items-center gap-2 text-rose-600 hover:text-rose-700 font-medium"
              >
                <FiPhone />
                {SHOP_INFO.phone1}
              </a>
              <a
                href={`tel:${SHOP_INFO.phone2}`}
                className="flex items-center gap-2 text-rose-600 hover:text-rose-700 font-medium"
              >
                <FiPhone />
                {SHOP_INFO.phone2}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
