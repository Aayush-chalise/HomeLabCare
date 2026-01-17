import UserDashboard from "./UserDashboard";

import AppContext from "../context/AppContext"; // Your context that stores user info
import { useContext } from "react";

export default function Dashboard() {
  const { user } = useContext(AppContext);
  // user aauxa context bata user vaneko login garda form bata aauni details jo ki backend bata aauxa.

  if (!user) return <div className="text-white p-16">Please log in first.</div>;

  if (user.role === "client") return <UserDashboard user={user} />;

  return <div className="text-white p-16">Unknown role.</div>;
}
