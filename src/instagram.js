import Instagram from 'instagram-web-api';
import FileCookieStore from 'tough-cookie-filestore2';

const { INSTA_USERNAME: username, INSTA_PASSWORD: password } = process.env;

const cookieStore = new FileCookieStore('./cookies.json');
const client = new Instagram({ username, password, cookieStore });

/*client
  .login()
  .then((res) => console.log(res))
  .catch((err) => {
    if (err.error && err.error.message === 'checkpoint_required') {
      const challengeUrl = err.error.checkpoint_url
      console.log('2FA hata', err.message);
      console.log(err.error.checkpoint_url)
    }
  });*/

(async () => {
  try {
    const loginResponse = await client.login();
    console.log('LOGIN RESPONSE: ', loginResponse);
  } catch (err) {
    const challengeUrl = err.error.checkpoint_url;
    await client.updateChallenge({ challengeUrl, choice: 1 });
    // await client.updateChallenge({ challengeUrl, securityCode: '034192' });
    console.log(err.message);
  }
})();

export default client;
