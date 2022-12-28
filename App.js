import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Permission,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import React from 'react';
const Width = Dimensions.get('screen').width;
const Height = Dimensions.get('screen').height;
function App() {
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Downloader Storage Permission',
          message:
            'Cool Photo App needs access to your Storage ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        downloadFile();
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const downloadFile = () => {
    console.log('You can use the storage');
    const {fs} = RNFetchBlob;
    const date = new Date();
    const filePath = fs.dirs.DownloadDir;

    RNFetchBlob.config({
      fileCache: true,
      // by adding this option, the temp files will have a file extension
      // appendExt: 'png',
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          filePath +
          '/' +
          Math.floor(date.getDate() + date.getSeconds()) +
          '.pdf',
        description: 'file Download',
      },
    })
      .fetch('GET', url, {
        //some headers ..
      })
      .then(res => {
        // the temp file path with file extension `png`
        console.log('The file saved to ', res.path());
        alert('File Downloaded successfully');
        // Beware that when using a file path as Image source on Android,
        // you must prepend "file://"" before the file path
      });
  };
  const [url, setUrl] = React.useState('');
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20}}>File downloader code</Text>
      <TextInput
        placeholder="Enter the url for download"
        style={styles.inputText}
        value={url}
        onChangeText={text => setUrl(text)}
      />
      <TouchableOpacity
        style={[
          styles.inputText,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            backgroundColor: 'purple',
            marginTop: 30,
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 0,
          },
        ]}
        onPress={() => {
          if (url) {
            requestCameraPermission();
          } else {
            alert('Please Add Url!!');
          }
        }}>
        <Text style={{color: 'white'}}>Download</Text>
      </TouchableOpacity>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  inputText: {
    width: Width * 0.9,
    height: Height * 0.06,
    borderWidth: 0.5,
    alignSelf: 'center',
    paddingLeft: 20,
    borderRadius: 20,
  },
  view: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
