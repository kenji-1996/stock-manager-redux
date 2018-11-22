/**
 * Created by kenji on 4/9/18.
 */
import React from 'react';
import { Button, View, ScrollView, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { Icon, PricingCard, Text, Divider, ListItem } from 'react-native-elements';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { createStackNavigator, } from 'react-navigation';
import GlobalStyle from '../styles/GlobalStyle';
import Format from '../functions/Format';
import { fetchStocklist } from '../redux/stock_list/actions';
import { fetchStockItem } from '../redux/stock/actions';
import { connect } from 'react-redux';
import Stock from '../objects/StockItem'

class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'Home',
    };

    componentWillMount() {
        console.log(this.props)
    }

    renderItem = ({ item }) => {
        item = new Stock(item);
        return (
            <ListItem style={styles.listItem} title={item.TradeName}
            subtitle={
                <View>
                    <Text>Retail: {Format.formatPrice(item.Retail)}, Real: {Format.formatPrice(item.RealCost)}</Text>
                    <Text>SOH: {item.SOH}</Text>
                </View>
            }
            onPress={() => {
                this.props.screenProps.fetchStockItem(item.StockID).then(() => {
                    this.props.screenProps.updateLastItem(item);
                    if (!this.props.screenProps.itemLoading) {
                        if (this.props.screenProps.itemError === null) {
                            this.props.navigation.navigate(`StockScreen`, { item: this.props.screenProps.item, parent: 'Search' })
                        }
                    }
                });
    
            }}
            onLongPress={() => {
                this.props.screenProps.fetchStockItem(item.StockID).then(() => {
                    this.props.screenProps.updateLastItem(item);
                    if (!this.props.screenProps.itemLoading) {
                        if (this.props.screenProps.itemError === null) {
                            this.props.navigation.navigate(`StockModal`, { item: this.props.screenProps.item, parent: 'Search' })
                        }
                    }
                });
            }}
            badge={{ value: (item.SOH.toString()), textStyle: {}, containerStyle: { marginTop: -20 } }}
        />
        );
    };

    render() {
        //Formatting an item to make it more predictable and clear
        let latestItem = new Stock(this.props.screenProps.latestItem);
        latestItem.formattedPrice = latestItem.priceFormat(latestItem.Retail);

        //Getting the list of 5-10 most recently viewed items
        const { latestItems } = this.props.screenProps;
        return (
            <ScrollView style={{...GlobalStyle.container}}>
                <View style={{paddingHorizontal: 10}} >
                    <Text style={GlobalStyle.stockHeaderFont}>Latest Viewed</Text>
                    <Divider style={{ backgroundColor: 'gray', width: '100%' }} />
                </View>
                {
                    latestItem?
                    <Card>
                        <CardTitle
                            title={latestItem.TradeName}
                        />
                        <CardAction 
                            separator={true} 
                            inColumn={false}
                        >
                            <CardButton
                                onPress={() => {
                                    this.props.screenProps.fetchStockItem(latestItem.StockID).then(() => {
                                        if (!this.props.screenProps.itemLoading) {
                                            if (this.props.screenProps.itemError === null) {
                                                this.props.navigation.navigate(`StockModal`, { item: this.props.screenProps.item, parent: 'Search' })
                                            }
                                        }
                                    });
                                }}
                                title="Quick Edit"
                                color="#2196f3"
                            />
                            <CardButton
                                onPress={() => {
                                    this.props.screenProps.fetchStockItem(latestItem.StockID).then(() => {
                                        if (!this.props.screenProps.itemLoading) {
                                            if (this.props.screenProps.itemError === null) {
                                                this.props.navigation.navigate(`StockScreen`, { item: this.props.screenProps.item, parent: 'Search' })
                                            }
                                        }
                                    });
                                }}
                                title="Full EDIT"
                                color="#2196f3"
                            />
                        </CardAction>
                    </Card>
                    :
                    null
                }
                <View style={{paddingHorizontal: 10}} >
                    <Text style={GlobalStyle.stockHeaderFont}>Recently viewed</Text>
                    <Divider style={{ backgroundColor: 'gray', width: '100%' }} />
                </View>
                <FlatList
                        styles={{...styles.container, marginBottom: 90}}
                        data={latestItems}
                        renderItem={this.renderItem}
                        keyExtractor={(item, StockID) => StockID.toString()}
                    />
            </ScrollView>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    listItem: {
        marginBottom: 1,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.12)',
    },
    sectionContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.12)',
        backgroundColor: '#efefef',
    },
    sectionTitle: {
        color: 'black',
        fontSize: 14,
        marginBottom: 8,
        marginLeft: 16,
        marginRight: 16,
        marginTop: 8,
        opacity: 0.8,
    },
});

const mapStateToProps = state => ({
    //Settings state items
    latestItem: state.settings.LatestItem,
    latestItems: state.settings.LastTenItems,

    item: state.stockItem.item,
    itemLoading: state.stockItem.loading,
    itemError: state.stockItem.error,
});

const mapDispatchToProps = {
    fetchStocklist, fetchStockItem
};

const mergeProps = (state, dispatch, ownProps) => {
    return ({
        ...ownProps,
        screenProps: {
            ...ownProps.screenProps,
            ...state,
            ...dispatch,
        }
    })
}

let Home = createStackNavigator({
    Home: HomeScreen,
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Home);



