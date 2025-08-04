import bcrypt from 'bcrypt'

const hashPassword = async (plainPassword) => {
  const saltRounds = 10;
  const hashed = await bcrypt.hash(plainPassword, saltRounds);
  return hashed;
};

export default hashPassword