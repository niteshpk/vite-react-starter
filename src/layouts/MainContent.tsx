import { Outlet } from '@tanstack/react-router';
import { FaBell, FaSearch } from 'react-icons/fa';

const MainContent: React.FC = () => {
   return (
      <div className="flex h-full flex-col">
         {/* Header */}
         <header className="sticky top-0 z-10 flex items-center justify-between bg-white px-6 py-4 shadow-md">
            <h1 className="text-2xl font-bold">Playground</h1>
            <div className="flex items-center space-x-4">
               <button className="text-gray-400 transition-colors hover:text-gray-600">
                  <FaSearch />
               </button>
               <button className="text-gray-400 transition-colors hover:text-gray-600">
                  <FaBell />
               </button>
            </div>
         </header>

         {/* Content */}
         <div className="flex-grow p-6">
            {/* Add your content here */}
            <p>This is the main content area.</p>
            <Outlet />
         </div>
      </div>
   );
};
export default MainContent;
