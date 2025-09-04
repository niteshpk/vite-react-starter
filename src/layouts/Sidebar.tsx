import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const Sidebar: React.FC = () => {
   return (
      <div className="flex h-full flex-col justify-between bg-gray-800 text-white">
         {/* Brand Section */}
         <div className="border-b border-gray-700 p-3">
            <div className="flex items-center">
               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700">
                  <span className="text-2xl font-bold">GPT</span>
               </div>
               <h2 className="ml-4 font-bold">ChatGPT</h2>
            </div>
         </div>

         {/* Navigation Menu */}
         <nav className="space-y-2 p-4">{/* Navigation links */}</nav>

         {/* User Section */}
         <div className="border-t border-gray-700 p-4">
            <div className="flex items-center justify-between">
               <div className="flex items-center">
                  <FaUserCircle className="text-2xl" />
                  <span className="ml-2">John Doe</span>
               </div>
               <div>
                  <button className="text-gray-400 transition-colors hover:text-white">
                     <FaSignOutAlt />
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Sidebar;
