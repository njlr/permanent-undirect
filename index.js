import superagent from 'superagent';

const getRedirect = async url => {
  const response = await superagent.get(url)
    .set('User-Agent', 'redirect-bot');
  const pattern = 'permanent-redirect.xyz/pages/[0-9]+';
  const matches = (response.text || '').match(pattern);
  if (matches && matches.length > 0) {
    return 'https://' + matches[0];
  }
  return null;
};

(async () => {

  let url = await getRedirect('https://permanent-redirect.xyz/pages/1515595740');

  while (url) {
    console.log(url);
    url = await getRedirect(url);
  }

})().catch(error => console.error(error));
