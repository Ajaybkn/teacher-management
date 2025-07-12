"use client";

import React, { useEffect, useRef, useState } from "react";
import { teacherList } from "@/app/utils/data";
import { CreditCard, CheckCircle } from "lucide-react";
import PaymentModal from "../components/PaymentModal";

const plans = [
	{
		name: "Basic",
		price: "₹499",
		description: "Manage up to 5 teachers",
		features: ["Basic analytics", "Email support", "1 admin account"],
		limit: 5,
	},
	{
		name: "Pro",
		price: "₹999",
		description: "Manage up to 15 teachers",
		features: ["Advanced reports", "Priority support", "3 admin accounts"],
		limit: 15,
	},
	{
		name: "Premium",
		price: "₹1999",
		description: "Unlimited teacher management",
		features: ["All features", "Premium support", "Unlimited admins"],
		limit: Infinity,
	},
];

export default function Subscription() {
	const teacherCount = teacherList.length;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [selectedPlan, setSelectedPlan] = useState<any>(null);
	const modalRef = useRef<HTMLDivElement>(null);

	// Calculate current plan
	const currentPlan = plans.reduce((acc, plan) => {
		if (teacherCount <= plan.limit && plan.limit < acc.limit) {
			return plan;
		}
		return acc;
	}, plans[plans.length - 1]);

	const closeModal = () => setSelectedPlan(null);

	// Close modal on Escape key
	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
		window.addEventListener("keydown", handleEsc);
		return () => window.removeEventListener("keydown", handleEsc);
	}, []);

	// Close on click outside
	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				closeModal();
			}
		};
		if (selectedPlan) document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, [selectedPlan]);

	return (
		<div className="max-w-6xl mx-auto px-4 py-10">
			<h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2">
				<CreditCard className="w-6 h-6 text-indigo-600" />
				Subscription Plans
			</h1>

			<p className="text-gray-600 mb-6">
				You currently have <strong>{teacherCount}</strong> teachers in your account.
			</p>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{plans.map((plan) => {
					const isCurrent = plan.name === currentPlan.name;

					return (
						<div
							key={plan.name}
							className={`border rounded-xl p-6 shadow hover:shadow-md transition bg-white ${
								isCurrent ? "ring-2 ring-indigo-500" : ""
							}`}
						>
							<h2 className="text-xl font-semibold text-gray-800">{plan.name}</h2>
							<p className="text-3xl font-bold text-indigo-600 mt-2">{plan.price}</p>
							<p className="text-sm text-gray-500 mb-4">{plan.description}</p>
							<ul className="text-sm text-gray-700 space-y-2 mb-6">
								{plan.features.map((f, i) => (
									<li key={i} className="flex items-center gap-2">
										<CheckCircle className="text-green-500 w-4 h-4" />
										{f}
									</li>
								))}
							</ul>
							<button
								onClick={() => !isCurrent && setSelectedPlan(plan)}
								className={`w-full py-2 rounded-lg cursor-pointer  font-medium ${
									isCurrent
										? "bg-gray-200 text-gray-800 cursor-not-allowed"
										: "bg-indigo-600 text-white hover:bg-indigo-700"
								}`}
								disabled={isCurrent}
							>
								{isCurrent ? "Current Plan" : "Upgrade Now"}
							</button>
						</div>
					);
				})}
			</div>

			{/* Modal */}
			{selectedPlan && (
				<PaymentModal planName={selectedPlan.name} price={selectedPlan.price} onClose={() => setSelectedPlan(null)} />
			)}
		</div>
	);
}
