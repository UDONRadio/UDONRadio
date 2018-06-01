import { UploadView, LiveChatPanel } from './';
import { OnAirView, AboutView, AdmView, UserView } from '../components';

const tabCanShow = (tab, user, device) => {
	if (typeof(device) !== "undefined")
	{
		if (device === "mobile" && !tab.mobile)
			return (false);
		if (device === "dekstop" && !tab.desktop)
			return (false);
	}
	for (var i = 0; i < tab.required.length; i++) {
		if (tab.required[i] === 'is_staff' && !user.is_staff)
			return (false);
		if (tab.required[i] === 'is_adherent' && !user.is_adherent)
			return (false);
		if (tab.required[i] === 'is_not_logged_in' && user.logged_in)
			return (false);
	}
	return (true);
}

const baseTab = {
	required: [],
	default: false,
	mobile: true,
	desktop: true,
}
const tabs = [
	{
		...baseTab,
		name: 'Chat',
		class: LiveChatPanel,
		desktop: false
	},
	{
		...baseTab,
		name: "Actuellement",
		class: OnAirView,
		icon_name: "list layout"
	},
	{
		...baseTab,
		name: 'A propos',
		class: AboutView,
		default: true,
		icon_name: "question"
	},
	{
		...baseTab,
		name: 'Uploads',
		class: UploadView,
		required: ['is_adherent'],
		icon_name: "upload"
	},
	{
		...baseTab,
		name: 'Administration',
		class: AdmView,
		required: ['is_staff'],
		mobile: false,
	},
	{
		...baseTab,
		name: 'Login',
		class: UserView,
		required: ['is_not_logged_in'],
		desktop: false,
		icon_name: "user circle"
	}
].map((tab) => ({...tab, canShow: (user, device) => tabCanShow(tab, user, device)}))

export default tabs;
