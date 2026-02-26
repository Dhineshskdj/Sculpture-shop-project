"use client";

// ============================================
// Admin Custom Requests Page
// ============================================

import React, { useState, useEffect } from "react";
import { CustomRequest } from "@/types";
import { Button, Modal, Spinner } from "@/components";
import { formatDate, formatPrice, getWhatsAppUrl } from "@/utils/helpers";
import { FiSearch, FiEye, FiPhone, FiMail, FiPackage, FiFilter, FiDollarSign } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import toast from "react-hot-toast";

// Dummy data
const DUMMY_CUSTOM_REQUESTS: CustomRequest[] = [
  {
    id: 1,
    name: "Priya Sharma",
    email: "priya@email.com",
    phone: "9876543210",
    sculpture_type: "Lord Hanuman",
    material_preference: "Granite",
    height_preference: "48",
    width_preference: "24",
    description:
      "I need a Lord Hanuman statue for my home entrance. He should be in the blessing pose with one hand raised. Traditional style with fine detailing.",
    budget_range: "50000-100000",
    reference_image: "",
    status: "pending",
    created_at: "2024-03-15T11:00:00",
  },
  {
    id: 2,
    name: "Arjun Temple Trust",
    email: "arjun@temple.org",
    phone: "9123456789",
    sculpture_type: "Temple Gopuram Statues",
    material_preference: "Black Stone",
    height_preference: "72",
    width_preference: "36",
    description:
      "We are building a new temple and need 12 statues for the gopuram. Need traditional South Indian style deities. Please provide quote for bulk order.",
    budget_range: "above 200000",
    reference_image: "",
    status: "quoted",
    admin_notes: "Sent quotation for ₹15,00,000. Waiting for confirmation.",
    created_at: "2024-03-12T09:30:00",
  },
  {
    id: 3,
    name: "Meera Gardens",
    email: "meera@gardens.com",
    phone: "9988776655",
    sculpture_type: "Garden Fountain",
    material_preference: "Marble",
    height_preference: "60",
    width_preference: "48",
    description: "Looking for a marble fountain with 3 tiers. Should have cherub figures. For a resort entrance.",
    budget_range: "100000-200000",
    reference_image: "",
    status: "in_progress",
    admin_notes: "Work started. Expected completion in 2 months.",
    created_at: "2024-02-28T14:00:00",
  },
  {
    id: 4,
    name: "Vijay Residence",
    email: "vijay@email.com",
    phone: "9556677889",
    sculpture_type: "Buddha Statue",
    material_preference: "Sandstone",
    height_preference: "36",
    width_preference: "24",
    description: "Peaceful Buddha for my meditation garden. Should be in meditation pose.",
    budget_range: "25000-50000",
    reference_image: "",
    status: "completed",
    admin_notes: "Delivered on March 5, 2024. Customer satisfied.",
    created_at: "2024-02-15T10:00:00",
  },
];

type StatusFilter = "all" | "pending" | "quoted" | "in_progress" | "completed" | "cancelled";

const STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-700",
  quoted: "bg-blue-100 text-blue-700",
  in_progress: "bg-purple-100 text-purple-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const STATUS_LABELS = {
  pending: "Pending",
  quoted: "Quote Sent",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

