import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const EnquirySubs = () => {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`https://upgraded-bassoon-r4v5q7vwj954hxv69-3000.app.github.dev/users`);
        // 🔹 Dummy API ke liye array format me convert kar rahe
        const data = Array.isArray(res.data) ? res.data : [res.data];
        setUsers(data);
        setFiltered(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!fromDate && !toDate) {
      setFiltered(users);
      return;
    }

    const fDate = fromDate ? new Date(fromDate) : null;
    const tDate = toDate ? new Date(toDate) : null;

    const filteredData = users.filter((u) => {
      if (!u.createdAt) return true;
      const userDate = new Date(u.createdAt);

      if (fDate && userDate < fDate) return false;
      if (tDate && userDate > tDate) return false;

      return true;
    });

    setFiltered(filteredData);
  }, [fromDate, toDate, users]);

  const isLatest = (date) => {
    if (!date) return false;
    const now = new Date();
    const diff = now - new Date(date);
    return diff < 24 * 60 * 60 * 1000;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-6 text-center text-indigo-600"
      >
        📋 Enquiry Submissions
      </motion.h2>

      {/* 🔹 Date Filters */}
      <div className="flex flex-wrap justify-center gap-6 mb-6">
        <div>
          <label className="block text-sm text-gray-600 mb-1">From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">
          Loading enquiries...
        </p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-500">No enquiries found 🚫</p>
      ) : (
        <div className="overflow-x-auto shadow-xl rounded-2xl border border-gray-200">
          <table className="min-w-full bg-white rounded-lg">
            <thead className="bg-indigo-50">
              <tr>
                <th className="py-3 px-6 text-left font-semibold text-gray-700 border-b">
                  #
                </th>
                <th className="py-3 px-6 text-left font-semibold text-gray-700 border-b">
                  Name
                </th>
                <th className="py-3 px-6 text-left font-semibold text-gray-700 border-b">
                  Mobile
                </th>
                <th className="py-3 px-6 text-left font-semibold text-gray-700 border-b">
                  District
                </th>
                <th className="py-3 px-6 text-left font-semibold text-gray-700 border-b">
                  Email
                </th>
                <th className="py-3 px-6 text-left font-semibold text-gray-700 border-b">
                  Date
                </th>
                <th className="py-3 px-6 text-center font-semibold text-gray-700 border-b">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, idx) => (
                <tr key={u._id || idx} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-6 border-b">{idx + 1}</td>
                  <td className="py-3 px-6 border-b font-medium text-gray-800">{u.name || "—"}</td>
                  <td className="py-3 px-6 border-b">{u.mobile || "—"}</td>
                  <td className="py-3 px-6 border-b">{u.district || "—"}</td>
                  <td className="py-3 px-6 border-b text-blue-600">{u.email || "—"}</td>
                  <td className="py-3 px-6 border-b text-gray-600">
                    {u.createdAt
                      ? new Date(u.createdAt).toLocaleString()
                      : "—"}
                  </td>
                  <td className="py-3 px-6 border-b text-center">
                    {isLatest(u.createdAt) ? (
                      <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                        NEW
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-full">
                        Old
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EnquirySubs;
