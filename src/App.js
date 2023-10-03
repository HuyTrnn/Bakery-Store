import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { publicRoutes, PrivateRoute } from "~/routes";
import { useThunk } from "./hooks";
import { getUser, setCart } from "./store";
import { useSelector } from "react-redux";
import { HelmetProvider } from "react-helmet-async";

function App() {
  const [doGetUser, isLoading, error, data] = useThunk(getUser);
  const { accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken) {
      doGetUser(accessToken);
    }
  }, [accessToken, doGetUser]);
  useEffect(() => {
    if (isLoading) {
    } else if (error) {
    } else if (data) {
      const cartJson = localStorage.getItem(`cart_${data.id}`);
      let cart = JSON.parse(cartJson);
      if (cart) {
        dispatch(setCart(cart));
      }
    }
  }, [isLoading, error, data, dispatch]);

  const route = publicRoutes.map((route, index) => {
    const Page = route.component;
    const Layout = route.layout;
    return {
      path: route.path,
      element: (
        <Layout key={index}>
          <Page />
        </Layout>
      ),
    };
  });
  const router = createBrowserRouter(route);
  return (
    <HelmetProvider>
      <div className="App">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </HelmetProvider>
  );
}

export default App;
