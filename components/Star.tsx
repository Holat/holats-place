import { View, Image } from "react-native";

const StarRating = ({ stars, size }: { stars: number; size: number }) => {
  const renderStar = (number: number) => {
    const halfNumber = number - 0.5;
    const starType =
      stars >= number
        ? "star-full"
        : stars >= halfNumber
        ? "star-half"
        : "star-empty";

    const images = {
      "star-full": {
        image: require("../assets/star-full.png"),
      },
      "star-half": {
        image: require("../assets/star-half.png"),
      },
      "star-empty": {
        image: require("../assets/star-empty.png"),
      },
    };

    return (
      <Image
        key={number}
        source={images[starType].image}
        className="w-3 h-3"
        style={{ width: size, height: size, marginRight: size / 6 }}
      />
    );
  };

  return <View className=" flex-row ">{[1, 2, 3, 4, 5].map(renderStar)}</View>;
};

StarRating.defaultProps = {
  size: 18,
};

export default StarRating;
