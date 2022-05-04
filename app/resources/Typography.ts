import {StyleSheet} from 'react-native'
import Colors from '@resources/Colors'

const Fonts = {
    nunitoBold: 'Nunito-Bold',
    nunitoRegular: 'Nunito-Regular',
}

const Typography = StyleSheet.create({
    text14RegularBlack: {
        fontFamily: Fonts.nunitoRegular,
        color: Colors.black,
    },
    text18RegularBlack: {
        fontSize: 18,
        fontFamily: Fonts.nunitoRegular,
        color: Colors.black,
    },
    text18BoldWhite: {
        fontSize: 18,
        fontFamily: Fonts.nunitoBold,
        color: Colors.white,
    },
})

export default Typography
