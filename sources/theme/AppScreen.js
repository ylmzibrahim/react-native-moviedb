import { create } from 'react-native-pixel-perfect';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get("screen");
const designResolution = {
    // previous screen:
    height: 896,
    width: 414

    // current screen:
    // height: height, // 731
    // width: width // 411
}

export const perfectSize = create(designResolution);