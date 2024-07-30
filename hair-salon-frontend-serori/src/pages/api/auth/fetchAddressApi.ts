import { sendRequest } from "../requestApi";

export const fetchAddressApi = async (zipCode: string) => {
  const enZipCode = encodeURIComponent(zipCode);
  const response = await sendRequest("GET", `/api/search/${enZipCode}`);
  if (response.status === 200) {
    const result = response.data.results[0];
    return {
      prefecture: result.address1,
      city: result.address2,
      address_line1: result.address3,
    };
  } else {
    return null;
  }
};
