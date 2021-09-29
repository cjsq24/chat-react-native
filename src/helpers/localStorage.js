import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItemLocal = async (key, value) => {
   try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
      return true
   } catch (error) {
      console.log(error)
      return false
   }
}

export const getItemLocal = async (key) => {
   try {
      return JSON.parse(await AsyncStorage.getItem(key))
   } catch (error) {
      console.log(error)
      return null
   }
}

export const removeItemLocal = async (key) => {
   try {
      await AsyncStorage.removeItem(key)
      return true
   } catch (error) {
      console.log(error)
      return false
   }
}