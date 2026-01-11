import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";  

export default function Sidebar() {

  const navigate = useNavigate();
  const location = useLocation();

  const mainItems = [
    { icon: <FiHome />, label: "Home", path: "/" },
    { icon: <FiCompass />, label: "Explore", path: "/explore" },
    { icon: <FiYoutube />, label: "Subscriptions", path: "/subscriptions" },
  ];
    const handleNavigation = (path, label) => {
    if (path) {
      navigate(path);
    } else {
      alert(`${label} feature coming soon!`);
    }
  };
  return (
    <aside className="w-60 bg-white shadow-inner border-r hidden md:block">
      <ul className="p-4 space-y-2">
            {mainItems.map((item, index) => (
          <button  // CHANGE from Link to button
            key={index}
            onClick={() => handleNavigation(item.path, item.label)}  // ADD onClick
            className={`flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-900 transition-colors w-full text-left ${
              location.pathname === item.path ? 'bg-gray-900' : ''
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </ul>
    </aside>
  );
}
