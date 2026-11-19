"use client";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "./api";
export default function useFetch(path) {
  const [data, setData] = useState(null);
  const load = useCallback(
    () =>
      api(path)
        .then(setData)
        .catch((x) => {
          toast.error(x.message || "Failed to load data", { id: path });
          setData([]);
        }),
    [path],
  );
  useEffect(() => {
    load();
  }, [load]);
  return [data, load];
}
