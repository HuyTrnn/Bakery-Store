import styles from "./HomePage.module.scss";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { useThunk } from "~/hooks";
import img from '../../assets/img1.jpg'
import {
  fetchNewProducts,
  fetchSellingProducts,
  fetchNoNasties,
  fetchBranch,
  fetchForte,
} from "~/store";
import { Banner, Button, Slider, LoadingComponent } from "~/components";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
const cx = classNames.bind(styles);

function HomePage() {
  const [doFetchNewProducts, isLoadingOfNewProducts, errorOfFetchNewProducts] =
    useThunk(fetchNewProducts);
    const { t } = useTranslation();

  // const [
  //   doFetchSellingProducts,
  //   isLoadingOfSellingProducts,
  //   errorOfFetchSellingProducts,
  // ] = useThunk(fetchSellingProducts);

  // const [doFetchNoNasties, isLoadingNoNasties, errorOfFetchNoNasties] =
  //   useThunk(fetchNoNasties);

  // const [doFetchBranch, isLoadingOfBranch, errorOfFetchBranch] =
  //   useThunk(fetchBranch);
  // const [doFetchForte, isLoadingOfForte, errorOfFetchForte] =
  //   useThunk(fetchForte);
  const { data: newProducts } = useSelector((state) => state.newProducts);
  const { data: sellingProducts } = useSelector(
    (state) => state.sellingProducts
  );
  const { data: noNasties } = useSelector((state) => state.noNasties);
  const { data: branch } = useSelector((state) => state.branch);
  const { data: forte } = useSelector((state) => state.forte);

  useEffect(() => {
    doFetchNewProducts();
    // doFetchSellingProducts();
    // doFetchNoNasties();
    // doFetchBranch();
    // doFetchForte();
  }, [
    doFetchNewProducts,
    // doFetchSellingProducts,
    // doFetchNoNasties,
    // doFetchBranch,
    // doFetchForte,
  ]);

  const banner = {
    url: img,
  };

  const BannerContent = (
    <div className={cx("banner-content")}>
      <h3>Collection of French Pastries</h3>
      <div className={cx("banner-content-btn")}>
        <Button to="/collections" className={cx("banner-btn")}>
          Buy the Cake
        </Button>
      </div>
    </div>
  );

  let contentNewProducts;
  if (isLoadingOfNewProducts) {
    contentNewProducts = <LoadingComponent />;
  } else if (errorOfFetchNewProducts) {
    contentNewProducts = <h1>No item</h1>;
  } else if (newProducts) {
    contentNewProducts = <Slider quantityDisplayed={3} data={newProducts} />;
  }

  // let contentSellingProducts;
  // if (isLoadingOfSellingProducts) {
  //   contentSellingProducts = <LoadingComponent />;
  // } else if (errorOfFetchSellingProducts) {
  //   contentSellingProducts = "lỗi rồi";
  // } else if (sellingProducts) {
  //   contentSellingProducts = sellingProducts.map((item, index) => {
  //     const reverse = index % 2 !== 0;
  //     return (
  //       <div
  //         key={index}
  //         className={cx("row", {
  //           "row-reverse": reverse,
  //         })}
  //       >
  //         <div className={cx("col", "l-6", "m-6", "c-6")}>
  //           <img
  //             className={cx("product-image")}
  //             src={`data:image/png;base64,${item.product.image}`}
  //             alt="product"
  //           />
  //         </div>
  //         <div className={cx("col", "l-6", "m-6", "c-6")}>
  //           <div className={cx("selling-products-container")}>
  //             <div
  //               className={cx("heading", {
  //                 "heading--left": !reverse,
  //                 "heading--right": reverse,
  //               })}
  //             >
  //               <h4>{item.product.name}</h4>
  //             </div>
  //             <div
  //               className={cx("content", {
  //                 "content--left": !reverse,
  //                 "content--right": reverse,
  //               })}
  //             >
  //               <p>{item.product.description}</p>
  //             </div>

  //             <div
  //               className={cx("selling-products-action", {
  //                 "selling-products-action--right": reverse,
  //               })}
  //             >
  //               <Button
  //                 to={`/collections/${item.product.id_type}/${item.product.id}`}
  //                 className={cx("btn-browse")}
  //               >
  //                 browse
  //               </Button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   });
  // }

  // let contentNoNasties;
  // if (isLoadingNoNasties) {
  //   contentNoNasties = <LoadingComponent />;
  // } else if (errorOfFetchNoNasties) {
  //   contentNoNasties = "lổi rồi";
  // } else if (noNasties) {
  //   contentNoNasties = noNasties.map((item) => {
  //     return (
  //       <div key={item.id} className={cx("col", "l-4", "m-4", "c-12")}>
  //         <div className={cx("cart--container")}>
  //           <div className={cx("cart--image")}>
  //             <div
  //               className={cx("lazy--image")}
  //               style={{
  //                 backgroundImage: `url(data:image/png;base64,${item.image})`,
  //               }}
  //             ></div>
  //           </div>
  //           <div className={cx("cart--content")}>
  //             <div className={cx("cart--heading")}>
  //               <h5>{item.name}</h5>
  //             </div>
  //             <div className={cx("cart--description")}>
  //               <p>{item.description}</p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   });
  // }

  // let contentBranch;
  // if (isLoadingOfBranch) {
  //   contentNoNasties = <LoadingComponent />;
  // } else if (errorOfFetchBranch) {
  //   contentNoNasties = "lổi rồi";
  // } else if (branch) {
  //   contentBranch = branch.map((item) => {
  //     return (
  //       <div className={cx("row", "reverse", "no-gutters")} key={item.id}>
  //         <div className={cx("col", "l-6", "m-6", "c-12")}>
  //           <div className={cx("address-container")}>
  //             <div className={cx("heading")}>
  //               <h4>{item.name}</h4>
  //             </div>
  //             <div className={cx("address-content")}>
  //               <p>{item.address}</p>
  //               <p>{item.time_open}</p>
  //             </div>
  //           </div>
  //         </div>
  //         <div className={cx("col", "l-6", "m-6", "c-12")}>
  //           <div
  //             style={{
  //               backgroundImage: `url(data:image/png;base64,${item.image})`,
  //             }}
  //             className={cx("address-image")}
  //           ></div>
  //         </div>
  //       </div>
  //     );
  //   });
  // }

  // let contentForte;
  // if (isLoadingOfForte) {
  //   contentForte = <LoadingComponent />;
  // } else if (errorOfFetchForte) {
  //   contentForte = "lổi rồi";
  // } else if (forte) {
  //   contentForte = forte.map((item) => {
  //     return (
  //       <div key={item.id} className={cx("col", "l-4", "m-4", "c-12")}>
  //         <div className={cx("cart--container")}>
  //           <div className={cx("cart--icon")}>
  //             <img alt="cart" src={`data:image/png;base64,${item.image}`} />
  //           </div>
  //           '
  //           <div className={cx("cart--content")}>
  //             <div className={cx("cart--heading")}>
  //               <h5>{item.name}</h5>
  //             </div>
  //             <div className={cx("cart--description")}>
  //               <p>{item.description}</p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   });
  // }
  return (
    <div>
      <Helmet>
        <title>Trang chủ – HK SHOP</title>
      </Helmet>
      {/* {banner} */}
      <div className={cx("grid")}>
        <div className={cx("row", "no-gutters")}>
          <div className={cx("col", "l-12", "c-12", "m-12")}>
            <Banner image={banner} content={BannerContent} />
          </div>
        </div>
      </div>
      {/* {new product} */}
      <div className={cx("new-product")}>
        <div className={cx("grid", "wide")}>
          <div className={cx("row")}>
            <div className={cx("col", "l-12", "c-12", "m-12")}>
              <div className={cx("heading")}>
                <h4>NEW & FAVORITES</h4>
              </div>
            </div>
          </div>
          <div className={cx("row")}>
            <div className={cx("col", "l-12", "c-12", "m-12")}>
              <Slider quantityDisplayed={4} data={newProducts} />
            </div>
          </div>
        </div>
      </div>

      {/* {selling product} */}

      <div className={cx("selling-products")}>
        <div className={cx("grid", "wide")}>
          <div className={cx("row")}>
            <div className={cx("col", "l-12", "c-12", "m-12")}>
              <div className={cx("selling-product")}>
                {/* {contentSellingProducts} */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* {address} */}
      <div className={cx("grid")}>
        <div className={cx("row", "reverse", "no-gutters")}>
          <div className={cx("col", "l-6", "m-6", "c-12")}>
            <div className={cx("address-container")}>
              <div className={cx("heading")}>
                <h4>Have good day</h4>
              </div>
              <div className={cx("address-content")}>
                <p>{t('address1')}</p>
                <p>{t('address2')}</p>
                <p>8am - 10pm</p>
              </div>
            </div>
          </div>
          <div className={cx("col", "l-6", "m-6", "c-12")}>
            <div
              style={{
                backgroundImage: `url(${banner.url})`,
              }}
              className={cx("address-image")}
            ></div>
          </div>
        </div>
      </div>

      {/* NO NASTIES} */}

      <div className={cx("no-nasties")}>
        <div className={cx("grid", "wide")}>
          <div className={cx("row")}>
            <div className={cx("col", "l-12", "c-12", "m-12")}>
              <div className={cx("heading")}>
                <h4>NO NASTIES</h4>
              </div>
            </div>
          </div>
          <div className={cx("row")}>
            <Slider quantityDisplayed={4} data={newProducts} />
          </div>
        </div>
      </div>

      <div className={cx(cx("forte"))}>
        <div className={cx("grid", "wide")}>
          <div className={cx("row")}>
            {" "}
            <div className={cx("col", "l-6", "m-6", "c-12")}>
              <div
                style={{
                  backgroundImage: `url(${banner.url})`,
                }}
                className={cx("address-image")}
              ></div>
            </div>
            <div className={cx("col", "l-6", "m-6", "c-12")}>
              <div className={cx("address-container")}>
                <div className={cx("heading")}>
                  <h4>Have good day</h4>
                </div>
                <div className={cx("address-content")}>
                  <p>{t('description1')}</p>
                  <p>{t('description2')}</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
