import {View, Text, FlatList, TouchableOpacity} from 'react-native'
import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import Colors from './shared/Colors';
import { Coffee02Icon, Moon02Icon, Sun03Icon } from '@hugeicons/core-free-icons';
import { useMutation } from 'convex/react';
import {api} from '../convex/_generated/api';
import { UserContext } from '../context/UserContext';
import { Alert } from 'react-native';
import Button from './shared/Button';
import { useRouter } from 'expo-router';   // ✅ ADDED

export default function AddToMealActionSheet({recipeDetail, hideActionSheet}) {

    const [dataList, setDateList] = useState([]);
    const [selectedDate, setSelectedDate] = useState();
    const [selectedMeal, setSelectedMeal] = useState();
    const {user} = useContext(UserContext)
    const CreateMealPlan = useMutation(api.MealPlan.CreateMealPlan)

    const router = useRouter();   // ✅ ADDED

    const mealOptions=[
        { title:'Breakfast', icon: Coffee02Icon },
        { title:'Lunch', icon:Sun03Icon },
        { title:'Dinner', icon:Moon02Icon }
    ]

    useEffect(() => {
        GenerateDates();
    }, [])

    const GenerateDates = ()=> {
        const result = [];
        for(let i=0;i<4;i++){
            const nextDate = moment().add(i,'days').format('DD/MM/YYYY')
            result.push(nextDate);
        }
        setDateList(result);
    }

    const AddToMealPlan = async() => {
        if(!selectedDate || !selectedMeal){
            Alert.alert('Error!','Please Select All Details')
            return;
        }

        const result = await CreateMealPlan({
            date: selectedDate,
            mealType: selectedMeal,
            recipeId: recipeDetail?._id,
            uid: user?._id,
        })

        console.log(result);

        Alert.alert('Added!','Added to Meal Plan')

        hideActionSheet();  // close modal

        router.push('/(tabs)/Progress');   // ✅ IMPORTANT LINE
    }

  return (
    <View style={{ padding:20 }}>
        
        <Text style={{ fontSize:20, fontWeight:'bold', textAlign:'center' }}>
            Add to Meal
        </Text>

        <Text style={{ fontSize:18, fontWeight:'bold', marginTop:15 }}>
            Select Date
        </Text>

        <FlatList
            data={dataList}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
                <TouchableOpacity 
                    onPress={()=>setSelectedDate(item)}
                    style={{
                        alignItems:'center',
                        padding:7,
                        borderWidth:1,
                        borderRadius:10,
                        margin:5,
                        backgroundColor:selectedDate==item?Colors.SECONDARY:Colors.WHITE,
                        borderColor:selectedDate==item?Colors.PRIMARY : Colors.GRAY
                    }}
                >
                    <Text>{moment(item,'DD/MM/YYYY').format('ddd')}</Text>
                    <Text style={{ fontWeight:'bold' }}>
                        {moment(item,'DD/MM/YYYY').format('DD')}
                    </Text>
                    <Text>{moment(item,'DD/MM/YYYY').format('MMM')}</Text>
                </TouchableOpacity>
            )}
        />

        <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize:18, fontWeight:'bold' }}>
                Select Meal
            </Text>

            <FlatList
                data={mealOptions}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => setSelectedMeal(item.title)}
                        style={{
                            padding:10,
                            margin:5,
                            borderWidth:1,
                            borderRadius:10,
                            backgroundColor:
                                selectedMeal === item.title
                                    ? Colors.SECONDARY
                                    : Colors.WHITE,
                            borderColor:
                                selectedMeal === item.title
                                    ? Colors.PRIMARY
                                    : Colors.GRAY
                        }}
                    >
                        <Text>{item.title}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>

        <View style={{ marginTop:15 }}>
            <Button title={'+ Add to Meal Plan'} onPress={AddToMealPlan}/>

            <TouchableOpacity
                onPress={()=>hideActionSheet()}
                style={{ padding:15 }}
            >
                <Text style={{ textAlign:'center', fontSize:20 }}>
                    Cancel  
                </Text>
            </TouchableOpacity>
        </View>

    </View>
  )
}