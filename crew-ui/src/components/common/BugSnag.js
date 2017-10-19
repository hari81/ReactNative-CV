import { Client, Configuration } from 'bugsnag-react-native';


const configuration = new Configuration();
const client = new Client(configuration);

configuration.apiKey = '68b014a4eeef1b6c8859c6acc206458e';
configuration.appVersion = '1.22';
//configuration.autoNotify = false;
configuration.consoleBreadcrumbsEnabled = true;
configuration.handlePromiseRejections = false;
configuration.notifyReleaseStages = ['beta', 'production'];
//client.setUser('1234', 'Jessica Jones', 'jess@example.com');
//client.leaveBreadcrumb('load main view', {type: 'navigation'});

export default client;
