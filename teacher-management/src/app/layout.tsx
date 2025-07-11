// src/app/layout.tsx
import "./globals.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export const metadata = {
	title: "Teacher Dashboard",
	description: "Manage teachers and schedules",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="bg-gray-50 text-gray-900">
				{/* Sidebar goes first so it's not hidden by Navbar */}
				<Sidebar />
				<Navbar />

				<div className="flex min-h-screen flex-col md:ml-64">
					<main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
				</div>
			</body>
		</html>
	);
}
