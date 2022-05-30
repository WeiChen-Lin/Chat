const getUsersFromObject = (obj) => {
  const users = [];
  Object.entries(obj).forEach(([key, value]) => {
    const userinfo = JSON.parse(value);
    console.log(userinfo);
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
