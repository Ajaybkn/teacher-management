"use client";
import React from "react";

const Loading = () => {
	return (
		<div className="flex items-center justify-center min-h-screen bg-white">
			<div className="loader"></div>
			<style jsx>{`
				.loader {
					width: 80px;
					aspect-ratio: 1;
					background: #8d7958;
					clip-path: polygon(
						100% 50%,
						68.48% 57.65%,
						85.36% 85.36%,
						57.65% 68.48%,
						50% 100%,
						42.35% 68.48%,
						14.64% 85.36%,
						31.52% 57.65%,
						0% 50%,
						31.52% 42.35%,
						14.64% 14.64%,
						42.35% 31.52%,
						50% 0%,
						57.65% 31.52%,
						85.36% 14.64%,
						68.48% 42.35%
					);
					-webkit-mask: radial-gradient(circle 5px, #0000 90%, #000);
					animation: spin 1.5s linear infinite;
				}
				@keyframes spin {
					100% {
						transform: rotate(1turn);
					}
				}
			`}</style>
		</div>
	);
};

export default Loading;
