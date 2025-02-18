const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    userId: 1,
    amountInCents: -200,
  }),
};

let success = 0;
let fail = 0;

const start = async () => {
  const promises = new Array(10000).fill(0).map(async () => {
    try {
      const response = await fetch('http://localhost:5555/users/balance', options);
      if (response.ok) {
        ++success;
      } else {
        ++fail;
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      ++fail;
    }
  });

  await Promise.all(promises);

  console.log({ success, fail });
};

start();
