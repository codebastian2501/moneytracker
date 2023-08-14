function generateUniqueId() {
  const timestamp = Date.now().toString(36);
  const randomNum = Math.random().toString(36).substr(2, 5); // 5-character random number
  const uniqueId = timestamp + randomNum;
  return uniqueId;
}

export { generateUniqueId };
