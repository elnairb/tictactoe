import React, {useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Square = (props) => {

    return (
        <TouchableOpacity style = {{...styles.container, width: props.ButtonWidth}} onPress={props.chosenSquare}>
        <Text style = {styles.text}>{props.value}</Text>
    </TouchableOpacity>
    )

}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 25,
        backgroundColor: '#202020',
        borderWidth: 1,
        borderColor: '#000000',
        paddingTop: '25%',
        position: 'relative',
      },
      text: {
        fontSize: 24,
        color: "#FFFFFF",
        position: "absolute",
        textTransform: 'uppercase',
      },
    });


export default Square;