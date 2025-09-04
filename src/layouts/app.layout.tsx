import { Outlet } from '@tanstack/react-router';
import MainContent from './MainContent';
import Sidebar from './Sidebar';

export default function AppLayout() {
   return (
      <div className="flex h-screen">
         {/* Sidebar */}
         <div className="w-64 border-r border-gray-200">
            <Sidebar />
         </div>

         {/* Main Content */}
         <div className="flex-grow">
            <MainContent />
            asasd
            <Outlet />
         </div>
      </div>
   );
}
