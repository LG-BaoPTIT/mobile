import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';

const SignUpScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false); // State to control success modal visibility
  const [successMessage, setSuccessMessage] = useState(''); // State to store success message
  const URl_API = 'http://192.168.48.1:8080';
  const handleInputChange = inputName => {
    switch (inputName) {
      case 'name':
        setNameError('');
        break;
      case 'email':
        setEmailError('');
        break;
      case 'phoneNumber':
        setPhoneError('');
        break;
      case 'userName':
        setUserNameError('');
        break;
      case 'password':
        setPasswordError('');
        break;
      case 'confirmPassword':
        setConfirmPasswordError('');
        break;
      default:
        break;
    }
  };
  const handleSignUp = () => {
    const userData = {
      name: name,
      email: email,
      phone: phoneNumber,
      userName: userName,
      password: password,
    };
    // Kiểm tra xác nhận mật khẩu asdasdas
    let check = true;
    if (password !== confirmPassword) {
      check = false;
      setConfirmPasswordError('Nhập lại mật khẩu không chính xác.');
    }

    // Kiểm tra các trường bắt buộc và định dạng
    if (!name.trim()) {
      check = false;
      setNameError('Vui lòng nhập tên.');
    }

    if (!email.trim()) {
      check = false;
      setEmailError('Vui lòng nhập email.');
    }

    if (!phoneNumber.trim()) {
      check = false;
      setPhoneError('Vui lòng nhập số điện thoại.');
    }

    if (!userName.trim()) {
      check = false;
      setUserNameError('Vui lòng nhập tên đăng nhập.');
    }

    if (!password.trim()) {
      check = false;

      setPasswordError('Vui lòng nhập mật khẩu.');
    }
    if (password.trim().length < 6) {
      check = false;

      setPasswordError('Mật khẩu phải có ít nhất 6 ký tự.');
    }

    if (!confirmPassword.trim()) {
      check = false;

      setConfirmPasswordError('Vui lòng nhập lại mật khẩu.');
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      check = false;

      setEmailError('Email không hợp lệ.');
    }

    // Kiểm tra định dạng số điện thoại
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      check = false;

      setPhoneError('Số điện thoại không hợp lệ.');
    }

    if (check) {
      sendDataToServer(userData);
      
      //console.log('Đăng ký thành công!');
    } else {
      console.log('Đăng ký thaast !');
    }

    // Thực hiện xác nhận và xử lý đăng ký tại đây
  };
  const sendDataToServer = userData => {
    fetch(`${URl_API}/api/v1/user/signup`, { 
      method: 'POST',
      //credentials: 'include',
      headers: {
        //"access-control-allow-origin" : "http://localhost:8080/*",
      
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setSuccessMessage('Đăng ký thành công!');
        setSuccessModalVisible(true);
        console.log('Đăng ký thành công!', data);
      })
      .catch(error => {
        console.error('Đăng ký thất bại:', error);
      });
  };
  // const sendDataToServer = userData => {
  //   RNFetchBlob.config({
  //     trusty: true,
  //   })
  //     .fetch('POST', `${URl_API}/api/v1/user/signup`, {
  //       'Content-Type': 'application/json',
  //     }, JSON.stringify(userData))
  //     .then(response => {
  //       if (!response.respInfo || response.respInfo.status !== 200) {
  //         throw new Error('Đăng ký thất bại');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       setSuccessMessage('Đăng ký thành công!');
  //       setSuccessModalVisible(true);
  //       console.log('Đăng ký thành công!', data);
  //     })
  //     .catch(error => {
  //       console.error('Đăng ký thất bại:', error);
  //     });
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng ký</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tên:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => {
            setName(text);
            handleInputChange('name');
          }}
          value={name}
        />
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => {
            setEmail(text);
            handleInputChange('email');
          }}
          value={email}
          keyboardType="email-address"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Số điện thoại:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => {
            setPhoneNumber(text);
            handleInputChange('phoneNumber');
          }}
          value={phoneNumber}
          keyboardType="phone-pad"
        />
        {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tên đăng nhập:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => {
            setUserName(text);
            handleInputChange('userName');
          }}
          value={userName}
        />
        {userNameError ? (
          <Text style={styles.errorText}>{userNameError}</Text>
        ) : null}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mật khẩu:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => {
            setPassword(text);
            handleInputChange('password');
          }}
          value={password}
          secureTextEntry={true}
        />
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nhập lại mật khẩu:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => {
            setConfirmPassword(text);
            handleInputChange('confirmPassword');
          }}
          value={confirmPassword}
          secureTextEntry={true}
        />
        {confirmPasswordError ? (
          <Text style={styles.errorText}>{confirmPasswordError}</Text>
        ) : null}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={successModalVisible}
        onRequestClose={() => {
          setSuccessModalVisible(false);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.successMessage}>{successMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {setSuccessModalVisible(false);navigation.navigate('LoginScreen')}}>
              <Text style={styles.modalButtonText}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.linkText}>Quay lại đăng nhập</Text>
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
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#24BAEC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  linkText: {
    color: '#24BAEC',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    textAlign: 'left',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 10,
    padding: 20,
},
successMessage: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 20,
  textAlign: 'center',
},
buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},
modalButton: {
  backgroundColor: '#24BAEC',

  padding: 10,
  borderRadius: 5,
  marginTop: 10,

  marginHorizontal: 5,
  alignItems: 'center',
},
modalButtonText: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
},
});

export default SignUpScreen;
