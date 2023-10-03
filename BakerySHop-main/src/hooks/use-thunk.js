import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
function useThunk(thunk) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const dispatch = useDispatch();
  const runThunk = useCallback(
    (agr) => {
      setIsLoading(true);
      dispatch(thunk(agr))
        .unwrap()
        .then((res) => {
          return setData(res);
        })
        .catch((error) => {
          return setError(error);
        })
        .finally(() => setIsLoading(false));
    },
    [dispatch, thunk]
  );
  return [runThunk, isLoading, error, data];
}

export default useThunk;
