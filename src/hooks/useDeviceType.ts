import { useState, useEffect } from "react";

export default function useDeviceType() {
  const [deviceType, setDeviceType] = useState(getDeviceType());

  useEffect(() => {
    setDeviceType(getDeviceType());
  }, []);

  return deviceType;
}

function getDeviceType() {
  if (typeof window !== "undefined") {
    const width = window.innerWidth;
    if (width < 768) {
      return "mobile";
    } else if (width < 1024) {
      return "tablet";
    } else {
      return "pc";
    }
  }
  // Si window n'est pas disponible (cas SSR), retourne une valeur par défaut.
  return "unknown";
}
