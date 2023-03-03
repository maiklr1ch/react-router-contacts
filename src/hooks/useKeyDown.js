import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useKeyDown(key, routeTo) {
  const navigator = useNavigate();

  useEffect(() => {
    window.onkeydown = (e) => e.key === key ? navigator(routeTo) : true;
  }, [key, routeTo]);
}