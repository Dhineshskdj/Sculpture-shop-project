"use client";

// ============================================
// Admin Inquiries List Page
// ============================================

import React, { useState, useEffect } from "react";
import { ContactRequest } from "@/types";
import { Button, Modal, Spinner } from "@/components";
import { formatDate, getWhatsAppUrl } from "@/utils/helpers";
import { FiSearch, FiEye, FiCheck, FiX, FiPhone, FiMail, FiMessageCircle, FiFilter } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import toast from "react-hot-toast";

// Dummy data
const DUMMY_INQUIRIES: ContactRequest[] = [
  {
    id: 1,
    name: "Ramesh Kumar",
    email: "ramesh@email.com",
    phone: "9876543210",
    message:
      "I am interested in the Lord Ganesha sculpture. Can you provide more details about dimensions and delivery?",
    sculpture_ids: "1,3",
    sculpture_names: "Lord Ganesha, Dancing Nataraja",
    status: "pending",
    created_at: "2024-03-15T10:30:00",
  },
  {
    id: 2,
    name: "Lakshmi Devi",
    email: "lakshmi@email.com",
    phone: "9123456789",
    message: "Looking for a Buddha statue for my meditation room. What sizes are available?",
    sculpture_ids: "2",
    sculpture_names: "Buddha Meditation",
    status: "pending",
    created_at: "2024-03-14T14:15:00",
  },
  {
    id: 3,
    name: "Suresh Temple Trust",
    email: "trust@temple.org",
    phone: "9988776655",
    message: "We need multiple sculptures for our new temple. Please contact us for bulk order discussion.",
    sculpture_ids: "4",
    sculpture_names: "Temple Nandi",
    status: "contacted",
    created_at: "2024-03-13T09:00:00",
  },
  {
    id: 4,
    name: "Arun Garden Designs",
    email: "arun@gardens.com",
    phone: "9556677889",
    message: "Interested in garden sculptures for a resort project. Need 5-6 different pieces.",
    sculpture_ids: "5",
    sculpture_names: "Garden Angel",
    status: "completed",
    created_at: "2024-03-10T16:45:00",
  },
];

type StatusFilter = "all" | "pending" | "contacted" | "completed";

const STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-700",
  contacted: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
};

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<ContactRequest | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchInquiries = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setInquiries(DUMMY_INQUIRIES);
      setLoading(false);
    };

    fetchInquiries();
  }, []);

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.phone?.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || inquiry.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = async (id: number, status: string) => {
    setInquiries((prev) => prev.map((inq) => (inq.id === id ? { ...inq, status } : inq)));
    toast.success(`Status updated to ${status}`);
    if (selectedInquiry?.id === id) {
      setSelectedInquiry((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const viewDetails = (inquiry: ContactRequest) => {
    setSelectedInquiry(inquiry);
    setModalOpen(true);
  };

  const pendingCount = inquiries.filter((i) => i.status === "pending").length;

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Customer Inquiries</h1>
        <p className="text-gray-500">
          Manage customer inquiries and contact requests
          {pendingCount > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-700 text-sm rounded-full">
              {pendingCount} pending
            </span>
          )}
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="contacted">Contacted</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FiMessageCircle className="mx-auto text-4xl text-gray-400 mb-3" />
            <p className="text-gray-500">No inquiries found</p>
          </div>
        ) : (
          filteredInquiries.map((inquiry) => (
            <div key={inquiry.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                {/* Left: Customer Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-800">{inquiry.name}</h3>
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${STATUS_COLORS[inquiry.status as keyof typeof STATUS_COLORS]}`}
                    >
                      {inquiry.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-2">
                    <span className="flex items-center gap-1">
                      <FiMail className="text-gray-400" />
                      {inquiry.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiPhone className="text-gray-400" />
                      {inquiry.phone}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-2">{inquiry.message}</p>
                  {inquiry.sculpture_names && (
                    <p className="text-sm">
                      <span className="text-gray-500">Interested in:</span>{" "}
                      <span className="text-amber-600">{inquiry.sculpture_names}</span>
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-2">{formatDate(inquiry.created_at, true)}</p>
                </div>

                {/* Right: Actions */}
                <div className="flex sm:flex-col gap-2">
                  <Button size="sm" variant="outline" onClick={() => viewDetails(inquiry)} leftIcon={<FiEye />}>
                    View
                  </Button>
                  <a
                    href={getWhatsAppUrl(
                      inquiry.phone || "",
                      `Hi ${inquiry.name}, regarding your inquiry about our sculptures...`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" variant="whatsapp" leftIcon={<FaWhatsapp />} fullWidth>
                      Reply
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Stats */}
      {!loading && (
        <div className="mt-4 text-sm text-gray-500">
          Showing {filteredInquiries.length} of {inquiries.length} inquiries
        </div>
      )}

      {/* Detail Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Inquiry Details" size="lg">
        {selectedInquiry && (
          <div className="p-6">
            {/* Customer Info */}
            <div className="border-b pb-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{selectedInquiry.name}</h3>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${STATUS_COLORS[selectedInquiry.status as keyof typeof STATUS_COLORS]}`}
                >
                  {selectedInquiry.status}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                <a
                  href={`mailto:${selectedInquiry.email}`}
                  className="flex items-center gap-1 text-amber-600 hover:text-amber-700"
                >
                  <FiMail />
                  {selectedInquiry.email}
                </a>
                <a
                  href={`tel:${selectedInquiry.phone}`}
                  className="flex items-center gap-1 text-amber-600 hover:text-amber-700"
                >
                  <FiPhone />
                  {selectedInquiry.phone}
                </a>
              </div>
            </div>

            {/* Message */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">Message</h4>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedInquiry.message}</p>
            </div>

            {/* Sculptures */}
            {selectedInquiry.sculpture_names && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Interested Sculptures</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedInquiry.sculpture_names.split(",").map((name, index) => (
                    <span key={index} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
                      {name.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Timestamp */}
            <p className="text-sm text-gray-400 mb-6">Received on {formatDate(selectedInquiry.created_at, true)}</p>

            {/* Actions */}
            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-700 mb-3">Update Status</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => updateStatus(selectedInquiry.id, "pending")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedInquiry.status === "pending"
                      ? "bg-yellow-500 text-white"
                      : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => updateStatus(selectedInquiry.id, "contacted")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedInquiry.status === "contacted"
                      ? "bg-blue-500 text-white"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                >
                  Contacted
                </button>
                <button
                  onClick={() => updateStatus(selectedInquiry.id, "completed")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedInquiry.status === "completed"
                      ? "bg-green-500 text-white"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  Completed
                </button>
              </div>

              <div className="flex gap-2">
                <a
                  href={getWhatsAppUrl(
                    selectedInquiry.phone || "",
                    `Hi ${selectedInquiry.name}, regarding your inquiry about our sculptures...`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="whatsapp" fullWidth leftIcon={<FaWhatsapp />}>
                    Reply on WhatsApp
                  </Button>
                </a>
                <Button variant="outline" onClick={() => setModalOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
