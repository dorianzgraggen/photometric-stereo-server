let expectedDevices: number;
// do {
//   const response = prompt('Expected number of devices:');
//   expectedDevices = Number(response);
// } while (isNaN(expectedDevices));

export function ask(msg: string, verification: (respone: string) => boolean) {
  let response;
  do {
    response = prompt(msg);
    console.log(response);
    console.log(verification(response as string))
  } while (response == null || !verification(response));

  console.log("returning", response)
  return response;
}

export const validations = {
  isNumber: (value: string) => {
    expectedDevices = Number(value);
    return !isNaN(expectedDevices);
  },
};

