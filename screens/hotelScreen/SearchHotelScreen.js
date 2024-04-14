/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList } from 'react-native';
import Footer from '../../components/Footer/Footer';
import { useNavigation } from '@react-navigation/native';

function SearchHotelScreen() {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [location, setLocations] = useState([]);
    const URl_API = 'http://192.168.2.24:8080';

    useEffect(() => {
        fetchLocations();
      }, []);

    const fetchLocations = async () => {
        try {
          const response = await fetch(`${URl_API}/api/v1/location/`);
          const data = await response.json();
          setLocations(data); // Assuming the response data is an array of locations
        } catch (error) {
          console.error('Error fetching locations:', error);
        }
    };

    const handleSearch = text => {
        setSearchText(text);
        const filtered = location.filter(item =>
            item.name.toLowerCase().includes(text.toLowerCase())
        );
        setSuggestions(filtered);
    };

    const renderSuggestionItem = ({ item }) => (
        <TouchableOpacity
            style={styles.suggestionItem}
            onPress={() => {
                setSearchText(item.name);
                setSuggestions([]);
                navigation.navigate('ListHotelScreen', { location: item, minPrice: 0, maxPrice: Infinity, selectedRatings: [1,2,3,4,5]});
            }}
        >
            <Text style={styles.suggestionItemText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchBox}>
                <Image
                    source={require('../../assets/icon/icon_gps.png')}
                    style={styles.icon}
                />
                <TextInput
                    style={styles.searchText}
                    placeholder="Search..."
                    onChangeText={handleSearch}
                    value={searchText}
                />
                <Image
                    source={require('../../assets/icon/icon_search.png')}
                    style={styles.icon}
                />
            </View>
            {suggestions.length > 0 && (
                <View style={styles.suggestionsContainer}>
                    <FlatList
                        data={suggestions}
                        renderItem={renderSuggestionItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            )}
            <View style={styles.itemList}>
                <Text style={styles.itemListLabel}>Địa điểm phổ biến</Text>
                <View style={styles.list}>
                    <View style={styles.item}>
                        <Image
                            source={require('../../assets/image/address/danang.jpg')}
                            style={styles.itemImage}
                        />
                        <Text style={styles.itemLabel}>Đà Nẵng</Text>
                    </View>
                    <View style={styles.item}>
                        <Image
                            source={require('../../assets/image/address/phuquoc.jpg')}
                            style={styles.itemImage}
                        />
                        <Text style={styles.itemLabel}>Phú Quốc</Text>
                    </View>
                    <View style={styles.item}>
                        <Image
                            source={require('../../assets/image/address/dalat.jpg')}
                            style={styles.itemImage}
                        />
                        <Text style={styles.itemLabel}>Đà Lạt</Text>
                    </View>
                </View>
            </View>
            <View style={styles.itemList}>
                <Text style={styles.itemListLabel}>Khách sạn yêu thích</Text>
                <View style={styles.list}>
                    <View style={styles.item}>
                        <Image
                            source={require('../../assets/image/hotel/vinperl-da-nang.jpg')}
                            style={styles.itemImage}
                        />
                        <Text style={styles.itemLabel}>Vinperl Da Nang</Text>
                    </View>
                    <View style={styles.item}>
                        <Image
                            source={require('../../assets/image/hotel/da-nang-han-river.jpg')}
                            style={styles.itemImage}
                        />
                        <Text style={styles.itemLabel}>Da Nang Han River</Text>
                    </View>
                    <View style={styles.item}>
                        <Image
                            source={require('../../assets/image/hotel/zen-valley-dalat.jpg')}
                            style={styles.itemImage}
                        />
                        <Text style={styles.itemLabel}>Zen Valley Dalat</Text>
                    </View>
                </View>
            </View>
            <Footer />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#24BAEC',
        width: '100%',
        height: '100%',
        flex: 1,
    },
    searchBox: {
        padding: 10,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 50,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 40,
    },
    searchText: {
        fontSize: 24,
        fontWeight: 'normal',
        fontStyle: 'normal',
        flex: 1,
    },
    icon: {
        tintColor: '#24BAEC',
        width: 32,
        height: 32,
    },
    suggestionsContainer: {
        position: 'absolute',
        top: 120,
        left: 20,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        zIndex: 1,
        width: 240,
        marginLeft: 20,
        marginTop: 3,
    },
    suggestionItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
    },
    suggestionItemText: {
        color: 'black',
        fontSize: 22,
        opacity: 0.8,
    },
    itemList: {
        display: 'flex',
        flexDirection: 'column',
    },
    itemListLabel: {
        color: 'white',
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    list: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
    },
    itemImage: {
        width: 100,
        height: 160,
        borderRadius: 10,
        marginBottom: 10,
    },
    itemLabel: {
        fontSize: 16,
        fontWeight: '300',
        width: 100,
    },
});

export default SearchHotelScreen;
