// import { useState } from "react";
// import { Dropdown } from "../ui/dropdown/Dropdown";
// import { DropdownItem } from "../ui/dropdown/DropdownItem";
// import { MoreDotIcon } from "../../icons";
// import CountryMap from "./CountryMap";

// export default function DemographicCard() {
//   const [isOpen, setIsOpen] = useState(false);

//   function toggleDropdown() {
//     setIsOpen(!isOpen);
//   }

//   function closeDropdown() {
//     setIsOpen(false);
//   }
//   return (
//     <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
//       <div className="flex justify-between">
//         <div>
//           <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
//             Customers Demographic
//           </h3>
//           <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
//             Number of customer based on country
//           </p>
//         </div>
//         <div className="relative inline-block">
//           <button className="dropdown-toggle" onClick={toggleDropdown}>
//             <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
//           </button>
//           <Dropdown
//             isOpen={isOpen}
//             onClose={closeDropdown}
//             className="w-40 p-2"
//           >
//             <DropdownItem
//               onItemClick={closeDropdown}
//               className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
//             >
//               View More
//             </DropdownItem>
//             <DropdownItem
//               onItemClick={closeDropdown}
//               className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
//             >
//               Delete
//             </DropdownItem>
//           </Dropdown>
//         </div>
//       </div>
//       <div className="px-4 py-6 my-6 overflow-hidden border border-gary-200 rounded-2xl dark:border-gray-800 sm:px-6">
//         <div
//           id="mapOne"
//           className="mapOne map-btn -mx-4 -my-6 h-[212px] w-[252px] 2xsm:w-[307px] xsm:w-[358px] sm:-mx-6 md:w-[668px] lg:w-[634px] xl:w-[393px] 2xl:w-[554px]"
//         >
//           <CountryMap />
//         </div>
//       </div>

//       <div className="space-y-5">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="items-center w-full rounded-full max-w-8">
//               <img src="./images/country/country-01.svg" alt="usa" />
//             </div>
//             <div>
//               <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
//                 USA
//               </p>
//               <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
//                 2,379 Customers
//               </span>
//             </div>
//           </div>

//           <div className="flex w-full max-w-[140px] items-center gap-3">
//             <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
//               <div className="absolute left-0 top-0 flex h-full w-[79%] items-center justify-center rounded-sm bg-brand-500 text-xs font-medium text-white"></div>
//             </div>
//             <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
//               79%
//             </p>
//           </div>
//         </div>

//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="items-center w-full rounded-full max-w-8">
//               <img src="./images/country/country-02.svg" alt="france" />
//             </div>
//             <div>
//               <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
//                 France
//               </p>
//               <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
//                 589 Customers
//               </span>
//             </div>
//           </div>

//           <div className="flex w-full max-w-[140px] items-center gap-3">
//             <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
//               <div className="absolute left-0 top-0 flex h-full w-[23%] items-center justify-center rounded-sm bg-brand-500 text-xs font-medium text-white"></div>
//             </div>
//             <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
//               23%
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";

interface TaskCardProps {
  time?: string;
  title?: string;
  progress?: number;
}

const TaskCard: React.FC<TaskCardProps> = ({
  time = "09:00 AM",
  title = "Design Review",
  progress = 60,
}) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 shadow-sm">
      {/* Task Info */}
      <div className="mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">{time}</p>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          {title}
        </h3>
      </div>

      {/* Progress Bar */}
      <div className="w-full space-y-2">
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Percentage text */}
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {progress}% completed
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-4">
        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-md">
          ▶
        </button>

        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 shadow-sm transition-all">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            ⏰ Reminder
          </span>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
