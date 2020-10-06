import Instagram from 'instagram-web-api';
import FileCookieStore from 'tough-cookie-filestore2';

const { INSTA_USERNAME: username, INSTA_PASSWORD: password } = process.env;

const cookieStore = new FileCookieStore('./cookies.json');
const client = new Instagram({ username, password, cookieStore });

client
  .login()
  .then((res) => console.log(res))
  .catch((err) => {
    if (err.error && err.error.message === 'checkpoint_required') {
      console.log('2FA hata', err.message);
    }
  });

/*const login = async () => {
  const client = new Instagram({ username, password, cookieStore });
  try {
    await client.login();
  } catch (err) {
    if (err.error && err.error.message === 'checkpoint_required') {
      const challengeUrl = err.error.checkpoint_url;

      await client.updateChallenge({ challengeUrl, choice: 1 });
      await client.updateChallenge({ challengeUrl, securityCode: '301794' }); // <== securityCode - set code from email.
    }
  }
};*/

export default client;
