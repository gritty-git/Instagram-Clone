import { StyleSheet, View, Text, Image, FlatList, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import firebase from "firebase";
require("firebase/firestore");

function Feed(props) {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    let posts = [];
    // console.log(props.userLoaded);
    if (props.userLoaded == props.following.length) {
      for (let i = 0; i < props.following.length; i++) {
        const user = props.users.find((el) => el.uid === props.following[i]);
        if (user != undefined) {
          posts = [...posts, ...user.posts];
        }
      }
      posts.sort(function (x, y) {
        return x.creation - y.creation;
      });

      setPosts(posts);
    }
  }, [props.userLoaded]);

  return (
    <View style={styles.container}>
      <View style={styles.containerGallery}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <Text style={styles.container}>{item.user.name}</Text>
              <Image style={styles.image} source={{ uri: item.downloadURL }} />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerGallery: {
    flex: 1,
  },
  containerImage: {
    flex: 1 / 3,
  },
  containerInfo: {
    margin: 20,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  following: store.userState.following,
  users: store.usersState.users,
  userLoaded: store.usersState.userLoaded,
});

export default connect(mapStateToProps, null)(Feed);
