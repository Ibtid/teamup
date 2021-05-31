const user = JSON.parse(sessionStorage.getItem('jwt'));

const create = async (project) => {
  try {
    let response = await fetch('http://localhost:5000/api/projects/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const findProjectByUserId = async () => {
  try {
    let response = await fetch(
      `http://localhost:5000/api/projects/user/${user.user._id}/`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const listAllMembers = async (projectId) => {
  try {
    let response = await fetch(
      `http://localhost:5000/api/projects/members/${projectId}/`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    return response.json();
  } catch (error) {}
};

export { create, findProjectByUserId, listAllMembers };
