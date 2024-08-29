import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { getFoodSelector } from "./redux/food/selectors";
import { useEffect, useState } from "react";
import { createFoodHandle, getFoodHandle } from "./redux/food/actions";
import { getLoadingSelector } from "./redux/loading/selector";
import { CREATE_FOOD, GET_FOOD } from "./redux/food/constants";
import { Button, Card, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { CREATE_PAYMENT, GET_PAYMENT } from "./redux/payment/constants";
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
    getLoadingSelector(state, [GET_PAYMENT.HANDLER])
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
      getPaymentHandle({ page: 1, limit: 100 }),
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

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Return in the format "DD/MM/YYYY HH:mm:ss"
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  useEffect(() => {
    dispatch(getFoodHandle(), getFoodCallback, getFoodErrorCallback);
  }, []);

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
          <h1> LIST FOOD</h1>
          <span>Select the food you want to order</span>
          {foodInfo?.data?.length !== 0 &&
            foodInfo?.data.map((item, index) => (
              <div className="food-item" key={index}>
                <FormControlLabel
                  control={
                    <Checkbox checked={!!checkedList.find((food) => food.index === index)}
                      onChange={() => handleCheckboxChange(index, item)} name={index.toString()} />
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

          (
            <>    <h1>LIST PAYMENT</h1>
              <div className="food-payment" >

                {paymentInfo?.data?.map((itemPayment) =>
                (

                  <Card key={itemPayment.id} className="food-order-card">
                    <Typography>{formatDate(itemPayment.createdAt)}</Typography>

                    <Typography>Index:  {itemPayment.id}</Typography>
                    <Typography variant='h6'>List order</Typography>
                    {itemPayment.list.map((item, index) => (
                      <div className="food-item-info" key={`${itemPayment.id}-${index}`}>
                        <Typography >{item.name}</Typography>
                        <Typography>x</Typography>
                        <Typography >{item.quantity}</Typography>
                      </div>
                    ))}</Card>

                )

                )}


              </div></>
          )}
      </div>
    </div>
  )
}
export default App;
