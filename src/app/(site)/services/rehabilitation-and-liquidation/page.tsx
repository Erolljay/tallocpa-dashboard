import { permanentRedirect } from "next/navigation";

/** The firm no longer lists corporate rehabilitation and liquidation; old links land on the services list (308). */
export default function RetiredService() {
  permanentRedirect("/services");
}
