import React from "react";

const usePrevious = <T>(value: T): T => {
  const ref = React.useRef<T>(value);
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export default usePrevious;
