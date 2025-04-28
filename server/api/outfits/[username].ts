export default defineEventHandler(async (event) => {
  const username = getRouterParam(event, "username");
  const apiUrl = "https://users.roblox.com/v1/usernames/users";
  let outfits: any[] = [];
  if (!username) return [];
  try {
    const result = await fetch(apiUrl, {
      method: "POST",
      headers: [["Content-Type", "application/json"]],
      body: JSON.stringify({
        usernames: [username],
        excludeBannedUsers: true,
      }),
    });
    const json = await result.json();
    const id = json.data[0].id;
    const avatarsUrl = `https://avatar.roblox.com/v1/users/${id}/outfits`;
    const result2 = await fetch(avatarsUrl);
    const json2 = await result2.json();
    const outfitIds = [];
    for (const item of json2.data) {
      const { id, name } = item;
      outfitIds.push(id);
      outfits.push({ id, name });
    }
    const thumbUrl = `https://thumbnails.roblox.com/v1/users/outfits?userOutfitIds=${outfitIds.join(
      ","
    )}&size=420x420&format=Png`;
    const result3 = await fetch(thumbUrl);
    const json3 = await result3.json();
    let idx = 0;
    for (const img of json3.data) {
      const target = outfits.find((v) => v.id == img.targetId);
      target["img"] = img.imageUrl;
      idx++;
    }
  } catch (e) {
    outfits = [];
    console.log(e);
  }
  return outfits;
});
