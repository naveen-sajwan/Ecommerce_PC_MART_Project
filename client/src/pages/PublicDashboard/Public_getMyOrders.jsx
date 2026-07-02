import React, {
  useEffect,
  useState,
} from "react";
import { Link ,useNavigate} from "react-router-dom";
import API from "../../utils/axios.js";

const Public_getMyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get(`/orders/my-orders`);
      setOrders(data);
      console.log(data)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading Orders...</h2>;
  }

  if (orders.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        <h2>No Orders Found</h2>
      </div>
    );
  }

  return (
    <div className="container  py-4">
      <h2 className="mb-4">
        My Orders
      </h2>

      {orders.map((order) => (
        <div key={order._id} className="card mb-3">
          <div className="card-body">
            <div className="d-flex flex-wrap gap-3 justify-content-between">
              <div>
                <h6>
                  Order #
                  {order._id.slice(
                    -8
                  )}
                </h6>

                <p>
                  Date:{" "}
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </p>

                <p>
                  Total: ₹
                  {order.totalAmount}
                </p>
              </div>

              <div>
                <p>
                  Payment:
                  <strong className={order.paymentStatus == "paid"?"text-success":"text-danger"}>
                    {" "}
                    {order.paymentStatus}
                  </strong>
                </p>

                <p>
                  Status:
                  <strong>
                    {" "}
                    {
                      order.orderStatus
                    }
                  </strong>
                </p>
              </div>
            </div>

            <div
              onClick={() => navigate(`/public/order/${order._id}`)}
              className="btn btn-primary"
            >
              View Details
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Public_getMyOrders;