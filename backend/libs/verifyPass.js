import bcrypt from 'bcrypt'

const verifyPassword = async (plainPassword, hashedPassword) => {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
};

export default verifyPassword