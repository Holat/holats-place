import { Text } from "react-native";

const Price = ({
  locale,
  price,
  currency,
  showP,
  fontSize,
  color,
}: {
  locale?: string;
  price: number;
  currency?: string;
  showP?: boolean;
  fontSize?: number;
  color?: string;
}) => {
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
