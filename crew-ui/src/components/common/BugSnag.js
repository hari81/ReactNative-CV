import { Client, Configuration } from 'bugsnag-react-native';

const configuration = new Configuration();

//Applying Bugsnag configuration
configuration.apiKey = '68b014a4eeef1b6c8859c6acc206458e';
configuration.appVersion = '2.0';
//configuration.autoNotify = false;
configuration.consoleBreadcrumbsEnabled = true;
configuration.handlePromiseRejections = true;
//configuration.notifyReleaseStages = ['beta', 'production'];
//client.setUser('1234', 'Jessica Jones', 'jess@example.com');
//client.leaveBreadcrumb('load main view', {type: 'navigation'});
/*configuration.beforeSendCallbacks.push(report => {
    return false; // no error report will be sent
});*/

const client = new Client(configuration);

export default client;
