import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { getFoodSelector } from "./redux/food/selectors";
import { useEffect, useState } from "react";
import { createFoodHandle, getFoodHandle } from "./redux/food/actions";
import { getLoadingSelector } from "./redux/loading/selector";
import { CREATE_FOOD, GET_FOOD } from "./redux/food/constants";
import { Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { CREATE_PAYMENT } from "./redux/payment/constants";
import { createPaymentHandle, getPaymentHandle } from "./redux/payment/actions";
import { getPaymentSelector } from "./redux/payment/selector";

function App() {
  const dispatch = useDispatch();
  const foodInfo = useSelector(getFoodSelector);
  const paymentInfo = useSelector(getPaymentSelector);
  const [newFood, setNewFood] = useState("")
  const [checkedList, setCheckedList] = useState([])


  const isFetchingGetFood = useSelector((state) =>
    getLoadingSelector(state, [GET_FOOD.HANDLER])
  );


  const isFetchingGetPayment = useSelector((state) =>
    getLoadingSelector(state, [GET_FOOD.HANDLER])
  );

  const isFetchingCreateFood = useSelector((state) =>
    getLoadingSelector(state, [CREATE_FOOD.HANDLER])
  );

  const isFetchingCreatePayment = useSelector((state) =>
    getLoadingSelector(state, [CREATE_PAYMENT.HANDLER])


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


  const getPaymentByClick = () => {
    dispatch(
      getPaymentHandle({ page: 1, limit: 1 }),
    );
  };


  const createFoodByClick = () => {

    dispatch(
      createFoodHandle({ name: newFood }),
      createFoodCallback,
      createFoodErrorCallback
    );
  };



  const createPaymentByClick = () => {
    dispatch(
      createPaymentHandle({
        list: checkedList
      }),
    );
  };


  const handleChange = (event) => {
    setNewFood(event.target.value);
  };

  const handleCheckboxChange = (index, item) => {
    const updatedList = [...checkedList];
    const existingItem = updatedList.find((food) => food.index === index);

    if (existingItem) {
      setCheckedList(updatedList.filter((food) => food.index !== index));
    } else {
      setCheckedList([...updatedList, { name: item.name, quantity: 0, index }]);
    }

  }

  const handleQuantityChange = (index, event) => {
    const updatedList = checkedList.map((food) =>
      food.index === index ? { ...food, quantity: event.target.value } : food
    );
    setCheckedList(updatedList);
  };

  function formatDate(isoString) {
    const date = new Date(isoString);

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',

    };

    return date.toLocaleDateString('en-US', options);
  }

  // useEffect(() => {
  //   dispatch(getFoodHandle(), getFoodCallback, getFoodErrorCallback);
  // }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <TextField
          id="input"
          label="Name of foods"
          value={newFood}
          onChange={handleChange}
        />

        <Button
          disabled={isFetchingCreateFood}
          onClick={createFoodByClick}
        >
          Create food
        </Button>

        <Button
          color='success'
          disabled={isFetchingGetFood}
          onClick={getFoodByClick}
        >
          Get list food
        </Button>
        <div className="food-order">

          {foodInfo?.data?.length !== 0 &&
            foodInfo?.data.map((item, index) => (
              <div className="food-item" key={index}>
                <FormControlLabel
                  control={
                    <Checkbox checked={!!checkedList.find((food) => food.index === index)}
                      onChange={() => handleCheckboxChange(index, item)} name={index} />
                  }
                  label={item.name}

                />
                {checkedList.find((food) => food.index === index) && (
                  <TextField
                    type="number"
                    value={checkedList.find((food) => food.index === index)?.quantity || ''}
                    onChange={(e) => handleQuantityChange(index, e)}
                    placeholder="Quantity"
                    size='small'
                    className="quantity-input"
                  />
                )}
              </div>
            ))
          }

          <div>{`Current food quantity: ${foodInfo.data.length} `}</div>
        </div>
        <Button
          disabled={isFetchingCreatePayment}
          onClick={createPaymentByClick}
        >
          Create a payment
        </Button>
        <Button
          color='success'
          disabled={isFetchingGetPayment}
          onClick={getPaymentByClick}
        >
          Get payment
        </Button>
        {paymentInfo?.data?.length !== 0 &&

          (<div className="food-order" >

            <Typography>Payment time:{formatDate(paymentInfo?.data?.[0]?.createdAt)}</Typography>

            <Typography>Payment index:  {paymentInfo?.data?.[0]?.id}</Typography>
            <h1>LIST PAYMENT</h1>
            {paymentInfo?.data?.[0]?.list.map((item, index) => (
              <div className="food-item-info">
              <Typography key={index}>{item.name}</Typography>
              <Typography>x</Typography>
              <Typography key={index}>{item.quantity}</Typography>
              </div>
            ))}
          </div>)}

      </div>
    </div>
  );
}

export default App;
