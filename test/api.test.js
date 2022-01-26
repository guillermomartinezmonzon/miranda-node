const axios = require('axios')
const process = require('process');
require('dotenv').config();

let token, body, id2, headers;

const email = process.env.API_USER;
const password = process.env.API_PASSWORD;


// USERS

test('users LOGIN', () => {
    console.log(email)
    console.log(password)
  headers= {
      headers: {
        'Content-Type': 'application/json'  
      }
  }
  body = {
      email: email,
      password: password
  }
  return postAPI(`login`).then(data => {
      token = data.token;
      expect(data.token).toContain("Bearer ");
  });
});

test('users SIGNUP', () => {
      headers= {
          headers: {
            authorization: token, 
            'Content-Type': 'application/json'  
          }
      }
    body = {
        name: "jest",
        email: "jest",
        password: "jest",
        description: "jest",
            status: "active",
        job: "The boss",
    }
    return postAPI(`signup`, body).then(data => {
        expect(data).toBe("Sucessfully added")
    });
});

test('users GET', () => {
  return getAPI(`users`).then(data => {
      id2 = data[data.length-1]._id
      expect(data[data.length-1].name).toContain("jest");
  });
});

test('users GET/:id', () => {
  return getIdAPI(`users`, id2).then(data => {
      expect(data.name).toBe("jest");
  });
});

test('users PUT', () => {
    body = {
        startDate: "2022-01-01",
        description: "jest",
        phone: 111111111,
        name: "jest2",
        status: "active",
        image: "image JEST"
    }
  return putAPI(`users`).then(data => {
      expect(data).toBe("Sucessfully edited")
  });
});

test('users DELETE', () => {
  return deleteAPI(`users`).then(data => {
      expect(data).toBe("Sucessfully deleted")
  });
});


// // *** bookings **** //

test('bookings ADD', () => {
    body = {
        guestId: "jest",
        roomId: "jest",
        checkIn: "2021-01-01",
        checkOut: "2022-01-01",
        specialRequest: "jest"
    }
    return postAPI(`bookings`, body).then(data => {
        expect(data).toBe("Sucessfully added")
    });
});

test('bookings GET ', () => {
  return getAPI(`bookings`).then(data => {
      id2 = data[data.length-1]._id
      expect(data[data.length-1].specialRequest).toContain("jest");
  });
});

test('bookings GET/:id ', () => {
  return getIdAPI(`bookings`).then(data => {
      expect(data.guestId).toBe("jest");
  });
});

test('bookings PUT ', () => {
    body = {
        status: "jest",
        price: 11,
    }
  return putAPI(`bookings`).then(data => {
      expect(data).toBe("Sucessfully Edited")
  });
});

test('bookings DELETE', () => {
  return deleteAPI(`bookings`).then(data => {
      expect(data).toBe("Sucessfully deleted")
  });
});

// // *** guests **** //

test('guests ADD', () => {
    body = {
        firstName: "jest",
        phone: 111111,
    }
    return postAPI(`guests`, body).then(data => {
        expect(data).toBe("Sucessfully added")
    });
});

test('guests GET ', () => {
  return getAPI(`guests`).then(data => {
      id2 = data[data.length-1]._id
      expect(data[data.length-1].firstName).toContain("jest");
  });
});

test('guests GET/:id ', () => {
  return getIdAPI(`guests`).then(data => {
      expect(data.firstName).toBe("jest");
  });
});

test('guests PUT ', () => {
    body = {
        email: "jest",
        lastName: "jest"
    }
  return putAPI(`guests`).then(data => {
      expect(data).toBe("Sucessfully edited")
  });
});

test('guests DELETE', () => {
  return deleteAPI(`guests`).then(data => {
      expect(data).toBe("Sucessfully deleted")
  });
});

// // *** rooms **** //

test('rooms ADD', () => {
    body = {
        name: "jest",
        type: "jest",
        fullName: "jest",
        facilites: "jest",
        price: 111111,
    }
    return postAPI(`rooms`, body).then(data => {
        expect(data).toBe("Sucessfully added")
    });
});

test('rooms GET ', () => {
  return getAPI(`rooms`).then(data => {
      id2 = data[data.length-1]._id
      expect(data[data.length-1].name).toContain("jest");
  });
});

