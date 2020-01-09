/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
    StyleSheet,
    Text,
    StatusBar,
    View,
    Image,
    ScrollView
} from 'react-native';
import { compose } from "recompose";
import { Formik } from "formik";
import * as Yup from "yup";
import { connect } from 'react-redux'
import HideWithKeyboard from "react-native-hide-with-keyboard";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { Colors } from 'react-native/Libraries/NewAppScreen';

import Card from '../common/Card';
import {
    handleTextInput,
    withNextInputAutoFocusForm,
    withNextInputAutoFocusInput
} from "react-native-formik";

import { TextInput, Button } from '../common';
import * as actions from '../actions/auth';

const MyInput = compose(
    handleTextInput,
    withNextInputAutoFocusInput
)(TextInput);


const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required("Введите email")
        .email("Введите корректный email"),
    password: Yup.string()
        .required("Введите пароль")
    // .min(2, "pretty sure this will be hacked")
});

const Form = withNextInputAutoFocusForm(View);

const LoginScreen = ({ navigation, login }) => {

    const onHandleSubmit = (navigate, values, setErrors) => {
        login(navigate, values, setErrors)
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled"
        >
            <View style={{ flex: 1, width: '100%', }} >
                <StatusBar barStyle="dark-content" />
                <HideWithKeyboard>
                    <Image
                        style={styles.mainImage}
                        source={require('../../assets/images/main-logo.png')}
                    />
                </HideWithKeyboard>
                <Card shadow customStyle={{ alignSelf: 'center', width: '100%' }}>
                    <Text style={styles.sectionTitle}>Авторизация</Text>

                    <Formik
                        onSubmit={(values, { setErrors }) => {
                            onHandleSubmit(navigation.navigate, values, setErrors)
                            // alert(JSON.stringify(values, null, 2))
                        }}
                        validationSchema={validationSchema}
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                    >
                        {props => {
                            return (
                                <Form style={{ padding: 10 }}>
                                    <Text style={styles.errorText} >{props.errors.serverError}</Text>
                                    <MyInput
                                        customStyle={props.errors.email && { borderColor: '#ea8963' }}
                                        label="Email"
                                        name="email"
                                        type="email"
                                    />
                                    <Text style={styles.errorText} >{props.errors.email}</Text>
                                    <MyInput
                                        label="Password"
                                        name="password"
                                        type="password"
                                        customStyle={props.errors.password && { borderColor: '#ea8963' }}
                                    />
                                    <Text style={styles.errorText} >{props.errors.password}</Text>
                                    <Button
                                        customStyle={{
                                            marginTop: 10, backgroundColor: '#459551', padding: 10,
                                        }}
                                        onPress={props.handleSubmit}
                                    >
                                        <Text style={styles.btnText}>Войти</Text>
                                    </Button>
                                </Form>
                            );
                        }}
                    </Formik>
                </Card >
                <View style={styles.fillContainer} />
            </View>
            {Platform.OS === "ios" && <KeyboardSpacer />}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f8f8f8'
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    fillContainer: {
        flex: 1
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '900',
        color: Colors.black,
        alignSelf: 'center',
        fontFamily: 'MuseoSansCyrl-500',
    },
    mainImage: {
        width: '45%',
        resizeMode: 'contain',
        backgroundColor: 'transparent',
        alignSelf: 'center'
    },
    btnText: {
        color: '#fff',
        fontSize: 17,
        fontFamily: 'MuseoSansCyrl-500',
    },
    errorText: {
        color: '#ea8963',
        marginTop: 5
    }
});

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, actions
)(LoginScreen);