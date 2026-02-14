import { useState, useEffect } from "react";

/** Custom hook for keeping state data synced with localStorage.
 *
 * Creates `item` as state and looks in localStorage for current value
 * (if not found, defaults to `firstValue`).
 *
 * When `item` changes, effect re-runs:
 * - if new state is null, removes from localStorage
 * - else, updates localStorage
 *
 *   const [myThing, setMyThing] = useLocalStorage("myThing")
 */

function useLocalStorage(key, firstValue = null) {
  const [item, setItem] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? stored : firstValue;
    } catch {
      return firstValue;
    }
  });

  useEffect(() => {
    try {
      if (item === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, item);
      }
    } catch (err) {
      console.warn(`Failed to update localStorage key "${key}":`, err.message);
    }
  }, [key, item]);

  return [item, setItem];
}

export default useLocalStorage;
