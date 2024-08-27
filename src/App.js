import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { getFoodSelector } from "./redux/food/selectors";
import { useEffect, useState } from "react";
import { createFoodHandle, getFoodHandle } from "./redux/food/actions";
import { getLoadingSelector } from "./redux/loading/selector";
import { CREATE_FOOD, GET_FOOD } from "./redux/food/constants";

function App() {
  const dispatch = useDispatch();
  const foodInfo = useSelector(getFoodSelector);
  const [newFood, setNewFood] = useState("")

  const isFetching = useSelector((state) =>
    getLoadingSelector(state, [GET_FOOD.HANDLER])
  );

  const isFetchingCreate = useSelector((state) =>
    getLoadingSelector(state, [CREATE_FOOD.HANDLER])
  );

  const getFoodCallback = (res) => {
    console.log(" getFoodCallback  - response:", res);
  };

  const getFoodErrorCallback = (err) => {
    console.log("getFoodErrorCallback - error:", err);
  };


  const createFoodCallback = (res) => {
    console.log(" createFoodCallback  - response:", res);
  };

  const createFoodErrorCallback = (err) => {
    console.log("createFoodErrorCallback - error:", err);
  };


  const getFoodByClick = () => {
    dispatch(
      getFoodHandle({ page: 1, limit: 100 }),
      getFoodCallback,
      getFoodErrorCallback
    );
  };

  const createFoodByClick = () => {
   
    dispatch(
      createFoodHandle({ name: newFood, id:'10' }),
      createFoodCallback,
      createFoodErrorCallback
    );
  };
  const handleChange = (event) => {
    setNewFood(event.target.value);
  };

  // useEffect(() => {
  //   dispatch(getFoodHandle(), getFoodCallback, getFoodErrorCallback);
  // }, []);

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

        <input value={newFood} onChange={handleChange} />
        <button
          style={{
            padding: "10px",
            fontSize: "20px",
            fontWeight: 500,
            borderRadius: "8px",
            margin: "20px",
          }}
          disabled={isFetchingCreate}
          onClick={createFoodByClick}
        >
          Create food
        </button>

        <div>{`Current food number ${foodInfo.data.length} (check console.log)`}</div>
      </header>
    </div>
  );
}

export default App;
