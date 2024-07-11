import { Text } from "react-native";
import { PriceCompType } from "@/constants/types";

const Price = ({
  locale,
  price,
  currency,
  showP,
  fontSize,
  color,
}: PriceCompType) => {
  const formatPrice = () =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(price);

  return showP ? (
    <Text style={{ fontSize: fontSize }} className=" font-bold">
      ({formatPrice()})
    </Text>
  ) : (
    <Text style={{ fontSize: fontSize, color: color }} className=" font-bold">
      {formatPrice()}
    </Text>
  );
};

Price.defaultProps = {
  locale: "en-NG",
  currency: "NGN",
};

export default Price;
