// components/Navbar.tsx
export default function Navbar() {
	return (
		<header className="bg-white shadow px-4 py-3 flex justify-between items-center sticky top-0 z-20">
			<h1 className="text-xl font-bold text-gray-800">Teacher Management</h1>
			<div className="text-sm text-gray-600">Logged in as Admin</div>
		</header>
	);
}
