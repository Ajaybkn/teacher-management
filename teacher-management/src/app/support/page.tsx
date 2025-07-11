"use client";

import React, { useState } from "react";
import { Send, Mail, Phone, Clock } from "lucide-react";

const faqList = [
	{
		question: "How can I update teacher qualifications?",
		answer: "Go to the Teachers section, click on a teacher’s profile, and edit their qualifications from there.",
	},
	{
		question: "Can I download reports as PDF?",
		answer: "Currently, reports are view-only. PDF export will be added soon.",
	},
	{
		question: "How do I reset my dashboard settings?",
		answer: "You can reset dashboard settings from the Settings page under 'Preferences'.",
	},
];

export default function Support() {
	const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
	const [submitted, setSubmitted] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Simulate sending the message
		setSubmitted(true);
		setTimeout(() => setSubmitted(false), 5000);
	};

	return (
		<div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
			<h1 className="text-3xl font-bold text-gray-800">🛠️ Support Center</h1>

			{/* Support Info Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<div className="bg-white p-5 border rounded-xl shadow flex items-start gap-4">
					<Mail className="text-indigo-500 w-6 h-6" />
					<div>
						<h3 className="font-semibold text-gray-800">Email</h3>
						<p className="text-gray-600 text-sm">support@teachermanage.com</p>
					</div>
				</div>
				<div className="bg-white p-5 border rounded-xl shadow flex items-start gap-4">
					<Phone className="text-green-500 w-6 h-6" />
					<div>
						<h3 className="font-semibold text-gray-800">Phone</h3>
						<p className="text-gray-600 text-sm">+91 9993338765</p>
					</div>
				</div>
				<div className="bg-white p-5 border rounded-xl shadow flex items-start gap-4">
					<Clock className="text-yellow-500 w-6 h-6" />
					<div>
						<h3 className="font-semibold text-gray-800">Working Hours</h3>
						<p className="text-gray-600 text-sm">Mon–Fri: 9 AM – 6 PM</p>
					</div>
				</div>
			</div>

			{/* FAQ */}
			<div className="bg-white p-6 border rounded-xl shadow space-y-6">
				<h2 className="text-xl font-semibold text-indigo-700">❓ Frequently Asked Questions</h2>
				{faqList.map((faq, index) => (
					<div key={index}>
						<h3 className="font-medium text-gray-800">{faq.question}</h3>
						<p className="text-sm text-gray-600 mt-1">{faq.answer}</p>
					</div>
				))}
			</div>

			{/* Contact Form */}
			<div className="bg-white p-6 border rounded-xl shadow space-y-6">
				<h2 className="text-xl font-semibold text-indigo-700">📬 Contact Support</h2>
				{submitted && (
					<div className="bg-green-100 text-green-700 p-3 rounded-lg text-sm">Message sent successfully!</div>
				)}
				<form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<input
						type="text"
						name="name"
						placeholder="Your Name"
						required
						className="border p-3 rounded-lg col-span-1"
						value={form.name}
						onChange={handleChange}
					/>
					<input
						type="email"
						name="email"
						placeholder="Your Email"
						required
						className="border p-3 rounded-lg col-span-1"
						value={form.email}
						onChange={handleChange}
					/>
					<input
						type="text"
						name="subject"
						placeholder="Subject"
						required
						className="border p-3 rounded-lg col-span-full"
						value={form.subject}
						onChange={handleChange}
					/>
					<textarea
						name="message"
						rows={5}
						placeholder="Your Message"
						required
						className="border p-3 rounded-lg col-span-full"
						value={form.message}
						onChange={handleChange}
					/>
					<button
						type="submit"
						className="bg-indigo-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-indigo-700 col-span-full justify-center"
					>
						<Send className="w-4 h-4" />
						Send Message
					</button>
				</form>
			</div>
		</div>
	);
}
