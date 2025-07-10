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
				<Navbar />
				<div className="flex min-h-screen">
					<Sidebar />
					<main className="flex-1 p-6">{children}</main>
				</div>
			</body>
		</html>
	);
}
