import Instagram from 'instagram-web-api';
import FileCookieStore from 'tough-cookie-filestore2';

const { INSTA_USERNAME: username, INSTA_PASSWORD: password } = process.env;

const cookieStore = new FileCookieStore('./cookies.json');
const client = new Instagram({ username, password, cookieStore });

(async () => {
  try {
    const loginResponse = await client.login();
    console.log('LOGIN RESPONSE: ', loginResponse);
  } catch (err) {
    const challengeUrl = err.error.checkpoint_url;
    // await client.updateChallenge({ challengeUrl, choice: 1 });
    // await client.updateChallenge({ challengeUrl, securityCode: 'XXXXXXXX' });
    console.log(err.message);
  }
})();

export default client;
