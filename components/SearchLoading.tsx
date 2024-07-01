import React from "react";
import HomeCardLoading from './HomeCardLoading';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

const SearchLoading = () => {
    return (
        <Animated.View entering={FadeIn} exiting={FadeOut} className='flex-1 w-full flex '  style={{paddingHorizontal: 18,
            paddingVertical: 10}}>
            {Array(10).fill('i').map((k, i) => <HomeCardLoading key={i + k}/>)}
        </Animated.View>
    )
}
export default SearchLoading;