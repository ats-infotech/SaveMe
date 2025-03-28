import {Dimensions, StyleSheet} from 'react-native';
import {fontsName} from '../../constants';
const {width} = Dimensions.get('window');
const Style = theme => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
    },
    subContainer: {
      paddingHorizontal: 25,
    },
    welcomeText: {
      color: theme.FONT_GREEN,
      fontSize: 45,
      lineHeight: 55,
      fontFamily: fontsName.NUNITO_BOLD,
    },
    suggestionText: {
      color: theme.FONT_GREEN,
      fontSize: 18, //21
      width: width - 100,
      marginTop: 80,
      fontFamily:fontsName.NUNITO_REGULAR
    },
    infoVw:{alignItems:'center', width:'50%'},
    horizontalCenter: { flexDirection: 'row', alignItems: 'center', },
    leafIcon:{width:19, height:27},
    profileImage:{height:120, width:120,overflow:'hidden',  borderRadius:60},
    editImage: { position: 'absolute', bottom: 2, right: 5, width: 42, height: 42 },
    infoTitleText: { fontSize: 16, color: theme.PRIMARY_GREEN, fontFamily: fontsName.NUNITO_REGULAR },
    profilerName:{fontSize:22, color:theme.FONT_MEDIUM_BLACK, fontFamily: fontsName.NUNITO_BOLD, marginTop:15, marginBottom:2},
    infoDataText: {fontSize:14, color:theme.PLACEHOLDER_TEXT, fontFamily: fontsName.NUNITO_REGULAR},
    featureMeasurementVw: { width: '100%', borderBottomWidth: 1, borderTopWidth: 1, borderColor: theme.BORDER_COLOR, paddingHorizontal: 30, paddingVertical: 15, marginVertical: 30 },
    smallAEDText: { fontSize: 8, alignSelf: 'flex-end', marginRight: '4%', fontFamily: fontsName.NUNITO_BOLD },
    buttonView: { borderRadius: 30, paddingVertical: 12 },
    textRightAlign: { width: '20%', textAlign: 'right', fontFamily: fontsName.NUNITO_BOLD, fontWeight:'800' },
    line:{backgroundColor:theme.FONT_LIGHT_VIOLET, width:1, height:'100%', marginHorizontal:5},
    followText: {textAlign:"center", marginTop:20, fontSize:16, color:theme.FONT_LIGHT_VIOLET, fontFamily: fontsName.NUNITO_REGULAR},
    mediaIconStyle:{width:25, height:25, marginLeft:20, overflow:'hidden', resizeMode:'cover'}
  });
};
export default Style;
