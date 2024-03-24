

import * as Font from 'expo-font';

export default useFonts = async () =>
  await Font.loadAsync({
    limelight: require('./assets/fonts/dm-sans/static/DMSans_24pt-Regular.ttf'),
    indie: require('./assets/fonts/dm-sans/static/DMSans_24pt-Regular.ttf'),
  });
