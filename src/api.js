export const postToken = async (body) => {
  try {
    const res = await fetch(
      "https://65e98a09c9bf92ae3d396ffe.mockapi.io/tokens",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};
