import filter from 'leo-profanity';

const getLeoProfanityInstance = () => {
  const ruCensoredWordsList = filter.getDictionary('ru');
  filter.loadDictionary('en');
  filter.add(ruCensoredWordsList);
  return filter;
};

export default getLeoProfanityInstance;
