import { Alert, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard'

import { styles } from './styles';
import { useEffect, useState } from 'react';

export default function App() {

  const [text, setText ] = useState('')
  const [img, setImg] = useState<string | undefined>()

  async function handleCopyToClipboard(){
    await Clipboard.setStringAsync(text);
  }

  async function handleGetToClipboard(){
    const response = await Clipboard.getStringAsync()

    Alert.alert(response)
  }

  async function handleImageGetToCLipboard(){
    const response = await Clipboard.getImageAsync({ format: 'png' })
    setImg(response?.data)
  }

  useEffect(() => {
    const subscription = Clipboard.addClipboardListener(({ contentTypes }: Clipboard.ClipboardEvent) => {
      Alert.alert('Copiado', `COnteudo do tipo: ${contentTypes}`)
    })

    return () => Clipboard.removeClipboardListener(subscription)
  },[])

  return (
    <View style={styles.container}>
      <Image 
        style={styles.img}
        source={{ uri: img }}
      />

      <TextInput style={styles.input} onChangeText={setText}/>
      <View style={styles.options}>
        <TouchableOpacity style={styles.button} onPress={handleCopyToClipboard}>
          <MaterialIcons name='content-copy' size={24} color='#fff'/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleGetToClipboard}>
          <MaterialIcons name='content-paste' size={24} color='#fff'/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleImageGetToCLipboard}>
          <MaterialIcons name='image' size={24} color='#fff'/>
        </TouchableOpacity>
      </View>

    </View>
  );
}


