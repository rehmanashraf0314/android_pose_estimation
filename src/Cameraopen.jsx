import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';


import {
  Camera, useCameraDevice, useCameraDevices, useCameraPermission,
  useCameraFormat, Templates
} from 'react-native-vision-camera';


import { TabActions, useIsFocused } from '@react-navigation/native';
import { useAppState } from '@react-native-community/hooks';
import { FlatList } from 'react-native-gesture-handler';

async function hasAndroidPermission() {
  if (Platform.OS !== 'android') return true;

  if (Platform.Version >= 33) {
    const result = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
    ]);
    return (
      result['android.permission.READ_MEDIA_IMAGES'] === 'granted' &&
      result['android.permission.READ_MEDIA_VIDEO'] === 'granted'
    );
  } else {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    return result === PermissionsAndroid.RESULTS.GRANTED;
  }
}

export default function Pushups() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const [permissionChecked, setPermissionChecked] = useState(false);
  const [photoCaptured, setPhotoCaptured] = useState(null);
  const [videoLiveCapture , setvideoLiveCapture]  = useState(false);
  const camera = useRef(null);
  const [isReady, setISReady] = useState(false);
  const isFocused = useIsFocused();
  const appState = useAppState();
  const isActive = isFocused && appState === 'active';
  const device = useCameraDevice('back', {
    physicalDevices: [
      'ultra-wide-angle-camera',
      'wide-angle-camera',
      'telephoto-camera'
    ]
  })

  // Request camera permission once on mount
  useEffect(() => {
    async function checkPermission() {
      if (!hasPermission) {
        await requestPermission();
      }
      setPermissionChecked(true);
    }
    checkPermission();
  }, []);
  // Show loading while permission is being checked
  if (!permissionChecked) {
    return (
      <View style={styles.center}>
        <Text>Checking camera permission...</Text>
      </View>
    );
  }

  // Permission denied
  if (!hasPermission) {
    return (
      <View style={styles.center}>
        <Text>No camera permission granted!</Text>
      </View>
    );
  }

  // Camera device not ready yet
  if (!device) {
    return (
      <View style={styles.center}>
        <Text>Loading camera device...</Text>
      </View>
    );
  }
 async function saveToGallery(filePath, mediaType = 'photo') {
  const hasPermission = await hasAndroidPermission();
  if (!hasPermission) {
    console.log('Permission denied');
    return;
  }

  try {
    const savedUri = await CameraRoll.save(`file://${filePath}`, {
      type: mediaType,
    });
    console.log(`✅ Saved to gallery:`, savedUri);
  } catch (error) {
    console.log('❌ Error saving media:', error);
  }
}

  async function takePhoto() {
    try {
      const photo = await camera.current.takePhoto({
        qualityPrioritization: "balanced",
        flash: 'on'
      });
      console.log("Photo Taken ✅");
      setPhotoCaptured(photo);
      console.log(photo);
      await saveToGallery(photo.path, 'photo');
    } catch (error) {
      console.log("Error arise while taking the photo", error);
    }
  }
 async function takeVideo() {
  try {
    setvideoLiveCapture(true);
    await camera.current.startRecording({
      flash: 'on',
      onRecordingFinished: async (video) => {
        console.log("Recording finished:", video);
        await saveToGallery(video.path, 'video');
      },
      onRecordingError: (error) => console.error(error),
    });
  } catch (error) {
    console.log("Error while recording the video:", error);
  }
}

  async function stopVideo() {
    try {
      await camera.current.stopRecording();
      setvideoLiveCapture(false);
      console.log("Vidoe stoped...................")
    } catch (error) {
       console.log("Error while stoping the video");
    }
    
  }
  //render photo 

  if (photoCaptured) {
    const imageUri = `file://${photoCaptured.path}`;
    console.log("Rendering image with URI:", imageUri);


    return (
      <View style={styles.fullscreenContainer}>
        <Image
          style={StyleSheet.absoluteFill}
          source={{ uri: imageUri }}
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={() => setPhotoCaptured(null)}
          style={styles.overlayBackButton}
        >
          <Text style={styles.backButtonText}>↩ Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Render camera
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        photo={true}
        video={true}
        audio={false}
        onPreviewStarted={() => console.log('Preview started!')}
        onPreviewStopped={() => console.log('Preview stopped!')}
        onInitialized={() => {
          console.log("Camera is Initialialized....COngrats BABY");
          setISReady(true);
        }}
      />
      {isReady && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={takePhoto} style={styles.button}>
            <Text style={styles.captureText}>📸</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={takeVideo} style={styles.button}>
            <Text style={styles.captureText}>Video</Text>
          </TouchableOpacity>
        </View>
      )}
      {
        videoLiveCapture && (
          <TouchableOpacity onPress={stopVideo} style={styles.button}>
            <Text style={styles.captureText}>Stop</Text>
          </TouchableOpacity>
        )
      }
    
    </View>
  )
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgray' },
  captureButton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 40,
    padding: 20,
    elevation: 1,
  },
  captureText: { fontSize: 24 },
  closeButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 10,
    borderRadius: 8,
  },
  fullscreenContainer: {
    flex: 1,
    backgroundColor: 'black', // Fallback background
  },
  overlayBackButton: {
    position: "absolute",
    top: 50, // Adjust for status bar
    left: 20,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent dark background
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  backButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
  buttonContainer: {
  position: "absolute",
  bottom: 30,
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
},

button: {
  backgroundColor: "white",
  borderRadius: 50,
  paddingVertical: 15,
  paddingHorizontal: 25,
  elevation: 3,
},

captureText: {
  fontSize: 18,
  fontWeight: "bold",
},

});
