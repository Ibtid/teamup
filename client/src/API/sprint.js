const create = async (body) => {
  try {
    let response = await fetch('http://localhost:5000/api/sprints', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export { create };
