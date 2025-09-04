export const generateInviteCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let inviteCode = "";
  const charactersLength = characters.length;

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    inviteCode += characters[randomIndex]; // ✅ use characters, not charactersLength
  }

  return inviteCode;
};
