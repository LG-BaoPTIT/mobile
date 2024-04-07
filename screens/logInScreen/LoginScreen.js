import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const URl_API = 'http://192.168.48.1:8080';

  const handleLogin = () => {
    if (!username.trim()) {
      setUsernameError('Vui lòng nhập tên đăng nhập.');
      return;
    } else {
      setUsernameError('');
    }
  
    if (!password.trim()) {
      setPasswordError('Vui lòng nhập mật khẩu.');
      return;
    } else {
      setPasswordError('');
    }
  
    // Gửi yêu cầu API fetch đến máy chủ
    fetch(`${URl_API}/api/v1/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: username,
        password: password,
      }),
    })
      .then(response => {
        if (!response.ok) {
          console.log(response);
          // throw new Error('Tên đăng nhập hoặc mật khẩu không đúng.');
        }
        return response.json();
      })
      .then(async data => {
        try {
          if (!data.jwtToken) {
            throw new Error('Không thể lấy được token từ máy chủ.');
          }
          // Lưu token và thông tin người dùng vào AsyncStorage
          await AsyncStorage.setItem('jwtToken', data.jwtToken);
          await AsyncStorage.setItem('user', JSON.stringify(data.userDTO));
          setPassword('');
          setUsername('');
          // Chuyển hướng đến màn hình chính
          navigation.navigate('MainScreen');

        } catch (error) {
          // console.error('Lỗi khi lưu dữ liệu vào AsyncStoragee:', error);
          // Xử lý lỗi (nếu cần)
          setError(data.message);
        }
      })
      .catch(error => {
        // console.error('Lỗi khi gửi yêu cầu fetch:', error);
        // Xử lý lỗi (nếu cần)
        // setError(error.message);
      });
  };
  const handleForgotPassword = () => {
    // Thực hiện hành động khi người dùng nhấn vào "Quên mật khẩu"

    navigation.navigate('SplashScreen');

    console.log('Quên mật khẩu');
  };

  const handleSignUp = () => {
    // Chuyển hướng đến trang đăng ký khi người dùng nhấn vào "Đăng ký"
    navigation.navigate('SignUpScreen');
  };
  const clearError = () => {
    setError('');
  };
  const clearUsernameError = () => {
    setUsernameError('');
    setError('');
  };
  const clearPasswordError = () => {
    setPasswordError('');
    setError('');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên đăng nhập"
        onFocus={clearUsernameError}
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        onChangeText={setPassword}
        onFocus={clearPasswordError}
        value={password}
        secureTextEntry={true}
      />
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}
      {usernameError ? (
        <Text style={styles.errorText}>{usernameError}</Text>
      ) : null}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.signUpText}>Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#24BAEC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#24BAEC',
    marginBottom: 10,
  },
  signUpText: {
    color: '#24BAEC',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
