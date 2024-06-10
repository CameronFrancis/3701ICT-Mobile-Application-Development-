import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const ActivityIndicatorOverlay = () => {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    width: '100%',
    height: '100%',
  }
});

export default ActivityIndicatorOverlay;
