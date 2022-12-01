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
    let posts_temp = [];
    //console.log(props.userLoaded, props.following);
    if (props.usersFollowingLoaded == props.following.length) {
      for (let i = 0; i < props.following.length; i++) {
        const user = props.users.find((el) => el.uid === props.following[i]);
        if (user != undefined) {
          posts_temp = [...posts_temp, ...user.posts];
        }
      }
      posts_temp.sort(function (x, y) {
        return x.creation - y.creation;
      });
      //console.log(posts_temp);
      setPosts(posts_temp);
    }
  }, [props.usersFollowingLoaded, props.following]);

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
              <Text
                onPress={() =>
                  props.navigation.navigate("Comment", {
                    postId: item.id,
                    uid: item.user.uid,
                  })
                }
              >
                View Comments...
              </Text>
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
  usersFollowingLoaded: store.usersState.usersFollowingLoaded,
});

export default connect(mapStateToProps, null)(Feed);