export default function AdminCustomRequestsPage() {
  const [requests, setRequests] = useState<CustomRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [selectedRequest, setSelectedRequest] = useState<CustomRequest | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setRequests(DUMMY_CUSTOM_REQUESTS);
      setLoading(false);
    };

    fetchRequests();
  }, []);

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.sculpture_type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = async (id: number, status: string) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status, admin_notes: notes || req.admin_notes } : req)),
    );
    toast.success(`Status updated to ${STATUS_LABELS[status as keyof typeof STATUS_LABELS]}`);
    if (selectedRequest?.id === id) {
      setSelectedRequest((prev) => (prev ? { ...prev, status, admin_notes: notes || prev.admin_notes } : null));
    }
  };

  const viewDetails = (request: CustomRequest) => {
    setSelectedRequest(request);
    setNotes(request.admin_notes || "");
    setModalOpen(true);
  };

  const saveNotes = () => {
    if (selectedRequest) {
      setRequests((prev) => prev.map((req) => (req.id === selectedRequest.id ? { ...req, admin_notes: notes } : req)));
      setSelectedRequest((prev) => (prev ? { ...prev, admin_notes: notes } : null));
      toast.success("Notes saved");
    }
  };

  const pendingCount = requests.filter((r) => r.status === "pending").length;

  const getBudgetDisplay = (budget: string | undefined) => {
    if (!budget) return "Not specified";

    const budgetRanges: { [key: string]: string } = {
      "below 25000": "Below ₹25,000",
      "25000-50000": "₹25,000 - ₹50,000",
      "50000-100000": "₹50,000 - ₹1,00,000",
      "100000-200000": "₹1,00,000 - ₹2,00,000",
      "above 200000": "Above ₹2,00,000",
    };

    return budgetRanges[budget] || budget;
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Custom Sculpture Requests</h1>
        <p className="text-gray-500">
          Manage custom sculpture orders and quotations
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
              placeholder="Search by name, email, or sculpture type..."
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
              <option value="quoted">Quote Sent</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FiPackage className="mx-auto text-4xl text-gray-400 mb-3" />
            <p className="text-gray-500">No custom requests found</p>
          </div>
        ) : (
          filteredRequests.map((request) => (
            <div key={request.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                {/* Left: Request Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-800">{request.name}</h3>
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${STATUS_COLORS[request.status as keyof typeof STATUS_COLORS]}`}
                    >
                      {STATUS_LABELS[request.status as keyof typeof STATUS_LABELS]}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <FiMail className="text-gray-400" />
                      {request.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiPhone className="text-gray-400" />
                      {request.phone}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Sculpture Type</p>
                      <p className="font-medium text-gray-800">{request.sculpture_type}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Material</p>
                      <p className="font-medium text-gray-800">{request.material_preference || "Any"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Size</p>
                      <p className="font-medium text-gray-800">
                        {request.height_preference}&quot; × {request.width_preference}&quot;
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Budget</p>
                      <p className="font-medium text-amber-600">{getBudgetDisplay(request.budget_range)}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-2">{request.description}</p>

                  <p className="text-xs text-gray-400 mt-2">{formatDate(request.created_at, true)}</p>
                </div>

                {/* Right: Actions */}
                <div className="flex lg:flex-col gap-2">
                  <Button size="sm" variant="outline" onClick={() => viewDetails(request)} leftIcon={<FiEye />}>
                    Details
                  </Button>
                  <a
                    href={getWhatsAppUrl(
                      request.phone || "",
                      `Hi ${request.name}, regarding your custom sculpture request for ${request.sculpture_type}...`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" variant="whatsapp" leftIcon={<FaWhatsapp />} fullWidth>
                      Contact
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
          Showing {filteredRequests.length} of {requests.length} requests
        </div>
      )}

      {/* Detail Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Custom Request Details" size="lg">
        {selectedRequest && (
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {/* Customer Info */}
            <div className="border-b pb-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{selectedRequest.name}</h3>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${STATUS_COLORS[selectedRequest.status as keyof typeof STATUS_COLORS]}`}
                >
                  {STATUS_LABELS[selectedRequest.status as keyof typeof STATUS_LABELS]}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                <a
                  href={`mailto:${selectedRequest.email}`}
                  className="flex items-center gap-1 text-amber-600 hover:text-amber-700"
                >
                  <FiMail />
                  {selectedRequest.email}
                </a>
                <a
                  href={`tel:${selectedRequest.phone}`}
                  className="flex items-center gap-1 text-amber-600 hover:text-amber-700"
                >
                  <FiPhone />
                  {selectedRequest.phone}
                </a>
              </div>
            </div>

            {/* Sculpture Details */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Sculpture Type</p>
                <p className="font-medium text-gray-800">{selectedRequest.sculpture_type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Material Preference</p>
                <p className="font-medium text-gray-800">{selectedRequest.material_preference || "Any"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Preferred Size</p>
                <p className="font-medium text-gray-800">
                  Height: {selectedRequest.height_preference}&quot; × Width: {selectedRequest.width_preference}&quot;
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Budget Range</p>
                <p className="font-medium text-amber-600">{getBudgetDisplay(selectedRequest.budget_range)}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">Description</h4>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedRequest.description}</p>
            </div>

            {/* Timestamp */}
            <p className="text-sm text-gray-400 mb-4">Received on {formatDate(selectedRequest.created_at, true)}</p>

            {/* Admin Notes */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">Admin Notes</h4>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about quotation, progress, etc..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                onClick={saveNotes}
                className="mt-2 px-4 py-1 text-sm text-amber-600 hover:text-amber-700 font-medium"
              >
                Save Notes
              </button>
            </div>

            {/* Status Update */}
            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-700 mb-3">Update Status</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {(["pending", "quoted", "in_progress", "completed", "cancelled"] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => updateStatus(selectedRequest.id, status)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      selectedRequest.status === status
                        ? `${STATUS_COLORS[status].replace("100", "500").replace(/text-\w+-700/, "text-white")}`
                        : `${STATUS_COLORS[status]} hover:opacity-80`
                    }`}
                  >
                    {STATUS_LABELS[status]}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <a
                  href={getWhatsAppUrl(
                    selectedRequest.phone || "",
                    `Hi ${selectedRequest.name}, regarding your custom sculpture request for ${selectedRequest.sculpture_type}...`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="whatsapp" fullWidth leftIcon={<FaWhatsapp />}>
                    Contact on WhatsApp
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
