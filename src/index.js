import PanelComponent from './panel.vue';

export default {
    id: 'panel-vonage-sms-activity',
    name: 'Vonage SMS Activity',
    icon: 'list_alt',
    description: 'View recent SMS activity.',
	component: PanelComponent,
	options: [
		{
			field: 'type',
			name: 'Product Type',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'select-dropdown',
				options: {
					choices: [
						{
							text: 'SMS',
							value: 'SMS',
						},
						{
							text: 'Messages',
							value: 'MESSAGES',
						},
					],
				},
			},
		},
		{
			field: 'direction',
			name: 'Direction',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'select-dropdown',
				options: {
					choices: [
						{
							text: 'Outbound',
							value: 'outbound',
						},
						{
							text: 'Inbound',
							value: 'inbound',
						},
					],
				},
			},
		},
		{
			field: 'range',
			type: 'dropdown',
			name: '$t:date_range',
			schema: {
				default_value: '1 day',
			},
			meta: {
				interface: 'select-dropdown',
				width: 'half',
				options: {
					choices: [
						{
							text: 'Past 5 Minutes',
							value: '5 minutes',
						},
						{
							text: 'Past 15 Minutes',
							value: '15 minutes',
						},
						{
							text: 'Past 30 Minutes',
							value: '30 minutes',
						},
						{
							text: 'Past 1 Hour',
							value: '1 hour',
						},
						{
							text: 'Past 4 Hours',
							value: '4 hours',
						},
						{
							text: 'Past 1 Day',
							value: '1 day',
						},
						{
							text: 'Past 2 Days',
							value: '2 days',
						},
					],
				},
			},
		},
		{
			field: 'include_message',
			name: 'Include Message',
			type: 'boolean',
			meta: {
				interface: 'boolean',
				width: 'half',
			},
			schema: {
				default_value: false,
			},
		},
		{
			field: 'status',
			name: 'Status',
			type: 'string',
			schema: {
				default_value: 'any',
			},
			meta: {
				width: 'half',
				interface: 'select-dropdown',
				options: {
					choices: [
						{
							text: 'Any',
							value: 'any',
						},
						{
							text: 'Delivered',
							value: 'delivered',
						},
						{
							text: 'Expired',
							value: 'expired',
						},
						{
							text: 'Failed',
							value: 'failed',
						},
						{
							text: 'Rejected',
							value: 'rejected',
						},
						{
							text: 'Accepted',
							value: 'accepted',
						},
						{
							text: 'buffered',
							value: 'buffered',
						},
						{
							text: 'Unknown',
							value: 'unknown',
						},
						{
							text: 'Deleted',
							value: 'deleted',
						},
					],
				},
			},
		},
	],
	minWidth: 24,
	minHeight: 18,
};
