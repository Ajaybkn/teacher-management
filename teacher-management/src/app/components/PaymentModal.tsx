import React from "react";
import { X, ShieldCheck } from "lucide-react";

interface PaymentModalProps {
	planName: string;
	price: string;
	onClose: () => void;
}

export default function PaymentModal({ planName, price, onClose }: PaymentModalProps) {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
			<div className="bg-white rounded-xl w-full max-w-2xl mx-4 p-6 shadow-xl relative">
				<button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
					<X className="w-5 h-5" />
				</button>

				<h2 className="text-2xl font-semibold text-gray-800 mb-6">
					Select Payment Method for <span className="text-indigo-600">{planName}</span>
				</h2>

				{/* Card Form */}
				<form
					onSubmit={(e) => {
						e.preventDefault();
						alert("Payment successful!");
						onClose();
					}}
					className="space-y-4"
				>
					{/* Cardholder Name */}
					<div>
						<label className="block text-sm font-medium mb-1">Cardholder Name</label>
						<input type="text" required className="w-full border p-2 rounded-lg" placeholder="Ajay Singh" />
					</div>

					{/* Card Details */}
					<div>
						<label className="block text-sm font-medium mb-1">Card Number</label>
						<input
							type="text"
							required
							maxLength={19}
							className="w-full border p-2 rounded-lg"
							placeholder="1234 1234 1234 1234"
						/>
					</div>

					<div className="flex gap-4">
						<div className="w-1/2">
							<label className="block text-sm font-medium mb-1">Expiration</label>
							<input type="text" required placeholder="MM/YY" className="w-full border p-2 rounded-lg" />
						</div>
						<div className="w-1/2">
							<label className="block text-sm font-medium mb-1">CVC</label>
							<input type="text" required maxLength={4} placeholder="123" className="w-full border p-2 rounded-lg" />
						</div>
					</div>

					<p className="text-xs text-gray-500">
						By providing your card info, you allow us to charge for future payments in accordance with our terms.
					</p>

					<button
						type="submit"
						className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 font-medium mt-4"
					>
						Pay {price}
					</button>

					<div className="flex items-center justify-center mt-4 text-sm text-gray-500">
						<ShieldCheck className="w-4 h-4 text-green-500 mr-1" />
						Secure Payments by Stripe
					</div>
				</form>
			</div>
		</div>
	);
}
