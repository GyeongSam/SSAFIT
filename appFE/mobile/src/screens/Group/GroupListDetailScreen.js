import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View, Image, FlatList, StyleSheet} from 'react-native';
import {Button, TextInput, IconButton, Text} from 'react-native-paper';
import ReplyScreen from './ReplyScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GroupDetailScreen({navigation, route}) {
  const groupId = route.params.id;
  const [heartCnt, setHeartCnt] = useState(0);
  const [registeredTime, setRegisteredTime] = useState('');

  const [isClickHeart, setIsClickHeart] = useState(0);
  const [text, setText] = useState('');
  const [info, setInfo] = useState({});

  const [userId, setUserId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [ip, setIP] = useState('');

  const [Reply, setReply] = useState([]);
  const [changeReply, setChangeReply] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem('ip', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setIP(UserInfo.ip);
    });
    AsyncStorage.getItem('username', (err, result) => {
      const UserInfo = JSON.parse(result); // JSON.parse를 꼭 해줘야 한다!
      setUserId(UserInfo.id);
      setAccessToken(UserInfo.token);
    });
  }, []);
  useEffect(() => {
    getData();
  }, [accessToken, groupId, changeReply]);
  const getData = async () => {
    if (accessToken === '') return;
    const data = (
      await axios.get(`http://${ip}/group/recruit/${groupId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      })
    ).data;
    console.log(data);
    setInfo(data);
    setReply(data.groupRecruitReplyList);
    setHeartCnt(data.likes);
    setIsClickHeart(data.clickLikes);
    setChangeReply(false);
    const date = data.registeredTime.split('T');
    setRegisteredTime(date[0] + ' ' + date[1].substring(0, 5));
  };
  const clickHeart = async () => {
    const result = (
      await axios.get(`http://${ip}/group/recruit/${groupId}/likes`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      })
    ).data;
    setIsClickHeart(result);
    setHeartCnt(heartCnt + (result ? 1 : -1));
  };
  const deleteRecruit = async () => {
    const result = await axios.delete(`http://${ip}/group/recruit/${groupId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-AUTH-TOKEN': `${accessToken}`,
      },
    });
    console.log(result);
    // if (result) navigation.navigate('MainMyPageScreen');
  };
  const deleteReply = isDelete => {
    console.log(isDelete);
    if (isDelete) setChangeReply(true);
  };
  const addReply = async () => {
    // console.log(text)
    if (text.length === 0) return;
    // console.log(text);
    const uploadReply = await axios.post(
      `http://${ip}/group/recruit/${groupId}/regist`,
      {
        board_id: Number(info.boardId),
        content: text,
        registered_time: '2023-02-07T02:01:16.776Z',
        reply_id: Number(0),
        user_id: userId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-AUTH-TOKEN': `${accessToken}`,
        },
      },
    );
    // console.log(uploadReply);
    setChangeReply(true);
    setText('');
  };
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          variant="headlineLarge"
          style={{fontWeight: 'bold', marginTop: 10}}>
          {' ' + info.title + ' '}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Button
            mode="contained"
            buttonColor="black"
            style={styles.button}
            labelStyle={styles.label}
            onPress={() =>
              navigation.navigate('CreateGroupScreen', {data: info})
            }>
            수정
          </Button>
          <Button
            mode="contained"
            buttonColor="red"
            style={styles.button}
            labelStyle={styles.label}
            onPress={deleteRecruit}>
            삭제
          </Button>
        </View>
      </View>
      <View style={styles.container}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 2,
              justifyContent: 'space-around',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                variant="titleLarge"
                style={{
                  fontWeight: 'bold',
                  borderRightWidth: 1,
                  paddingRight: 5,
                }}>
                {info.userId}
              </Text>
              <Text> {registeredTime}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text>{'조회 ' + info.hits}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <IconButton
                  icon={isClickHeart ? 'heart' : 'heart-outline'}
                  iconColor={isClickHeart ? 'red' : 'black'}
                  size={20}
                  onPress={clickHeart}
                  style={styles.iconButton}
                />
                <Text>{heartCnt}</Text>
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold'}}>모집기간 : </Text>
            <Text>
              {info.startRecruitDate} ~ {info.endRecruitDate}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold'}}>운동기간 : </Text>
            <Text>
              {info.startDate} ~ {info.endDate}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold'}}>그룹목표 : </Text>
            <Text>{info.goal}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold'}}>인원 : </Text>
          <Text>
            {info.currentMember}/{info.maximumMember} 명
          </Text>
        </View>
        <View>
          <Text style={{fontWeight: 'bold'}}>운동 루틴 </Text>
          <FlatList
            data={info.routineList}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({item}) => <Text>{item.name}</Text>}
            keyExtractor={item => item.routineId}
            style={{maxHeight: 100, padding: 0, height: 100}}
          />
        </View>
        <Text style={{marginBottom: 20, height: 175, backgroundColor: 'blue'}}>
          {info.content}
        </Text>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={require('./comment.png')} />
        <Text>{Reply ? Reply.length : 0}</Text>
      </View>
      {/* <ReplyScreen reply={Reply} groupId={id} /> */}
      <FlatList
        data={Reply}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({item}) => (
          <ReplyScreen
            reply={item}
            leader={info.userId}
            groupId={groupId}
            send={deleteReply}
          />
        )}
        keyExtractor={item => item.reply_id.toString()}
        style={{height: 160, padding: 0}}
      />
      <TextInput
        label="댓글을 입력하세요"
        value={text}
        onChangeText={text => setText(text)}
        right={<TextInput.Icon icon="import" onPress={addReply} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
  },
  container: {
    marginTop: 8,
    backgroundColor: 'aliceblue',
    minHeight: 400,
    maxHeight: 400,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    margin: 20,
  },
  button: {
    width: 80,
    height: 40,
    borderRadius: 10,
    alignSelf: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
