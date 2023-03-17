

export const postData = async (url, data: any) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    return ({ data: json });
  } catch (error) {
    return ({ error: error.message });
  }
};

