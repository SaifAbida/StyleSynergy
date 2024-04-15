import { useEffect, useState } from "react";
import Order from "../../components/Order/Order";
import axios, { AxiosResponse } from "axios";
import { OrderType } from "../../Types/Types";
import "./Orders.css";

const Orders = () => {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState<OrderType[]>([] as OrderType[]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/order/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res: AxiosResponse) => {
        setOrders(res.data);
      });
  }, []);

  return (
    <div className="ordersContainer">
      <h1>Orders:</h1>
      {orders.length !== 0 ? (
        <div className="orderDisplay">
          {orders.map((order) => (
            <Order
              firstName={order.firstName}
              lastName={order.lastName}
              status={order.status}
              id={order._id}
              street={order.street}
              city={order.city}
              country={order.country}
              postCode={order.postCode}
              total={order.total}
              createdAt={order.createdAt}
              setOrders={setOrders}
            />
          ))}
        </div>
      ) : (
        <p className="noContent">Your orders will display here</p>
      )}
    </div>
  );
};

export default Orders;
