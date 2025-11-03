import React, { useState } from "react";
import axios from "axios";
import { CheckIcon } from "@heroicons/react/24/solid";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubscribe(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `https://upgraded-bassoon-r4v5q7vwj954hxv69-3000.app.github.dev/create-sub`,
        { email }
      );
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    } catch (err) {
      console.error(err);
      alert("Subscription Failed ❌");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 py-6 px-4">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-3xl p-10 flex flex-col items-center space-y-8">
        <h2 className="text-4xl font-bold text-gray-800 text-center">
          Subscribe Now
        </h2>

        <form
          onSubmit={handleSubscribe}
          className="w-full flex items-center space-x-4"
        >
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-5 py-4 border border-gray-300 rounded-l-2xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700 placeholder-gray-400 transition-all duration-300 shadow-sm hover:shadow-md"
          />
          <button
            type="submit"
            disabled={loading || subscribed}
            className={`px-6 py-4 rounded-r-2xl font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 flex items-center justify-center ${
              subscribed
                ? "bg-green-500 hover:bg-green-500"
                : "hover:from-blue-600 hover:to-blue-700"
            }`}
          >
            {subscribed ? (
              <span className="flex items-center space-x-2">
                <CheckIcon className="w-5 h-5" />
                <span>All Set! You will get updates ✅</span>
              </span>
            ) : loading ? (
              <span>Subscribing...</span>
            ) : (
              <span>Subscribe</span>
            )}
          </button>
        </form>

        {subscribed && (
          <p className="text-green-600 font-medium text-center mt-4">
            You will get all news about Mantra Career Institute.
          </p>
        )}
      </div>
    </div>
  );
};

export default Subscribe;
