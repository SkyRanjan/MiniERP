// import { NavLink } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div className="w-64 bg-gray-800 text-white p-4">
//       <h2 className="text-xl font-bold mb-6">Mini ERP</h2>

//       <nav className="flex flex-col gap-3">
//         <NavLink to="/" className="hover:text-blue-400">
//           Dashboard
//         </NavLink>
//         <NavLink to="/inventory" className="hover:text-blue-400">
//           Inventory
//         </NavLink>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;
// --------------------------------------------
// import { NavLink } from "react-router-dom";

// export default function Sidebar() {
//   return (
//     <div className="w-64 min-h-screen bg-white border-r p-4">
//       <h1 className="text-xl font-bold mb-6">Mini ERP</h1>

//       <NavLink to="/" className="block p-2 hover:bg-blue-100">Dashboard</NavLink>
//       <NavLink to="/inventory" className="block p-2 hover:bg-blue-100">Inventory</NavLink>
//       <NavLink to="/vendors" className="block p-2 hover:bg-blue-100">Vendors</NavLink>
//       <NavLink to="/reports" className="block p-2 hover:bg-blue-100">Reports</NavLink>
//     </div>
//   );
// }
// --------------------------------------------
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROLES } from "../constants/roles";

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="w-64 bg-white border-r shadow-sm p-5">
      <h1 className="text-2xl font-bold mb-8">Mini ERP</h1>

      <nav className="space-y-2">
        <NavLink to="/" className="block p-2 rounded hover:bg-gray-100">
          Dashboard
        </NavLink>

        <NavLink to="/inventory" className="block p-2 rounded hover:bg-gray-100">
          Inventory
        </NavLink>

        {user.role === ROLES.ADMIN && (
          <NavLink to="/vendors" className="block p-2 rounded hover:bg-gray-100">
            Vendors
          </NavLink>
        )}

        <NavLink to="/reports" className="block p-2 rounded hover:bg-gray-100">
          Reports
        </NavLink>
      </nav>
    </aside>
  );
}
