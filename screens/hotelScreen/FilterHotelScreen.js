/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useNavigation, useRoute } from '@react-navigation/native';

const FilterHotelScreen = ({ applyFilter }) => {

    const navigation = useNavigation();
    const route = useRoute();
    const { location } = route.params;

    const [minPrice, setMinPrice] = useState(100000);
    const [maxPrice, setMaxPrice] = useState(20000000);
    const [selectedRatings, setSelectedRatings] = useState([]);

    const handleValuesChange = (values) => {
        setMinPrice(values[0]);
        setMaxPrice(values[1]);
    };

    const handleRatingFilter = (rating) => {
        if (selectedRatings.includes(rating)) {
            setSelectedRatings(selectedRatings.filter(item => item !== rating));
        } else {
            setSelectedRatings([...selectedRatings, rating]);
        }
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <TouchableOpacity
                    key={i}
                    onPress={() => handleRatingFilter(i)}
                >
                    <View style={styles.starItem}>
                        <Text style={styles.numberStar}>{i}</Text>
                        <Image
                            source={require('../../assets/icon/icon_star.png')}
                            style={[styles.iconStar, selectedRatings.includes(i) && styles.selectedIconStar]}
                        />
                    </View>
                </TouchableOpacity>
            );
        }
        return stars;
    };

    const handleFilterPress = () => {
        console.log(minPrice);
        console.log(maxPrice);
        if (selectedRatings.length === 0) {selectedRatings.push(1,2,3,4,5);}
        console.log(selectedRatings);
        navigation.navigate('ListHotelScreen', {
            location: location,
            minPrice: minPrice,
            maxPrice: maxPrice,
            selectedRatings: selectedRatings,
        });
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleFilterPress}>
                    <Image
                        source={require('../../assets/icon/icon_back.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFilterPress}>
                    <Text style={styles.filterLabel}> Lọc </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.filter}>
                <Text style={styles.filterLabel}>Khoảng giá phòng mỗi đêm</Text>
                <View style={styles.priceContainer}>
                    <View style={styles.priceBlock}>
                        <TextInput
                            style={styles.priceValue}
                            value={minPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            editable={false}
                        />
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.priceBlock}>
                        <TextInput
                            style={styles.priceValue}
                            value={maxPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            editable={false}
                        />
                    </View>
                </View>
                <View style={styles.slidePrice}>
                    <MultiSlider
                        values={[minPrice, maxPrice]}
                        sliderLength={280}
                        onValuesChange={handleValuesChange}
                        // onValuesChangeFinish={handleSlidingComplete}
                        min={100000}
                        max={20000000}
                        step={100000}
                        allowOverlap={false}
                        snapped
                        style={styles.slide}
                        trackStyle={styles.trackStyle}
                        selectedStyle={styles.selectedStyle}
                        markerStyle={styles.markerStyle}
                    />
                </View>
            </View>
            <View style={styles.filter}>
                <Text style={styles.filterLabel}>Hạng sao</Text>
                <View style={styles.starsContainer}>
                    {renderStars()}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#24BAEC',
        width: '100%',
        height: '100%',
    },
    header: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 70,
        paddingLeft: 10,
        paddingRight: 10,
    },
    labelHeader: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#24BAEC',
    },
    icon: {
        tintColor: '#24BAEC',
        width: 32,
        height: 32,
    },
    filter: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 40,
        backgroundColor: 'white',
    },
    filterLabel: {
        color: '#24BAEC',
        fontSize: 24,
        marginLeft: 10,
    },
    priceContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 60,
        paddingRight: 60,
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center',
    },
    priceBlock: {
        backgroundColor: '#EBEBEB',
        borderRadius: 20,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    priceValue: {
        color: 'black',
    },
    separator: {
        height: 2,
        width: 80,
        backgroundColor: '#EBEBEB',
    },
    slidePrice: {
        width: '100%',
        marginLeft: 60,
    },
    slide: {
        marginTop: 10,
    },
    selectedStyle: {
        backgroundColor: '#0B80D5',
        height: 4,
    },
    markerStyle: {
        backgroundColor: '#0B80D5',
        width: 20,
        height: 20,
    },
    trackStyle: {
        borderRadius: 2,
    },
    starsContainer: {
        flexDirection: 'row',
        marginLeft: 10,
        marginTop: 10,
    },
    star: {
        padding: 5,
    },
    starItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal:  5,
        paddingVertical: 10,
        marginHorizontal: 5,
        backgroundColor: '#D9D9D9',
    },
    numberStar: {
        color: 'black',
        fontSize: 24,
        marginRight: 4,
    },
    selectedIconStar: {
        tintColor: '#FFA800',
    },
});

export default FilterHotelScreen;
