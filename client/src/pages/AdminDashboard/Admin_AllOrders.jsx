import React, { useEffect, useState } from "react";
import API from "../../utils/axios";

const Admin_AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/api/orders");
      setOrders(data);
      console.log(data)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  console.log()

  const updateStatus = async (
    orderId,
    orderStatus
  ) => {
    try {
      await API.put(
        `/api/orders/${orderId}`,
        { orderStatus }
      );

      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <h2>Loading Orders...</h2>;
  }

  return (
    <div className="container mt-4">
      <h2>Orders Management</h2>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Address</th>
            <th>Products</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>

              <td>
                {order.user?.name}
                <br />
                {order.user?.email}
              </td>

              <td>₹{order.totalAmount}</td>

              <td>
                <span
                  className={
                    order.paymentStatus === "paid"
                      ? "text-success"
                      : "text-danger"
                  }
                >
                  {order.paymentStatus}
                </span>
              </td>

              <td>{order.orderStatus}</td>

              <td>
                {order.shippingAddress.fullName}
                <br />
                {order.shippingAddress.address}
                <br />
                {order.shippingAddress.city}
              </td>

              <td>
                {order.items.map((item) => (
                  <div key={item._id}>
                    {item.product?.name} ×{" "}
                    {item.quantity}
                  </div>
                ))}
              </td>

              <td>
                <select
                  value={order.orderStatus}
                  onChange={(e) =>
                    updateStatus(
                      order._id,
                      e.target.value
                    )
                  }
                >
                  <option value="processing">
                    Processing
                  </option>

                  <option value="shipped">
                    Shipped
                  </option>

                  <option value="delivered">
                    Delivered
                  </option>

                  <option value="cancelled">
                    Cancelled
                  </option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin_AllOrders;