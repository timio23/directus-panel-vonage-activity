<template>
	<div class="messages-table" :class="{ 'has-header': showHeader }">
		<v-progress-circular v-if="is_loading" class="is_loading" indeterminate />
		<v-notice v-else-if="has_error" type="danger">{{ has_error }}</v-notice>
		<v-notice v-else-if="activity_data.length == 0" type="info">No Messages</v-notice>
		<table v-else cellpadding="0" cellspacing="0" border="0">
			<thead>
				<tr>
					<th v-if="direction == 'outbound'">Status</th>
					<th v-if="direction == 'outbound'">Sent</th>
					<th v-else>Received</th>
					<th v-if="include_message">Message</th>
					<th v-if="direction == 'outbound'">Recipient</th>
					<th v-else>From</th>
					<th>Provider</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="message in activity_data" :key="message.message_id">
					<td v-if="direction == 'outbound'" class="ucwords">{{ message.status }}</td>
					<td class="nowrap">{{ formatDistanceToNow(parseISO(message.date_finalized?message.date_finalized:message.date_received)) }} ago</td>
					<td v-if="include_message" class="message">{{ message.message_body }}</td>
					<td v-if="direction == 'outbound'">{{ message.to }}</td>
					<td v-else>{{ message.from }}</td>
					<td class="ucwords">{{ type == 'MESSAGES'?message.provider:message.network_name }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { useApi } from '@directus/extensions-sdk';
import { adjustDate } from '@directus/shared/utils';
import { formatISO, formatDistanceToNow, parseISO } from 'date-fns';
import { ref, watch } from 'vue';
export default {
	props: {
		showHeader: {
			type: Boolean,
			default: false,
		},
		type: {
			type: String,
			default: '',
		},
		direction: {
			type: String,
			default: '',
		},
		range: {
			type: String,
			default: '',
		},
		include_message: {
			type: Boolean,
			default: false,
		},
		status: {
			type: String,
			default: '',
		},
	},
	setup(props){
    	const api = useApi();
		const activity_data = ref([]);
		const now = ref(new Date());
		const is_loading = ref(true);
		const has_error = ref(false);

		async function fetchData(){
			is_loading.value = true;
			activity_data.value = [];
			let params = {};
			params['product'] = props.type?props.type:'SMS';
			params['direction'] = props.direction?props.direction:'outbound';
			params['include_message'] = props.include_message?'true':'false';
			params['date_start'] = formatISO(adjustDate(now.value, (props.range?`-${props.range}`:'-1 day')));
			if(props.status){
				params['status'] = props.status;
			}

			let url_params = new URLSearchParams(params);
			
			try {
				api.get(
					`/vonage/v2/reports/records?${url_params.toString()}`
				).then((rsp) => {
					console.log(rsp.data);
					activity_data.value = rsp.data.records;
					is_loading.value = false;
				}).catch((error) => {
					is_loading.value = false;
					has_error.value = error.message;
					console.log(error);
				});
			} catch (err) {
				is_loading.value = false;
				has_error.value = "Internal Server Error";
				console.warn(err);
			}
		}

		fetchData();

		watch(
			[
				() => props.type,
				() => props.direction,
				() => props.range,
				() => props.include_message,
				() => props.status,
			],
			() => {
				fetchData();
			},
		);

		return { activity_data, is_loading, has_error, formatDistanceToNow, parseISO };

	},
};
</script>

<style scoped>
.messages-table {
	padding: 12px;
	height: 100%;
	overflow: scroll;
}

.messages-table table {
	width: 100%;
	min-width: 600px;
}
.messages-table table tr td,
.messages-table table tr th {
	vertical-align: top;
	border-top: var(--border-width) solid var(--border-subdued);
	padding: 10px;
}

.ucwords {
	text-transform: capitalize;
}

.nowrap {
	white-space: nowrap;
}

.message {
	min-width: 260px;
}
.messages-table table tr th {
	font-weight: bold;
	text-align: left;
	font-size: 0.8em;
	text-transform: uppercase;
	line-height: 1;
	padding: 8px 10px;
}


.text.has-header {
	padding: 0 12px;
}

.is_loading {
	position: absolute;
	left: calc(50% - 14px);
	top: calc(50% - 28px);
}
</style>
