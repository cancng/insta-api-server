import Instagram from 'instagram-web-api';
import FileCookieStore from 'tough-cookie-filestore2';

const { INSTA_USERNAME: username, INSTA_PASSWORD: password } = process.env;

const cookieStore = new FileCookieStore('./cookies.json');
const client = new Instagram({ username, password, cookieStore });

client.login().then((res) => console.log(res));

/* (async () => {
  await client.login();
})(); */
export default client;
