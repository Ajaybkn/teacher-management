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
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [submitted, setSubmitted] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
		if (errors[e.target.name]) {
			setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
		}
	};

	const validate = () => {
		const newErrors: { [key: string]: string } = {};

		// Name should not contain numbers
		if (!form.name.trim()) {
			newErrors.name = "Name is required.";
		} else if (/\d/.test(form.name)) {
			newErrors.name = "Name cannot contain numbers.";
		}

		// Email format
		if (!form.email.trim()) {
			newErrors.email = "Email is required.";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
			newErrors.email = "Invalid email format.";
		}

		if (!form.subject.trim()) {
			newErrors.subject = "Subject is required.";
		}

		if (!form.message.trim()) {
			newErrors.message = "Message cannot be empty.";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!validate()) return;

		setSubmitted(true);
		setForm({ name: "", email: "", subject: "", message: "" });
		setTimeout(() => setSubmitted(false), 4000);
	};

	return (
		<div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
			<h1 className="text-3xl font-bold text-gray-800">🛠️ Support Center</h1>

			{/* Info Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				{[
					{ icon: Mail, title: "Email", value: "support@teachermanage.com", color: "text-indigo-500" },
					{ icon: Phone, title: "Phone", value: "+91 9993338765", color: "text-green-500" },
					{ icon: Clock, title: "Working Hours", value: "Mon–Fri: 9 AM – 6 PM", color: "text-yellow-500" },
				].map(({ icon: Icon, title, value, color }) => (
					<div key={title} className="bg-white p-5 border rounded-xl shadow flex items-start gap-4">
						<Icon className={`${color} w-6 h-6`} />
						<div>
							<h3 className="font-semibold text-gray-800">{title}</h3>
							<p className="text-gray-600 text-sm">{value}</p>
						</div>
					</div>
				))}
			</div>

			{/* FAQs */}
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
					<div className="col-span-1">
						<input
							type="text"
							name="name"
							placeholder="Your Name"
							value={form.name}
							onChange={handleChange}
							className="border p-3 rounded-lg w-full"
						/>
						{errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
					</div>

					<div className="col-span-1">
						<input
							type="email"
							name="email"
							placeholder="Your Email"
							value={form.email}
							onChange={handleChange}
							className="border p-3 rounded-lg w-full"
						/>
						{errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
					</div>

					<div className="col-span-full">
						<input
							type="text"
							name="subject"
							placeholder="Subject"
							value={form.subject}
							onChange={handleChange}
							className="border p-3 rounded-lg w-full"
						/>
						{errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
					</div>

					<div className="col-span-full">
						<textarea
							name="message"
							rows={5}
							placeholder="Your Message"
							value={form.message}
							onChange={handleChange}
							className="border p-3 rounded-lg w-full"
						/>
						{errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
					</div>

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
