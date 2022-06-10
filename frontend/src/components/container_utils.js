const getUsersFromObject = (obj) => {
  const users = [];
  Object.entries(obj).forEach(([key, value]) => {
    const userinfo = JSON.parse(value);
    users.push({
      uuid: key,
      username: userinfo.username,
      imageurl: userinfo.imageurl,
      introduction: userinfo.introduction,
      inviteStatus: userinfo.inviteStatus ?? 0,
    });
  });
  return users;
};

export { getUsersFromObject };
