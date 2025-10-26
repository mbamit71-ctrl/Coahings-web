import React, { useEffect } from "react";
import EmailSubscription from "../components/emailsubs";
import EnquirySubs from "../components/enquirysubs";

export default function AdminDashboard() {
  useEffect(() => {
    console.log("AdminDashboard mounted");
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* render components or show small fallback so you can see if imports failed */}
      {EmailSubscription ? (
        <EmailSubscription />
      ) : (
        <div className="p-4 mb-4 bg-yellow-100 text-sm">
          EmailSubscription component not found
        </div>
      )}

      {EnquirySubs ? (
        <EnquirySubs />
      ) : (
        <div className="p-4 bg-yellow-100 text-sm">
          EnquirySubs component not found
        </div>
      )}
    </div>
  );
}
