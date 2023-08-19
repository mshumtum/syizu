import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useRef} from 'react';
import {useEffect} from 'react';
import {getImage} from '../utils/getImage';
import RightArrow from '../assets/svg/RightArrow';
import TopSupporter from '../assets/svg/TopSupporter';
import HomeFran from '../assets/svg/HomeFran';
import HelpIcon from '../assets/svg/HelpIcon';
import CancelButton from '../assets/svg/CancelButton';
import {appColors} from '../utils/appColors';

const RBSheetMenuOption = ({
  isOpen,
  roomRefresh,
  onSupports,
  onFranchise,
  deleteChatroomApi,
  isAdmin,
  openHelp,
  setIsMenuOpen,
}) => {
  const refRBSheet = useRef();
  useEffect(() => {
    isOpen ? refRBSheet.current.open() : refRBSheet.current.close();
  }, [isOpen]);
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      height={380}
      closeOnPressMask={false}
      onClose={() => setIsMenuOpen(false)}
      customStyles={{
        wrapper: {
          backgroundColor: appColors.transparent,
          borderRadius: 10,
        },
        draggableIcon: {
          backgroundColor: appColors.white,
        },
        container: {borderRadius: 10},
      }}>
      <View style={{flex: 1}}>
        <ScrollView>
          {/* <View
              style={{
                flexDirection: 'row',
                marginLeft: 20,
                alignItems: 'center',
              }}>
              <GiftIcon />
              <Text
                style={{
                  color: appColors.black,
                  marginLeft: 20,
                  color: appColors.primary,
                  fontWeight: 'bold',
                }}>
                Apply Giftbox
              </Text>
            </View> */}
          <TouchableOpacity
            style={styles.bottomInnerStyle}
            onPress={() => roomRefresh()}>
            <Image source={getImage('RefreshChat')} />
            <Text style={{color: appColors.grey, marginLeft: 15, flex: 1}}>
              Refresh Chatroom
            </Text>
            <RightArrow />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomInnerStyle}
            onPress={() => onSupports()}>
            <TopSupporter />
            <Text style={{color: appColors.grey, marginLeft: 15, flex: 1}}>
              Top Supporters
            </Text>
            <RightArrow />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomInnerStyle}
            onPress={() => onFranchise()}>
            <HomeFran />
            <Text style={{color: appColors.grey, marginLeft: 15, flex: 1}}>
              Join Franchise
            </Text>
            <RightArrow />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomInnerStyle}
            onPress={() => openHelp()}>
            <HelpIcon />
            <Text style={{color: appColors.grey, marginLeft: 15, flex: 1}}>
              Help
            </Text>
            <RightArrow />
          </TouchableOpacity>

          {isAdmin == 5 ? (
            <TouchableOpacity
              style={styles.bottomInnerStyle}
              onPress={() => deleteChatroomApi()}>
              <CancelButton />
              <Text style={{color: appColors.grey, marginLeft: 15, flex: 1}}>
                Delete Chatroom
              </Text>
              <RightArrow />
            </TouchableOpacity>
          ) : (
            ''
          )}
        </ScrollView>
      </View>
    </RBSheet>
  );
};

export default RBSheetMenuOption;

const styles = StyleSheet.create({
  bottomInnerStyle: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
    alignItems: 'center',
    borderColor: appColors.light_grey,
    borderRadius: 5,
    borderWidth: 1,
  },
});
