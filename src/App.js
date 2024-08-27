import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { getFoodSelector } from "./redux/food/selectors";
import { useEffect } from "react";
import { getFoodHandle } from "./redux/food/actions";
import { getLoadingSelector } from "./redux/loading/selector";
import { GET_FOOD } from "./redux/food/constants";

function App() {
  const dispatch = useDispatch();
  const foodInfo = useSelector(getFoodSelector);

  const isFetching = useSelector((state) =>
    getLoadingSelector(state, [GET_FOOD.HANDLER])
  );

  const getFoodCallback = (res) => {
    console.log("response:", res);
  };

  const getFoodErrorCallback = (err) => {
    console.log("error:", err);
  };

  const getFoodByClick = () => {
    dispatch(
      getFoodHandle({ page: 1, limit: 10 }),
      getFoodCallback,
      getFoodErrorCallback
    );
  };

  useEffect(() => {
    dispatch(getFoodHandle(), getFoodCallback, getFoodErrorCallback);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <button
          style={{
            padding: "10px",
            fontSize: "20px",
            fontWeight: 500,
            borderRadius: "8px",
            margin: "20px",
          }}
          disabled={isFetching}
          onClick={getFoodByClick}
        >
          Get food
        </button>

        <div>{`Current food number ${foodInfo.data.length} (check console.log)`}</div>
      </header>
    </div>
  );
}

export default App;
