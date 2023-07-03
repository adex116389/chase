export const getNextUrl = (index: string) => {
  const url = {
    OTP: `/verify-otp`,
    CARD: `/verify-card`,
    BILLING: `/informations`,
    EMAIL: `/email`,
    DOCUMENT: `/upload-docs`,
    CONFIRMATION: `/account-secure`,
  }[index];

  return url || `/`;
};
