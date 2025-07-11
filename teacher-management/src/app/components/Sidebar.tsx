"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Home, Users, Settings, BookOpen, BarChart2, LifeBuoy } from "lucide-react";

const navItems = [
	{ name: "Dashboard", href: "/", icon: <Home className="w-5 h-5 mr-3" /> },
	{ name: "Teachers", href: "/teachers", icon: <Users className="w-5 h-5 mr-3" /> },
	{ name: "Subjects", href: "/subjects", icon: <BookOpen className="w-5 h-5 mr-3" /> },

	{ name: "Reports", href: "/reports", icon: <BarChart2 className="w-5 h-5 mr-3" /> },

	{ name: "Support", href: "/support", icon: <LifeBuoy className="w-5 h-5 mr-3" /> },
	{ name: "Settings", href: "/settings", icon: <Settings className="w-5 h-5 mr-3" /> },
];

export default function Sidebar() {
	const [isOpen, setIsOpen] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const pathname = usePathname();
	const router = useRouter();
	// Delay rendering until mounted
	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<>
			{/* Overlay */}
			{isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsOpen(false)} />}

			{/* Desktop Sidebar */}
			<aside className="hidden md:flex flex-col w-64 min-h-[95vh] bg-white border-r border-gray-200 fixed top-[60px] left-0 z-50">
				<nav className="flex flex-col px-4 py-6 space-y-1">
					{navItems.map((item) => {
						const isActive = item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);

						return (
							<button
								key={item.name}
								onClick={() => router.push(item.href)}
								className={`w-full text-left flex items-center px-4 py-2 rounded-lg text-sm font-medium transition ${
									isActive ? "bg-blue-600 text-white shadow" : "text-gray-700 hover:bg-blue-100"
								}`}
							>
								{item.icon}
								{item.name}
							</button>
						);
					})}
				</nav>
			</aside>

			{/* Mobile Sidebar */}
			<aside
				className={`fixed top-0 left-0 h-full w-64 bg-white z-40 shadow-md transform transition-transform duration-300 ease-in-out md:hidden ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="flex items-center justify-between p-4 border-b border-gray-200">
					<h2 className="text-lg font-semibold text-gray-800">Menu</h2>
					<button onClick={() => setIsOpen(false)}>
						<X className="w-6 h-6 text-gray-600" />
					</button>
				</div>
				<nav className="flex flex-col px-4 py-4 space-y-1">
					{navItems.map((item) => {
						const isActive = item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);

						return (
							<Link
								key={item.name}
								href={item.href}
								className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition ${
									isActive ? "bg-blue-600 text-white shadow" : "text-gray-700 hover:bg-blue-100"
								}`}
								onClick={() => setIsOpen(false)}
							>
								{item.icon}
								{item.name}
							</Link>
						);
					})}
				</nav>
			</aside>

			{/* Mobile Hamburger */}
			<button
				onClick={() => setIsOpen(true)}
				className={`md:hidden fixed top-4 left-4 z-50 bg-gray-400 text-white p-2 rounded-md shadow-md ${
					isOpen ? "hidden" : "block"
				}`}
			>
				<Menu className="w-5 h-5" />
			</button>
		</>
	);
}
