import UserDashboard from "./UserDashboard";

import AppContext from "../context/AppContext"; // Your context that stores user info
import { useContext } from "react";

export default function Dashboard() {
  const { user } = useContext(AppContext);
  // user aauxa context bata user vaneko login garda form bata aauni details jo ki backend bata aauxa.

  if (!user) return <div className="text-white p-16">Please log in first.</div>;

<<<<<<< HEAD
  if (user) return <UserDashboard user={user} />;
=======
  if (user.role === "client") return <UserDashboard user={user} />;
>>>>>>> af655c1682f91aba3012fbd034a0609064f9a01d

  return <div className="text-white p-16">Unknown role.</div>;
}
