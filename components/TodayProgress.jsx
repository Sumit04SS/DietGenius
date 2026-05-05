import {View, Text} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import moment from "moment";
import Colors from './shared/Colors';
import { UserContext } from '../context/UserContext';
import { useConvex } from 'convex/react';
import { api } from '../convex/_generated/api';
import { RefreshDataContext } from '../context/RefreshDataContext';


export default function TodayProgress() {

    const { user } = useContext(UserContext)
    const convex = useConvex();
    const [totalCaloriesConsumed,setTotalCaloriesConsumed] = useState(0);
    const {refreshData, setRefreshData} = useContext(RefreshDataContext); 
    

    useEffect(() => {
        if (user?._id) {
        GetTotalCaloriesConsumed();
    }
}, [user, refreshData]);

const GetTotalCaloriesConsumed = async () => {
  const result = await convex.query(api.MealPlan.GetTotalCaloriesConsumed, {
    date: moment().format('DD/MM/YYYY'),
    uid: user?._id
  });

  setTotalCaloriesConsumed(result);
}

  return (
    <View style = {{
        padding:15,
        backgroundColor:Colors.WHITE,
        borderRadius:10
    }}>
        <View style = {{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'
        }}>
            <Text style = {{
                fontSize:20,
                fontWeight:'bold'
            }}>Today's Goal</Text>
            <Text style = {{
                fontSize:18
            }}>{moment().format('MMM DD, YYYY')}</Text>
        </View>

        <Text style = {{
            fontSize:30,
            textAlign:'center',
            fontWeight:'bold',
            marginTop: 10,
            color:Colors.PRIMARY
        }}>{totalCaloriesConsumed}/{Math.round(user?.calories || 0)} kcal </Text>
        <Text style = {{
            textAlign:'center',
            marginTop:2
        }}> You'r Doing Great!</Text>

        <View style = {{
            backgroundColor:Colors.GRAY,
            height:10,
            borderRadius:99,
            marginTop: 15,
            opacity:0.7, 
        }}>
            <View style = {{
                backgroundColor: Colors.PRIMARY,
                width: `${(totalCaloriesConsumed / (user?.calories || 1)) * 100}%`,
                height:10,
                borderRadius:99 
            }}>

            </View>    
        </View>   

        <View style = {{
            display: 'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            marginTop:5
        }}>
            <Text>Calories Consumes</Text>
            <Text>Keep it up! 🔥</Text>
        </View>

    </View>
  )
}