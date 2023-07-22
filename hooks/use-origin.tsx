import { useEffect, useState } from "react";

export const useOrign = () => {
  const [isMounted, setisMounted] = useState(false);

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) {
    return "";
  }

  return origin;
};
