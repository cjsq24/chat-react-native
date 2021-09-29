import firebase from '@react-native-firebase/app';
import '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

firebase.messaging().getToken().then(token => console.log(token))

const setNotificationEvents = () => {
	firebase.messaging().setBackgroundMessageHandler(async message => {
		console.log('background')
		//onDisplayNotification(message.notification)
		//notifee.displayNotification(JSON.parse(message.data.notifee));
	});
	
	firebase.messaging().onMessage(async message => {
		console.log('onMessage', message.body)
		//notifee.displayNotification(JSON.parse(message.data.notifee));
		onDisplayNotification(message.notification)
	});
}

const getToken = async () => {
	return await firebase.messaging().getToken()
}

notifee.onBackgroundEvent(async e => {
	console.log('notifeeBackgroundEvent')
})

export {
	setNotificationEvents,
	getToken
}

async function onDisplayNotification(data) {
	// Create a channel
	const channelId = await notifee.createChannel({
		id: 'default',
		name: 'Default Channel'
	});

	// Display a notification
	await notifee.displayNotification({
		title: data.title,
		body: data.body,
		android: {
			channelId,
			//smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
		},
	});
}