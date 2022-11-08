import React, { useEffect, useState } from 'react';
import firebase from '../database/firebase';
import { doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";
import { 
    ScrollView,
    View,
    TextInput,
    Button,
    StyleSheet,
    ActivityIndicator,
    Alert
} from 'react-native';

const UserDetailScreen = (props) => {
    const initialState = {
        id: '',
        name: '',
        email: '',
        phone: ''
    }
    const [ user, setUser ] = useState(initialState);
    const [ loader, setLoader ] = useState(true);

    const getUserById = async id => {
        const docRef = doc(firebase.db, "users", id);
        const document = await getDoc(docRef);
        const user = document.data();
        setUser({
            ...user,
            id: docRef.id
        });    
        setLoader(false);   
    };
    
    useEffect(() => {
        getUserById(props.route.params.userId);
    }, []);

    const handleChangeText = (name, value) => {
        setUser({ ...user, [name]: value });
    };

    const deleteUser = async () => {
        await deleteDoc(doc(firebase.db, 'users', props.route.params.userId));
        props.navigation.navigate('UsersList');
    };

    const updateUser = async () => {
        const docRef = doc(firebase.db, "users", user.id);
        await setDoc(docRef, {
            name: user.name,
            email: user.email,
            phone: user.phone
        });
        setUser(initialState);
        props.navigation.navigate('UsersList')
    };

    const openConfimationAlert = () => {
        Alert.alert('Remove User', 'Are you sure?', [
            { text: 'Yes', onPress: () => deleteUser() },
            { text: 'No', onPress: () => console.log('Canceled') },
        ]);
    };

    if (loader) {
        return (
            <View>
                <ActivityIndicator size="large" color="#9e9e9e" />
            </View>
        );
    }

    return (
        <ScrollView style={ styles.container }>
            <View style={ styles.inputGroup }>
                <TextInput
                    placeholder="Name User"
                    value={ user.name }
                    onChangeText={(value) => handleChangeText('name', value)}
                />
            </View>
            <View style={ styles.inputGroup }>
                <TextInput
                    placeholder="Email User"
                    value={ user.email }
                    onChangeText={(value) => handleChangeText('email', value)}
                />
            </View>
            <View style={ styles.inputGroup }>
                <TextInput
                    placeholder="Phone User"
                    value={ user.phone }
                    onChangeText={(value) => handleChangeText('phone', value)}
                />
            </View>
            <View style={ styles.inputGroup }>
                <Button
                    color="#19AC52"
                    title="Update User"
                    onPress={() => updateUser()}
                ></Button>
            </View>
            <View>
                <Button
                    color="#E37399"
                    title="Delete User"
                    onPress={() => openConfimationAlert()}
                ></Button>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    }
});

export default UserDetailScreen;