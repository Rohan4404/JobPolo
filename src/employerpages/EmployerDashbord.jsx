import React from "react";
import EmployerNavbar from "../employercomponets/EmployerNavbar";
import EmployerHeader from "../employercomponets/EmployerHeader";
import DashboardInner from "../employercomponets/DashboardInner";
import EmployerFooter from "../employercomponets/EmployerFooter";

// const Dashboard = () => {
//   const role = sessionStorage.getItem("role");
//   // const role = "EMPLOYEE"; 


//   console.log("role", role);

//   return (
//     <div className="w-full min-h-screen flex flex-col overflow-y-auto">
//       {/* Navbar */}
//       {/* <EmployerNavbar role={role}  /> */}

//       {/* Header */}
//       <EmployerHeader role={role} />

//       {/* Rest of dashboard content */}
//       <div className="flex-1 p-4 !pt-0 !pb-0">
//         <DashboardInner role={role} />
//       </div>

//       {/* <div className="flex justify-end">
//         <EmployerFooter />
//       </div> */}
      
//     </div>
//   );
// };

// export default Dashboard;

const Dashboard = () => {
  const role = sessionStorage.getItem("role");

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <EmployerHeader role={role} />

      {/* Everything else */}
      <div className="flex-1 overflow-hidden">
        <DashboardInner role={role} />
      </div>
    </div>
  );
};

export default Dashboard;
