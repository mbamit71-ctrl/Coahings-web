import React, { useEffect, useState } from "react";

const EmailSubscription = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    async function fetchEmails() {
      try {
        const res = await fetch(
          "https://coaching-website-backend-7kxoch1yg-mbamit71-ctrls-projects.vercel.app/email-subs"
        ); // 🔹 Apne backend ka URL
        const data = await res.json();

        // 🔹 Latest ko top pe dikhane ke liye sort
        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setEmails(sorted);
      } catch (err) {
        console.error("Error fetching emails:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchEmails();
  }, []);

  // 🔹 Check if email is latest (within 24 hours)
  const isLatest = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    return diff < 24 * 60 * 60 * 1000; // 24 hrs in ms
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        📩 Email Subscriptions
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">
          Loading subscriptions...
        </p>
      ) : emails.length === 0 ? (
        <p className="text-center text-gray-500">No emails found.</p>
      ) : (
        <div className="overflow-x-auto shadow-xl rounded-2xl border border-gray-200">
          <table className="min-w-full bg-white rounded-lg">
            <thead className="bg-indigo-50">
              <tr>
                <th className="py-3 px-6 text-left font-semibold text-gray-700 border-b">
                  #
                </th>
                <th className="py-3 px-6 text-left font-semibold text-gray-700 border-b">
                  Email
                </th>
                <th className="py-3 px-6 text-left font-semibold text-gray-700 border-b">
                  Subscribed At
                </th>
                <th className="py-3 px-6 text-center font-semibold text-gray-700 border-b">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {emails.slice(0, visibleCount).map((sub, index) => (
                <tr
                  key={sub._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-6 border-b">{index + 1}</td>
                  <td className="py-3 px-6 border-b font-medium text-gray-800">
                    {sub.email}
                  </td>
                  <td className="py-3 px-6 border-b text-gray-600">
                    {new Date(sub.createdAt).toLocaleString()}
                  </td>
                  <td className="py-3 px-6 border-b text-center">
                    {isLatest(sub.createdAt) ? (
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

      {/* Show More Button */}
      {visibleCount < emails.length && (
        <div className="text-center mt-6">
          <button
            onClick={() => setVisibleCount(visibleCount + 10)}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default EmailSubscription;
