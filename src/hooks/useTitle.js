import { useEffect } from "react";
const MAIN_NAME = 'CDB';

export function useTitle(title, deps = []) {
  useEffect(() => {
    document.title = title ? `${MAIN_NAME} > ${title}` : `${MAIN_NAME}`;
  }, [...deps, title]);
}