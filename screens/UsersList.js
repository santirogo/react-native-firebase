import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import { ListItem, Avatar } from '@rneui/themed';
import firebase from '../database/firebase';
import { collection, getDocs } from "firebase/firestore";

const UsersList = (props) => {
    const [ users, setUsers ] = useState([]);

    useEffect(() => {
        getDocs(collection(firebase.db, 'users')).then(querySnapshot => {
            const users = [];
            querySnapshot.forEach((doc) => {
                const { name, email, phone } = doc.data();
                users.push({
                    id: doc.id,
                    name,
                    email,
                    phone
                });
            });
            setUsers(users);
        });
    });

    return (
        <ScrollView>
            <Button
                title="Create User"
                onPress={() => props.navigation.navigate('CreateUserScreen')}
            />
            {
                users.map(user => {
                    return (
                        <ListItem 
                            key={user.id}
                            bottomDivider
                            onPress={() => {
                                props.navigation.navigate('UserDetailScreen', {
                                    userId: user.id
                                })
                            }}
                        >
                            <ListItem.Chevron />
                            <Avatar
                                rounded
                                source={{uri: 'https://randomuser.me/api/portraits/men/36.jpg'}}
                            />
                            <ListItem.Content>
                                <ListItem.Title>{ user.name }</ListItem.Title>
                                <ListItem.Subtitle>{ user.email }</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }
        </ScrollView>
    );
};

export default UsersList;