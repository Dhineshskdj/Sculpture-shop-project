"use client";

// ============================================
// Admin Dashboard Page
// ============================================

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiBox,
  FiGrid,
  FiMessageSquare,
  FiFileText,
  FiEye,
  FiTrendingUp,
  FiUsers,
  FiArrowRight,
  FiClock,
} from "react-icons/fi";

interface DashboardStats {
  totalSculptures: number;
  featuredSculptures: number;
  totalCategories: number;
  pendingInquiries: number;
  pendingCustomRequests: number;
  totalViews: number;
}

interface RecentActivity {
  id: number;
  type: "inquiry" | "custom_request" | "sculpture";
  message: string;
  time: string;
}

// Dummy data for development
const DUMMY_STATS: DashboardStats = {
  totalSculptures: 12,
  featuredSculptures: 5,
  totalCategories: 8,
  pendingInquiries: 3,
  pendingCustomRequests: 2,
  totalViews: 1250,
};

const DUMMY_RECENT_ACTIVITIES: RecentActivity[] = [
  { id: 1, type: "inquiry", message: "New inquiry from Ramesh about Lord Ganesha", time: "2 hours ago" },
  { id: 2, type: "custom_request", message: "Custom sculpture request from Lakshmi", time: "5 hours ago" },
  { id: 3, type: "sculpture", message: "Updated Buddha Meditation sculpture", time: "1 day ago" },
  { id: 4, type: "inquiry", message: "New inquiry from Kumar about Garden Lions", time: "2 days ago" },
  { id: 5, type: "custom_request", message: "Custom temple pillar request from Temple Trust", time: "3 days ago" },
];

function StatCard({
  title,
  value,
  icon,
  color,
  link,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  link?: string;
}) {
  const content = (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${color} hover:shadow-lg transition-shadow`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full bg-opacity-10 ${color.replace("border-", "bg-").replace("-600", "-100")}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  if (link) {
    return <Link href={link}>{content}</Link>;
  }
  return content;
}

function ActivityItem({ activity }: { activity: RecentActivity }) {
  const getIcon = () => {
    switch (activity.type) {
      case "inquiry":
        return <FiMessageSquare className="text-blue-600" />;
      case "custom_request":
        return <FiFileText className="text-purple-600" />;
      case "sculpture":
        return <FiBox className="text-amber-600" />;
      default:
        return <FiClock className="text-gray-600" />;
    }
  };

  const getLink = () => {
    switch (activity.type) {
      case "inquiry":
        return "/admin/inquiries";
      case "custom_request":
        return "/admin/custom-requests";
      case "sculpture":
        return "/admin/sculptures";
      default:
        return "#";
    }
  };

  return (
    <Link href={getLink()} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="p-2 bg-gray-100 rounded-full">{getIcon()}</div>
      <div className="flex-1 min-w-0">
        <p className="text-gray-800 text-sm">{activity.message}</p>
        <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
      </div>
    </Link>
  );
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setStats(DUMMY_STATS);
      setActivities(DUMMY_RECENT_ACTIVITIES);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 h-28">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
              <div className="h-8 bg-gray-200 rounded w-1/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back!</h1>
        <p className="text-gray-500">Here&apos;s what&apos;s happening with your sculpture shop.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Sculptures"
          value={stats?.totalSculptures || 0}
          icon={<FiBox className="text-2xl text-amber-600" />}
          color="border-amber-600"
          link="/admin/sculptures"
        />
        <StatCard
          title="Categories"
          value={stats?.totalCategories || 0}
          icon={<FiGrid className="text-2xl text-blue-600" />}
          color="border-blue-600"
          link="/admin/categories"
        />
        <StatCard
          title="Pending Inquiries"
          value={stats?.pendingInquiries || 0}
          icon={<FiMessageSquare className="text-2xl text-green-600" />}
          color="border-green-600"
          link="/admin/inquiries"
        />
        <StatCard
          title="Custom Requests"
          value={stats?.pendingCustomRequests || 0}
          icon={<FiFileText className="text-2xl text-purple-600" />}
          color="border-purple-600"
          link="/admin/custom-requests"
        />
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href="/admin/sculptures/new"
                className="flex items-center justify-between p-3 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <FiBox />
                  Add New Sculpture
                </span>
                <FiArrowRight />
              </Link>
              <Link
                href="/admin/categories"
                className="flex items-center justify-between p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <FiGrid />
                  Manage Categories
                </span>
                <FiArrowRight />
              </Link>
              <Link
                href="/admin/inquiries"
                className="flex items-center justify-between p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <FiMessageSquare />
                  View Inquiries
                </span>
                <FiArrowRight />
              </Link>
              <Link
                href="/admin/payment-info"
                className="flex items-center justify-between p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <FiTrendingUp />
                  Update Payment Info
                </span>
                <FiArrowRight />
              </Link>
            </div>
          </div>

          {/* Featured Stats */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Highlights</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Featured Sculptures</span>
                <span className="font-semibold text-amber-600">{stats?.featuredSculptures}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Page Views</span>
                <span className="font-semibold text-gray-800">{stats?.totalViews?.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
              <Link href="/admin/inquiries" className="text-amber-600 text-sm hover:text-amber-700">
                View All
              </Link>
            </div>
            <div className="space-y-1">
              {activities.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No recent activity</p>
              ) : (
                activities.map((activity) => <ActivityItem key={activity.id} activity={activity} />)
              )}
            </div>
          </div>

          {/* Tips Card */}
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg shadow-md p-6 mt-6 text-white">
            <h3 className="font-semibold text-lg mb-2">💡 Tip of the Day</h3>
            <p className="text-amber-100">
              Mark your best sculptures as &quot;Featured&quot; to showcase them on the homepage. Featured sculptures
              get more visibility and attract more customer inquiries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
