import superagent from 'superagent';

const getRedirect = async url => {
  const response = await superagent.get(url).set('User-Agent', 'redirect-bot');
  const matches = response.text.match('permanent-redirect.xyz/pages/[0-9]+');
  if (matches.length > 0) {
    return matches[0];
  }
  return null;
};

(async () => {

  let url = await getRedirect('https://permanent-redirect.xyz/pages/1515315007');

  while (url) {
    console.log(url);
    url = await getRedirect(url);
  }

})().catch(error => console.error(error));
