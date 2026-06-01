import { View, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function MutualScreen() {
  const navigation = useNavigation();  // ✅ Add this line

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Button
        title="Open Camera"
        onPress={() => navigation.navigate('simpleCam')}
      />
    </View>
  );
}
