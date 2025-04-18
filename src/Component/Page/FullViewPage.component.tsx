import React, {JSX} from 'react';
import {
  View,
  StyleProp,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

/**
 * default style:
 * ```
 * { flex: 1, backgroundColor: '#ffffff' }
 * ```
 * @author 도형
 */
export function FullViewPage({
  PageContent,
  BottomPart,
  style,
}: {
  PageContent?: JSX.Element;
  BottomPart?: JSX.Element;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    // <KeyboardAvoidingView
    //   // behavior={Platform.OS === 'ios' ? "padding" : "height"}
    //   style={[
    //     { position: 'relative', flex: 1, backgroundColor: '#ffffff' },
    //     style,
    //   ]}>
    <View style={[{flex: 1, backgroundColor: '#ffffff'}, style]}>
      {PageContent}
      {BottomPart && (
        <View style={{position: 'absolute', width: '100%', bottom: 0}}>
          {BottomPart}
        </View>
      )}
    </View>
    // </KeyboardAvoidingView>
  );
}
