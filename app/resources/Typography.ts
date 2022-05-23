import {StyleSheet} from 'react-native'
import Colors from '@resources/Colors'

const Fonts = {
    nunitoBold: 'Nunito-Bold',
    nunitoRegular: 'Nunito-Regular',
}

const Typography = StyleSheet.create({
    text14RegularBlack: {
        color: Colors.black,
        fontFamily: Fonts.nunitoRegular,
    },
    text18BoldWhite: {
        color: Colors.white,
        fontFamily: Fonts.nunitoBold,
        fontSize: 18,
    },
    text18RegularBlack: {
        color: Colors.black,
        fontFamily: Fonts.nunitoRegular,
        fontSize: 18,
    },
})

export default Typography
