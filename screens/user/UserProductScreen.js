import React from 'react';
import { View, Text, FlatList, Button, Platform, Alert } from 'react-native';
import { useSelector, useDispatch } from  'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import HeaderButton from '../../components/UI/HeaderButton'
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';

const UserProductScreen = props => {
    const userPorducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = id => {
        props.navigation.navigate('EditProduct', {productId: id})
    }

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you really wan tto delete this item?', [
            {text: 'No', style: 'default'},
            {text: 'Yes', style: 'destructive', onPress: () => {
                    dispatch(productsActions.deleteProduct(id))
            }}
        ])
    };

    if (userProducts.length === 0) {
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>No products found, maybe start creating some?</Text>
        </View>
    }

    return (
        <FlatList 
            data={userPorducts}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        editProductHandler(itemData.item.id)
                    }}
                >
                    <Button 
                    color={Colors.primary} 
                    title='Edit' 
                    onPress={() => {
                        editProductHandler(itemData.item.id)
                    }}
                    
                    />
                    <Button 
                    color={Colors.primary} 
                    title='Delete' 
                    onPress={deleteHandler.bind(this, itemData.item.id)}
                    />
                </ProductItem>
            )}
        />
    )
};

UserProductScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Products',
        headerLeft: (
            <HeaderButtons headerButtonComponent={HeaderButton} >
                <Item 
                    title='Cart' 
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} 
                    onPress={() => {
                        navData.navigation.toggleDrawer()
                    }}  
                />
            </HeaderButtons>
        ),
        headerRight: (
            <HeaderButtons headerButtonComponent={HeaderButton} >
                <Item 
                    title='Cart' 
                    iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'} 
                    onPress={() => {
                        navData.navigation.navigate('EditProduct')
                    }}  
                />
            </HeaderButtons>
        ),

    }
    
}

export default UserProductScreen;