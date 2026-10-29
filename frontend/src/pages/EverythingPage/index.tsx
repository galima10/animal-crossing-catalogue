const API_URL = import.meta.env.VITE_API_URL;
import { API_PATH } from "@/constants/apiPath";

export default function EverythingPage() {
  // async function getAllItems() {
  //   const res = await fetch(`${API_URL}${API_PATH.all}`, {
  //     method: "GET",
  //     // credentials: "include", // 👈 Obligatoire
  //   });
  //   if (!res.ok) throw new Error("Error fetch");

  //   const data = await res.json();
  //   console.log(data);
  // }
 
  return (
    <main>
      <h1>Every items</h1>
      {/* <button onClick={getAllItems}>test</button> */}
    </main>
  );
}
