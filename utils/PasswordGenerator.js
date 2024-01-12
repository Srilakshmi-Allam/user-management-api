const generateRandomPassword = () => {
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*';
  
    // Initialize password with at least one character from each category
    let password = getRandomChar(lowerCaseChars) + getRandomChar(upperCaseChars) +
      getRandomChar(numberChars) + getRandomChar(specialChars);
  
    const allChars = lowerCaseChars + upperCaseChars + numberChars + specialChars;
  
    // Generate the rest of the password
    for (let i = password.length; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      password += allChars.charAt(randomIndex);
    }
  
    return password;
  };
  
  const getRandomChar = (charSet) => {
    const randomIndex = Math.floor(Math.random() * charSet.length);
    return charSet.charAt(randomIndex);
  };

  module.exports = generateRandomPassword;
  