import axios from "axios";

export const createOrder =
  async (shippingAddress) => {

    const { data } =
      await axios.post(
        "/api/payment/create-order",
        { shippingAddress }
      );

    return data;
  };

export const verifyPayment =
  async (paymentData) => {

    return axios.post(
      "/api/payment/verify-payment",
      paymentData
    );
  };