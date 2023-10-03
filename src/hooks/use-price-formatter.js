import { useState, useEffect } from "react";

function usePriceFormatter(price, currencyCode) {
  const [formattedPrice, setFormattedPrice] = useState("");

  useEffect(() => {
    if (price === undefined || currencyCode === undefined) {
      setFormattedPrice("");
      return;
    }

    const formatter = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currencyCode,
    });

    setFormattedPrice(formatter.format(price));
  }, [price, currencyCode]);

  return formattedPrice;
}

export default usePriceFormatter;
