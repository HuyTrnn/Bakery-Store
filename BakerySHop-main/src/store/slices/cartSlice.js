import { createSlice } from "@reduxjs/toolkit";
import { order, logout } from "../thunks";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: {
      userId: 0,
      items: [],
      total: 0,
    },
    error: null,
    status: "idle",
  },
  reducers: {
    addToCart: (state, action) => {
      state.data.userId = action.payload.userId;
      if (state.data.items.length === 0) {
        state.data.items.push(action.payload.product);
      } else {
        const productIndex = state.data.items.findIndex((item) => {
          return (
            item.productId === action.payload.product.productId &&
            item.productType === action.payload.product.productType
          );
        });
        if (productIndex !== -1) {
          state.data.items[productIndex].quantity +=
            action.payload.product.quantity;
        } else {
          state.data.items.push(action.payload.product);
        }
      }
      state.data.total = state.data.items.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);

      localStorage.setItem(
        `cart_${state.data.userId}`,
        JSON.stringify(state.data)
      );
    },
    setCart: (state, action) => {
      state.data = action.payload;
    },
    updateCart: (state, action) => {
      const productIndex = state.data.items.findIndex((item) => {
        return (
          item.productId === action.payload.product.productId &&
          item.productType === action.payload.product.productType
        );
      });

      state.data.items[productIndex].quantity = action.payload.product.quantity;

      state.data.total = state.data.items.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);

      localStorage.setItem(
        `cart_${state.data.userId}`,
        JSON.stringify(state.data)
      );
    },
    removeProduct: (state, action) => {
      state.data.items = state.data.items.filter(
        (item) => item.productId !== action.payload
      );
      localStorage.setItem(
        `cart_${state.data.userId}`,
        JSON.stringify(state.data)
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state, action) => {
      state.data = {
        userId: 0,
        items: [],
        total: 0,
      };
    });
    builder
      .addCase(order.pending, (state) => {
        state.status = "loading";
      })
      .addCase(order.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(order.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.items = [];
        state.data.total = 0;
        localStorage.removeItem(`cart_${state.data.userId}`);
      });
  },
});

export const { addToCart, setCart, updateCart, removeProduct } =
  cartSlice.actions;
export default cartSlice.reducer;
