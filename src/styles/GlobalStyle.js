/**
 * Created by kenji on 4/9/18.
 */
import { StyleSheet, Dimensions} from 'react-native';

module.exports = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerWithVerticalMargin: {
        flex: 1,
        marginVertical: 15,
    },
    flexRowContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    flexEnd: {
        flexDirection:'column',
        justifyContent:'flex-end',
    },
    flexStart: {
        flexDirection:'column',
        justifyContent:'flex-start',
    },
    flexColumnContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    mainContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    mainContainerPullLeft: {
        alignItems: 'flex-start',
        marginLeft: '5%',
        marginRight: '5%',
    },
    mainContainerHorizontal: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '5%',
        marginRight: '5%',
        justifyContent: 'center',
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        backgroundColor: '#B46486'
    },
    heading: {
        color: 'white',
        marginTop: 10,
        fontSize: 22,
        fontWeight: 'bold'
    },
    scannerPreview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    scannerCapture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    //Stock
    stockHeader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    stockFont: {
        color: 'rgba(0,0,0,.38)',
        fontSize: 12,
        fontWeight: 'normal',
        marginTop: 8,
    },
    stockHeaderFont: {
        color: 'rgba(33, 150, 243,.9)',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 8,
    },
    headerFont: {
        color: 'rgba(23, 23, 23, .9)',
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
        marginVertical: 15,
    }
});