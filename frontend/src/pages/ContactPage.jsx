import { useState } from "react";
import { sendFeedback } from "../api/apiService"; // Import your resetPassword API call

const ResetPasswordPage = () => {
  const [feedback, setFeedback] = useState({ email: "", subject: "", message: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendFeedback(
        feedback.email,
        feedback.subject,
        feedback.message
      );
      console.log("Feedback sent successfully", response);
      setMessage("Feedback was sent successfully!");
      setFeedback({ email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Feedback failed to send:", error);
    }
  };

  return (
    <section className="bg-[#212121]">
      <div className="pt-20 pb-6 px-4 h-screen mx-auto max-w-screen-md">
        <h2 className="mb-8 mt-8 text-4xl font-extrabold text-center text-[#FF6FCF]">
          Contact Us
        </h2>
        <p className="pb-8 lg:pb-16 font-light text-center text-gray-300 sm:text-xl">
          Got a technical issue? Want to send feedback about a feature? Want to
          suggest a new feature? Let us know!
        </p>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label
              htmlFor="email"
              className="block pb-2 text-sm font-medium text-[#FF6FCF]"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@domain.com"
              value={feedback.email}
              onChange={handleChange}
              className="shadow-sm text-sm rounded-lg block w-full p-2.5 outline-none bg-gray-700 border-gray-600 placeholder-gray-400 text-white shadow-sm-light"
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block pb-2 text-sm font-medium text-[#FF6FCF]"
            >
              Subject
            </label>
            <input
              type="text"
              name="subject"
              placeholder="Let us know how we can help you"
              value={feedback.subject}
              onChange={handleChange}
              className="block p-3 w-full text-sm rounded-lg border shadow-sm outline-none bg-gray-700 border-gray-600 placeholder-gray-400 text-white shadow-sm-light"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block pb-2 text-sm font-medium text-[#FF6FCF]"
            >
              Your message
            </label>
            <textarea
              type="message"
              name="message"
              placeholder="Leave a comment..."
              value={feedback.message}
              onChange={handleChange}
              rows="6"
              className="block p-2.5 w-full text-sm rounded-lg shadow-sm border outline-none bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
              required
            ></textarea>
          </div>
          {message && <p className="mt-4 text-white text-sm">{message}</p>}
          <button
            type="submit"
            className="py-3 px-5 text-sm font-medium text-center rounded-lg sm:w-fit outline-none bg-[#FF6FCF] hover:bg-opacity-80"
          >
            Send message
          </button>
        </form>
      </div>
    </section>

  );
};

export default ResetPasswordPage;
