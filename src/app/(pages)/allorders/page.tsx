
import { getUserToken } from "@/app/helpers/getUserToken";
import Getuserid from "@/components/getuserid/getuserid";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
}

export default async function AllOrders() {
  const token = await getUserToken();

  if (!token) {
    return <p>Please login first</p>;
  }

  const decoded = jwtDecode<DecodedToken>(token);
  const userId = decoded.id;

  return <Getuserid userId={userId} />;
}
