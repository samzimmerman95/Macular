import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class ErrorCatcher extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {hasError: false}
    }
    static getDerivedStateFromError(error) {
        //Used to render fallback UI after error has been thrown
        return {hasError: true}
    }
    componentDidCatch(error, errorInfo){
        //Used to log error info
        console.log(error, errorInfo)
    }
    render() {
        if (this.state.hasError) {
            return (
                <View style={styles.container}>
                    <Text>There has been an error!</Text>
                </View>
             );
        }
        return this.props.children
}
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });