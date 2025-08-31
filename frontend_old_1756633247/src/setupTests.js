jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (k,d)=> (d?d:k), i18n:{ changeLanguage:()=>Promise.resolve(), language:'de' } }),
  Trans: ({ children }) => children,
}));