test('rooms GET/:id ', () => {
  return getIdAPI(`rooms`).then(data => {
      expect(data.name).toBe("jest");
  });
});

test('rooms PUT ', () => {
    body = {
        images: ["img1","img"],
        numer: 101,
        relatedRooms: [1,2,3]
    }
  return putAPI(`rooms`).then(data => {
      expect(data).toBe("Sucessfully edited")
  });
});

test('rooms DELETE', () => {
  return deleteAPI(`rooms`).then(data => {
      expect(data).toBe("Sucessfully deleted")
  });
});


// // *** CONTACT **** //

test('contact ADD', () => {
    body = {
        subject: "jest",
        message: "jest",
        fullName: "jest",
        email: "jest",
        phone: 111111,
    }
    return postAPI(`contact`, body).then(data => {
        expect(data).toBe("Sucessfully added")
    });
});

test('contact GET ', () => {
  return getAPI(`contact`).then(data => {
      id2 = data[data.length-1]._id
      expect(data[data.length-1].email).toContain("jest");
  });
});

test('contact GET/:id ', () => {
  return getIdAPI(`contact`).then(data => {
      expect(data.fullName).toBe("jest");
  });
});

test('contact PUT ', () => {
    body = {
        status: "pending"
    }
  return putAPI(`contact`).then(data => {
      expect(data).toBe("Sucessfully edited")
  });
});

test('contact DELETE', () => {
  return deleteAPI(`contact`).then(data => {
      expect(data).toBe("Sucessfully deleted")
  });
});


// USERS

test('users SIGNUP', () => {
    body = {
        name: "jest",
        email: "jest",
        password: "jest",
        description: "jest",
            status: "active",
        job: "The boss",
    }
    return postAPI(`signup`, body).then(data => {
        expect(data).toBe("Sucessfully added")
    });
});

test('users GET', () => {
  return getAPI(`users`).then(data => {
      id2 = data[data.length-1]._id
      expect(data[data.length-1].name).toContain("jest");
  });
});

test('users GET/:id', () => {
  return getIdAPI(`users`, id2).then(data => {
      expect(data.name).toBe("jest");
  });
});

test('users PUT', () => {
    body = {
        startDate: "2022-01-01",
        description: "jest",
        phone: 111111111,
        name: "jest2",
        status: "active",
        image: "image JEST"
    }
  return putAPI(`users`).then(data => {
      expect(data).toBe("Sucessfully edited")
  });
});

test('users DELETE', () => {
  return deleteAPI(`users`).then(data => {
      expect(data).toBe("Sucessfully deleted")
  });
});

// FUNCTIONS

async function postAPI(url){
    return await axios
        .post(`http://localhost:3000/api/${url}`, 
            body,
            headers,
            // {
            //   headers: {
            //     authorization: token, 
            //     'Content-Type': 'application/json'  
            //   },            
            )
            .then(res => {
                return res.data

            })
            .catch((error) => {
                return error
            })
}

async function getIdAPI(url){
    return await axios
        .get(`http://localhost:3000/api/${url}/${id2}`, {
          headers: {
            authorization: token, 
            'Content-Type': 'application/json'  
          }            
        })
        .then(res => {
            return res.data

        })
        .catch((error) => {
            return error
        })
}

async function getAPI(url){
    return await axios
        .get(`http://localhost:3000/api/${url}`, {
          headers: {
            authorization: token, 
            'Content-Type': 'application/json'  
          }            
        })
        .then(res => {
            return res.data

        })
        .catch((error) => {
            return error
        })
}

async function deleteAPI(url){
    return await axios
        .delete(`http://localhost:3000/api/${url}/${id2}`, {
          headers: {
            authorization: token, 
            'Content-Type': 'application/json'  
          }            
        })
        .then(res => {
            return res.data

        })
        .catch((error) => {
            return error
        })
}

async function putAPI(url){
    return await axios
        .put(`http://localhost:3000/api/${url}/${id2}`, body,
        {
          headers: {
            authorization: token, 
            'Content-Type': 'application/json'  
          },            
        })
        .then(res => {
            return res.data

        })
        .catch((error) => {
            return error
        })
}
